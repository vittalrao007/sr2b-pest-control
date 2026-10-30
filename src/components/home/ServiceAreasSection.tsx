import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';

export const ServiceAreasSection: React.FC = () => {
  const { config } = useSiteConfig();
  const show = config.homepage.sectionVisibility.serviceAreasSection;
  const publishedAreas = config.serviceAreas.filter((a) => a.published);

  if (!show) return null;

  return (
    <section className="py-16 sm:py-20 bg-[#F1F3F4]/60 border-t border-[#E0E5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
            Operational Locations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
            Cities & Service Areas We Cover
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Local technician dispatch across primary operating zones with prompt appointment scheduling.
          </p>
        </div>

        {publishedAreas.length === 0 ? (
          <div className="bg-white rounded-xl p-8 border border-stone-200 text-center max-w-lg mx-auto">
            <MapPin className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-stone-700">Service Areas Not Yet Published</h4>
            <p className="text-xs text-stone-500 mt-1">
              Update your service areas from the Config dashboard to display operational cities and neighborhoods.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedAreas.map((area) => (
              <div
                key={area.id}
                className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-[#C3A16A] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#183247]/5 text-[#A98250] flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-[#183247]">{area.cityName}</h3>
                    </div>
                    <span className="text-[11px] font-semibold text-stone-500">{area.state}</span>
                  </div>

                  {area.description && (
                    <p className="text-xs text-stone-600 mb-4 leading-relaxed">{area.description}</p>
                  )}

                  {area.neighborhoods?.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                        Covered Localities:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {area.neighborhoods.map((nh, i) => (
                          <span
                            key={i}
                            className="text-xs text-stone-700 bg-stone-100 px-2 py-0.5 rounded-sm"
                          >
                            {nh}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#218653] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Technician Available</span>
                  </span>

                  <Link
                    to={`/contact?location=${encodeURIComponent(area.cityName)}`}
                    className="text-xs font-bold text-[#183247] hover:text-[#A98250] inline-flex items-center gap-1"
                  >
                    <span>Check Availability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/service-areas"
            className="text-xs sm:text-sm font-bold text-[#183247] hover:text-[#A98250] inline-flex items-center gap-1.5"
          >
            <span>View Full Coverage Information & Pin Codes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
