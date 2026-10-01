# style.md — Hospital Website Design System

Direction: **clean, calm, trustworthy.** Lots of white space, one confident brand colour, a single red reserved for emergency. Minimal decoration; clarity beats flair.

---

## 1. Principles

1. **Calm & clinical, not cold.** Soft teal on white, warm neutrals, friendly rounded corners.
2. **Action first.** Call / Emergency / Appointment are always visible and always the most prominent elements.
3. **Scannable.** Short headings, generous spacing, one idea per card.
4. **Red means emergency only.** Never use red for decoration or normal errors-as-branding.
5. **Fast.** System-light visuals: SVG icons, optimised photos, no heavy animation.

---

## 2. Colour Tokens

| Token | Hex | Use |
|---|---|---|
| `--primary-50` | `#F0FDFA` | Tinted section backgrounds |
| `--primary-100` | `#CCFBF1` | Chips, hover tints |
| `--primary-500` | `#14B8A6` | Accents, icons |
| `--primary-600` | `#0D9488` | **Brand / primary buttons** |
| `--primary-700` | `#0F766E` | Hover / active |
| `--primary-900` | `#134E4A` | Dark headings on tint |
| `--accent-500` | `#2563EB` | Links, secondary info |
| `--emergency-500` | `#DC2626` | **Emergency button/banner only** |
| `--emergency-50` | `#FEF2F2` | Emergency card background |
| `--success-600` | `#16A34A` | "Available today", open now |
| `--warning-500` | `#F59E0B` | Notices, pinned |
| `--ink-900` | `#0F172A` | Headings |
| `--ink-700` | `#334155` | Body text |
| `--ink-500` | `#64748B` | Muted text |
| `--line` | `#E2E8F0` | Borders, dividers |
| `--surface` | `#FFFFFF` | Cards, page |
| `--surface-muted` | `#F8FAFC` | Alternate sections |

Contrast: body text on white ≥ 7:1; white on `primary-600` ≥ 4.5:1; white on `emergency-500` ≥ 4.5:1.
Dark mode: **not in Phase 1** (keep light only for simplicity).

---

## 3. Typography

| Role | Font | Weight | Size (mobile → desktop) | Line height |
|---|---|---|---|---|
| Display / H1 | Plus Jakarta Sans | 700 | 32 → 52 px | 1.15 |
| H2 | Plus Jakarta Sans | 700 | 24 → 36 px | 1.2 |
| H3 | Plus Jakarta Sans | 600 | 18 → 22 px | 1.3 |
| Body | Inter | 400 | 16 px | 1.65 |
| Small / caption | Inter | 400–500 | 13–14 px | 1.5 |
| Button / label | Inter | 600 | 15–16 px | 1 |

- Load via `next/font/google` with `display: swap`.
- Bangla-ready: add `Hind Siliguri` as a fallback family for Bangla text.
- Max text line length: ~70 characters (`max-w-prose`).

---

## 4. Spacing, Layout & Shape

