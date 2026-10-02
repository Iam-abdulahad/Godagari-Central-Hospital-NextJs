import type { Metadata } from "next";
import {
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { HOSPITAL } from "@/data/hospital";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${HOSPITAL.phoneWhatsAppTel}?text=${encodeURIComponent(
    `Hello ${HOSPITAL.name}, I would like to know about doctor availability and appointment schedules.`,
  )}`;

  return (
    <>
      <PageHeading
        eyebrow="CONTACT & LOCATION"
        title="Plan your visit"
        description="Call or WhatsApp ahead to confirm opening hours, services, doctor schedules, and the current location."
      />

      <section className="container-custom grid gap-8 py-10 lg:grid-cols-[0.75fr_1.25fr] lg:py-14">
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-display text-lg font-semibold">
              Contact details
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary-700"
                />
                <span>{HOSPITAL.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL.phoneOfficeTel}`}
                  className="flex min-h-11 items-center gap-3 text-ink-700 hover:text-primary-700"
                >
                  <Phone size={18} className="text-primary-700" />
                  {HOSPITAL.phoneOffice}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL.phoneEmergencyTel}`}
                  className="flex min-h-11 items-center gap-3 font-semibold text-emergency-500"
                >
                  <Phone size={18} />
                  Emergency: {HOSPITAL.phoneEmergency}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 font-semibold text-green-700 hover:text-green-800"
                >
                  <MessageCircle size={18} />
                  WhatsApp: {HOSPITAL.phoneWhatsApp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOSPITAL.email}`}
                  className="flex min-h-11 items-center gap-3 text-ink-700 hover:text-primary-700"
                >
                  <Mail size={18} className="text-primary-700" />
                  {HOSPITAL.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Clock3 size={19} className="text-primary-700" />
              Hours
            </h2>
            <p className="mt-3 text-sm text-ink-700">
              OPD: {HOSPITAL.opdHours} (daily)
            </p>
            <p className="mt-2 text-sm text-ink-700">
              Emergency: {HOSPITAL.emergencyHours}
            </p>
            <p className="mt-3 text-xs leading-5 text-ink-500">
              Confirm current hours and doctor schedules before visiting.
            </p>
          </div>
        </div>

        <div>
          <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-line bg-surface-muted p-6 text-center md:aspect-video">
            <MapPin size={42} className="text-primary-700" />
            <h2 className="mt-4 font-display text-xl font-semibold text-ink-900">
              {HOSPITAL.name}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink-500">
              {HOSPITAL.address}
            </p>
            <a
              href={HOSPITAL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-primary-600 px-5 font-semibold text-white hover:bg-primary-700"
            >
              <MapPin size={17} />
              Open exact location in Google Maps
              <ExternalLink size={15} />
            </a>
          </div>
          <a
            href={HOSPITAL.googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-primary-600 px-4 font-semibold text-white hover:bg-primary-700"
          >
            <MapPin size={17} />
            Get directions
            <ExternalLink size={15} />
          </a>
        </div>
      </section>
    </>
  );
}
