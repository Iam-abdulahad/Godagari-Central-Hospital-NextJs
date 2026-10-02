import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Siren,
  MessageCircle,
} from "lucide-react";
import { HOSPITAL } from "@/data/hospital";

function GithubMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.73.084-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.696.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.999h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.287zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V8.999h3.554v11.453zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

const DEVELOPER = {
  name: "Md Ahad Ali",
  role: "MERN Stack Developer",
  email: "md.ahad6619@gmail.com",
  portfolio: "https://ahad-dev.web.app/",
  github: "https://github.com/Iam-abdulahad",
  linkedin: "https://www.linkedin.com/in/iam-abdulahad/",
} as const;

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              {HOSPITAL.name}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-slate-400">
              {HOSPITAL.tagline}
            </p>
            <p className="text-xs text-slate-500">
              Contact hospital management to verify current services, visiting
              schedules, and contact information.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/doctors", label: "Find a Doctor" },
                { href: "/departments", label: "Departments" },
                { href: "/services", label: "Services" },
                { href: "/appointment", label: "Book Appointment" },
                { href: "/notices", label: "Notices" },
                { href: "/emergency", label: "Emergency Info" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-primary-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-primary-500"
                />
                <span>{HOSPITAL.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL.phoneOfficeTel}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-primary-500"
                >
                  <Phone size={16} className="shrink-0 text-primary-500" />
                  Office: {HOSPITAL.phoneOffice}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL.phoneEmergencyTel}`}
                  className="flex items-center gap-2.5 text-sm font-medium text-emergency-500 transition-colors hover:text-red-400"
                >
                  <Siren size={16} className="shrink-0" />
                  Emergency: {HOSPITAL.phoneEmergency}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${HOSPITAL.phoneWhatsAppTel}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-green-400"
                >
                  <MessageCircle
                    size={16}
                    className="shrink-0 text-green-400"
                  />
                  WhatsApp: {HOSPITAL.phoneWhatsApp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOSPITAL.email}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-primary-500"
                >
                  <Mail size={16} className="shrink-0 text-primary-500" />
                  {HOSPITAL.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Hours & Location
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-primary-500" />
                <div>
                  <p className="font-medium text-white">OPD</p>
                  <p className="text-slate-400">{HOSPITAL.opdHours} (Daily)</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Siren
                  size={16}
                  className="mt-0.5 shrink-0 text-emergency-500"
                />
                <div>
                  <p className="font-medium text-white">Emergency</p>
                  <p className="text-slate-400">24 hours / 7 days</p>
                </div>
              </li>
            </ul>

            <a
              href={HOSPITAL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary-500 transition-colors hover:text-primary-100"
            >
              <MapPin size={14} />
              View on Google Maps
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-700/70 bg-slate-800/50 p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
                Website Developer
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-white">
                {DEVELOPER.name}
              </h3>
              <p className="text-sm text-slate-400">{DEVELOPER.role}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${DEVELOPER.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-600 px-3 text-sm font-medium text-slate-200 transition-colors hover:border-primary-500 hover:text-white"
              >
                <Mail size={16} /> Email
              </a>
              <a
                href={DEVELOPER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-600 px-3 text-sm font-medium text-slate-200 transition-colors hover:border-primary-500 hover:text-white"
              >
                <LinkedinMark size={16} /> LinkedIn
              </a>
              <a
                href={DEVELOPER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-600 px-3 text-sm font-medium text-slate-200 transition-colors hover:border-primary-500 hover:text-white"
              >
                <GithubMark size={16} /> GitHub
              </a>
              <a
                href={DEVELOPER.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-600 px-3 text-sm font-medium text-slate-200 transition-colors hover:border-primary-500 hover:text-white"
              >
                <Globe size={16} /> Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/50">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {HOSPITAL.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed & developed by {DEVELOPER.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
