import { DEFAULT_SITE_CONFIG } from '../config/defaultConfig';
import { SiteConfig } from '../types/config';
import { authService } from './authService';

const STORAGE_KEY = 'sr2b_pest_control_config_v1';

export const configService = {
  // Load configuration with server sync and localStorage fallback
  async getConfig(): Promise<SiteConfig> {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.config) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.config));
          this.applyBrandingToDOM(data.config);
          return data.config;
        }
      }
    } catch (e) {
      console.warn('Network error fetching config from server, falling back to local storage', e);
    }

    // Fallback to local storage if server is unavailable
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        this.applyBrandingToDOM(parsed);
        return parsed;
      } catch (err) {
        console.error('Corrupt localStorage config, using defaults', err);
      }
    }

    this.applyBrandingToDOM(DEFAULT_SITE_CONFIG);
    return DEFAULT_SITE_CONFIG;
  },

  // Save updated configuration to server and local storage
  async saveConfig(newConfig: SiteConfig): Promise<{ success: boolean; message: string; config?: SiteConfig }> {
    newConfig.updatedAt = new Date().toISOString();
    
    // Always persist to local cache first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    this.applyBrandingToDOM(newConfig);

    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
        body: JSON.stringify(newConfig),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save configuration to server.');
      }

      const data = await response.json();
      return { success: true, message: 'Configuration saved and published successfully!', config: data.config || newConfig };
    } catch (error: any) {
      // Local changes still saved
      return {
        success: true,
        message: 'Saved locally in browser (Server update notice: ' + (error?.message || 'offline') + ')',
        config: newConfig,
      };
    }
  },

  // Reset to default config
  async resetToDefault(): Promise<SiteConfig> {
    localStorage.removeItem(STORAGE_KEY);
    try {
      const response = await fetch('/api/config/reset', {
        method: 'POST',
        headers: authService.getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.config) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.config));
          this.applyBrandingToDOM(data.config);
          return data.config;
        }
      }
    } catch (e) {
      console.warn('Could not reset on server, applying local default', e);
    }

    this.applyBrandingToDOM(DEFAULT_SITE_CONFIG);
    return DEFAULT_SITE_CONFIG;
  },

  // Apply dynamic CSS variables and Document Title/Favicon to the DOM
  applyBrandingToDOM(config: SiteConfig): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const { branding, seo, business } = config;

    if (branding) {
      root.style.setProperty('--primary-navy', branding.primaryNavy || '#183247');
      root.style.setProperty('--deep-navy', branding.deepNavy || '#102332');
      root.style.setProperty('--bronze', branding.bronze || '#A98250');
      root.style.setProperty('--light-bronze', branding.lightBronze || '#C3A16A');
      root.style.setProperty('--warm-bg', branding.warmBg || '#F8F6F1');
      root.style.setProperty('--text-main', branding.textMain || '#263442');
      root.style.setProperty('--text-muted', branding.textMuted || '#66727D');
      root.style.setProperty('--btn-radius', branding.borderRadius || '0.5rem');
    }

    if (seo?.metaTitle) {
      document.title = seo.metaTitle;
    } else if (business?.name) {
      document.title = `${business.name} — ${business.tagline || 'Pest Control Services'}`;
    }

    if (branding?.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = branding.faviconUrl;
    }
  },

  // Export JSON configuration file
  exportConfigAsJSON(config: SiteConfig): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sr2b_config_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  // Validate imported JSON configuration structure
  validateConfigJSON(imported: any): { valid: boolean; error?: string } {
    if (!imported || typeof imported !== 'object') {
      return { valid: false, error: 'File content is not a valid JSON object.' };
    }
    if (!imported.business || !imported.branding || !imported.services || !Array.isArray(imported.services)) {
      return { valid: false, error: 'Missing mandatory configuration sections (business, branding, or services).' };
    }
    return { valid: true };
  },
};
