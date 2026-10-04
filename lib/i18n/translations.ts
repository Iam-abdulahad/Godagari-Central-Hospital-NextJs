export type Language = "en" | "bn";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    Home: "Home",
    About: "About",
    Departments: "Departments",
    Doctors: "Doctors",
    Services: "Services",
    Facilities: "Facilities",
    Notices: "Notices",
    Contact: "Contact",
    Emergency: "Emergency",

    // Common
    "Book Appointment": "Book Appointment",
    "Get Directions": "Get Directions",
    "Contact Us": "Contact Us",
    "Learn More": "Learn More",
    "View All": "View All",

    // Contact
    "Contact & Location": "Contact & Location",
    "Find Us": "Find Us",
    "Our Location": "Our Location",
    "Use My Location": "Use My Location",

    // Home
    "Welcome to Godagari Central Hospital":
      "Welcome to Godagari Central Hospital",

    "Quality Healthcare, Close to You": "Quality Healthcare, Close to You",

    "We're easy to find": "We're easy to find",
  },

  bn: {
    // Navigation
    Home: "হোম",
    About: "আমাদের সম্পর্কে",
    Departments: "বিভাগসমূহ",
    Doctors: "চিকিৎসকবৃন্দ",
    Services: "সেবাসমূহ",
    Facilities: "সুবিধাসমূহ",
    Notices: "নোটিশ",
    Contact: "যোগাযোগ",
    Emergency: "জরুরি সেবা",

    // Common
    "Book Appointment": "অ্যাপয়েন্টমেন্ট নিন",
    "Get Directions": "দিকনির্দেশনা নিন",
    "Contact Us": "যোগাযোগ করুন",
    "Learn More": "আরও জানুন",
    "View All": "সব দেখুন",

    // Contact
    "Contact & Location": "যোগাযোগ ও অবস্থান",
    "Find Us": "আমাদের খুঁজুন",
    "Our Location": "আমাদের অবস্থান",
    "Use My Location": "আমার অবস্থান ব্যবহার করুন",

    // Home
    "Welcome to Godagari Central Hospital":
      "গোদাগাড়ী সেন্ট্রাল হাসপাতালে স্বাগতম",

    "Quality Healthcare, Close to You": "আপনার কাছেই মানসম্মত স্বাস্থ্যসেবা",

    "We're easy to find": "আমাদের খুঁজে পাওয়া সহজ",
  },
};

export function translate(text: string, language: Language): string {
  return translations[language][text] ?? text;
}
