import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';
import { useAuth } from '../context/AuthContext';
import {
  Building2,
  Palette,
  Layout,
  Briefcase,
  MapPin,
  Tag,
  MessageSquare,
  HelpCircle,
  Share2,
  Search,
  Inbox,
  Database,
  Save,
  Eye,
  RotateCcw,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Tablet,
  Monitor,
} from 'lucide-react';

// Tab components
import { BusinessInfoTab } from './tabs/BusinessInfoTab';
import { BrandingTab } from './tabs/BrandingTab';
import { HomepageTab } from './tabs/HomepageTab';
import { ServicesTab } from './tabs/ServicesTab';
import { ServiceAreasTab } from './tabs/ServiceAreasTab';
import { PricingTab } from './tabs/PricingTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { FAQTab } from './tabs/FAQTab';
import { ContactSocialTab } from './tabs/ContactSocialTab';
import { SEOTab } from './tabs/SEOTab';
import { EnquiriesTab } from './tabs/EnquiriesTab';
import { BackupTab } from './tabs/BackupTab';
import { SiteConfig } from '../types/config';

export const ConfigDashboard: React.FC = () => {
  const { config, saveConfig, resetConfig, isSaving, lastSaved } = useSiteConfig();
  const { isAuthenticated, logout, adminUser } = useAuth();
  const navigate = useNavigate();

  // Local editable draft state
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<string>('business');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Keep draft in sync if external config updates
  useEffect(() => {
    setFormData(config);
  }, [config]);

  // Auth gate
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Helper for deep or shallow path mutation
  const updateField = (path: string, value: any) => {
    setHasUnsavedChanges(true);
    setFormData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const handleSaveChanges = async () => {
    try {
      const res = await saveConfig(formData);
      if (res.success) {
        setHasUnsavedChanges(false);
        setNotification({ type: 'success', message: 'Changes saved and published live!' });
        setTimeout(() => setNotification(null), 4000);
      } else {
        setNotification({ type: 'error', message: res.message || 'Failed to save configuration.' });
      }
    } catch (e: any) {
      setNotification({ type: 'error', message: e?.message || 'Error saving changes.' });
    }
  };

  const handleResetToDefaults = async () => {
    await resetConfig();
    setHasUnsavedChanges(false);
    setNotification({ type: 'success', message: 'Restored default configuration!' });
    setTimeout(() => setNotification(null), 4000);
  };

  const tabs = [
    { id: 'business', label: '1. Business Profile', icon: Building2 },
    { id: 'branding', label: '2. Branding & Colors', icon: Palette },
    { id: 'homepage', label: '3. Homepage Content', icon: Layout },
    { id: 'services', label: '4. Services CRUD', icon: Briefcase },
    { id: 'serviceAreas', label: '5. Service Areas', icon: MapPin },
    { id: 'pricing', label: '6. Pricing & Offers', icon: Tag },
    { id: 'testimonials', label: '7. Testimonials', icon: MessageSquare },
    { id: 'faqs', label: '8. FAQ Management', icon: HelpCircle },
    { id: 'contact', label: '9. Contact & Social', icon: Share2 },
    { id: 'seo', label: '10. SEO & Settings', icon: Search },
    { id: 'enquiries', label: '11. Lead Enquiries', icon: Inbox },
    { id: 'backup', label: '12. Backup & Restore', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-[#183247] text-white border-b border-[#102332] px-4 py-3 sm:px-6 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                SR2B Config Dashboard
              </span>
              <span className="hidden sm:inline-block text-[11px] bg-[#DFBA7E] text-[#183247] font-bold px-2 py-0.5 rounded">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {hasUnsavedChanges && (
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Unsaved Changes</span>
              </span>
            )}

            {/* Preview Button */}
            <button
              type="button"
              onClick={() => setPreviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-200 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/15"
            >
              <Eye className="w-3.5 h-3.5 text-[#DFBA7E]" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Save Changes Button */}
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-[#183247] bg-[#DFBA7E] hover:bg-[#C3A16A] active:scale-95 rounded-lg shadow-sm transition-all disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>

            {/* View Live Public Site */}
            <Link
              to="/"
              target="_blank"
              className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10"
              title="Open Public Website in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={() => logout()}
              className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`px-4 py-2 text-xs font-semibold flex items-center justify-between ${
            notification.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Dashboard Workspace (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 top-14 z-20 w-64 bg-white border-r border-stone-200 transform transition-transform lg:translate-x-0 lg:static lg:block overflow-y-auto ${
            mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Configuration Tabs
            </span>
            <span className="text-[10px] text-stone-400">12 Sections</span>
          </div>

          <nav className="p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                    isActive
                      ? 'bg-[#183247] text-white shadow-2xs font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#DFBA7E]' : 'text-stone-400'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 mt-6 border-t border-stone-100 text-[11px] text-stone-400 space-y-1">
            <div>Logged in as: <strong className="text-stone-600">{adminUser?.email || 'admin'}</strong></div>
            {lastSaved && <div>Last saved: {new Date(lastSaved).toLocaleTimeString()}</div>}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 sm:p-8">
            {activeTab === 'business' && (
              <BusinessInfoTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'branding' && (
              <BrandingTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'homepage' && (
              <HomepageTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'services' && (
              <ServicesTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'serviceAreas' && (
              <ServiceAreasTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'pricing' && (
              <PricingTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'testimonials' && (
              <TestimonialsTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'faqs' && (
              <FAQTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'contact' && (
              <ContactSocialTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'seo' && (
              <SEOTab formData={formData} updateField={updateField} />
            )}
            {activeTab === 'enquiries' && <EnquiriesTab />}
            {activeTab === 'backup' && (
              <BackupTab
                formData={formData}
                updateField={updateField}
                resetToDefaults={handleResetToDefaults}
                setFormData={setFormData}
              />
            )}
          </div>
        </main>
      </div>

      {/* Multi-Viewport Website Preview Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 text-white border-b border-white/20">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm">Site Live Preview</span>
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg">
                <button
                  onClick={() => setPreviewViewport('desktop')}
                  className={`p-1.5 rounded transition-colors ${
                    previewViewport === 'desktop' ? 'bg-[#DFBA7E] text-[#183247]' : 'text-stone-300'
                  }`}
                  title="Desktop View (1200px)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewViewport('tablet')}
                  className={`p-1.5 rounded transition-colors ${
                    previewViewport === 'tablet' ? 'bg-[#DFBA7E] text-[#183247]' : 'text-stone-300'
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewViewport('mobile')}
                  className={`p-1.5 rounded transition-colors ${
                    previewViewport === 'mobile' ? 'bg-[#DFBA7E] text-[#183247]' : 'text-stone-300'
                  }`}
                  title="Mobile View (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setPreviewModalOpen(false)}
              className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center pt-4 overflow-hidden">
            <div
              className={`h-full bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border-4 border-stone-800 ${
                previewViewport === 'desktop'
                  ? 'w-full max-w-6xl'
                  : previewViewport === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              <iframe
                src="/"
                title="Website Live Preview"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
