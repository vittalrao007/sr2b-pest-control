import React from 'react';
import { SiteConfig } from '../../types/config';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const BusinessInfoTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const b = formData.business;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Business Profile & Contact Information</h3>
        <p className="text-xs text-stone-500">
          These details are automatically reflected across header, footer, contact pages, and structured data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Business Name</label>
          <input
            type="text"
            value={b.name}
            onChange={(e) => updateField('business.name', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Short Name / Wordmark</label>
          <input
            type="text"
            value={b.shortName}
            onChange={(e) => updateField('business.shortName', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">Tagline</label>
        <input
          type="text"
          value={b.tagline}
          onChange={(e) => updateField('business.tagline', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">Business Description</label>
        <textarea
          rows={3}
          value={b.description}
          onChange={(e) => updateField('business.description', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Primary Operating City</label>
          <input
            type="text"
            value={b.primaryCity}
            onChange={(e) => updateField('business.primaryCity', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">State</label>
          <input
            type="text"
            value={b.state}
            onChange={(e) => updateField('business.state', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Country</label>
          <input
            type="text"
            value={b.country}
            onChange={(e) => updateField('business.country', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Physical Address</label>
          <input
            type="text"
            value={b.address}
            onChange={(e) => updateField('business.address', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Postal Code</label>
          <input
            type="text"
            value={b.postalCode}
            onChange={(e) => updateField('business.postalCode', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Business Email</label>
          <input
            type="email"
            value={b.email}
            onChange={(e) => updateField('business.email', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Primary Phone</label>
          <input
            type="text"
            value={b.primaryPhone}
            onChange={(e) => updateField('business.primaryPhone', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Secondary Phone (Optional)</label>
          <input
            type="text"
            value={b.secondaryPhone || ''}
            onChange={(e) => updateField('business.secondaryPhone', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            WhatsApp Number (e.g. 916362953619 without + or spaces)
          </label>
          <input
            type="text"
            value={b.whatsappNumber}
            onChange={(e) => updateField('business.whatsappNumber', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Govt. License / Registration Number
          </label>
          <input
            type="text"
            value={b.licenseNumber || ''}
            onChange={(e) => updateField('business.licenseNumber', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1">Business Hours</label>
        <input
          type="text"
          value={b.businessHours}
          onChange={(e) => updateField('business.businessHours', e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
        />
      </div>
    </div>
  );
};
