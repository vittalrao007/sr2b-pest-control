import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { getTelLink } from '../../lib/whatsapp';

export const HeroSection: React.FC = () => {
  const { config } = useSiteConfig();
  const hero = config.homepage.hero;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#F8F6F1] to-[#F1F3F4]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#C3A16A]/40 shadow-xs text-xs font-semibold text-[#183247]">
              <ShieldCheck className="w-4 h-4 text-[#A98250]" />
              <span>{hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#183247] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              {hero.headline}
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#66727D] max-w-2xl leading-relaxed">
              {hero.description}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to={hero.primaryCtaLink || '/contact'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#183247] hover:bg-[#102332] active:scale-95 transition-all rounded-lg shadow-sm"
              >
                <span>{hero.primaryCtaText || 'Get a Free Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {config.business.primaryPhone && (
                <a
                  href={getTelLink(config.business.primaryPhone)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#183247] bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#A98250]" />
                  <span>Call {config.business.primaryPhone}</span>
                </a>
              )}
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#218653]" />
                <span>Odorless Gel Options</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#218653]" />
                <span>CIB Approved Formulations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#218653]" />
                <span>No Utensil Emptying Needed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl bg-stone-100 aspect-16/10 lg:aspect-4/3">
              <img
                src={hero.imageUrl || '/src/assets/images/hero_pest_technician_1793023757861.jpg'}
                alt="SR2B Pest Control Certified Technician inspecting home"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Benefit Card */}
            {hero.showCard && (
              <div className="absolute -bottom-6 -left-4 sm:left-4 sm:-bottom-5 bg-white/95 backdrop-blur-md border border-[#C3A16A]/40 rounded-xl p-4 shadow-lg max-w-[280px] sm:max-w-xs z-10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#A98250]/15 text-[#A98250] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#183247]">{hero.cardTitle}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">{hero.cardSubtitle}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
