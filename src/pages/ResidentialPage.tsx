import React from 'react';
import { ShieldCheck, CheckCircle2, Home, Utensils, Bed, ShieldAlert } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { QuoteRequestForm } from '../components/forms/QuoteRequestForm';
import { ServiceCard } from '../components/services/ServiceCard';

export const ResidentialPage: React.FC = () => {
  const { config } = useSiteConfig();
  const residentialServices = config.services.filter(
    (s) => s.published && (s.category === 'residential' || s.category === 'both')
  );

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Header */}
      <section className="bg-[#183247] text-white py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA7E] mb-2 block">
            Residential Pest Management
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Safe & Clean Pest Control for Your Home
          </h1>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            Eliminating kitchen cockroaches, bedroom bed bugs, termites, and household pests with odorless, family-safe active ingredients and zero mess.
          </p>
        </div>
      </section>

      {/* Household Zones Breakdown */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#183247]">
              Protecting Every Corner of Your Living Space
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Different rooms harbor different pests. We customize our treatment methods room-by-room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Kitchen & Dining</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Odorless synthetic gel baiting behind cabinet hinges and refrigerators. No need to empty pots or groceries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Bed className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Bedrooms & Wardrobes</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Specialized two-round bed bug eradication targeting mattress tufts, headboards, and silverfish closet treatment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Doors & Woodwork</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Subterranean termite chemical barrier injection along door frames and skirting boards with seamless color hole sealing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Balconies & Drains</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Larvicidal drainage treatments and perimeter residual spraying to prevent mosquitoes, flies, and drain flies from entering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Services Grid & Quote Form */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-[#183247] mb-6">
                Recommended Residential Packages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {residentialServices.slice(0, 4).map((srv) => (
                  <ServiceCard key={srv.id} service={srv} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <QuoteRequestForm
                defaultPropertyType="Residential"
                title="Get a Home Pest Control Quote"
                subtitle="Select your residential problem and our technician will contact you with package pricing."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
