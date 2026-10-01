# Godagari Central Hospital

Responsive informational website for Godagari Central Hospital, built with Next.js App Router, React, TypeScript, Tailwind CSS 4, and static typed data.

## Development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Available checks:

```bash
npm run lint
npm run build
```

## Routes

- `/` home and doctor quick search
- `/about` hospital overview
- `/departments` and `/departments/[slug]`
- `/doctors` and `/doctors/[slug]`
- `/services`, `/facilities`, and `/notices` with `/notices/[slug]`
- `/appointment` appointment request handoff to WhatsApp
- `/emergency` and `/contact` with map and directions

## Content and launch checklist

Site content is maintained in `data/`. Update `data/hospital.ts`, `departments.ts`, `doctors.ts`, `services.ts`, and `notices.ts` as hospital management confirms details. Doctor profiles, prices, schedules, phone numbers, registration information, address, and map location include demo or unverified content; do not publish or rely on them until confirmed.

The appointment form validates in the browser and prepares a WhatsApp message using `phoneWhatsAppTel` from `data/hospital.ts`. The visitor must review and send the message; the site does not store submissions. Replace the placeholder WhatsApp number before enabling appointment requests. Avoid entering sensitive medical details in the optional note.

Before production, verify all contact numbers and services, replace placeholder email/map links and metadata, supply approved notices, and run both lint and production build.