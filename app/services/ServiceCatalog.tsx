"use client";

import { useState } from "react";
import { Search, Stethoscope } from "lucide-react";
import type { Service } from "@/data/types";

export default function ServiceCatalog({ services }: { services: Service[] }) {
  const [search, setSearch] = useState("");
  const filtered = services.filter((service) => `${service.name} ${service.category} ${service.description}`.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div>
      <label htmlFor="service-search" className="sr-only">Search services</label>
      <div className="relative mb-6 max-w-lg"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" /><input id="service-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search services" className="h-12 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-ink-900 placeholder:text-ink-500" /></div>
      {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((service) => <article key={service.slug} className="rounded-2xl border border-line bg-white p-5"><span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Stethoscope size={21} /></span><p className="text-xs font-semibold uppercase text-primary-700">{service.category}</p><h2 className="mt-1 font-display text-lg font-semibold">{service.name}</h2><p className="mt-2 text-sm leading-6 text-ink-500">{service.description}</p></article>)}</div> : <p className="rounded-2xl border border-line bg-white p-8 text-center text-ink-500">No services match “{search}”. Try a different search.</p>}
    </div>
  );
}