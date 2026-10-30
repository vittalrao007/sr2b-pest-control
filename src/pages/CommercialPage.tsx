import React from 'react';
import { Building2, UtensilsCrossed, Store, Warehouse, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { QuoteRequestForm } from '../components/forms/QuoteRequestForm';

export const CommercialPage: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Header */}
      <section className="bg-[#183247] text-white py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA7E] mb-2 block">
            Commercial Pest Management
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Enterprise & Commercial Pest Control
          </h1>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            Audit-ready pest management solutions for restaurants, corporate offices, warehouses, hospitality, and retail facilities across India.
          </p>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#183247]">
              Tailored Across Multiple Industry Sectors
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Pest regulations vary by sector. We adapt documentation, inspection cadences, and treatment chemistry accordingly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-4">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Restaurants & Food Services</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                FSSAI compliance documentation, non-toxic cockroach gel in prep zones, and electronic fly traps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Corporate & IT Offices</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Discreet weekend or after-hours treatments for cafeterias, server cabling chases, and restroom utility shafts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Warehouse className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Warehouses & Logistics</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                High-volume tamper-proof rodent baiting stations, bird deterrent netting, and pallet stock protection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Retail & Supermarkets</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Hygiene preservation for shelving units, dry-food storage aisles, and customer-facing premises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Compliance Highlights & Consultation Form */}
      <section className="py-14 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#183247]">
                Integrated Pest Management (IPM) for Commercial Facilities
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Commercial businesses cannot afford service failures or unrecorded chemical applications. Our commercial accounts include structured reporting, assigned account managers, and verifiable service proof.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#A98250] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#183247]">Site Inspection Logs & Trend Reports</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Detailed logbooks recording date of visit, chemical batch numbers, bait station activity, and pest trend logs for hygiene auditors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#A98250] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#183247]">Discreet Non-Operational Scheduling</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      We schedule technician visits late evening, early morning, or Sundays to prevent business disruption or patron discomfort.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#A98250] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#183247]">Rapid Emergency Callout Guarantee</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Commercial contract holders receive prioritized dispatch when sudden pest sightings threaten operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <QuoteRequestForm
                defaultPropertyType="Commercial"
                defaultService="Commercial Pest Management"
                title="Request a Commercial Consultation"
                subtitle="Provide your facility location and business type for a tailored site survey."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
