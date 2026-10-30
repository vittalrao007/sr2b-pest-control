import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, HeartHandshake, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';

export const AboutPage: React.FC = () => {
  const { config } = useSiteConfig();
  const { business, homepage } = config;

  return (
    <div className="bg-[#F8F6F1]">
      {/* Page Hero */}
      <section className="bg-[#183247] text-white py-14 lg:py-20 border-b border-[#102332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA7E] mb-2 block">
            About {business.name}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Scientific, Safe & Systematic Pest Management
          </h1>
          <p className="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed">
            Protecting residential homes and commercial institutions across India through precision inspection, targeted treatment protocols, and lasting prevention.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Company Narrative */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183247] tracking-tight">
                Your Trusted Partner in Hygiene & Pest Control
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {homepage.aboutDescription}
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {homepage.aboutMission}
              </p>

              <div className="pt-2">
                <div className="p-4 bg-white rounded-xl border border-stone-200">
                  <h4 className="text-sm font-bold text-[#183247] mb-1">Our Integrated Pest Management (IPM) Commitment</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    We emphasize exclusion and sanitation recommendations first, applying chemical controls with micro-dosed precision to minimize unnecessary pesticide exposure while maximizing extermination efficacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-4/3 bg-stone-100">
                <img
                  src="/src/assets/images/commercial_pest_inspection_1793023759212.jpg"
                  alt="Certified pest management technician at commercial property"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E0E5E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
              Operational Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
              Values That Guide Every Service Visit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#F8F6F1] border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#183247] text-[#DFBA7E] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Safety & Compliance</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We strictly use formulations approved by the Central Insecticides Board (CIB) and respect food-safety standards in restaurant and kitchen spaces.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F6F1] border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#183247] text-[#DFBA7E] flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Precision Diagnosis</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Rather than blind perimeter spray, we use specialized inspection tools to trace termite mud-tubes, rodent runs, and roach nests to the exact source.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8F6F1] border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#183247] text-[#DFBA7E] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#183247] mb-2">Customer Transparency</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Clear upfront pricing, honest expectations regarding treatment timelines, and comprehensive written follow-up guidance for lasting protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-[#183247] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Protect Your Space Today</h2>
          <p className="text-sm text-stone-300 mb-6">
            Contact our technicians to discuss your pest problem or schedule an on-site property inspection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 text-sm font-bold text-[#183247] bg-[#DFBA7E] hover:bg-[#C3A16A] rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Request Inspection & Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
