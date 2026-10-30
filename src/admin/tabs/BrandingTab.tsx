import React from 'react';
import { SiteConfig } from '../../types/config';
import { RefreshCw, Image as ImageIcon } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const BrandingTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const brand = formData.branding;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField(targetField, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Branding, Logo & Color Palette</h3>
        <p className="text-xs text-stone-500">
          Customize website colors, logos, and typography without modifying source code.
        </p>
      </div>

      {/* Official Logo Section */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <h4 className="text-sm font-bold text-[#183247]">Official SR2B Logo & Favicon</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">Current Header Logo</label>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-center min-h-[100px]">
              <img
                src={brand.logoUrl || '/assets/sr2b-logo.svg'}
                alt="Logo preview"
                className="max-h-16 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/sr2b-logo.svg';
                }}
              />
            </div>
            <div className="mt-2.5">
              <label className="inline-block px-3 py-1.5 bg-[#183247] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#102332] transition-colors">
                <span>Upload Replacement Logo (SVG / PNG / JPEG)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={(e) => handleFileUpload(e, 'branding.logoUrl')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">Browser Favicon / App Icon</label>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-center min-h-[100px]">
              <img
                src={brand.faviconUrl || '/assets/sr2b-icon.svg'}
                alt="Favicon preview"
                className="w-12 h-12 rounded-lg object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/sr2b-icon.svg';
                }}
              />
            </div>
            <div className="mt-2.5">
              <label className="inline-block px-3 py-1.5 bg-stone-200 text-stone-800 text-xs font-bold rounded-lg cursor-pointer hover:bg-stone-300 transition-colors">
                <span>Upload Favicon Icon</span>
                <input
                  type="file"
                  accept="image/png, image/svg+xml, image/x-icon"
                  onChange={(e) => handleFileUpload(e, 'branding.faviconUrl')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Color Pickers */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <h4 className="text-sm font-bold text-[#183247]">Theme Colors (Hex Codes)</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Primary Navy</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brand.primaryNavy}
                onChange={(e) => updateField('branding.primaryNavy', e.target.value)}
                className="w-10 h-10 p-0.5 rounded border border-stone-300 cursor-pointer"
              />
              <input
                type="text"
                value={brand.primaryNavy}
                onChange={(e) => updateField('branding.primaryNavy', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Deep Navy (Header/Footer)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brand.deepNavy}
                onChange={(e) => updateField('branding.deepNavy', e.target.value)}
                className="w-10 h-10 p-0.5 rounded border border-stone-300 cursor-pointer"
              />
              <input
                type="text"
                value={brand.deepNavy}
                onChange={(e) => updateField('branding.deepNavy', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Bronze Metallic Accent</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brand.bronze}
                onChange={(e) => updateField('branding.bronze', e.target.value)}
                className="w-10 h-10 p-0.5 rounded border border-stone-300 cursor-pointer"
              />
              <input
                type="text"
                value={brand.bronze}
                onChange={(e) => updateField('branding.bronze', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Light Bronze Highlight</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brand.lightBronze}
                onChange={(e) => updateField('branding.lightBronze', e.target.value)}
                className="w-10 h-10 p-0.5 rounded border border-stone-300 cursor-pointer"
              />
              <input
                type="text"
                value={brand.lightBronze}
                onChange={(e) => updateField('branding.lightBronze', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Warm Off-White Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brand.warmBg}
                onChange={(e) => updateField('branding.warmBg', e.target.value)}
                className="w-10 h-10 p-0.5 rounded border border-stone-300 cursor-pointer"
              />
              <input
                type="text"
                value={brand.warmBg}
                onChange={(e) => updateField('branding.warmBg', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Button Border Radius</label>
            <select
              value={brand.borderRadius}
              onChange={(e) => updateField('branding.borderRadius', e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded border border-stone-300"
            >
              <option value="0.25rem">Slightly Rounded (4px)</option>
              <option value="0.5rem">Standard Modern (8px)</option>
              <option value="0.75rem">Curved (12px)</option>
              <option value="9999px">Pill Buttons (Full)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Live Component Preview</h4>
        <div
          className="p-6 rounded-xl border shadow-sm max-w-sm transition-all"
          style={{
            backgroundColor: brand.warmBg,
            borderColor: brand.borderColor,
          }}
        >
          <div className="text-xs font-bold" style={{ color: brand.bronze }}>
            SR2B PREVIEW SAMPLE
          </div>
          <h3 className="text-lg font-bold mt-1" style={{ color: brand.primaryNavy }}>
            Cockroach Control Protocol
          </h3>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: brand.textMuted }}>
            Targeted gel treatment for residential kitchens with zero odor.
          </p>
          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: brand.primaryNavy }}>
              Free Inspection &amp; Quote
            </span>
            <button
              type="button"
              className="px-3 py-1.5 text-xs font-bold text-white transition-all shadow-xs"
              style={{
                backgroundColor: brand.primaryNavy,
                borderRadius: brand.borderRadius,
              }}
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
