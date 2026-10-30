import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_SITE_CONFIG } from '../config/defaultConfig';
import { configService } from '../services/configService';
import { SiteConfig } from '../types/config';

interface ConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: string | null;
  saveConfig: (newConfig: SiteConfig) => Promise<{ success: boolean; message: string }>;
  resetConfig: () => Promise<void>;
  updateConfigSection: <K extends keyof SiteConfig>(section: K, data: SiteConfig[K]) => Promise<{ success: boolean; message: string }>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    configService.getConfig().then((loaded) => {
      if (mounted) {
        setConfig(loaded);
        setIsLoading(false);
        setLastSaved(loaded.updatedAt || null);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const saveConfig = async (newConfig: SiteConfig) => {
    setIsSaving(true);
    try {
      const result = await configService.saveConfig(newConfig);
      if (result.success && result.config) {
        setConfig(result.config);
        setLastSaved(result.config.updatedAt);
      }
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const resetConfig = async () => {
    setIsSaving(true);
    try {
      const reset = await configService.resetToDefault();
      setConfig(reset);
      setLastSaved(reset.updatedAt);
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfigSection = async <K extends keyof SiteConfig>(section: K, data: SiteConfig[K]) => {
    const updated = {
      ...config,
      [section]: data,
    };
    return await saveConfig(updated);
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        isLoading,
        isSaving,
        lastSaved,
        saveConfig,
        resetConfig,
        updateConfigSection,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useSiteConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a ConfigProvider');
  }
  return context;
};
