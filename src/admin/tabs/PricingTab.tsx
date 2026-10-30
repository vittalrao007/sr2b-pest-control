import React from 'react';
import { SiteConfig, PricingOffer } from '../../types/config';
import { Plus, Trash2, Tag, Eye, EyeOff } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const PricingTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const pricing = formData.pricing;
  const offers = pricing.offers || [];

  const handleAddOffer = () => {
    const newOffer: PricingOffer = {
      id: 'offer-' + Date.now(),
      title: 'Monsoon Protection Special',
      discountNote: 'Flat 15% Off',
      description: 'Termite and cockroach dual home combo package.',
      validTill: 'Limited Period',
      published: true,
    };
    updateField('pricing.offers', [...offers, newOffer]);
  };

  const handleUpdateOffer = (index: number, updated: PricingOffer) => {
    const list = [...offers];
    list[index] = updated;
    updateField('pricing.offers', list);
  };

  const handleDeleteOffer = (index: number) => {
    const list = offers.filter((_, i) => i !== index);
    updateField('pricing.offers', list);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-[#183247]">Pricing Visibility & Promotional Offers</h3>
        <p className="text-xs text-stone-500">
          Control public display of prices in Indian Rupees (₹) and configure seasonal promotional packages.
        </p>
      </div>

      {/* Pricing Master Toggle */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#183247]">Public Price Display</h4>
            <p className="text-xs text-stone-500">
              When disabled, all service cards and detail pages hide numeric prices and show "Request a Quote" instead.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pricing.showPublicPricing}
              onChange={(e) => updateField('pricing.showPublicPricing', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#183247]"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Currency Symbol</label>
            <input
              type="text"
              value={pricing.currencySymbol}
              onChange={(e) => updateField('pricing.currencySymbol', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Currency Code</label>
            <input
              type="text"
              value={pricing.currencyCode}
              onChange={(e) => updateField('pricing.currencyCode', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">Pricing Disclaimer</label>
          <textarea
            rows={2}
            value={pricing.disclaimer}
            onChange={(e) => updateField('pricing.disclaimer', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
          />
        </div>
      </div>

      {/* Promotional Offers CRUD */}
      <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#183247]">Seasonal Promotional Offers</h4>
            <p className="text-xs text-stone-500">Highlighted discounts displayed on quote forms and banners.</p>
          </div>

          <button
            onClick={handleAddOffer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Offer</span>
          </button>
        </div>

        <div className="space-y-4 pt-2">
          {offers.map((offer, index) => (
            <div key={offer.id || index} className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#A98250]" />
                  <span className="text-xs font-bold text-[#183247]">Offer #{index + 1}</span>
                </div>
                <button
                  onClick={() => handleDeleteOffer(index)}
                  className="p-1 text-red-500 hover:text-red-700 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Offer Title</label>
                  <input
                    type="text"
                    value={offer.title}
                    onChange={(e) => handleUpdateOffer(index, { ...offer, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Discount Tag</label>
                  <input
                    type="text"
                    value={offer.discountNote || ''}
                    placeholder="e.g. 20% Off"
                    onChange={(e) => handleUpdateOffer(index, { ...offer, discountNote: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-0.5">Offer Details</label>
                <input
                  type="text"
                  value={offer.description}
                  onChange={(e) => handleUpdateOffer(index, { ...offer, description: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
