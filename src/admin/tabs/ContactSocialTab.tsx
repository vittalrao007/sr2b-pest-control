import React from 'react';
import { SiteConfig } from '../../types/config';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const ContactSocialTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const social = formData.social || {};

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Contact Links & Social Media Channels</h3>
        <p className="text-xs text-stone-500">
          Configure social channels and maps links. Icons are automatically hidden if empty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Facebook Page URL</label>
          <input
            type="url"
            value={social.facebook || ''}
            placeholder="https://facebook.com/your-page"
            onChange={(e) => updateField('social.facebook', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Instagram Profile URL</label>
          <input
            type="url"
            value={social.instagram || ''}
            placeholder="https://instagram.com/your-handle"
            onChange={(e) => updateField('social.instagram', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">LinkedIn Company Page URL</label>
          <input
            type="url"
            value={social.linkedin || ''}
            placeholder="https://linkedin.com/company/your-brand"
            onChange={(e) => updateField('social.linkedin', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">YouTube Channel URL</label>
          <input
            type="url"
            value={social.youtube || ''}
            placeholder="https://youtube.com/@your-channel"
            onChange={(e) => updateField('social.youtube', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">
          Google Maps / Google Business Profile URL
        </label>
        <input
          type="url"
          value={formData.business.googleMapsUrl || ''}
          placeholder="https://maps.google.com/?cid=..."
          onChange={(e) => updateField('business.googleMapsUrl', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
        />
      </div>
    </div>
  );
};
