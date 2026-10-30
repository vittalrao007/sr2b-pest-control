import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

export const AboutSection: React.FC = () => {
  const { config } = useSiteConfig();
  const hp = config.homepage;
  const show = hp.sectionVisibility.aboutSection;

  if (!show) return null;

  return (
    <section className="py-16 sm:py-20 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-4/3 bg-stone-100">
              <img
                src="/src/assets/images/termite_inspection_specialist_1793023759661.jpg"
                alt="Pest inspection specialist at work"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {config.business.licenseNumber && (
              <div className="absolute -bottom-4 right-4 bg-white border border-[#C3A16A]/50 rounded-lg p-3 shadow-md flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#A98250]" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Registered Entity</div>
                  <div className="text-xs font-bold text-[#183247]">{config.business.licenseNumber}</div>
                </div>
              </div>
            )}
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
                Company Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
                {hp.aboutHeading}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {hp.aboutDescription}
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {hp.aboutMission}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#A98250] shrink-0 mt-0.5" />
                <span>Non-invasive moisture & termite inspection</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#A98250] shrink-0 mt-0.5" />
                <span>Zero downtime odorless kitchen baiting</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#A98250] shrink-0 mt-0.5" />
                <span>Residential flats & commercial premises</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#A98250] shrink-0 mt-0.5" />
                <span>Transparent quotation without hidden charges</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#183247] hover:text-[#A98250] transition-colors group"
              >
                <span>Learn more about our service philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
