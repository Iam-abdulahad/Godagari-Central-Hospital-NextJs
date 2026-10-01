# PRD — Hospital Website (Next.js)

**Project:** Godagari General Hospital & Diagnostic Center (GGH) website
**Version:** 1.0 (Phase 1)
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · static JSON data

---

## 1. Overview

A simple, minimal, fast and professional website that helps patients quickly **find a doctor, understand services, and reach the hospital** by call, appointment request, or emergency contact. Phase 1 has no backend: content lives in typed data files and is easy to edit.

### Goals
1. Let a visitor reach the hospital (call / emergency / appointment) in **one tap** from any page.
2. Let a visitor find the right doctor by **speciality** and **available day** in under 10 seconds.
3. Build trust: clear information, registration number, facilities, equipment, location.
4. Load fast on low-end phones and slow mobile networks (target audience in rural Bangladesh).

### Non-goals (Phase 1)
- No user accounts, payments, or patient records.
- No real-time slot booking (appointment is a *request*, confirmed by phone).
- No admin dashboard (content edited in code/JSON).

### Target users
| User | Need |
|---|---|
| Patient / family | Find doctor, timing, contact, location |
| Emergency caller | Instantly call emergency / ambulance |
| Referring doctor / visitor | Check diagnostic services & equipment |

---

## 2. Information Architecture

| # | Page / Section | Route |
|---|---|---|
| 1 | Home | `/` |
| 2 | About Hospital | `/about` |
| 3 | Departments | `/departments` (+ `/departments/[slug]`) |
| 4 | Doctors | `/doctors` (+ `/doctors/[slug]`) |
| 5 | Services | `/services` |
| 6 | Facilities | `/facilities` |
| 7 | Appointment | `/appointment` |
| 8 | Notices | `/notices` (+ `/notices/[slug]`) |
| 9 | Contact | `/contact` |
| 10 | Google Map | Embedded section on Contact + Home footer area |
| 11 | Emergency Information | `/emergency` |

**Global elements:** sticky header with nav, mobile bottom action bar, footer, floating emergency button.

---

## 3. Feature Requirements

### 3.1 Page requirements

**Home**
- Hero: hospital name, one-line tagline, primary CTAs (*Book Appointment*, *Call Emergency*).
- Quick-find strip: search doctor by speciality + day → goes to `/doctors` with filters applied.
- Highlights: key departments (6 cards), services, trust numbers (reg. no., years, doctors, beds — only real data).
- Latest notices (3), emergency info banner, location mini-map, contact summary.

**About Hospital**
- Short story, mission/vision, registration info, management message (optional), photo gallery.

**Departments**
- Grid of departments with icon, short description, doctor count.
- Detail page: description, services offered, doctors of that department, timing.

**Doctors**
- Card grid + **filters** (see 3.2). Detail page: photo, name, degrees, speciality, designation, visiting days/times, chamber/room, **Book / Call** buttons.

**Services**
- Categorised list: Consultation, Diagnostics (Pathology, Ultrasound, X-Ray, ECG, Echo), Emergency, Inpatient, etc. Search within services.

**Facilities**
- Cards for: Emergency, ICU/CCU (if any), OT, Pathology lab, Imaging, Pharmacy, Cabin/Ward, Ambulance, Parking.
- **Equipment list** (diagnostic machines) shown as a clean table/grid.

