// ============================================================
// Hospital contact & meta — change these values to update the
// entire site. All phone numbers are DEMO placeholders.
// ============================================================

export const HOSPITAL = {
  name: "Godagari Central Hospital",
  nameBn: "গোদাগাড়ী সেন্ট্রাল হাসপাতাল",
  tagline: "Trusted Healthcare in the Heart of Godagari",
  taglineBn: "গোদাগাড়ীর কেন্দ্রে বিশ্বস্ত স্বাস্থ্যসেবা",

  address: "Shrimantapur, Godagari, Rajshahi",
  addressBn: "শ্রীমন্তপুর, গোদাগাড়ী, রাজশাহী",
  district: "Rajshahi",
  upazila: "Godagari",

  // Phones — DEMO placeholders. Replace with real numbers.
  phoneOffice: "01XXX-XXXXXX",
  phoneEmergency: "01XXX-XXXXXX",
  phoneWhatsApp: "01XXX-XXXXXX",
  // For tel: links, strip the dash
  phoneOfficeTel: "+8801XXXXXXXXX",
  phoneEmergencyTel: "+8801XXXXXXXXX",
  phoneWhatsAppTel: "8801XXXXXXXXX", // wa.me format (no +)

  email: "info@example.com",

  // Registration
  registrationNo: "81-34-2-021-00004",
  registeredWith: "DIFE (Dept. of Inspection for Factories & Establishments)",
  validUntil: "1 July 2027",

  // Hours
  opdHours: "9:00 AM – 9:00 PM",
  opdOpen: 9, // 24h format
  opdClose: 21,
  emergencyHours: "24/7",

  // Map
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.5!2d88.33!3d24.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI4JzEyLjAiTiA4OMKwMTknNDguMCJF!5e0!3m2!1sen!2sbd!4v1234567890",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=24.47,88.33",
  googleMapsUrl:
    "https://www.google.com/maps/place/Godagari,+Rajshahi",

  // Social
  facebookUrl: "https://facebook.com/",

  // Stats (real data only)
  totalDoctors: 12,
  totalDepartments: 8,
  totalStaff: 22,
  yearEstablished: 2021,
} as const;

export type HospitalInfo = typeof HOSPITAL;
