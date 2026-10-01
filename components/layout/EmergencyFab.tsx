"use client";

import { Phone } from "lucide-react";
import { HOSPITAL } from "@/data/hospital";

export default function EmergencyFab() {
  return (
    <a
      href={`tel:${HOSPITAL.phoneEmergencyTel}`}
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-5 h-12 rounded-full bg-emergency-500 text-white font-semibold text-sm shadow-lg hover:bg-emergency-700 transition-colors animate-pulse-ring motion-reduce:animate-none"
      aria-label={`Call Emergency ${HOSPITAL.phoneEmergency}`}
    >
      <Phone size={18} />
      Emergency
    </a>
  );
}
