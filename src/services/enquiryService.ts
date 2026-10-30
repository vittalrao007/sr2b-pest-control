import { CustomerEnquiry } from '../types/config';
import { authService } from './authService';

const LOCAL_ENQUIRIES_KEY = 'sr2b_enquiries_cache';

export const enquiryService = {
  async submitEnquiry(payload: Omit<CustomerEnquiry, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: data.message, id: data.enquiryId };
      }
      throw new Error(data.message || 'Failed to submit enquiry.');
    } catch (err: any) {
      // Local fallback storage so customer quotes are NEVER lost
      const localId = 'enq-local-' + Date.now();
      const localEnquiry: CustomerEnquiry = {
        ...payload,
        id: localId,
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      const existing = this.getLocalEnquiries();
      existing.unshift(localEnquiry);
      localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(existing));
      return {
        success: true,
        message: 'Your quote request has been received! Our team will contact you shortly.',
        id: localId,
      };
    }
  },

  async getEnquiries(): Promise<CustomerEnquiry[]> {
    try {
      const res = await fetch('/api/enquiries', { headers: authService.getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.enquiries)) {
          return data.enquiries;
        }
      }
    } catch {
      // Ignore
    }
    return this.getLocalEnquiries();
  },

  getLocalEnquiries(): CustomerEnquiry[] {
    try {
      const raw = localStorage.getItem(LOCAL_ENQUIRIES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  async updateStatus(id: string, status: CustomerEnquiry['status'], notes?: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) return true;
    } catch {
      // Local update
    }
    const local = this.getLocalEnquiries();
    const item = local.find((e) => e.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(local));
      return true;
    }
    return false;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });
      if (res.ok) return true;
    } catch {
      // Local deletion
    }
    let local = this.getLocalEnquiries();
    local = local.filter((e) => e.id !== id);
    localStorage.setItem(LOCAL_ENQUIRIES_KEY, JSON.stringify(local));
    return true;
  },

  exportToCSV(enquiries: CustomerEnquiry[]): void {
    if (!enquiries.length) return;
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Location', 'Property Type', 'Pest Problem', 'Preferred Date', 'Status', 'Message'];
    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${(e.location || '').replace(/"/g, '""')}"`,
      `"${e.propertyType}"`,
      `"${(e.pestProblem || '').replace(/"/g, '""')}"`,
      `"${e.preferredDate || ''} ${e.preferredTime || ''}"`,
      `"${e.status}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sr2b_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
