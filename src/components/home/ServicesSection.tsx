import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../../context/ConfigContext';
import { ServiceCard } from '../services/ServiceCard';

export const ServicesSection: React.FC = () => {
  const { config } = useSiteConfig();
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const show = config.homepage.sectionVisibility.servicesGrid;
  if (!show) return null;

  const publishedServices = config.services
    .filter((s) => s.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const filteredServices = publishedServices.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'residential') return s.category === 'residential' || s.category === 'both';
    if (filter === 'commercial') return s.category === 'commercial' || s.category === 'both';
    return true;
  });

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A98250]">
              Targeted Pest Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183247] mt-1.5 tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-sm text-stone-500 mt-2 max-w-xl">
              Scientifically proven formulations and precision application designed to eradicate household and commercial pests permanently.
            </p>
          </div>

          {/* Interactive filter control */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-[#183247] shadow-xs'
                  : 'text-stone-600 hover:text-[#183247]'
              }`}
            >
              All Services ({publishedServices.length})
            </button>
            <button
              onClick={() => setFilter('residential')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                filter === 'residential'
                  ? 'bg-white text-[#183247] shadow-xs'
                  : 'text-stone-600 hover:text-[#183247]'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setFilter('commercial')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                filter === 'commercial'
                  ? 'bg-white text-[#183247] shadow-xs'
                  : 'text-stone-600 hover:text-[#183247]'
              }`}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom Explorer Link */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#183247] bg-[#F8F6F1] hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors"
          >
            <span>Explore Comprehensive Service Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
