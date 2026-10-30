import React from 'react';
import { SiteConfig } from '../../types/config';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const SEOTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const seo = formData.seo;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Search Engine Optimization (SEO) & Metadata</h3>
        <p className="text-xs text-stone-500">
          Configure page titles, meta descriptions, Open Graph preview images, and analytics IDs.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">Default Meta Title (HTML Title)</label>
        <input
          type="text"
          value={seo.metaTitle}
          onChange={(e) => updateField('seo.metaTitle', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">Default Meta Description</label>
        <textarea
          rows={3}
          value={seo.metaDescription}
          onChange={(e) => updateField('seo.metaDescription', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Open Graph Share Image URL</label>
          <input
            type="text"
            value={seo.ogImage}
            onChange={(e) => updateField('seo.ogImage', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Canonical Website URL</label>
          <input
            type="text"
            value={seo.canonicalUrl}
            onChange={(e) => updateField('seo.canonicalUrl', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Google Analytics Measurement ID (Optional)</label>
          <input
            type="text"
            value={seo.googleAnalyticsId || ''}
            placeholder="G-XXXXXXXXXX"
            onChange={(e) => updateField('seo.googleAnalyticsId', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Google Search Console Verification (Optional)</label>
          <input
            type="text"
            value={seo.googleSearchConsoleId || ''}
            placeholder="verification-token-string"
            onChange={(e) => updateField('seo.googleSearchConsoleId', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
          <input
            type="checkbox"
            checked={seo.enableRobotsIndexing}
            onChange={(e) => updateField('seo.enableRobotsIndexing', e.target.checked)}
            className="rounded text-[#183247]"
          />
          <span>Allow Search Engines to Index Website (robots.txt index, follow)</span>
        </label>
      </div>
    </div>
  );
};
