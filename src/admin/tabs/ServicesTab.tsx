import React, { useState } from 'react';
import { SiteConfig, ServiceItem } from '../../types/config';
import { Plus, Trash2, Edit3, Eye, EyeOff, Star, ArrowUp, ArrowDown, Check, X, ExternalLink } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const ServicesTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const services = formData.services || [];

  const handleCreateNew = () => {
    const newService: ServiceItem = {
      id: 'srv-' + Date.now(),
      slug: 'new-service-' + Math.floor(Math.random() * 1000),
      name: 'New Pest Control Service',
      shortDescription: 'Describe your service approach and target pests here.',
      fullDescription: 'Comprehensive overview of treatment protocol, active chemistry, and safety precautions.',
      imageUrl: '/src/assets/images/residential_home_treatment_1793023758657.jpg',
      iconName: 'ShieldCheck',
      badge: 'New',
      featured: false,
      published: true,
      sortOrder: services.length + 1,
      category: 'both',
      commonSigns: ['Unusual signs of pest activity', 'Noticeable pest sightings'],
      treatmentSteps: ['Property inspection', 'Precision chemical or bait application', 'Aftercare monitoring'],
      preventionTips: ['Maintain proper hygiene and clean storage containers'],
      faqs: [{ question: 'How quickly does it work?', answer: 'Within 24 to 72 hours depending on pest biology.' }],
      seoTitle: 'Pest Control Service | SR2B',
      seoDescription: 'Professional pest control service for residential and commercial spaces.',
    };
    setEditingService(newService);
    setIsCreating(true);
  };

  const handleSaveService = (serviceToSave: ServiceItem) => {
    // Generate clean slug from name if needed
    if (!serviceToSave.slug) {
      serviceToSave.slug = serviceToSave.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    let updatedList = [...services];
    if (isCreating) {
      updatedList.push(serviceToSave);
    } else {
      updatedList = updatedList.map((s) => (s.id === serviceToSave.id ? serviceToSave : s));
    }
    updateField('services', updatedList);
    setEditingService(null);
    setIsCreating(false);
  };

  const handleDeleteService = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      const updated = services.filter((s) => s.id !== id);
      updateField('services', updated);
      if (editingService?.id === id) {
        setEditingService(null);
      }
    }
  };

  const togglePublished = (id: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, published: !s.published } : s));
    updateField('services', updated);
  };

  const toggleFeatured = (id: string) => {
    const updated = services.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s));
    updateField('services', updated);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === services.length - 1)) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...services];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    // re-assign sort order numbers
    reordered.forEach((s, idx) => {
      s.sortOrder = idx + 1;
    });

    updateField('services', reordered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#183247]">Services Management (Full CRUD)</h3>
          <p className="text-xs text-stone-500">
            Create, edit, reorder, publish, hide, or delete pest control services and customize starting prices.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Editing Modal or Drawer */}
      {editingService && (
        <div className="p-6 bg-white rounded-xl border-2 border-[#A98250] shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h4 className="text-base font-bold text-[#183247]">
              {isCreating ? 'Create New Service' : `Editing: ${editingService.name}`}
            </h4>
            <button
              onClick={() => {
                setEditingService(null);
                setIsCreating(false);
              }}
              className="text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Service Name</label>
              <input
                type="text"
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={editingService.slug}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Short Description (Cards)</label>
            <textarea
              rows={2}
              value={editingService.shortDescription}
              onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Full Detailed Description (Detail Page)</label>
            <textarea
              rows={3}
              value={editingService.fullDescription}
              onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Starting Price (₹)</label>
              <input
                type="number"
                value={editingService.startingPrice || ''}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    startingPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Pricing Unit</label>
              <input
                type="text"
                value={editingService.pricingUnit || ''}
                placeholder="e.g. per 2 BHK or inspection"
                onChange={(e) => setEditingService({ ...editingService, pricingUnit: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Category Target</label>
              <select
                value={editingService.category}
                onChange={(e) =>
                  setEditingService({ ...editingService, category: e.target.value as any })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              >
                <option value="both">Both (Residential & Commercial)</option>
                <option value="residential">Residential Only</option>
                <option value="commercial">Commercial Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Badge Tag</label>
              <input
                type="text"
                value={editingService.badge || ''}
                placeholder="e.g. Most Popular"
                onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Image URL</label>
              <input
                type="text"
                value={editingService.imageUrl}
                onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
              <input
                type="checkbox"
                checked={editingService.published}
                onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                className="rounded text-[#183247]"
              />
              <span>Published on Website</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
              <input
                type="checkbox"
                checked={editingService.featured}
                onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                className="rounded text-[#183247]"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setEditingService(null);
                setIsCreating(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSaveService(editingService)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg shadow-xs"
            >
              Save Service Changes
            </button>
          </div>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {services.map((service, index) => (
                <tr key={service.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-stone-200 rounded disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveOrder(index, 'down')}
                        disabled={index === services.length - 1}
                        className="p-1 hover:bg-stone-200 rounded disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#183247] flex items-center gap-2">
                    <span>{service.name}</span>
                    {service.featured && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-500">{service.slug}</td>
                  <td className="py-3 px-4 capitalize text-stone-600">{service.category}</td>
                  <td className="py-3 px-4 font-extrabold tabular-nums">
                    {service.startingPrice ? `₹${service.startingPrice.toLocaleString('en-IN')}` : 'Quote only'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePublished(service.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        service.published
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {service.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{service.published ? 'Published' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/services/${service.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-stone-400 hover:text-[#183247] rounded"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setIsCreating(false);
                        }}
                        className="p-1.5 text-stone-500 hover:text-[#183247] hover:bg-stone-100 rounded"
                        title="Edit Service"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id, service.name)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
