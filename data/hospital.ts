// ============================================================
// Central hospital contact & meta configuration.
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

  phoneOffice: "01XXX-XXXXXX",
  phoneEmergency: "01XXX-XXXXXX",
  phoneWhatsApp: "+8801795784766",
  phoneOfficeTel: "+8801XXXXXXXXX",
  phoneEmergencyTel: "+8801XXXXXXXXX",
  phoneWhatsAppTel: "8801795784766",

  email: "info@example.com",

  registrationNo: "81-34-2-021-00004",
  registeredWith: "DIFE (Dept. of Inspection for Factories & Establishments)",
  validUntil: "1 July 2027",

  opdHours: "9:00 AM – 9:00 PM",
  opdOpen: 9,
  opdClose: 21,
  emergencyHours: "24/7",

  // Google Maps location supplied for the hospital.
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.5!2d88.33!3d24.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI4JzEyLjAiTiA4OMKwMTknNDguMCJF!5e0!3m2!1sen!2sbd!4v1234567890",
  googleMapsDirectionsUrl: "https://maps.app.goo.gl/xM4JnTQfs6e85uev9",
  googleMapsUrl: "https://maps.app.goo.gl/xM4JnTQfs6e85uev9",

  facebookUrl: "https://facebook.com/",

  totalDoctors: 30,
  totalDepartments: 10,
  totalStaff: 22,
  yearEstablished: 2021,
} as const;

export type HospitalInfo = typeof HOSPITAL;
