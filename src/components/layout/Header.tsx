import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Settings, Phone, MessageSquare, ShieldCheck, LogOut, ExternalLink } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { useAuth } from '../../context/AuthContext';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, getTelLink } from '../../lib/whatsapp';

export const Header: React.FC = () => {
  const { config } = useSiteConfig();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Residential', path: '/residential' },
    { label: 'Commercial', path: '/commercial' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const whatsAppUrl = config.business.whatsappNumber
    ? formatWhatsAppUrl(config.business.whatsappNumber, getServiceWhatsAppMessage(config.business.name))
    : '';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E5E9] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-6">
          {/* Zone 1: Official Brand Logo */}
          <Link to="/" className="flex items-center shrink-0 py-1" aria-label="SR2B Pest Control Home">
            <div className="h-12 sm:h-16 flex items-center justify-center p-0.5 sm:p-1 rounded-md bg-white">
              <img
                src={config.branding.logoUrl || '/assets/sr2b-logo.svg'}
                alt={`${config.business.name} Logo`}
                className="h-full w-auto max-w-[130px] sm:max-w-[240px] object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/sr2b-logo.svg';
                }}
              />
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] font-medium text-[#263442]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-[#A98250] whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[#183247] font-bold border-b-2 border-[#A98250] pb-1' : 'text-[#263442]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Config Button + Quick Action Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Config Button (Highlighted & clear) */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/admin/config"
                  className="inline-flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-[#183247] bg-[#F1F3F4] hover:bg-[#E0E5E9] border border-[#C3A16A]/50 rounded-lg transition-all shadow-xs"
                  title="Open Configuration Dashboard"
                >
                  <Settings className="w-3.5 h-3.5 text-[#A98250] animate-spin-slow" />
                  <span className="hidden sm:inline">Config</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="p-1 sm:p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                  title="Log out of Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-stone-500 hover:text-[#183247] hover:bg-stone-100 rounded-md transition-colors border border-stone-200"
                title="Business Owner Configuration Login"
              >
                <Settings className="w-3 h-3 text-[#A98250]" />
                <span className="hidden sm:inline">Config Login</span>
              </Link>
            )}

            {/* WhatsApp Contact Quick Action (Desktop) */}
            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#218653] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}

            {/* Primary Action Button: Get a Free Quote */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-2.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#183247] hover:bg-[#102332] active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0"
            >
              <span className="sm:hidden">Get Quote</span>
              <span className="hidden sm:inline">Get a Free Quote</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#183247] hover:bg-stone-100 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#A98250]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E0E5E9] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive ? 'bg-[#183247] text-white' : 'text-[#263442] hover:bg-stone-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="w-full text-center py-2.5 px-4 text-sm font-bold text-white bg-[#183247] rounded-lg shadow-sm"
              >
                Get a Free Quote
              </Link>

              {config.business.primaryPhone && (
                <a
                  href={getTelLink(config.business.primaryPhone)}
                  className="flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-[#183247] bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#A98250]" />
                  <span>Call {config.business.primaryPhone}</span>
                </a>
              )}

              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-[#218653] bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <div className="pt-2 flex items-center justify-between px-1 text-xs text-stone-500">
                <span>Website Administration</span>
                <Link
                  to={isAuthenticated ? '/admin/config' : '/admin/login'}
                  onClick={handleNavClick}
                  className="inline-flex items-center gap-1 font-semibold text-[#A98250] hover:underline"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{isAuthenticated ? 'Admin Config Dashboard' : 'Admin Login'}</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
