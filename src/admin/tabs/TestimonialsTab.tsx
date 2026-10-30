import React, { useState } from 'react';
import { SiteConfig, TestimonialItem } from '../../types/config';
import { Plus, Trash2, Edit3, Star, Eye, EyeOff } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const TestimonialsTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const testimonials = formData.testimonials || [];
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    const newItem: TestimonialItem = {
      id: 'test-' + Date.now(),
      customerName: 'Customer Name',
      location: 'Bangalore',
      serviceCategory: 'Cockroach Control',
      rating: 5,
      reviewText: 'Detailed client review regarding treatment efficacy, technician professionalism, and punctuality.',
      date: 'October 2026',
      published: true,
      verified: true,
    };
    setEditingTestimonial(newItem);
    setIsCreating(true);
  };

  const handleSave = (itemToSave: TestimonialItem) => {
    let updated = [...testimonials];
    if (isCreating) {
      updated.push(itemToSave);
    } else {
      updated = updated.map((t) => (t.id === itemToSave.id ? itemToSave : t));
    }
    updateField('testimonials', updated);
    setEditingTestimonial(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete review by "${name}"?`)) {
      updateField(
        'testimonials',
        testimonials.filter((t) => t.id !== id)
      );
      if (editingTestimonial?.id === id) setEditingTestimonial(null);
    }
  };

  const togglePublished = (id: string) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, published: !t.published } : t));
    updateField('testimonials', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#183247]">Customer Reviews & Testimonials</h3>
          <p className="text-xs text-stone-500">
            Publish authentic client reviews with ratings and verified badges.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editingTestimonial && (
        <div className="p-6 bg-white rounded-xl border-2 border-[#A98250] shadow-md space-y-4">
          <h4 className="text-sm font-bold text-[#183247]">
            {isCreating ? 'Add Client Review' : `Edit Review: ${editingTestimonial.customerName}`}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={editingTestimonial.customerName}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, customerName: e.target.value })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Locality / City</label>
              <input
                type="text"
                value={editingTestimonial.location}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, location: e.target.value })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Service Category</label>
              <input
                type="text"
                value={editingTestimonial.serviceCategory}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, serviceCategory: e.target.value })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Star Rating (1 - 5)</label>
              <select
                value={editingTestimonial.rating}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Good)</option>
                <option value={3}>3 Stars (Average)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Date</label>
              <input
                type="text"
                value={editingTestimonial.date || ''}
                placeholder="e.g. October 2026"
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, date: e.target.value })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Review Statement</label>
            <textarea
              rows={3}
              value={editingTestimonial.reviewText}
              onChange={(e) =>
                setEditingTestimonial({ ...editingTestimonial, reviewText: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
            />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
              <input
                type="checkbox"
                checked={editingTestimonial.published}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, published: e.target.checked })
                }
                className="rounded text-[#183247]"
              />
              <span>Published on Website</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
              <input
                type="checkbox"
                checked={editingTestimonial.verified}
                onChange={(e) =>
                  setEditingTestimonial({ ...editingTestimonial, verified: e.target.checked })
                }
                className="rounded text-[#183247]"
              />
              <span>Mark as Verified Client</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              onClick={() => setEditingTestimonial(null)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(editingTestimonial)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#183247] rounded-lg shadow-xs"
            >
              Save Review
            </button>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
        {testimonials.map((t) => (
          <div key={t.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#183247]">{t.customerName}</span>
                <span className="text-xs text-stone-500">· {t.location}</span>
                <div className="flex text-amber-500 ml-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-600 line-clamp-2 italic">"{t.reviewText}"</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => togglePublished(t.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                  t.published ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {t.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{t.published ? 'Published' : 'Hidden'}</span>
              </button>
              <button
                onClick={() => {
                  setEditingTestimonial(t);
                  setIsCreating(false);
                }}
                className="p-1.5 text-stone-500 hover:text-[#183247] hover:bg-stone-100 rounded"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(t.id, t.customerName)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
