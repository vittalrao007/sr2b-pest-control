export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  primaryCity: string;
  state: string;
  country: string;
  address: string;
  postalCode: string;
  email: string;
  primaryPhone: string;
  secondaryPhone?: string;
  whatsappNumber: string;
  businessHours: string;
  googleMapsUrl?: string;
  googleBusinessProfileUrl?: string;
  licenseNumber?: string;
}

export interface BrandingConfig {
  primaryNavy: string;
  deepNavy: string;
  bronze: string;
  lightBronze: string;
  warmBg: string;
  textMain: string;
  textMuted: string;
  successGreen: string;
  borderColor: string;
  logoUrl: string;
  faviconUrl: string;
  fontFamily: string;
  borderRadius: string;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  text: string;
  linkText?: string;
  linkUrl?: string;
  showPhone: boolean;
  emergencyNote?: string;
}

export interface HeroConfig {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  showCard: boolean;
  cardTitle: string;
  cardSubtitle: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  iconName: string;
  startingPrice?: number;
  pricingUnit?: string;
  badge?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  category: 'residential' | 'commercial' | 'both';
  commonSigns: string[];
  treatmentSteps: string[];
  preventionTips: string[];
  faqs: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServiceArea {
  id: string;
  cityName: string;
  state: string;
  neighborhoods: string[];
  published: boolean;
  description?: string;
  coverageStatus: 'active' | 'expanding' | 'consultation_only';
}

export interface PricingOffer {
  id: string;
  title: string;
  serviceId?: string;
  discountNote?: string;
  description: string;
  validTill?: string;
  published: boolean;
}

export interface PricingConfig {
  showPublicPricing: boolean;
  currencySymbol: string;
  currencyCode: string;
  disclaimer: string;
  offers: PricingOffer[];
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  location: string;
  serviceCategory: string;
  rating: number;
  reviewText: string;
  date?: string;
  published: boolean;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatment' | 'residential' | 'commercial';
  serviceSlug?: string;
  published: boolean;
  sortOrder: number;
}

export interface SocialLinks {
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  googleMaps?: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  enableRobotsIndexing: boolean;
  googleAnalyticsId?: string;
  googleSearchConsoleId?: string;
}

export interface SectionVisibility {
  announcementBar: boolean;
  trustStrip: boolean;
  aboutSection: boolean;
  servicesGrid: boolean;
  whyChooseUs: boolean;
  processSection: boolean;
  residentialPromo: boolean;
  commercialPromo: boolean;
  serviceAreasSection: boolean;
  testimonialsSection: boolean;
  faqSection: boolean;
  finalCtaBanner: boolean;
  stickyMobileBar: boolean;
}

export interface HomepageConfig {
  announcement: AnnouncementBarConfig;
  hero: HeroConfig;
  aboutHeading: string;
  aboutDescription: string;
  aboutMission: string;
  whyChooseHeading: string;
  whyChooseDescription: string;
  whyPoints: { title: string; desc: string }[];
  residentialHeading: string;
  residentialDescription: string;
  residentialPoints: string[];
  commercialHeading: string;
  commercialDescription: string;
  commercialPoints: string[];
  finalCtaHeading: string;
  finalCtaDescription: string;
  finalCtaButtonText: string;
  sectionVisibility: SectionVisibility;
}

export interface SiteConfig {
  business: BusinessInfo;
  branding: BrandingConfig;
  homepage: HomepageConfig;
  services: ServiceItem[];
  serviceAreas: ServiceArea[];
  pricing: PricingConfig;
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  social: SocialLinks;
  seo: SEOConfig;
  benefits: BenefitItem[];
  processSteps: ProcessStep[];
  updatedAt: string;
}

export interface CustomerEnquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  location: string;
  propertyType: 'Residential' | 'Commercial';
  pestProblem: string;
  preferredDate?: string;
  preferredTime?: string;
  description: string;
  privacyConsent: boolean;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: string;
  notes?: string;
}
