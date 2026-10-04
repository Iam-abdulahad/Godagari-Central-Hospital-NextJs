"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-sm ${
          language === "en" ? "bg-teal-600 text-white" : "text-gray-600"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => setLanguage("bn")}
        className={`rounded-full px-3 py-1 text-sm ${
          language === "bn" ? "bg-teal-600 text-white" : "text-gray-600"
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}
