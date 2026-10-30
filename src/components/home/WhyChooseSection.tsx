import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

export const WhyChooseSection: React.FC = () => {
  const { config } = useSiteConfig();
  const hp = config.homepage;
  const show = hp.sectionVisibility.whyChooseUs;

  if (!show) return null;

  return (
    <section className="py-16 sm:py-20 bg-[#F1F3F4]/50 border-y border-[#E0E5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
            Our Service Standards
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
            {hp.whyChooseHeading}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            {hp.whyChooseDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {hp.whyPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-[#183247] text-[#DFBA7E] flex items-center justify-center shrink-0 font-mono text-sm font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#183247]">{point.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
