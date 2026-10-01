"use client";

import { Phone, Siren, CalendarPlus } from "lucide-react";
import Link from "next/link";
import { HOSPITAL } from "@/data/hospital";

export default function MobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-line shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 h-14">
        <a
          href={`tel:${HOSPITAL.phoneOfficeTel}`}
          className="flex flex-col items-center justify-center gap-0.5 text-primary-700 active:bg-primary-50 transition-colors"
          aria-label={`Call office ${HOSPITAL.phoneOffice}`}
        >
          <Phone size={20} />
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={`tel:${HOSPITAL.phoneEmergencyTel}`}
          className="flex flex-col items-center justify-center gap-0.5 text-emergency-500 active:bg-emergency-50 transition-colors"
          aria-label={`Call emergency ${HOSPITAL.phoneEmergency}`}
        >
          <Siren size={20} />
          <span className="text-[11px] font-semibold">Emergency</span>
        </a>
        <Link
          href="/appointment"
          className="flex flex-col items-center justify-center gap-0.5 text-primary-700 active:bg-primary-50 transition-colors"
        >
          <CalendarPlus size={20} />
          <span className="text-[11px] font-semibold">Appointment</span>
        </Link>
      </div>
    </div>
  );
}
