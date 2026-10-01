import Link from "next/link";
import { Phone, MapPin, Mail, Clock, Siren, ExternalLink } from "lucide-react";
import { HOSPITAL } from "@/data/hospital";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold font-display mb-4">
              {HOSPITAL.name}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-3">
              {HOSPITAL.tagline}
            </p>
            <p className="text-xs text-slate-500">
              Registration details require confirmation before launch.
              <br />
              Contact hospital management for verified legal information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
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
                    className="text-sm text-slate-400 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin size={16} className="text-primary-500 mt-0.5 shrink-0" />
                <span>{HOSPITAL.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL.phoneOfficeTel}`}
                  className="flex items-center gap-2.5 text-sm hover:text-primary-500 transition-colors"
                >
                  <Phone size={16} className="text-primary-500 shrink-0" />
                  Office: {HOSPITAL.phoneOffice}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL.phoneEmergencyTel}`}
                  className="flex items-center gap-2.5 text-sm text-emergency-500 hover:text-red-400 transition-colors font-medium"
                >
                  <Siren size={16} className="shrink-0" />
                  Emergency: {HOSPITAL.phoneEmergency}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOSPITAL.email}`}
                  className="flex items-center gap-2.5 text-sm hover:text-primary-500 transition-colors"
                >
                  <Mail size={16} className="text-primary-500 shrink-0" />
                  {HOSPITAL.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">OPD</p>
                  <p className="text-slate-400">{HOSPITAL.opdHours} (Daily)</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Siren size={16} className="text-emergency-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Emergency</p>
                  <p className="text-slate-400">24 hours / 7 days</p>
                </div>
              </li>
            </ul>

            <div className="mt-4">
              <a
                href={HOSPITAL.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-100 transition-colors"
              >
                <ExternalLink size={14} />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700/50">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {HOSPITAL.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 font-medium">
            Demo website — sample data only. Verify all contact and service information before use.
          </p>
        </div>
      </div>
    </footer>
  );
}
