import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { QuoteRequestForm } from '../components/forms/QuoteRequestForm';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../lib/whatsapp';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { ServiceCard } from '../components/services/ServiceCard';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { config } = useSiteConfig();

  const service = config.services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const showPricing = config.pricing.showPublicPricing && service.startingPrice !== undefined && service.startingPrice > 0;

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(
        config.business.whatsappNumber,
        getServiceWhatsAppMessage(config.business.name, service.name)
      )
    : '';

  const relatedServices = config.services
    .filter((s) => s.published && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#183247] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link to="/services" className="hover:text-[#183247] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-[#183247]">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Service Specific Hero Banner */}
      <section className="bg-[#183247] text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFBA7E] text-xs font-semibold border border-white/15">
                <DynamicIcon name={service.iconName} className="w-3.5 h-3.5" />
                <span>
                  {service.category === 'both'
                    ? 'Residential & Commercial Solution'
                    : service.category === 'residential'
                    ? 'Residential Specialized Treatment'
                    : 'Commercial Pest Protocol'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
                {service.fullDescription || service.shortDescription}
              </p>

              {/* Price Banner */}
              {showPricing && (
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-xs text-stone-400">Starting package:</span>
                  <span className="text-2xl font-extrabold text-[#DFBA7E] tabular-nums">
                    {config.pricing.currencySymbol}
                    {service.startingPrice?.toLocaleString('en-IN')}
                  </span>
                  {service.pricingUnit && (
                    <span className="text-xs text-stone-400">/ {service.pricingUnit}</span>
                  )}
                </div>
              )}

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#quote-form"
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-[#183247] bg-[#DFBA7E] hover:bg-[#C3A16A] rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Request Instant Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-400 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-xl aspect-16/10 lg:aspect-4/3 bg-stone-900">
                <img
                  src={service.imageUrl || '/src/assets/images/residential_home_treatment_1793023758657.jpg'}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Quote Form Split */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left 7 Columns: Detailed Service Information */}
            <div className="lg:col-span-7 space-y-10">
              {/* Common Signs */}
              {service.commonSigns && service.commonSigns.length > 0 && (
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-4 text-[#183247]">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h2 className="text-lg sm:text-xl font-bold">
                      Common Signs You Need {service.name}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {service.commonSigns.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A98250] mt-2 shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatment Steps / How It Works */}
              {service.treatmentSteps && service.treatmentSteps.length > 0 && (
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-5 text-[#183247]">
                    <ShieldCheck className="w-5 h-5 text-[#218653]" />
                    <h2 className="text-lg sm:text-xl font-bold">
                      Our Treatment Protocol & Methodology
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {service.treatmentSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#183247] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prevention Tips */}
              {service.preventionTips && service.preventionTips.length > 0 && (
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
                  <h2 className="text-lg sm:text-xl font-bold text-[#183247] mb-4">
                    Prevention & Hygiene Recommendations
                  </h2>
                  <div className="space-y-3">
                    {service.preventionTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#A98250] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Specific FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-2xs">
                  <h2 className="text-lg sm:text-xl font-bold text-[#183247] mb-4">
                    Frequently Asked Questions About {service.name}
                  </h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b border-stone-100 pb-3.5 last:border-0 last:pb-0">
                        <h3 className="text-sm font-bold text-[#183247] mb-1.5">{faq.question}</h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Sticky Quote Form */}
            <div className="lg:col-span-5" id="quote-form">
              <div className="sticky top-28">
                <QuoteRequestForm
                  defaultService={service.name}
                  title={`Request ${service.name} Quote`}
                  subtitle="Provide your address details to book a technician or receive a custom quote."
                />

                {/* Direct Call Assistance Box */}
                {config.business.primaryPhone && (
                  <div className="mt-4 p-4 rounded-xl bg-[#183247] text-white flex items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-xs font-bold text-[#DFBA7E]">Prefer to speak directly?</div>
                      <div className="text-sm font-extrabold">{config.business.primaryPhone}</div>
                    </div>
                    <a
                      href={getTelLink(config.business.primaryPhone)}
                      className="px-3.5 py-2 text-xs font-bold text-[#183247] bg-white rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-14 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#183247] mb-8">
              Other Pest Solutions You May Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.id} service={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
