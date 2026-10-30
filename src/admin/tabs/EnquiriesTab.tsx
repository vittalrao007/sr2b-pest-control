import React, { useState, useEffect } from 'react';
import { CustomerEnquiry } from '../../types/config';
import { enquiryService } from '../../services/enquiryService';
import { Search, Download, Trash2, Phone, Mail, MapPin, Calendar, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getTelLink } from '../../lib/whatsapp';

export const EnquiriesTab: React.FC = () => {
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const list = await enquiryService.getEnquiries();
      setEnquiries(list);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: CustomerEnquiry['status']) => {
    await enquiryService.updateStatus(id, newStatus);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer enquiry record?')) {
      await enquiryService.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const handleExportCSV = () => {
    enquiryService.exportToCSV(enquiries);
  };

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.pestProblem || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#183247]">Lead & Quote Enquiries Management</h3>
          <p className="text-xs text-stone-500">
            Real-time customer submissions from the website with status workflows and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchEnquiries}
            className="p-2 text-stone-600 hover:text-[#183247] hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
            title="Refresh Enquiries"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            disabled={enquiries.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#183247] bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, phone, or pest..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'New', 'Contacted', 'In Progress', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#183247] text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'all' ? `All (${enquiries.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Grid or List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`space-y-3 ${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {isLoading ? (
            <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-xs text-stone-500">
              Loading enquiries...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-xs text-stone-500">
              No customer enquiries match your filters.
            </div>
          ) : (
            filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'border-[#A98250] ring-1 ring-[#A98250]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#183247]">{enq.fullName}</span>
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-semibold">
                          {enq.propertyType}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                        <span>{enq.phone}</span>
                        <span>·</span>
                        <span className="font-medium text-[#A98250]">{enq.pestProblem}</span>
                        <span>·</span>
                        <span>{enq.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          enq.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'In Progress'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(enq.id);
                        }}
                        className="p-1 text-stone-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {enq.description && (
                    <p className="text-xs text-stone-600 mt-2 line-clamp-1 italic bg-stone-50 p-2 rounded">
                      "{enq.description}"
                    </p>
                  )}

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Submitted: {new Date(enq.createdAt).toLocaleString()}</span>
                    <span>Ref: {enq.id}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 shadow-sm space-y-5 sticky top-28 h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h4 className="text-base font-bold text-[#183247]">Enquiry Details</h4>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-stone-400 hover:text-stone-600 text-xs"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 font-medium">Customer Name</label>
                <div className="text-sm font-bold text-[#183247]">{selectedEnquiry.fullName}</div>
              </div>

              <div>
                <label className="text-stone-400 font-medium">Contact Phone</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href={getTelLink(selectedEnquiry.phone)}
                    className="font-bold text-[#183247] hover:underline"
                  >
                    {selectedEnquiry.phone}
                  </a>
                  <a
                    href={getTelLink(selectedEnquiry.phone)}
                    className="p-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold"
                  >
                    Call
                  </a>
                </div>
              </div>

              {selectedEnquiry.email && (
                <div>
                  <label className="text-stone-400 font-medium">Email Address</label>
                  <div className="font-semibold text-stone-700">{selectedEnquiry.email}</div>
                </div>
              )}

              <div>
                <label className="text-stone-400 font-medium">Location</label>
                <div className="font-semibold text-stone-700">{selectedEnquiry.location}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-400 font-medium">Property Type</label>
                  <div className="font-semibold text-stone-700">{selectedEnquiry.propertyType}</div>
                </div>
                <div>
                  <label className="text-stone-400 font-medium">Target Pest</label>
                  <div className="font-semibold text-[#A98250]">{selectedEnquiry.pestProblem}</div>
                </div>
              </div>

              {(selectedEnquiry.preferredDate || selectedEnquiry.preferredTime) && (
                <div>
                  <label className="text-stone-400 font-medium">Preferred Time Slot</label>
                  <div className="font-semibold text-stone-700">
                    {selectedEnquiry.preferredDate || 'Any day'} · {selectedEnquiry.preferredTime}
                  </div>
                </div>
              )}

              {selectedEnquiry.description && (
                <div>
                  <label className="text-stone-400 font-medium">Problem Description</label>
                  <div className="p-3 bg-stone-50 rounded-lg text-stone-700 leading-relaxed mt-0.5">
                    {selectedEnquiry.description}
                  </div>
                </div>
              )}

              {/* Status Update Dropdown */}
              <div className="pt-3 border-t border-stone-200">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Update Lead Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiry.id, e.target.value as CustomerEnquiry['status'])
                  }
                  className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-stone-300 focus:outline-hidden"
                >
                  <option value="New">New Lead</option>
                  <option value="Contacted">Contacted Customer</option>
                  <option value="In Progress">Inspection Scheduled / In Progress</option>
                  <option value="Closed">Closed / Service Completed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
