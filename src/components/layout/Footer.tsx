import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, Settings } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../../lib/whatsapp';

export const Footer: React.FC = () => {
  const { config } = useSiteConfig();
  const currentYear = new Date().getFullYear();

  const publishedServices = config.services.filter((s) => s.published).slice(0, 6);

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(config.business.whatsappNumber, getServiceWhatsAppMessage(config.business.name))
    : '';

  return (
    <footer className="bg-[#102332] text-stone-300 pt-16 pb-12 border-t border-[#183247]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="bg-white p-2.5 rounded-lg inline-block">
              <img
                src={config.branding.logoUrl || '/assets/sr2b-logo.svg'}
                alt={`${config.business.name} Logo`}
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/sr2b-logo.svg';
                }}
              />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {config.business.description ||
                'Professional, reliable pest management solutions for residential homes, corporate offices, restaurants, and industrial premises.'}
            </p>
            {config.business.licenseNumber && (
              <div className="text-xs text-stone-400 flex items-center gap-1.5 pt-1">
                <Shield className="w-3.5 h-3.5 text-[#C3A16A]" />
                <span>{config.business.licenseNumber}</span>
              </div>
            )}
          </div>

          {/* Col 2: Quick Links & Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Pest Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {publishedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-[#DFBA7E] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/services"
                  className="text-xs text-[#DFBA7E] hover:underline font-semibold"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-[#DFBA7E] transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link to="/residential" className="hover:text-[#DFBA7E] transition-colors">
                  Residential Pest Solutions
                </Link>
              </li>
              <li>
                <Link to="/commercial" className="hover:text-[#DFBA7E] transition-colors">
                  Commercial & Business Hygiene
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#DFBA7E] transition-colors">
                  Request an On-Site Inspection
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#DFBA7E] transition-colors">
                  Data & Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact & Hours
            </h3>
            <div className="space-y-3 text-sm">
              {config.business.primaryPhone && (
                <a
                  href={getTelLink(config.business.primaryPhone)}
                  className="flex items-center gap-2.5 text-stone-300 hover:text-[#DFBA7E] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C3A16A] shrink-0" />
                  <span className="font-semibold tabular-nums">{config.business.primaryPhone}</span>
                </a>
              )}

              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Chat Support</span>
                </a>
              )}

              {config.business.email && (
                <a
                  href={`mailto:${config.business.email}`}
                  className="flex items-center gap-2.5 text-stone-300 hover:text-[#DFBA7E] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C3A16A] shrink-0" />
                  <span className="truncate">{config.business.email}</span>
                </a>
              )}

              {config.business.businessHours && (
                <div className="flex items-start gap-2.5 text-xs text-stone-400 pt-1">
                  <Clock className="w-4 h-4 text-[#C3A16A] shrink-0 mt-0.5" />
                  <span>{config.business.businessHours}</span>
                </div>
              )}

              {config.business.address && (
                <div className="flex items-start gap-2.5 text-xs text-stone-400">
                  <MapPin className="w-4 h-4 text-[#C3A16A] shrink-0 mt-0.5" />
                  <span>{config.business.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {currentYear} {config.business.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-stone-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin/config" className="inline-flex items-center gap-1 hover:text-[#DFBA7E] transition-colors">
              <Settings className="w-3 h-3" />
              <span>Admin Config</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
