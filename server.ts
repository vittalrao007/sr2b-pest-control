import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHmac, timingSafeEqual } from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_SITE_CONFIG } from './src/config/defaultConfig';
import { CustomerEnquiry, SiteConfig } from './src/types/config';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'sr2b-pest-control') : path.join(__dirname, 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize config if not present
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_SITE_CONFIG, null, 2), 'utf-8');
}

if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Helper functions for data
function getStoredConfig(): SiteConfig {
  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

function saveStoredConfig(config: SiteConfig): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

function getStoredEnquiries(): CustomerEnquiry[] {
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveStoredEnquiries(enquiries: CustomerEnquiry[]): void {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
}

function createAdminToken(): string {
  const payload = Buffer.from(JSON.stringify({ expiresAt: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url');
  const signature = createHmac('sha256', process.env.ADMIN_TOKEN_SECRET!).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function isValidAdminToken(token: string): boolean {
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra || !process.env.ADMIN_TOKEN_SECRET) return false;

  const expected = createHmac('sha256', process.env.ADMIN_TOKEN_SECRET).update(payload).digest();
  const provided = Buffer.from(signature, 'base64url');
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return false;

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    return typeof claims.expiresAt === 'number' && claims.expiresAt > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!isValidAdminToken(token)) {
    res.status(401).json({ success: false, message: 'Administrator authentication required.' });
    return;
  }
  next();
}

// 1. API: Get Site Config
app.get('/api/config', (_req: Request, res: Response) => {
  const config = getStoredConfig();
  res.json({ success: true, config });
});

// 2. API: Update Site Config
app.post('/api/config', requireAdmin, (req: Request, res: Response) => {
  try {
    const newConfig = req.body;
    if (!newConfig || !newConfig.business || !newConfig.branding) {
      return res.status(400).json({ success: false, message: 'Invalid configuration payload.' });
    }
    newConfig.updatedAt = new Date().toISOString();
    saveStoredConfig(newConfig);
    res.json({ success: true, message: 'Configuration saved successfully.', config: newConfig });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error?.message || 'Failed to save configuration.' });
  }
});

// 3. API: Reset Site Config to Defaults
app.post('/api/config/reset', requireAdmin, (_req: Request, res: Response) => {
  try {
    const resetConfig = { ...DEFAULT_SITE_CONFIG, updatedAt: new Date().toISOString() };
    saveStoredConfig(resetConfig);
    res.json({ success: true, message: 'Configuration reset to default successfully.', config: resetConfig });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to reset configuration.' });
  }
});

// 4. API: Submit Customer Enquiry (Lead generation)
app.post('/api/enquiries', (req: Request, res: Response) => {
  try {
    const { fullName, phone, email, location, propertyType, pestProblem, preferredDate, preferredTime, description, privacyConsent } = req.body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Valid full name is required.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return res.status(400).json({ success: false, message: 'Valid phone number is required.' });
    }
    if (!location || typeof location !== 'string' || location.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Location or area is required.' });
    }
    if (!pestProblem || typeof pestProblem !== 'string') {
      return res.status(400).json({ success: false, message: 'Pest problem category is required.' });
    }

    const enquiries = getStoredEnquiries();
    const newEnquiry: CustomerEnquiry = {
      id: 'enq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      location: location.trim(),
      propertyType: propertyType === 'Commercial' ? 'Commercial' : 'Residential',
      pestProblem: pestProblem.trim(),
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime || undefined,
      description: (description || '').trim(),
      privacyConsent: !!privacyConsent,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    enquiries.unshift(newEnquiry);
    saveStoredEnquiries(enquiries);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your quote request has been received. Our technician will contact you shortly.',
      enquiryId: newEnquiry.id,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error processing quote request.' });
  }
});

// 5. API: Get Enquiries (Admin)
app.get('/api/enquiries', requireAdmin, (_req: Request, res: Response) => {
  const enquiries = getStoredEnquiries();
  res.json({ success: true, enquiries });
});

// 6. API: Update Enquiry Status / Notes (Admin)
app.patch('/api/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const enquiries = getStoredEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }

  if (status) enquiries[index].status = status;
  if (notes !== undefined) enquiries[index].notes = notes;

  saveStoredEnquiries(enquiries);
  res.json({ success: true, enquiry: enquiries[index] });
});

// 7. API: Delete Enquiry (Admin)
app.delete('/api/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  let enquiries = getStoredEnquiries();
  const initialCount = enquiries.length;
  enquiries = enquiries.filter((e) => e.id !== id);

  if (enquiries.length === initialCount) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }

  saveStoredEnquiries(enquiries);
  res.json({ success: true, message: 'Enquiry deleted successfully.' });
});

// 8. API: Admin Auth Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const inputId = (email || '').trim().toLowerCase();

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_TOKEN_SECRET) {
    return res.status(503).json({ success: false, message: 'Administrator login is not configured.' });
  }

  const isIdentifierMatch = inputId === process.env.ADMIN_EMAIL.trim().toLowerCase();
  const isPasswordMatch = password === process.env.ADMIN_PASSWORD;

  if (isIdentifierMatch && isPasswordMatch) {
    const token = createAdminToken();
    return res.json({
      success: true,
      token,
      user: {
        email: inputId.includes('@') ? inputId : 'admin@sr2bpestcontrol.com',
        role: 'Administrator',
        name: 'SR2B Admin',
      },
    });
  }

  res.status(401).json({ success: false, message: 'Invalid administrative user ID or password.' });
});

// 9. API: Admin Auth Me Check
app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ authenticated: false });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  if (isValidAdminToken(token)) {
    return res.json({
      authenticated: true,
      user: {
        email: process.env.ADMIN_EMAIL,
        role: 'Administrator',
        name: 'SR2B Admin',
      },
    });
  }
  res.status(401).json({ authenticated: false });
});

// 10. API: Admin Auth Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Vite Integration: Development or Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[SR2B Pest Control Server] Running on http://0.0.0.0:${PORT}`);
  });
}

export default app;

if (!process.env.VERCEL) {
  startServer();
}