**Appointment**
- Form: patient name, phone, age, gender, department, doctor (filtered by department), preferred date (only doctor's available days enabled), note.
- On submit (Phase 1): validate → show confirmation + **open WhatsApp / SMS prefilled** or `tel:` fallback. Phase 2: API route + email/SMS.
- Alternative quick buttons: *Call to book*, *WhatsApp*.

**Notices**
- List with date, category (Notice / Health Camp / Holiday / Job), pinned items, detail page; optional PDF/image attachment.

**Contact**
- Address, phone numbers (tap-to-call), email, working hours, contact form (mailto/WhatsApp in Phase 1), embedded Google Map, "Get Directions" button.

**Google Map**
- Lazy-loaded iframe embed + *Open in Google Maps* and *Get Directions* buttons.

**Emergency Information**
- Big emergency number with call button, ambulance info, 24/7 status, what to bring, nearest-route directions, first-aid quick tips (short, static, reviewed by hospital doctors).

### 3.2 Doctor filtering (extra feature)

| Filter | Type | Behaviour |
|---|---|---|
| Speciality / Department | Dropdown or chips | Single select, "All" default |
| Available day | Day chips (Sat–Fri) | Multi-select; shows doctors available on **any** selected day |
| "Available Today" | Toggle | Uses current day in `Asia/Dhaka` |
| Search by name | Text input | Debounced, case-insensitive |
| Sort | Select | Name A–Z, Earliest available |

Requirements:
- Filters are **reflected in the URL** (`?speciality=cardiology&day=sat,mon`) so results are shareable and survive refresh.
- Instant client-side filtering (dataset is small), no page reload.
- Result count + "Clear all filters" button; friendly empty state with *Call hospital* CTA.
- Cards show **availability chips** for the 7 days (active days highlighted) and today's availability badge.

### 3.3 Action buttons (extra feature)

- **Desktop:** header shows *Emergency* (red) and *Book Appointment* (primary) buttons.
- **Mobile:** sticky **bottom action bar** with 3 buttons — 📞 Call · 🚑 Emergency · 📅 Appointment (+ WhatsApp if available).
- **Floating emergency button** on every page (bottom-right desktop).
- All phone buttons use `tel:` links; WhatsApp uses `https://wa.me/<number>?text=<prefilled>`.
- Doctor cards: *Book* and *Call* buttons per doctor.

### 3.4 Other necessary information (extra)

- **Visiting hours** and OPD timing; 24/7 emergency indicator ("Open now" badge computed from hours).
- **Diagnostic test list** (name + indicative price, optional) with search.
- **FAQ** accordion (appointment, reports, visiting policy, payment).
- **Patient guide:** what to bring, report collection, admission process.
- Hospital **registration number**, license, and legal info in footer.
- **Social links** and share buttons for notices.
- Optional later: Bangla/English toggle, blood donor list, health packages, report download.

---

## 4. Data Model (typed JSON in `/data`)

```ts
type Day = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";

interface Department { slug: string; name: string; icon: string; description: string; }

interface Doctor {
  slug: string;
  name: string;
  degrees: string;            // "MBBS, FCPS (Medicine)"
  departmentSlug: string;
  designation: string;
  photo?: string;
  schedule: { day: Day; from: string; to: string }[]; // "17:00"
  room?: string;
  fee?: number;
  phone?: string;
}

interface Service { slug: string; name: string; category: string; description?: string; price?: number; }
interface Facility { slug: string; name: string; description: string; image?: string; }
interface Equipment { name: string; model: string; purpose: string; }
interface Notice { slug: string; title: string; date: string; category: string; body: string; pinned?: boolean; attachment?: string; }
```

> Doctor, price and notice content must be supplied/approved by the hospital. Use clearly marked placeholders until then — never invent credentials.

---

## 5. Hospital Details (seed data)

- **Name:** Godagari General Hospital & Diagnostic Center (GGH)
- **Address:** National Bank Building, Dhaingpara Mor, Godagari, Rajshahi
- **Office:** 01782-803545, 01728-007724
- **Emergency:** 01713-734510
- **Hotline:** 01728-007724
- **Govt. Reg. No.:** 2162
- **Equipment (from RajDoc listing):** Dymind hematology analyzers, MISPA biochemistry analyzer, AFIAS-6, GE Voluson S8, Labomed FACA-200/380, Riele RA 5010, Reetoo RT-U600, Edan Acclarix LX28

---

## 6. Technical Requirements

| Area | Decision |
|---|---|
| Framework | Next.js 15, App Router, React Server Components by default |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables (see `style.md`) |
| UI primitives | shadcn/ui (Radix) for Select, Accordion, Dialog, Sheet — optional |
| Icons | `lucide-react` |
| Fonts | `next/font` (Inter + Plus Jakarta Sans) |
| Forms | `react-hook-form` + `zod` |
| Data | Static TS/JSON in `/data` (Phase 1) |
| Images | `next/image`, WebP/AVIF, lazy loading |
| SEO | Metadata API, sitemap.xml, robots.txt, OpenGraph, `Hospital` / `Physician` JSON-LD |
| Analytics | Optional (Vercel Analytics / GA4) |
| Hosting | Vercel (or any Node host) |

### Suggested structure
```
app/
  layout.tsx
  page.tsx
  about/ departments/ doctors/ services/ facilities/
  appointment/ notices/ contact/ emergency/
components/
  layout/ (Header, Footer, MobileActionBar, EmergencyFab)
  doctors/ (DoctorCard, DoctorFilters, DayChips)
  ui/
data/ (doctors.ts, departments.ts, services.ts, notices.ts, hospital.ts)
lib/ (utils.ts, schedule.ts, constants.ts)
public/ (logo, images)
```

---

## 7. Non-Functional Requirements

- **Performance:** Lighthouse ≥ 90 mobile (Performance, SEO, Best Practices, Accessibility). LCP < 2.5 s on 4G. Total JS per page < 150 KB where possible.
- **Accessibility:** WCAG 2.1 AA — contrast, focus states, keyboard navigation, labelled form fields, 44 px minimum touch targets.
- **Responsive:** mobile-first (360 px up); most traffic expected from phones.
- **Browser support:** last 2 versions of Chrome, Safari, Edge, Firefox; Android WebView.
- **Privacy:** no sensitive medical data stored; appointment data only sent via user-initiated WhatsApp/SMS in Phase 1.
- **Content language:** English first; structure ready for Bangla (i18n-ready strings).

---

## 8. Acceptance Criteria (Phase 1)

- [ ] All 11 sections from the feature list exist and are reachable from the nav/footer.
- [ ] Doctor filters (speciality, day, available today, search) work and sync to URL.
- [ ] Call, Emergency, Appointment buttons visible on every page on mobile and desktop.
- [ ] Appointment form validates and hands off to WhatsApp/call.
- [ ] Google Map loads lazily with directions button.
- [ ] Lighthouse mobile ≥ 90 on Home, Doctors, Contact.
- [ ] No hard-coded content in components — everything comes from `/data`.
- [ ] Works fully without JavaScript for core info (SSR/SSG).

---

## 9. Milestones

| Milestone | Scope |
|---|---|
| M1 — Foundation | Project setup, tokens, layout, header/footer, action bar, data files |
| M2 — Core pages | Home, About, Departments, Services, Facilities |
| M3 — Doctors | Listing, filters, detail page, availability logic |
| M4 — Conversion | Appointment, Emergency, Contact + Map |
| M5 — Content & polish | Notices, FAQ, SEO/JSON-LD, performance and a11y pass |
| M6 — Launch | Real content, domain, analytics, handover guide |

---

## 10. Future (Phase 2+)

Admin panel / headless CMS, real appointment booking with SMS confirmation, online report download, Bangla toggle, health packages, patient feedback, payments.

---

## 11. Open Questions

1. Final list of departments, doctors, schedules and fees (hospital to confirm).
2. WhatsApp number to use for appointments.
3. Is ICU / OT / ambulance service available (affects Facilities & Emergency pages)?
4. Official email, social pages, and Google Maps location link.
5. Bangla version needed at launch or later?
