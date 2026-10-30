import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustBar } from '../components/home/TrustBar';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ResidentialSection } from '../components/home/ResidentialSection';
import { CommercialSection } from '../components/home/CommercialSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

export const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <ResidentialSection />
      <CommercialSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
};
