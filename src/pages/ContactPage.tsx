import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { QuoteRequestForm } from '../components/forms/QuoteRequestForm';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../lib/whatsapp';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get('service') || undefined;
  const defaultLocation = searchParams.get('location') || undefined;

  const { config } = useSiteConfig();
  const { business } = config;

  const whatsAppUrl = business.whatsappNumber
    ? formatWhatsAppUrl(business.whatsappNumber, getServiceWhatsAppMessage(business.name, defaultService))
    : '';

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Header */}
      <section className="bg-[#183247] text-white py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA7E] mb-2 block">
            Customer Support & Dispatch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Contact & Quote Request
          </h1>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            Reach out via phone, WhatsApp, or submit an inspection request below. We respond promptly with clear guidance.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left 5 Columns: Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#183247] mb-1">Direct Contact Points</h2>
                  <p className="text-xs text-stone-500">Contact our customer desk directly during business hours.</p>
                </div>

                {/* Phone */}
                {business.primaryPhone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#183247]/5 text-[#A98250] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500">Customer Helpline</div>
                      <a
                        href={getTelLink(business.primaryPhone)}
                        className="text-base font-extrabold text-[#183247] hover:text-[#A98250] transition-colors tabular-nums"
                      >
                        {business.primaryPhone}
                      </a>
                      {business.secondaryPhone && (
                        <div className="text-xs text-stone-500 mt-0.5 tabular-nums">
                          Alt: {business.secondaryPhone}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {whatsAppUrl && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500">Instant WhatsApp Chat</div>
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#218653] hover:underline transition-colors block mt-0.5"
                      >
                        Chat with our technical team →
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {business.email && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#183247]/5 text-[#A98250] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500">Email Inquiries</div>
                      <a
                        href={`mailto:${business.email}`}
                        className="text-sm font-semibold text-[#183247] hover:underline transition-colors"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Business Hours */}
                {business.businessHours && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#183247]/5 text-[#A98250] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500">Operating Hours</div>
                      <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">
                        {business.businessHours}
                      </p>
                    </div>
                  </div>
                )}

                {/* Physical Hub Address */}
                {business.address && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#183247]/5 text-[#A98250] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-500">Operations Hub</div>
                      <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">
                        {business.address}
                      </p>
                    </div>
                  </div>
                )}

                {/* License Tag */}
                {business.licenseNumber && (
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#A98250] shrink-0" />
                    <span>{business.licenseNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right 7 Columns: Interactive Lead Capture Form */}
            <div className="lg:col-span-7">
              <QuoteRequestForm
                defaultService={defaultService}
                title="Book an Inspection or Quote"
                subtitle="Complete the form below and an SR2B pest specialist will review your request."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
