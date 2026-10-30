import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../../lib/whatsapp';

export const FinalCTASection: React.FC = () => {
  const { config } = useSiteConfig();
  const hp = config.homepage;
  const show = hp.sectionVisibility.finalCtaBanner;

  if (!show) return null;

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(config.business.whatsappNumber, getServiceWhatsAppMessage(config.business.name))
    : '';

  return (
    <section className="py-16 sm:py-20 bg-[#183247] text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#DFBA7E_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFBA7E] text-xs font-semibold mb-4 border border-white/15">
          <ShieldCheck className="w-4 h-4" />
          <span>Professional Pest Relief Guaranteed</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
          {hp.finalCtaHeading}
        </h2>

        <p className="text-sm sm:text-base text-stone-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          {hp.finalCtaDescription}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-[#183247] bg-[#DFBA7E] hover:bg-[#C3A16A] active:scale-95 transition-all rounded-lg shadow-md inline-flex items-center justify-center gap-2"
          >
            <span>{hp.finalCtaButtonText || 'Request a Free Quotation'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {config.business.primaryPhone && (
            <a
              href={getTelLink(config.business.primaryPhone)}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#DFBA7E]" />
              <span>Call {config.business.primaryPhone}</span>
            </a>
          )}

          {whatsAppUrl && (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-[#218653] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-stone-400">
          Fast response times · Transparent upfront pricing · Odorless & child-safe options
        </div>
      </div>
    </section>
  );
};
