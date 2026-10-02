"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  CalendarPlus,
  Siren,
  ChevronRight,
} from "lucide-react";
import { HOSPITAL } from "@/data/hospital";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/facilities", label: "Facilities" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the menu is open + close on Escape / when resized to desktop
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1536px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-line">
        <div className="container-custom flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-primary-700 text-lg md:text-xl shrink-0"
            aria-label={`${HOSPITAL.name} - Home`}
          >
            <span className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
              GCH
            </span>
            <span className="hidden sm:inline">{HOSPITAL.name}</span>
            <span className="sm:hidden">GCH</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden 2xl:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-primary-700 bg-primary-50"
                    : "text-ink-700 hover:text-primary-700 hover:bg-primary-50/50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={`tel:${HOSPITAL.phoneEmergencyTel}`}
              className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-emergency-500 text-white font-semibold text-sm hover:bg-emergency-700 transition-colors"
              aria-label={`Call Emergency ${HOSPITAL.phoneEmergency}`}
            >
              <Siren size={18} />
              Emergency
            </a>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
            >
              <CalendarPlus size={18} />
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="2xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-ink-700 hover:bg-surface-muted active:bg-surface-muted transition-colors touch-manipulation"
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {/* Mobile nav sheet */}
      {open && (
        <div
          id="mobile-nav"
          className="2xl:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white overflow-y-auto overscroll-contain pb-24"
        >
          <nav
            className="container-custom py-4 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-primary-700 bg-primary-50"
                    : "text-ink-700 hover:bg-surface-muted",
                )}
              >
                {link.label}
                <ChevronRight size={18} className="text-ink-300" />
              </Link>
            ))}

            <Link
              href="/emergency"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-emergency-500 hover:bg-emergency-50 transition-colors"
            >
              Emergency Info
              <ChevronRight size={18} />
            </Link>

            <div className="mt-4 flex flex-col gap-2 px-4">
              <a
                href={`tel:${HOSPITAL.phoneEmergencyTel}`}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-emergency-500 text-white font-semibold hover:bg-emergency-700 transition-colors"
              >
                <Phone size={18} />
                Call Emergency
              </a>
              <Link
                href="/appointment"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                <CalendarPlus size={18} />
                Book Appointment
              </Link>
              <a
                href={`tel:${HOSPITAL.phoneOfficeTel}`}
                className="flex items-center justify-center gap-2 h-12 rounded-xl border border-primary-600 text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
              >
                <Phone size={18} />
                Call Office
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
