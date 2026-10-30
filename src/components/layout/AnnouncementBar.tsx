import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Shield } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { getTelLink } from '../../lib/whatsapp';

export const AnnouncementBar: React.FC = () => {
  const { config } = useSiteConfig();
  const bar = config.homepage.announcement;
  const show = config.homepage.sectionVisibility.announcementBar && bar.enabled;

  if (!show) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#102332] text-white text-xs py-2 px-4 border-b border-[#183247]/60">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#C3A16A] shrink-0" />
          <span className="font-medium tracking-wide text-stone-200">
            {bar.text}
          </span>
          {bar.emergencyNote && (
            <span className="hidden sm:inline-block bg-[#A98250]/20 text-[#DFBA7E] text-[11px] px-2 py-0.5 rounded border border-[#A98250]/40">
              {bar.emergencyNote}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {bar.showPhone && config.business.primaryPhone && (
            <a
              href={getTelLink(config.business.primaryPhone)}
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#DFBA7E] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C3A16A]" />
              <span className="font-semibold tabular-nums">{config.business.primaryPhone}</span>
            </a>
          )}

          {bar.linkText && bar.linkUrl && (
            <Link
              to={bar.linkUrl}
              className="inline-flex items-center gap-1 text-[#DFBA7E] hover:text-white font-medium transition-colors"
            >
              <span>{bar.linkText}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};
