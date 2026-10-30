import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

export const CommercialSection: React.FC = () => {
  const { config } = useSiteConfig();
  const hp = config.homepage;
  const show = hp.sectionVisibility.commercialPromo;

  if (!show) return null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E0E5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-lg aspect-4/3 bg-stone-100">
              <img
                src="/src/assets/images/commercial_pest_inspection_1793023759212.jpg"
                alt="Professional pest technician in commercial kitchen environment"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 text-xs text-stone-700">
                <span className="font-bold text-[#183247] block mb-0.5">Audit-Ready Documentation</span>
                Full service logbook maintenance, trend analysis, and bait map diagrams for health authority inspections.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
              Enterprise & Business Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] tracking-tight">
              {hp.commercialHeading}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {hp.commercialDescription}
            </p>

            <div className="space-y-3 pt-2">
              {hp.commercialPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#183247] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-stone-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/commercial"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg shadow-sm transition-all"
              >
                <span>Request a Commercial Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
