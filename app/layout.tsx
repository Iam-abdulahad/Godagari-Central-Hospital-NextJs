import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import EmergencyFab from "@/components/layout/EmergencyFab";
import { HOSPITAL } from "@/data/hospital";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${HOSPITAL.name} — ${HOSPITAL.address}`,
    template: `%s | ${HOSPITAL.name}`,
  },
  description: `${HOSPITAL.name} (${HOSPITAL.nameBn}) — ${HOSPITAL.tagline}. Located at ${HOSPITAL.address}. OPD: ${HOSPITAL.opdHours}, Emergency: ${HOSPITAL.emergencyHours}.`,
  keywords: [
    "hospital",
    "Godagari",
    "Rajshahi",
    "healthcare",
    "doctor",
    "emergency",
    HOSPITAL.name,
  ],
  metadataBase: new URL("https://godagari-central-hospital.example.com"),
  openGraph: {
    title: HOSPITAL.name,
    description: HOSPITAL.tagline,
    type: "website",
    locale: "en_BD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1 pb-14 md:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
        <EmergencyFab />
      </body>
    </html>
  );
}
