import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../lib/whatsapp';

export const ServiceAreasPage: React.FC = () => {
  const { config } = useSiteConfig();
  const publishedAreas = config.serviceAreas.filter((a) => a.published);

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(
        config.business.whatsappNumber,
        `Hello ${config.business.name}, I want to check if you service my locality.`
      )
    : '';

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Header */}
      <section className="bg-[#183247] text-white py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA7E] mb-2 block">
            Operational Reach
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Service Areas & Locations Covered
          </h1>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            Our local technician hubs provide rapid inspection and pest treatment across verified residential and commercial territories.
          </p>
        </div>
      </section>

      {/* Main Coverage Grid */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {publishedAreas.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-md mx-auto">
              <MapPin className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#183247]">No Service Areas Configured</h3>
              <p className="text-xs text-stone-500 mt-1">
                Please add operational cities and neighborhoods in the Admin Config dashboard.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {publishedAreas.map((area) => (
                <div
                  key={area.id}
                  className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 shadow-xs hover:border-[#C3A16A] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#A98250]" />
                        <h2 className="text-xl sm:text-2xl font-bold text-[#183247]">
                          {area.cityName}
                        </h2>
                        <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-sm">
                          {area.state}
                        </span>
                      </div>
                      {area.description && (
                        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                          {area.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        to={`/contact?location=${encodeURIComponent(area.cityName)}`}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg transition-colors shadow-xs"
                      >
                        Book in {area.cityName}
                      </Link>
                    </div>
                  </div>

                  {/* Neighborhoods list */}
                  {area.neighborhoods && area.neighborhoods.length > 0 && (
                    <div className="pt-6">
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                        Neighborhoods & Localities Served:
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {area.neighborhoods.map((nh, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 hover:bg-stone-100 px-3 py-2 rounded-md border border-stone-200/60 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#218653] shrink-0" />
                            <span className="truncate">{nh}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Location Verification Callout */}
          <div className="mt-12 bg-white rounded-xl border border-stone-200 p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-[#183247] mb-2">Don't See Your Specific Locality?</h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 max-w-xl mx-auto leading-relaxed">
              We frequently expand our coverage and provide special dispatch for residential societies and commercial facilities nearby. Contact our dispatch team to confirm technician availability.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {config.business.primaryPhone && (
                <a
                  href={getTelLink(config.business.primaryPhone)}
                  className="px-4 py-2.5 text-xs font-bold text-[#183247] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#A98250]" />
                  <span>Call Dispatch: {config.business.primaryPhone}</span>
                </a>
              )}

              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-bold text-[#218653] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
