import React from 'react';
import { SiteConfig } from '../../types/config';
import { Eye, EyeOff } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const HomepageTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const hp = formData.homepage;
  const vis = hp.sectionVisibility;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Homepage Content & Section Visibility</h3>
        <p className="text-xs text-stone-500">
          Toggle individual homepage sections on/off and edit headlines, banners, and call-to-actions.
        </p>
      </div>

      {/* Section Visibility Switches */}
      <div className="p-5 bg-white rounded-xl border border-stone-200">
        <h4 className="text-sm font-bold text-[#183247] mb-3">Homepage Section Visibility Toggles</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: 'announcementBar', label: 'Top Announcement Bar' },
            { key: 'trustStrip', label: 'Four Benefits Trust Strip' },
            { key: 'aboutSection', label: 'About Company Section' },
            { key: 'servicesGrid', label: 'Services Grid' },
            { key: 'whyChooseUs', label: 'Why Choose SR2B Section' },
            { key: 'processSection', label: '4-Step Process Section' },
            { key: 'residentialPromo', label: 'Residential Promo Section' },
            { key: 'commercialPromo', label: 'Commercial Promo Section' },
            { key: 'serviceAreasSection', label: 'Service Areas Grid' },
            { key: 'testimonialsSection', label: 'Customer Testimonials' },
            { key: 'faqSection', label: 'FAQ Accordion' },
            { key: 'finalCtaBanner', label: 'Final Bottom CTA Banner' },
            { key: 'stickyMobileBar', label: 'Mobile Sticky Bottom Bar' },
          ].map(({ key, label }) => {
            const isVisible = (vis as any)[key];
            return (
              <label
                key={key}
                className={`flex items-center justify-between p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                  isVisible
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-stone-50 border-stone-200 text-stone-400'
                }`}
              >
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => updateField(`homepage.sectionVisibility.${key}`, e.target.checked)}
                  className="rounded text-[#183247] focus:ring-[#A98250]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Announcement Bar Settings */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <h4 className="text-sm font-bold text-[#183247]">Top Announcement Bar</h4>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Announcement Message</label>
          <input
            type="text"
            value={hp.announcement.text}
            onChange={(e) => updateField('homepage.announcement.text', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Emergency Tag Note</label>
            <input
              type="text"
              value={hp.announcement.emergencyNote || ''}
              onChange={(e) => updateField('homepage.announcement.emergencyNote', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
            />
          </div>
          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
              <input
                type="checkbox"
                checked={hp.announcement.showPhone}
                onChange={(e) => updateField('homepage.announcement.showPhone', e.target.checked)}
                className="rounded text-[#183247] focus:ring-[#A98250]"
              />
              <span>Display Business Phone in Announcement Bar</span>
            </label>
          </div>
        </div>
      </div>

      {/* Hero Section Settings */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <h4 className="text-sm font-bold text-[#183247]">Hero Header Section</h4>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Eyebrow Trust Badge</label>
          <input
            type="text"
            value={hp.hero.eyebrow}
            onChange={(e) => updateField('homepage.hero.eyebrow', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Main Hero Headline</label>
          <input
            type="text"
            value={hp.hero.headline}
            onChange={(e) => updateField('homepage.hero.headline', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Supporting Description</label>
          <textarea
            rows={2}
            value={hp.hero.description}
            onChange={(e) => updateField('homepage.hero.description', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Primary CTA Label</label>
            <input
              type="text"
              value={hp.hero.primaryCtaText}
              onChange={(e) => updateField('homepage.hero.primaryCtaText', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Hero Image Path or URL</label>
            <input
              type="text"
              value={hp.hero.imageUrl}
              onChange={(e) => updateField('homepage.hero.imageUrl', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A98250] focus:outline-hidden font-mono"
            />
          </div>
        </div>
      </div>

      {/* About & Why Choose Section Text */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <h4 className="text-sm font-bold text-[#183247]">About & Why Choose SR2B Copywriting</h4>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">About Section Heading</label>
          <input
            type="text"
            value={hp.aboutHeading}
            onChange={(e) => updateField('homepage.aboutHeading', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">About Company Description</label>
          <textarea
            rows={2}
            value={hp.aboutDescription}
            onChange={(e) => updateField('homepage.aboutDescription', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Final Bottom CTA Heading</label>
          <input
            type="text"
            value={hp.finalCtaHeading}
            onChange={(e) => updateField('homepage.finalCtaHeading', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300"
          />
        </div>
      </div>
    </div>
  );
};
