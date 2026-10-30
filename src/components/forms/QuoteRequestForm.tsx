import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MessageSquare, Calendar, Building, Home, Clock, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { enquiryService } from '../../services/enquiryService';
import { formatWhatsAppUrl, getServiceWhatsAppMessage, formatQuoteEnquiryWhatsAppMessage } from '../../lib/whatsapp';

interface QuoteRequestFormProps {
  defaultService?: string;
  defaultPropertyType?: 'Residential' | 'Commercial';
  title?: string;
  subtitle?: string;
}

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({
  defaultService,
  defaultPropertyType = 'Residential',
  title = 'Request a Free Inspection & Quote',
  subtitle = 'Fill in your details below and our pest control specialist will contact you with a customized treatment plan.',
}) => {
  const { config } = useSiteConfig();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(config.business.primaryCity || '');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>(defaultPropertyType);
  const [pestProblem, setPestProblem] = useState(defaultService || 'Cockroach Control');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [description, setDescription] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string>('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!location.trim()) {
      errs.location = 'Please provide your locality or city.';
    }

    if (!pestProblem) {
      errs.pestProblem = 'Please select a pest problem.';
    }

    if (!privacyConsent) {
      errs.privacyConsent = 'You must agree to the privacy notice.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await enquiryService.submitEnquiry({
        fullName,
        phone,
        email: email.trim() || undefined,
        location,
        propertyType,
        pestProblem,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        description,
        privacyConsent,
      });

      const enquiryId = res.id || 'SR2B-' + Date.now().toString(36).toUpperCase();

      // Format complete WhatsApp message with ALL customer filled details
      const waMessage = formatQuoteEnquiryWhatsAppMessage({
        fullName,
        phone,
        email: email.trim() || undefined,
        location,
        propertyType,
        pestProblem,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        description: description.trim() || undefined,
        enquiryId,
      });

      // Target owner number (configured to 6362953619, customizable via admin config)
      const targetOwnerNumber = config.business.whatsappNumber || '916362953619';
      const waUrl = formatWhatsAppUrl(targetOwnerNumber, waMessage);

      // Automatically open WhatsApp with the complete pre-filled details for the owner
      if (waUrl) {
        try {
          const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');
          if (!opened) {
            // In case popup blockers intercept
            window.location.href = waUrl;
          }
        } catch {
          // Fallback handled in confirmation UI
        }
      }

      setSubmittedWhatsAppUrl(waUrl);
      setSubmittedId(enquiryId);
    } catch {
      setErrors({ form: 'An unexpected error occurred. Please try again or reach us via WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedId) {
    return (
      <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm text-center">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#183247] mb-2">Quote Request Sent & Logged!</h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-3 leading-relaxed">
          Thank you, <strong className="text-stone-800">{fullName}</strong>. Your enquiry details for{' '}
          <strong className="text-stone-800">{pestProblem}</strong> have been saved to our dispatch system and dispatched via WhatsApp.
        </p>

        <div className="inline-block bg-stone-100 px-3.5 py-1.5 rounded-md text-xs text-stone-600 font-mono mb-6">
          Reference ID: {submittedId}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {submittedWhatsAppUrl && (
            <a
              href={submittedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#218653] hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open in WhatsApp</span>
            </a>
          )}
          <button
            onClick={() => {
              setSubmittedId(null);
              setFullName('');
              setPhone('');
              setDescription('');
              setSubmittedWhatsAppUrl('');
            }}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#183247] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#183247] mb-1.5">{title}</h3>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{subtitle}</p>
      </div>

      {errors.form && (
        <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Type Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
            Property Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPropertyType('Residential')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                propertyType === 'Residential'
                  ? 'bg-[#183247] text-white border-[#183247] shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Residential (Home / Flat)</span>
            </button>
            <button
              type="button"
              onClick={() => setPropertyType('Commercial')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                propertyType === 'Commercial'
                  ? 'bg-[#183247] text-white border-[#183247] shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Commercial (Office / Shop)</span>
            </button>
          </div>
        </div>

        {/* Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-stone-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250] ${
                errors.fullName ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300'
              }`}
            />
            {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 63629 53619"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250] ${
                errors.phone ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300'
              }`}
            />
            {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Email and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">
              Email Address <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250] ${
                errors.email ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300'
              }`}
            />
            {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-xs font-bold text-stone-700 mb-1">
              Locality / City <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hulimavu, Bangalore"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250] ${
                errors.location ? 'border-red-400 ring-1 ring-red-300' : 'border-stone-300'
              }`}
            />
            {errors.location && <p className="text-[11px] text-red-600 mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Pest Problem Selector */}
        <div>
          <label htmlFor="pestProblem" className="block text-xs font-bold text-stone-700 mb-1">
            Pest Problem / Service Required <span className="text-red-500">*</span>
          </label>
          <select
            id="pestProblem"
            value={pestProblem}
            onChange={(e) => setPestProblem(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250]"
          >
            {config.services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="General Inspection / Not Sure">General Inspection / Not Sure</option>
            <option value="Other Pest Issue">Other Pest Issue</option>
          </select>
        </div>

        {/* Preferred Date & Time Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prefDate" className="block text-xs font-bold text-stone-700 mb-1">
              Preferred Date <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                id="prefDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="prefTime" className="block text-xs font-bold text-stone-700 mb-1">
              Preferred Time Slot
            </label>
            <select
              id="prefTime"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250]"
            >
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
              <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
              <option value="Anytime / Emergency">Anytime / Emergency</option>
            </select>
          </div>
        </div>

        {/* Problem Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-bold text-stone-700 mb-1">
            Additional Details <span className="text-stone-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. 2 BHK flat, seeing termites in master bedroom wardrobe, need odorless chemicals."
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250]"
          ></textarea>
        </div>

        {/* Privacy Consent */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#183247] rounded border-stone-300 focus:ring-[#A98250]"
            />
            <span className="text-xs text-stone-600 leading-tight">
              I agree to allow {config.business.name} to contact me via phone, SMS, or WhatsApp regarding this service enquiry.
            </span>
          </label>
          {errors.privacyConsent && <p className="text-[11px] text-red-600 mt-1">{errors.privacyConsent}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#183247] via-[#103833] to-[#218653] hover:from-[#102332] hover:via-[#0c2c28] hover:to-[#1b6b42] active:scale-[0.99] rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-950/25 border border-emerald-400/30 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer group"
          >
            {isSubmitting ? (
              <span>Submitting & Preparing WhatsApp...</span>
            ) : (
              <>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="tracking-wide">Get Free Quote & Send via WhatsApp</span>
                <Send className="w-4 h-4 text-[#DFBA7E] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </>
            )}
          </button>
          <p className="text-[11px] text-stone-500 text-center mt-2 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>All your filled details will be pre-formatted and sent directly to the owner's WhatsApp.</span>
          </p>
        </div>
      </form>
    </div>
  );
};
