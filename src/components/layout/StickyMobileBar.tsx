import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, ClipboardList } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../../lib/whatsapp';

export const StickyMobileBar: React.FC = () => {
  const { config } = useSiteConfig();
  const isVisible = config.homepage.sectionVisibility.stickyMobileBar;

  if (!isVisible) return null;

  const phone = config.business.primaryPhone;
  const whatsapp = config.business.whatsappNumber;
  const whatsAppUrl = whatsapp
    ? formatWhatsAppUrl(whatsapp, getServiceWhatsAppMessage(config.business.name))
    : '';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 text-center">
        {phone ? (
          <a
            href={getTelLink(phone)}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#183247] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#A98250] mb-0.5" />
            <span className="text-[11px] font-bold">Call Now</span>
          </a>
        ) : (
          <div className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-stone-50 text-stone-400">
            <Phone className="w-4 h-4 mb-0.5" />
            <span className="text-[11px]">Call</span>
          </div>
        )}

        {whatsAppUrl ? (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#218653] border border-emerald-200 transition-colors"
          >
            <MessageSquare className="w-4 h-4 mb-0.5" />
            <span className="text-[11px] font-bold">WhatsApp</span>
          </a>
        ) : (
          <div className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-stone-50 text-stone-400">
            <MessageSquare className="w-4 h-4 mb-0.5" />
            <span className="text-[11px]">Chat</span>
          </div>
        )}

        <Link
          to="/contact"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#183247] hover:bg-[#102332] text-white shadow-xs transition-colors"
        >
          <ClipboardList className="w-4 h-4 text-[#DFBA7E] mb-0.5" />
          <span className="text-[11px] font-bold">Free Quote</span>
        </Link>
      </div>
    </div>
  );
};
