import type { Metadata } from "next";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import { facilities } from "@/data/facilities";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "Facilities" };

export default function FacilitiesPage() {
  return <><PageHeading eyebrow="FACILITIES" title="A closer look at our facilities" description="Browse the facilities listed for the hospital. Please call ahead to confirm current availability, including transport and inpatient services." /><section className="container-custom py-10 md:py-14"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{facilities.map((facility) => { const Icon = getIcon(facility.icon); return <article key={facility.slug} className="rounded-2xl border border-line bg-white p-5"><span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Icon size={21} /></span><h2 className="font-display text-lg font-semibold">{facility.name}</h2><p className="mt-2 text-sm leading-6 text-ink-500">{facility.description}</p></article>; })}</div><div className="mt-10 rounded-2xl border border-line bg-surface-muted p-5 md:p-6"><div className="flex items-start gap-3"><BadgeCheck className="mt-0.5 shrink-0 text-primary-700" size={21} /><div><h2 className="font-semibold">Equipment and diagnostic services</h2><p className="mt-1 text-sm leading-6 text-ink-500">Equipment details and service capability should be verified directly with the hospital. See the diagnostic services currently listed on this demo site.</p><Link href="/services" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">Browse services <ArrowRight size={16} /></Link></div></div></div></section></>;
}