- **Spacing scale:** Tailwind default (4 px base). Section padding: `py-12 md:py-20`. Card padding: `p-5 md:p-6`.
- **Container:** `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Grid:** 1 col (mobile) → 2 (`sm`) → 3 (`lg`) → 4 for doctors on `xl`. Gap `gap-5 md:gap-6`.
- **Breakpoints:** Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Design mobile first from 360 px.
- **Radius:** inputs/buttons `rounded-xl` (12 px), cards `rounded-2xl` (16 px), chips `rounded-full`.
- **Borders:** 1 px `--line`. Prefer borders over heavy shadows.
- **Shadows:** `shadow-sm` for cards at rest; `shadow-md` on hover; `shadow-lg` only for sticky bars/modals.
- **Header height:** 64 px (mobile), 72 px (desktop). Sticky with subtle blur + bottom border.

---

## 5. Components

### Buttons
| Variant | Style | Use |
|---|---|---|
| Primary | `bg-primary-600 text-white hover:bg-primary-700` | Book Appointment |
| Emergency | `bg-emergency-500 text-white hover:bg-red-700` + pulse dot | Call Emergency |
| Secondary | `border border-primary-600 text-primary-700 hover:bg-primary-50` | View details |
| Ghost | `text-ink-700 hover:bg-surface-muted` | Nav items, minor actions |
| Call (outline) | phone icon + number | Tap-to-call |

Sizes: `h-11` default (44 px touch target), `h-12` hero CTAs, `h-9` compact. Always icon + label for key actions. Focus ring: `ring-2 ring-primary-500 ring-offset-2`.

### Header / Nav
White background, logo left, nav centre, **Emergency** + **Book** buttons right. Mobile: hamburger → full-height sheet with large tap rows and the action buttons pinned at the bottom.

### Mobile Action Bar (sticky bottom)
3 equal buttons — **Call · Emergency · Appointment** — white background, top border, `shadow-lg`, safe-area padding (`pb-[env(safe-area-inset-bottom)]`). Emergency icon in red, others in primary. Hidden on `md` and up.

### Floating Emergency Button (desktop)
Fixed bottom-right, red pill with phone icon + "Emergency", subtle pulse ring (disabled for `prefers-reduced-motion`).

### Doctor Card
Photo (4:5, rounded-xl, fallback avatar with initials) · name (H3) · degrees (muted) · speciality badge · **7-day availability chips** (S M T W T F S; active = `primary-100` text `primary-700`, inactive = `ink-300`) · "Available today" green badge · footer with **Book** (primary) and **Call** (secondary icon button).

### Filter Bar (Doctors)
Sticky under header on scroll. Speciality select + day chips + "Available today" switch + search input + "Clear all". On mobile it collapses into a **Filters** button opening a bottom sheet. Selected chips: `bg-primary-600 text-white`; unselected: `bg-white border`.

### Cards (Department / Service / Facility)
White, `rounded-2xl`, 1 px border, icon in a 44 px `primary-50` circle (icon colour `primary-600`), title, 2-line description, optional "Learn more →". Hover: `-translate-y-0.5 shadow-md`.

### Badges
Pill, `text-xs font-semibold px-2.5 py-1`. Variants: neutral, primary, success (Open now / Available), warning (Pinned / Notice), emergency (24/7 Emergency).

### Forms
Label above input, `h-11`, `rounded-xl`, border `--line`, focus ring primary. Inline validation message in `emergency-500` text with icon (small, not a banner). Required fields marked with `*`. Date picker disables doctor's off-days.

### Notices
List rows: date block (day / month) · title · category badge · chevron. Pinned items get a warning-tinted left border.

### Emergency Banner
`bg-emergency-50 border border-red-200 rounded-2xl`, red phone icon, big tap-to-call number (`text-2xl font-bold`), 24/7 text. Used on Home, Emergency page and footer.

### Map Embed
`rounded-2xl overflow-hidden border`, 16:9 (mobile 4:3), lazy-loaded, with **Get Directions** button overlay/below.

### Footer
`bg-ink-900 text-slate-300`. 4 columns (About, Quick links, Contact, Hours). Reg. no. and copyright at the bottom. Emergency number highlighted.

### Accordion (FAQ)
Border-bottom rows, `+/–` icon, smooth height transition (150–200 ms).

---

## 6. Iconography & Imagery

- **Icons:** `lucide-react`, 20–24 px, stroke 1.75, `currentColor`. One icon style only.
- **Photography:** real hospital photos (building, staff, equipment) preferred over stock. Natural light, no heavy filters. Rounded `2xl`, `object-cover`, always with `alt`.
- **Illustration:** none required; use subtle `primary-50` gradient blobs/pattern in hero sparingly.
- **Logo:** GGH logo on white; minimum 32 px height.

---

## 7. Motion

- Durations: 150 ms (hover/press), 250 ms (sheets, accordions). Easing `ease-out`.
- Allowed: fade-up on section reveal (once), card hover lift, button press `scale-[0.98]`, emergency pulse.
- Respect `prefers-reduced-motion`: disable pulse and reveals.
- No parallax, carousels with auto-play, or full-page transitions.

---

## 8. Accessibility

- Minimum touch target 44×44 px; spacing between adjacent actions ≥ 8 px.
- Visible focus ring on every interactive element; logical tab order.
- Don't rely on colour alone (availability chips also include text/aria-label like "Available Saturday").
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page.
- Phone links: `aria-label="Call emergency 01713-734510"`.
- Form errors announced with `aria-live="polite"`.

---

## 9. Tailwind Config (starter)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" } },
    extend: {
      colors: {
        primary: {
          50: "#F0FDFA", 100: "#CCFBF1", 500: "#14B8A6",
          600: "#0D9488", 700: "#0F766E", 900: "#134E4A",
        },
        accent: { 500: "#2563EB" },
        emergency: { 50: "#FEF2F2", 500: "#DC2626", 700: "#B91C1C" },
        success: { 600: "#16A34A" },
        warning: { 500: "#F59E0B" },
        ink: { 900: "#0F172A", 700: "#334155", 500: "#64748B", 300: "#CBD5E1" },
        line: "#E2E8F0",
        surface: { DEFAULT: "#FFFFFF", muted: "#F8FAFC" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Hind Siliguri", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: { xl: "0.75rem", "2xl": "1rem" },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(220,38,38,.45)" },
          "100%": { boxShadow: "0 0 0 12px rgba(220,38,38,0)" },
        },
      },
      animation: { "pulse-ring": "pulseRing 1.8s ease-out infinite" },
    },
  },
  plugins: [],
} satisfies Config;
```

```css
/* app/globals.css */
@tailwind base; @tailwind components; @tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-surface text-ink-700 antialiased; }
  h1, h2, h3 { @apply font-display text-ink-900 tracking-tight; }
  :focus-visible { @apply outline-none ring-2 ring-primary-500 ring-offset-2; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```

---

## 10. Do / Don't

| Do | Don't |
|---|---|
| Use one primary colour + red for emergency | Add extra accent colours or gradients everywhere |
| Keep cards simple: icon, title, 2 lines | Cram long paragraphs into cards |
| Show phone numbers as tap-to-call buttons | Show numbers as plain text on mobile |
| Use real photos and real data | Use fake doctors, stock-model "staff" or invented stats |
| Keep animations subtle | Auto-playing sliders, heavy parallax |
| Leave generous white space | Fill every pixel of the hero |

---

## 11. Page Rhythm (Home)

1. **Hero** — white → `primary-50` soft gradient, H1 + CTAs + quick doctor search
2. **Emergency banner** — `emergency-50`
3. **Departments** — white
4. **Why choose us / facilities** — `surface-muted`
5. **Doctors preview** — white
6. **Notices + FAQ** — `surface-muted`
7. **Map + contact** — white
8. **Footer** — `ink-900`

Alternating white / muted backgrounds create rhythm without extra decoration.
