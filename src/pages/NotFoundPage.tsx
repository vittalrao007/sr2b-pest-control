import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Phone } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { getTelLink } from '../lib/whatsapp';

export const NotFoundPage: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <div className="bg-[#F8F6F1] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 p-8 text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#A98250] flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#183247] mb-2">404</h1>
        <h2 className="text-lg font-bold text-stone-800 mb-2">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
          The pest control page or service you are searching for does not exist or may have been updated in our configuration dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#183247] rounded-lg hover:bg-[#102332] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-[#183247] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            <span>All Services</span>
          </Link>
        </div>

        {config.business.primaryPhone && (
          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
            Need urgent assistance?{' '}
            <a
              href={getTelLink(config.business.primaryPhone)}
              className="text-[#A98250] font-bold hover:underline"
            >
              Call {config.business.primaryPhone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
