<div align="center">

<img src="https://i.ibb.co.com/zTNX00RL/Godagari-Central-Hospital-Showcase.png" alt="Godagari Central Hospital" width="100%" />

# 🏥 Godagari Central Hospital

### গোদাগাড়ী সেন্ট্রাল হাসপাতাল

**A fast, mobile-first hospital website — find a doctor, explore services, and reach the hospital in one tap.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/hosting)

![Status](https://img.shields.io/badge/status-Phase_1_·_Static_Site-0D9488?style=flat-square)
![Backend](https://img.shields.io/badge/backend-none-64748B?style=flat-square)
![Node](https://img.shields.io/badge/node-%E2%89%A5_20-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Made in](https://img.shields.io/badge/made_in-Bangladesh_🇧🇩-006A4E?style=flat-square)

[Features](#-features) · [Pages](#-pages--routes) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Content Guide](#-managing-content) · [Deployment](#-deployment) · [Roadmap](#-roadmap)

</div>

---

## 📖 About

**Godagari Central Hospital** serves the community of Godagari upazila, Rajshahi — an area where many visitors browse on low-end phones and slow mobile networks. This website is built around that reality:

> 🎯 **Get a patient from "I need help" to a phone call, appointment request, or emergency contact in a single tap, from any page.**

It is a statically exported **Next.js (App Router)** site with **no backend and no database**. All content lives in typed TypeScript files, so hospital staff or a developer can update doctors, services and notices by editing one file and redeploying.

### Design goals

| | Goal |
|---|---|
| ⚡ | **Fast** — pure static export, SVG icons, lazy-loaded map, no heavy animation |
| 📱 | **Mobile-first** — sticky bottom action bar and floating emergency button |
| 🩺 | **Findable** — locate the right doctor by speciality, day, or name in seconds |
| 🤝 | **Trustworthy** — registration details, facilities and clear contact info up front |
| 🛠️ | **Easy to maintain** — typed data files instead of a CMS |

---

## ✨ Features

- 🔎 **Smart doctor directory** — filter by speciality, available day, "available today" (Asia/Dhaka time) and name search; filters are kept in the URL so results are shareable.
- 🗓️ **Appointment requests** — a validated form (React Hook Form + Zod) that only offers a doctor's real visiting days, then prepares a pre-filled **WhatsApp** message for the visitor to review and send.
- 🚨 **Always-visible emergency access** — floating emergency button, mobile bottom action bar, and a dedicated emergency page with what to bring and first-aid guidance.
- 🏢 **Departments & doctor profiles** — statically generated detail pages for each department, doctor and notice.
- 🧪 **Services & diagnostics** — categorised service catalogue with in-page search and a diagnostic test price list.
- 🏗️ **Facilities** — emergency, pathology lab, imaging centre, pharmacy, consultation chambers, observation beds and more.
- 📢 **Notices board** — pinned and categorised notices (Announcement, Health Camp, Holiday, Job) with detail pages.
- ❓ **FAQ section** — "Before your visit" answers on the home page.
- 📍 **Location & directions** — lazy-loaded Google Maps embed with *Open in Maps* and *Get Directions* buttons.
- 🌐 **Bilingual identity** — hospital name and tagline in English and বাংলা.
- 🎨 **Calm, clinical design system** — teal brand colour on white; red is reserved for emergencies only (see [`style.md`](./style.md)).
- 🔒 **Privacy-friendly** — no accounts, no tracking, and no patient data stored; submissions never touch a server.

---

## 🗺️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — hero, quick doctor search, highlights, notices, FAQ, map |
| `/about` | Hospital overview, registration info |
| `/departments` | All departments |
| `/departments/[slug]` | Department detail with its doctors and services |
| `/doctors` | Doctor directory with filters |
| `/doctors/[slug]` | Doctor profile, schedule, room, book / call buttons |
| `/services` | Searchable service catalogue |
| `/facilities` | Facilities and equipment |
| `/appointment` | Appointment request → WhatsApp hand-off |
| `/notices` · `/notices/[slug]` | Notice board and notice detail |
| `/emergency` | Emergency numbers, ambulance, what to bring, first-aid tips |
| `/contact` | Address, phones, hours, map and directions |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, static export) |
| UI library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/postcss` |
| Forms & validation | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Hosting | [Firebase Hosting](https://firebase.google.com/docs/hosting) |
| Linting | ESLint 9 + `eslint-config-next` |

---

## 📁 Project Structure

```text
.
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── about/
│   ├── appointment/        # AppointmentForm (RHF + Zod) → WhatsApp
│   ├── contact/
│   ├── departments/[slug]/
│   ├── doctors/[slug]/     # DoctorsClient / DoctorDirectory (URL-synced filters)
│   ├── emergency/
│   ├── facilities/
│   ├── notices/[slug]/
│   ├── services/           # ServiceCatalog
│   ├── globals.css         # Tailwind + design tokens
│   └── layout.tsx
├── components/
│   ├── layout/             # Header, Footer, MobileActionBar, EmergencyFab
│   └── PageHeading.tsx
├── data/                   # ✏️ All site content (typed)
│   ├── hospital.ts         # Name, contacts, hours, map links, registration
│   ├── departments.ts
│   ├── doctors.ts
│   ├── services.ts
│   ├── facilities.ts
│   ├── diagnostics.ts
│   ├── notices.ts
│   ├── faqs.ts
│   └── types.ts
├── lib/                    # Helpers (utils, icon map)
├── images/                 # Repository images
├── public/                 # Static assets
├── PRD.md                  # Product requirements
├── style.md                # Design system
├── firebase.json           # Hosting config
└── next.config.ts          # output: "export"
```

---

## 🚀 Getting Started

**Requirements:** [Node.js](https://nodejs.org/) 20 or newer and npm.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/Godagari-Central-Hospital-NextJs.git
cd Godagari-Central-Hospital-NextJs

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create the static production build in `out/` |
| `npm run start` | Serve a production build |
| `npm run lint` | Run ESLint |

---

## 🧾 Managing Content

No CMS needed — edit the typed files in [`data/`](./data) and redeploy.

| File | What to update |
|---|---|
| `hospital.ts` | Phone numbers, WhatsApp number, email, address, OPD hours, map links, Facebook URL |
| `departments.ts` | Departments, descriptions, services, timings |
| `doctors.ts` | Doctor name, degrees, department, schedule, room, fee |
| `services.ts` / `diagnostics.ts` | Service catalogue and test prices |
| `facilities.ts` | Facility cards |
| `notices.ts` | Announcements, health camps, holidays, vacancies |
| `faqs.ts` | Home page FAQs |

**Example — adding a doctor:**

```ts
// data/doctors.ts
{
  slug: "dr-example-name",
  name: "Dr. Example Name",
  degrees: "MBBS, FCPS (Medicine)",
  departmentSlug: "general-medicine",
  designation: "Consultant",
  schedule: [
    { day: "sat", from: "17:00", to: "21:00" },
    { day: "mon", from: "17:00", to: "21:00" },
  ],
  room: "101",
  fee: 500,
}
```

Routes, filters and the appointment form pick up the new entry automatically.

---

## ⚠️ Before Going Live

> **This repository currently ships with demo / placeholder content.** Do not publish it as-is.

- [ ] Replace **demo doctors** (marked `(Demo)` / `isDemo: true`) with confirmed doctors and schedules
- [ ] Replace placeholder **phone numbers** (`01XXX-XXXXXX`) and the **email** in `data/hospital.ts`
- [ ] Confirm the **WhatsApp number** used by the appointment flow
- [ ] Verify the **address and Google Maps** embed/location
- [ ] Replace demo **prices**, **services** and **notices** with approved information
- [ ] Add the real **Facebook page** link, logo and photos
- [ ] Run `npm run lint` and `npm run build`

> 💡 Several hospitals in Godagari have similar names. Make sure no contact details from other facilities are used here (see `hospital-info.txt`).

The **registration number** (`81-34-2-021-00004`, DIFE) comes from the public DIFE LIMA record.

---

## 🔐 Privacy & Data Handling

- The site is **fully static** — there is no server, database or analytics collecting visitor data.
- The appointment form validates in the browser, then opens **WhatsApp with a pre-filled message**. The visitor reviews and sends it; nothing is stored by the site.
- Visitors are advised not to enter sensitive medical details in the optional note field.

---

## ☁️ Deployment

The site uses `output: "export"`, so `npm run build` generates a plain static site in `out/`, which can be hosted anywhere.

### Firebase Hosting (preconfigured)

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

`firebase.json` serves `out/` with clean URLs; the project alias is set in `.firebaserc`.

### Other hosts

Upload the `out/` folder to Netlify, Vercel (static), Cloudflare Pages, GitHub Pages or any static file host.

---

## 🎨 Design System

| Token | Colour | Use |
|---|---|---|
| Primary 600 | `#0D9488` | Brand colour, primary buttons |
| Primary 50 | `#F0FDFA` | Tinted section backgrounds |
| Accent | `#2563EB` | Links and secondary info |
| Emergency | `#DC2626` | **Emergency actions only** |
| Success | `#16A34A` | "Available today" / open now |
| Ink 900 | `#0F172A` | Headings |

Full guidelines are in [`style.md`](./style.md); product requirements are in [`PRD.md`](./PRD.md).

---

## 🛣️ Roadmap

- [x] **Phase 1** — static informational site, doctor filters, WhatsApp appointment hand-off
- [ ] Replace demo content with verified hospital data
- [ ] Bangla language toggle for page content
- [ ] API route for appointments with email/SMS notification
- [ ] Admin dashboard for managing doctors and notices
- [ ] Online report downloads and patient portal
- [ ] SEO: sitemap, structured data and social preview images

---

## 🤝 Contributing

Contributions, issues and suggestions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please run `npm run lint` and `npm run build` before submitting.

---

## 📄 License

No license file is included yet. Add one (for example MIT) before publishing if you want others to reuse the code. Hospital name, logo and content remain the property of Godagari Central Hospital.

---

<div align="center">

**Built with ❤️ for the people of Godagari, Rajshahi, Bangladesh**

🏥 *Trusted Healthcare in the Heart of Godagari*

</div>
