import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

export const TestimonialsSection: React.FC = () => {
  const { config } = useSiteConfig();
  const show = config.homepage.sectionVisibility.testimonialsSection;
  const publishedTestimonials = config.testimonials.filter((t) => t.published);

  if (!show || publishedTestimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E0E5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
            Customer Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
            Client Experiences & Case Reviews
          </h2>
          <p className="text-sm sm:text-base text-stone-500 mt-2">
            Real feedback from verified residential and commercial clients across our service network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {publishedTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8F6F1] rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3 text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  "{t.reviewText}"
                </p>
              </div>

              {/* Author attribution (no pills, clean metadata) */}
              <div className="pt-4 border-t border-stone-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#183247]">{t.customerName}</h4>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <span>{t.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#A98250] font-medium">{t.serviceCategory}</span>
                    </div>
                  </div>

                  {t.verified && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#218653]" title="Verified Client">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
