import React, { useState } from 'react';
import { SiteConfig, FAQItem } from '../../types/config';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const FAQTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const faqs = formData.faqs || [];
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    const newItem: FAQItem = {
      id: 'faq-' + Date.now(),
      question: 'New Question?',
      answer: 'Detailed response regarding treatment protocols and expectations.',
      category: 'general',
      published: true,
      sortOrder: faqs.length + 1,
    };
    setEditingFAQ(newItem);
    setIsCreating(true);
  };

  const handleSave = (itemToSave: FAQItem) => {
    let updated = [...faqs];
    if (isCreating) {
      updated.push(itemToSave);
    } else {
      updated = updated.map((f) => (f.id === itemToSave.id ? itemToSave : f));
    }
    updateField('faqs', updated);
    setEditingFAQ(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this question entry?')) {
      updateField(
        'faqs',
        faqs.filter((f) => f.id !== id)
      );
      if (editingFAQ?.id === id) setEditingFAQ(null);
    }
  };

  const togglePublished = (id: string) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, published: !f.published } : f));
    updateField('faqs', updated);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === faqs.length - 1)) {
      return;
    }
    const target = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...faqs];
    const temp = reordered[index];
    reordered[index] = reordered[target];
    reordered[target] = temp;
    reordered.forEach((f, idx) => {
      f.sortOrder = idx + 1;
    });
    updateField('faqs', reordered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#183247]">Frequently Asked Questions (FAQ) Management</h3>
          <p className="text-xs text-stone-500">
            Add, edit, reorder, or hide questions and provide clear treatment advice.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {editingFAQ && (
        <div className="p-6 bg-white rounded-xl border-2 border-[#A98250] shadow-md space-y-4">
          <h4 className="text-sm font-bold text-[#183247]">
            {isCreating ? 'Add Question' : 'Edit Question'}
          </h4>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Question</label>
            <input
              type="text"
              value={editingFAQ.question}
              onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Answer</label>
            <textarea
              rows={3}
              value={editingFAQ.answer}
              onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
              <select
                value={editingFAQ.category}
                onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              >
                <option value="general">General Inquiries</option>
                <option value="treatment">Treatment & Safety Precautions</option>
                <option value="residential">Residential Questions</option>
                <option value="commercial">Commercial & Corporate Questions</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                <input
                  type="checkbox"
                  checked={editingFAQ.published}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, published: e.target.checked })}
                  className="rounded text-[#183247]"
                />
                <span>Published on FAQ Section</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              onClick={() => setEditingFAQ(null)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(editingFAQ)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#183247] rounded-lg shadow-xs"
            >
              Save Question
            </button>
          </div>
        </div>
      )}

      {/* FAQs List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#183247]">{faq.question}</span>
                <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded capitalize">
                  {faq.category}
                </span>
              </div>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => moveOrder(index, 'up')}
                disabled={index === 0}
                className="p-1 hover:bg-stone-200 rounded disabled:opacity-30"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => moveOrder(index, 'down')}
                disabled={index === faqs.length - 1}
                className="p-1 hover:bg-stone-200 rounded disabled:opacity-30"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => togglePublished(faq.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                  faq.published ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {faq.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{faq.published ? 'Published' : 'Hidden'}</span>
              </button>
              <button
                onClick={() => {
                  setEditingFAQ(faq);
                  setIsCreating(false);
                }}
                className="p-1.5 text-stone-500 hover:text-[#183247] hover:bg-stone-100 rounded"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
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
