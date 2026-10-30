import React from 'react';
import { useSiteConfig } from '../../context/ConfigContext';
import { DynamicIcon } from '../common/DynamicIcon';

export const TrustBar: React.FC = () => {
  const { config } = useSiteConfig();
  const show = config.homepage.sectionVisibility.trustStrip;
  const benefits = config.benefits;

  if (!show || !benefits || benefits.length === 0) return null;

  return (
    <section className="bg-white border-y border-[#E0E5E9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#F8F6F1] border border-[#E0E5E9] text-[#A98250] flex items-center justify-center shrink-0">
                <DynamicIcon name={benefit.iconName} className="w-5 h-5 text-[#A98250]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#183247]">{benefit.title}</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
