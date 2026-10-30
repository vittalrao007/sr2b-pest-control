import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';

export const TermsPage: React.FC = () => {
  const { config } = useSiteConfig();
  const businessName = config.business.name || 'SR2B Pest Control';

  return (
    <div className="bg-[#F8F6F1] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-stone-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold text-[#A98250] uppercase tracking-wider">Terms of Engagement</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#183247] mt-1">Terms of Service</h1>
            <p className="text-xs text-stone-400 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="prose prose-stone text-xs sm:text-sm leading-relaxed space-y-4 text-stone-700">
            <h3 className="text-base font-bold text-[#183247]">1. Service Scope & Inspections</h3>
            <p>
              {businessName} delivers pest management and prevention services based on physical site inspection findings. Quoted rates on the website are baseline estimates; final contractual charges depend on property area, infestation severity, and selected chemical treatment protocols.
            </p>

            <h3 className="text-base font-bold text-[#183247]">2. Customer Preparation & Safety</h3>
            <p>
              Clients agree to follow the safety and preparation instructions provided by our technicians prior to and following treatment visits. This includes adhering to advised re-entry times for specific aerosolized formulations and maintaining advised kitchen sanitation practices.
            </p>

            <h3 className="text-base font-bold text-[#183247]">3. Warranty & Follow-up Protocols</h3>
            <p>
              Warranty coverage and complimentary follow-up visits apply strictly to specified packages (such as Termite Drilling AMC or 2-visit Bed Bug contracts) as outlined on the written service invoice. Warranty terms become void if structural alterations expose untreated substrates or if recommended hygiene measures are disregarded.
            </p>

            <h3 className="text-base font-bold text-[#183247]">4. Payment Terms</h3>
            <p>
              Payment for one-time treatments is due upon completion of the service visit. Annual Maintenance Contracts (AMC) are governed by the payment schedule specified in the written agreement.
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
