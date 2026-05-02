# Project Status & Architecture Plan

## 📁 Current File Structure

```text
hafizhasib.com/
├── app/
│   ├── [locale]/                 # Dynamic i18n routing
│   │   ├── admin/
│   │   │   └── page.tsx          # Teacher Dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Student Dashboard
│   │   ├── free-trial/
│   │   │   └── page.tsx          # Free Trial Booking Page
│   │   ├── layout.tsx            # Multi-language root HTML layout
│   │   └── page.tsx              # Landing Page (Hero, Sections)
│   └── globals.css               # Tailwind CSS v4 Theme Tokens
├── components/
│   └── booking/
│       ├── BookingCalendar.tsx   # React Big Calendar wrapper
│       └── FreeTrialForm.tsx     # Interactive Booking Form
├── i18n/
│   ├── request.ts                # Next-intl configuration loader
│   └── routing.ts                # App supported locales setup
├── locales/
│   ├── ar.json                   # Arabic strings 
│   ├── bn.json                   # Bengali strings
│   └── en.json                   # English strings
├── middleware.ts                 # Next.js i18n routing logic
├── next.config.ts                # Next.js config w/ next-intl plugin
└── tailwind.config.ts / etc.     # Base environment configs
```

---

## 🟢 Completed Features (Built So Far)

1. **Core Framework & Environment**
   - Initialized Next.js 15 App Router with Tailwind CSS (`app/globals.css`, `next.config.ts`).
   - Defined strict design variables (Deep Emerald Green, Accent Gold, Soft Cream).
   
2. **Multi-Language (i18n) System**
   - Configured `next-intl` to support English, Arabic (RTL), and Bengali.
   - Connected `middleware.ts` to detect and redirect based on user locale.
   - Configured font loading dynamically: *Inter* (EN), *Amiri* (AR), *Hind Siliguri* (BN) inside `app/[locale]/layout.tsx`.
   - Setup translation JSON mappings for the Hero section and navigation components.

3. **Landing Page UI**
   - Built the Hero block parsing custom strings from localized files (`app/[locale]/page.tsx`).
   - Developed the top navigation bar with dynamic Language Toggle links (EN | BN | AR).
   
4. **Interactive Booking Logic**
   - Implemented an interactive weekly calendar (`components/booking/BookingCalendar.tsx`) using `react-big-calendar`.
   - Connected interactive Free Trial Registration form (`components/booking/FreeTrialForm.tsx`) featuring loading states, form validations, and asynchronous submission mocks.

5. **Application Dashboards (Scaffolded)**
   - Initialized a responsive Student Dashboard UI (`app/[locale]/dashboard/page.tsx`) showing "Next Class", "Surah Progress tracker", and "Notes".
   - Initialized Teacher Admin portal (`app/[locale]/admin/page.tsx`) featuring a sidebar, revenue metrics, and booking grid outline.

---

## 🟡 Pending Features (Remaining to Build)

### 1. Database Integration (PostgreSQL via Supabase/PlanetScale)
- **Pending Files**: `lib/db.ts`, setup of ORM (Prisma or Drizzle).
- **Goal**: Provision live database schema (`users`, `bookings`, `payments`, `availability`, etc.). Make the Free Trial Booking actually save to a database.

### 2. User Authentication
- **Pending Files**: `components/auth/*`, updates to `middleware.ts`, `app/api/auth/*`.
- **Goal**: Introduce Clerk or Supabase Auth. Differentiate user tokens for Teacher (`admin`) access vs Student (`dashboard`) access.

### 3. Complete Landing Page Content Sections
- **Pending Files**: Additions to `app/[locale]/page.tsx`.
- **Goal**: Finalize About Section, Subjects Section (Tajweed, Hifz), testmonials, FAQ accordion, and floating WhatsApp widget.

### 4. International Payment Gateway
- **Pending Files**: `app/api/checkout/route.ts`, `components/payment/CheckoutButton.tsx`.
- **Goal**: Introduce Stripe implementation logic for global cards, and SSLCommerz dynamic routing for Bangladeshi BDT payments. Include dynamic currency conversion UI on the pricing cards.

### 5. Automated Video Conferencing Links
- **Pending Files**: `app/api/bookings/route.ts`, `lib/zoom.ts` or `lib/googleMeet.ts`.
- **Goal**: When a booking (free or paid) clears, use internal Google Calendar/Meet API or Zoom Server-to-Server to instantly generate a meeting link and insert it into the booking confirmation.

### 6. Email Automation (Resend / Nodemailer)
- **Pending Files**: `lib/email.ts`, `components/emails/*`.
- **Goal**: Send beautifully formatted HTML confirmation templates out containing the schedule parameters and video meeting links.
