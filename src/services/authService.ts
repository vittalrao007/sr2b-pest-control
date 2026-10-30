export interface AdminUser {
  email: string;
  role: string;
  name: string;
}

const TOKEN_KEY = 'sr2b_admin_auth_token';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; message?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem(TOKEN_KEY, data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Invalid email or password.' };
      }
    } catch {
      return { success: false, message: 'Unable to reach the administrator login service.' };
    }
  },

  async checkAuth(): Promise<{ authenticated: boolean; user?: AdminUser }> {
    const token = this.getToken();
    if (!token) return { authenticated: false };

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        return { authenticated: data.authenticated, user: data.user };
      }
    } catch {
      return { authenticated: false };
    }

    return { authenticated: false };
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // Ignored
      }
    }
  },
};
