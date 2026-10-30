import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { config } = useSiteConfig();
  const businessName = config.business.name || 'SR2B Pest Control';

  return (
    <div className="bg-[#F8F6F1] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-stone-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-[#A98250] uppercase tracking-wider">Legal Document</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183247] mt-1">Privacy Policy</h1>
            <p className="text-xs text-stone-400 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
            <p>
              At {businessName}, we respect your personal privacy and are committed to protecting the contact and property details you share with us when requesting pest control inspections or services.
            </p>

            <h3 className="text-base font-bold text-[#183247] pt-2">1. Information We Collect</h3>
            <p>
              When you submit a quote request or contact us via our website, telephone, or WhatsApp, we collect information including your name, contact phone number, email address, property locality, and details regarding the pest infestation observed on your premises.
            </p>

            <h3 className="text-base font-bold text-[#183247] pt-2">2. Purpose of Collection</h3>
            <p>
              We collect this information solely to schedule property inspections, calculate service quotations, dispatch trained technicians to your location, and follow up regarding post-treatment satisfaction or warranty maintenance.
            </p>

            <h3 className="text-base font-bold text-[#183247] pt-2">3. Data Sharing & Security</h3>
            <p>
              We do not sell, rent, or trade your contact information with external marketing companies. Your contact details are accessible only by authorized administrative staff and assigned service technicians for the fulfillment of your request.
            </p>

            <h3 className="text-base font-bold text-[#183247] pt-2">4. Your Rights & Questions</h3>
            <p>
              You may contact us at any time at {config.business.email || 'our contact helpline'} to request the review, modification, or deletion of your saved enquiry details.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <Link to="/" className="text-xs font-bold text-[#183247] hover:underline">
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
