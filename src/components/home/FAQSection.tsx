import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage } from '../../lib/whatsapp';

export const FAQSection: React.FC = () => {
  const { config } = useSiteConfig();
  const show = config.homepage.sectionVisibility.faqSection;
  const faqs = config.faqs.filter((f) => f.published).sort((a, b) => a.sortOrder - b.sortOrder);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!show || faqs.length === 0) return null;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(
        config.business.whatsappNumber,
        `Hello ${config.business.name}, I have a question regarding pest treatment that is not listed in your FAQ.`
      )
    : '';

  return (
    <section className="py-16 sm:py-20 bg-[#F8F6F1] border-t border-[#E0E5E9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
            Help & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-stone-500 mt-2">
            Answers to common questions about treatment safety, preparation, and follow-up schedules.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#183247] hover:text-[#A98250] focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#A98250]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp support assist banner */}
        {whatsAppUrl && (
          <div className="mt-8 p-4 bg-white rounded-xl border border-emerald-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#183247]">Have a specific question not covered here?</h4>
                <p className="text-[11px] sm:text-xs text-stone-500">Our technical team is ready to assist you on WhatsApp.</p>
              </div>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#218653] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Our Specialist</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
