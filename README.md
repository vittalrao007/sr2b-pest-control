# SR2B Pest Control — Official Business Website & Config System

A production-ready website for **SR2B Pest Control**, a professional pest management company in India.

## Key Features

1. **Authoritative Brand Identity**:
   - Built around the official SR2B shield emblem logo in dark navy blue (`#183247`), deep navy (`#102332`), and bronze (`#A98250`) metallic tones.
   - Dynamic branding injection updating document title, favicon, and CSS variables.

2. **The Most Important Feature: Config Button & Dashboard (`/admin/config`)**:
   - Access via the **Config button** in the website header or directly at `/admin/config`.
   - **Tab 1: Business Profile**: Name, tagline, address, primary phone, secondary phone, WhatsApp number, hours, license.
   - **Tab 2: Branding & Appearance**: Interactive color pickers (Primary navy, deep navy, bronze, light bronze, warm background), logo upload, favicon, font selection, button radius, live preview.
   - **Tab 3: Homepage Content**: Announcement bar, hero headlines, CTA labels & destinations, mission statement, section visibility switches.
   - **Tab 4: Services Management (Full CRUD)**: Create, edit, reorder, feature, hide, or delete services with individual pricing and custom treatment protocols.
   - **Tab 5: Service Areas**: Manage operational cities, states, and covered neighborhood lists.
   - **Tab 6: Pricing & Offers**: Public pricing toggle (INR `₹`), disclaimer, and seasonal promo discounts.
   - **Tab 7: Testimonials & Reviews**: Add, edit, publish/hide verified customer reviews.
   - **Tab 8: FAQ Management**: Accordion question-and-answer editor with category assignments.
   - **Tab 9: Contact & Social Media**: Facebook, Instagram, LinkedIn, YouTube, and Google Maps links.
   - **Tab 10: SEO & Analytics**: Page title, meta descriptions, Open Graph preview image, indexing preferences, Google Analytics ID.
   - **Tab 11: Lead Enquiries**: Real-time customer quote requests, lead status tracking (New, Contacted, In Progress, Closed), search, filter, and CSV export.
   - **Tab 12: Backup & Restore**: Export full JSON snapshot, import validated JSON configuration, or restore demo defaults.

3. **Lead Generation & High Conversion**:
   - Click-to-call (`tel:`) and WhatsApp click-to-chat links with pre-filled customized messages.
   - Interactive Quote Request Form with client-side & server-side validation, property type selector (Residential vs Commercial), time slots, and immediate confirmation reference ID.
   - Compact sticky bottom bar on mobile (Call, WhatsApp, Get Quote) adhering to the 15% mobile viewport height constraint.

4. **Complete Multi-Page Architecture**:
   - `/` — Homepage with all 15 structured sections
   - `/about` — About Us, Integrated Pest Management (IPM) philosophy, and values
   - `/services` — Full services catalog with search and residential/commercial filtering
   - `/services/:slug` — Dynamic service detail pages (Cockroach Control, Termite Control, Bed Bug Treatment, Rodent Control, etc.)
   - `/residential` — Residential pest control solutions
   - `/commercial` — Enterprise & commercial hygiene compliance
   - `/service-areas` — Operational cities and localities
   - `/contact` — Comprehensive contact page & quote request form
   - `/privacy` & `/terms` — Legal privacy policy and terms of engagement
   - `/admin/login` — Administrator authentication
   - `/admin/config` — Business configuration dashboard

## Administrator Login

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_TOKEN_SECRET` in `.env` before running the site. There are no default administrator credentials. Use separate, randomly generated values for the password and token secret.

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy .env.example to .env and set the administrator secrets

# 3. Run development server (Express backend + Vite)
npm run dev

# 4. Build for production
npm run build

# 4. Start production server
npm start
```

## Deploying to Vercel

Import this repository into Vercel and deploy with the detected settings, or use `vercel` from the project directory. The Vercel configuration builds the Vite site into `dist`, serves the SPA routes, and exposes the Express API through a serverless function. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_TOKEN_SECRET` in the Vercel project environment variables before deployment; use new secret values rather than the examples above.

The API currently stores configuration and enquiries in local JSON files. Vercel functions only have temporary writable storage, so these changes can be lost when an instance is recycled. Connect a persistent database or storage service before relying on the admin dashboard or enquiry records in production.
