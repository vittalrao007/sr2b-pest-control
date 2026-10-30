import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Check } from 'lucide-react';
import { ServiceItem } from '../../types/config';
import { useSiteConfig } from '../../context/ConfigContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage } from '../../lib/whatsapp';
import { DynamicIcon } from '../common/DynamicIcon';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { config } = useSiteConfig();
  const showPricing = config.pricing.showPublicPricing && service.startingPrice !== undefined && service.startingPrice > 0;

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(
        config.business.whatsappNumber,
        getServiceWhatsAppMessage(config.business.name, service.name)
      )
    : '';

  return (
    <div className="bg-white rounded-xl border border-[#E0E5E9] hover:border-[#C3A16A] shadow-xs hover:shadow-md transition-all flex flex-col h-full overflow-hidden group">
      {/* Visual Header */}
      <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
        <img
          src={service.imageUrl || '/src/assets/images/residential_home_treatment_1793023758657.jpg'}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/residential_home_treatment_1793023758657.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Quiet unboxed kicker or badge */}
        {service.badge && (
          <div className="absolute top-3 left-3 bg-[#183247]/90 text-[#DFBA7E] text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-xs">
            {service.badge}
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-200">
            <DynamicIcon name={service.iconName} className="w-4 h-4 text-[#DFBA7E]" />
            <span>{service.category === 'both' ? 'Residential & Commercial' : service.category === 'residential' ? 'Residential' : 'Commercial'}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#183247] group-hover:text-[#A98250] transition-colors">
            <Link to={`/services/${service.slug}`}>{service.name}</Link>
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-3 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Pricing indicator if available */}
          {showPricing && (
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-baseline gap-1.5">
              <span className="text-xs text-stone-400">Starting at</span>
              <span className="text-base font-extrabold text-[#183247] tabular-nums">
                {config.pricing.currencySymbol}
                {service.startingPrice?.toLocaleString('en-IN')}
              </span>
              {service.pricingUnit && (
                <span className="text-[11px] text-stone-500">/ {service.pricingUnit}</span>
              )}
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs font-bold text-[#183247] hover:text-[#A98250] inline-flex items-center gap-1 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-1.5">
            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#218653] hover:bg-emerald-50 rounded-md transition-colors"
                title={`Inquire about ${service.name} on WhatsApp`}
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            )}

            <Link
              to={`/contact?service=${encodeURIComponent(service.name)}`}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-md transition-colors whitespace-nowrap"
            >
              Request Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
