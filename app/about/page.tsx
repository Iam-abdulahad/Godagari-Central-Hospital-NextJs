import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import hospitalFront from "../../images/hospital-front.png";
import PageHeading from "@/components/PageHeading";
import { HOSPITAL } from "@/data/hospital";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeading eyebrow="ABOUT THE HOSPITAL" title="Care rooted in the Godagari community" description={`${HOSPITAL.name} serves patients and families in Godagari, Rajshahi. This website's profile information is demo content and should be confirmed by hospital management before publication.`} />
      <section className="container-custom grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl md:min-h-[400px]"><Image src={hospitalFront} alt={`${HOSPITAL.name} exterior`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
        <div><p className="text-sm font-semibold text-primary-700">OUR APPROACH</p><h2 className="mt-2 text-2xl font-bold">Clear information. Considerate care.</h2><p className="mt-4 leading-7 text-ink-500">We aim to make it easier to find the right service, understand visiting hours, and contact the hospital when you need help. Speak with the care team for current service availability and clinical guidance.</p><div className="mt-6 space-y-4"><div className="flex gap-3"><HeartHandshake className="mt-1 shrink-0 text-primary-700" size={21} /><div><h3 className="font-semibold">Patients and families first</h3><p className="mt-1 text-sm leading-6 text-ink-500">Useful, accessible information for every visit.</p></div></div><div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-primary-700" size={21} /><div><h3 className="font-semibold">A local point of care</h3><p className="mt-1 text-sm leading-6 text-ink-500">Find contact and location details in one place.</p></div></div><div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-primary-700" size={21} /><div><h3 className="font-semibold">Based in Godagari</h3><p className="mt-1 text-sm leading-6 text-ink-500">{HOSPITAL.address}</p></div></div></div><Link href="/contact" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary-700">Plan your visit <ArrowRight size={17} /></Link></div>
      </section>
      <section className="bg-surface-muted py-10"><div className="container-custom flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold">Need help finding a service?</h2><p className="mt-1 text-sm text-ink-500">Browse departments or contact the hospital reception.</p></div><div className="flex gap-3"><Link href="/departments" className="inline-flex h-11 items-center rounded-xl border border-primary-600 px-4 font-semibold text-primary-700">Departments</Link><Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary-600 px-4 font-semibold text-white">Contact <ArrowRight size={16} /></Link></div></div></section>
    </>
  );
}