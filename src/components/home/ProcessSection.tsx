import React from 'react';
import { useSiteConfig } from '../../context/ConfigContext';
import { DynamicIcon } from '../common/DynamicIcon';

export const ProcessSection: React.FC = () => {
  const { config } = useSiteConfig();
  const show = config.homepage.sectionVisibility.processSection;
  const steps = config.processSteps;

  if (!show || !steps || steps.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
            Systematic Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
            How Our Service Works
          </h2>
          <p className="text-sm sm:text-base text-stone-500 mt-2">
            A clear, four-stage protocol ensuring proper diagnosis, targeted application, and long-term prevention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.stepNumber} className="relative flex flex-col items-center text-center">
              {/* Step indicator circle */}
              <div className="w-14 h-14 rounded-2xl bg-[#F8F6F1] border-2 border-[#C3A16A]/50 text-[#183247] flex items-center justify-center mb-5 shadow-xs relative">
                <DynamicIcon name={step.iconName} className="w-6 h-6 text-[#A98250]" />
                <span className="absolute -top-2 -right-2 bg-[#183247] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {step.stepNumber}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#183247] mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
