import React, { useState } from 'react';
import { SiteConfig, ServiceArea } from '../../types/config';
import { Plus, Trash2, Edit3, MapPin, Check, Eye, EyeOff } from 'lucide-react';

interface TabProps {
  formData: SiteConfig;
  updateField: (path: string, value: any) => void;
}

export const ServiceAreasTab: React.FC<TabProps> = ({ formData, updateField }) => {
  const areas = formData.serviceAreas || [];
  const [editingArea, setEditingArea] = useState<ServiceArea | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [neighborhoodInput, setNeighborhoodInput] = useState('');

  const handleCreate = () => {
    const newArea: ServiceArea = {
      id: 'area-' + Date.now(),
      cityName: 'New Operating City',
      state: formData.business.state || 'Karnataka',
      neighborhoods: ['Central Hub', 'Sector 1', 'North Zone'],
      published: true,
      description: 'Daily technician dispatch and inspection availability.',
      coverageStatus: 'active',
    };
    setEditingArea(newArea);
    setIsCreating(true);
    setNeighborhoodInput(newArea.neighborhoods.join(', '));
  };

  const handleSave = (areaToSave: ServiceArea) => {
    // parse neighborhoods from comma separated text
    const list = neighborhoodInput
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);

    const finalized = { ...areaToSave, neighborhoods: list };
    let updated = [...areas];
    if (isCreating) {
      updated.push(finalized);
    } else {
      updated = updated.map((a) => (a.id === finalized.id ? finalized : a));
    }
    updateField('serviceAreas', updated);
    setEditingArea(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete service area "${name}"?`)) {
      updateField(
        'serviceAreas',
        areas.filter((a) => a.id !== id)
      );
      if (editingArea?.id === id) setEditingArea(null);
    }
  };

  const togglePublished = (id: string) => {
    const updated = areas.map((a) => (a.id === id ? { ...a, published: !a.published } : a));
    updateField('serviceAreas', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#183247]">Service Areas & Geographical Coverage</h3>
          <p className="text-xs text-stone-500">
            Define operating cities, states, and individual neighborhood pin code areas.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#183247] hover:bg-[#102332] rounded-lg shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Operational City</span>
        </button>
      </div>

      {editingArea && (
        <div className="p-6 bg-white rounded-xl border-2 border-[#A98250] shadow-md space-y-4">
          <h4 className="text-sm font-bold text-[#183247]">
            {isCreating ? 'Add New Operational Area' : `Edit Area: ${editingArea.cityName}`}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">City Name</label>
              <input
                type="text"
                value={editingArea.cityName}
                onChange={(e) => setEditingArea({ ...editingArea, cityName: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">State / Province</label>
              <input
                type="text"
                value={editingArea.state}
                onChange={(e) => setEditingArea({ ...editingArea, state: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Neighborhoods / Localities (Separate with commas)
            </label>
            <textarea
              rows={2}
              value={neighborhoodInput}
              onChange={(e) => setNeighborhoodInput(e.target.value)}
              placeholder="Banjara Hills, Jubilee Hills, Gachibowli, Hitec City"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Location Description</label>
            <input
              type="text"
              value={editingArea.description || ''}
              onChange={(e) => setEditingArea({ ...editingArea, description: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-stone-300"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
              <input
                type="checkbox"
                checked={editingArea.published}
                onChange={(e) => setEditingArea({ ...editingArea, published: e.target.checked })}
                className="rounded text-[#183247]"
              />
              <span>Published on Public Website</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              onClick={() => setEditingArea(null)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(editingArea)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#183247] rounded-lg shadow-xs"
            >
              Save Area
            </button>
          </div>
        </div>
      )}

      {/* Areas Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-stone-100">
          {areas.map((area) => (
            <div key={area.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#A98250]" />
                  <span className="font-bold text-sm text-[#183247]">{area.cityName}</span>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                    {area.state}
                  </span>
                </div>
                <div className="text-xs text-stone-500 line-clamp-1">
                  Localities: {area.neighborhoods?.join(', ') || 'No specific localities specified'}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublished(area.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
                    area.published ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {area.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{area.published ? 'Published' : 'Hidden'}</span>
                </button>
                <button
                  onClick={() => {
                    setEditingArea(area);
                    setIsCreating(false);
                    setNeighborhoodInput(area.neighborhoods?.join(', ') || '');
                  }}
                  className="p-1.5 text-stone-500 hover:text-[#183247] hover:bg-stone-100 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(area.id, area.cityName)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
