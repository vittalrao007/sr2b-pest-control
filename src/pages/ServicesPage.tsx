import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { ServiceCard } from '../components/services/ServiceCard';

export const ServicesPage: React.FC = () => {
  const { config } = useSiteConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const publishedServices = config.services
    .filter((s) => s.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const filteredServices = publishedServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ||
      service.category === 'both' ||
      service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#183247] text-white py-14 lg:py-18 border-b border-[#102332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFBA7E] mb-2 block">
            Targeted Pest Treatments
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Our Pest Management Services
          </h1>
          <p className="text-sm sm:text-base text-stone-300 mt-3 leading-relaxed">
            From single-visit residential gel baiting to comprehensive commercial annual maintenance contracts, we provide specialized protection against invasive pests.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services (e.g. termite, cockroach)..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#A98250]"
              />
            </div>

            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                  categoryFilter === 'all'
                    ? 'bg-white text-[#183247] shadow-xs'
                    : 'text-stone-600 hover:text-[#183247]'
                }`}
              >
                All ({publishedServices.length})
              </button>
              <button
                onClick={() => setCategoryFilter('residential')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                  categoryFilter === 'residential'
                    ? 'bg-white text-[#183247] shadow-xs'
                    : 'text-stone-600 hover:text-[#183247]'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setCategoryFilter('commercial')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                  categoryFilter === 'commercial'
                    ? 'bg-white text-[#183247] shadow-xs'
                    : 'text-stone-600 hover:text-[#183247]'
                }`}
              >
                Commercial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-md mx-auto">
              <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#183247]">No Services Found</h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                No services matched your query "{searchTerm}". Try clearing your search filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#183247] rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          {/* Pricing Policy Disclaimer */}
          {config.pricing.showPublicPricing && config.pricing.disclaimer && (
            <div className="mt-12 p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-500 text-center max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-[#183247]">Pricing Notice: </span>
              {config.pricing.disclaimer}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Conversion Strip */}
      <section className="py-12 bg-white border-t border-stone-200 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#183247] mb-2">Need Help Choosing the Right Service?</h3>
          <p className="text-xs sm:text-sm text-stone-500 mb-6">
            Describe the signs or send photos of pest damage to our certified specialists for immediate advice.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg transition-colors shadow-sm"
          >
            <span>Request Free Inspection Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
