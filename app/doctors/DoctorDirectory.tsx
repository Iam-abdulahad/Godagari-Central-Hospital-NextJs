"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarPlus, Phone, Search, X } from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { HOSPITAL } from "@/data/hospital";
import { ALL_DAYS, DAY_LABELS, type Day, type Doctor } from "@/data/types";
import { getTodayInDhaka } from "@/lib/utils";

type InitialFilters = { speciality?: string; days?: Day[]; today?: boolean; search?: string };

function matchesDoctor(doctor: Doctor, speciality: string, days: Day[], todayOnly: boolean, query: string, today: Day) {
  const matchesSpeciality = !speciality || doctor.departmentSlug === speciality;
  const matchesDay = days.length === 0 || days.some((day) => doctor.schedule.some((item) => item.day === day));
  const matchesToday = !todayOnly || doctor.schedule.some((item) => item.day === today);
  const matchesName = !query || `${doctor.name} ${doctor.degrees} ${doctor.designation}`.toLowerCase().includes(query.toLowerCase());
  return matchesSpeciality && matchesDay && matchesToday && matchesName;
}

export default function DoctorDirectory({ initialFilters = {} }: { initialFilters?: InitialFilters }) {
  const [speciality, setSpeciality] = useState(initialFilters.speciality ?? "");
  const [days, setDays] = useState<Day[]>(initialFilters.days ?? []);
  const [todayOnly, setTodayOnly] = useState(initialFilters.today ?? false);
  const [search, setSearch] = useState(initialFilters.search ?? "");
  const deferredSearch = useDeferredValue(search);
  const today = getTodayInDhaka();

  useEffect(() => {
    const params = new URLSearchParams();
    if (speciality) params.set("speciality", speciality);
    if (days.length) params.set("day", days.join(","));
    if (todayOnly) params.set("today", "1");
    if (search.trim()) params.set("search", search.trim());
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [days, search, speciality, todayOnly]);

  const results = doctors.filter((doctor) => matchesDoctor(doctor, speciality, days, todayOnly, deferredSearch.trim(), today));
  const hasFilters = Boolean(speciality || days.length || todayOnly || search);
  const toggleDay = (day: Day) => setDays((selected) => selected.includes(day) ? selected.filter((item) => item !== day) : [...selected, day]);
  const clearFilters = () => { setSpeciality(""); setDays([]); setTodayOnly(false); setSearch(""); };

  return (
    <div>
      <section aria-label="Doctor filters" className="rounded-2xl border border-line bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div><label htmlFor="speciality" className="mb-2 block text-sm font-semibold text-ink-700">Speciality</label><select id="speciality" value={speciality} onChange={(event) => setSpeciality(event.target.value)} className="h-11 w-full rounded-xl border border-line bg-white px-3 text-ink-700"><option value="">All specialities</option>{departments.map((department) => <option key={department.slug} value={department.slug}>{department.name}</option>)}</select></div>
          <div><span className="mb-2 block text-sm font-semibold text-ink-700">Available on</span><div className="flex flex-wrap gap-2">{ALL_DAYS.map((day) => <button key={day} type="button" aria-pressed={days.includes(day)} aria-label={`Filter doctors available ${DAY_LABELS[day]}`} onClick={() => toggleDay(day)} className={`h-10 min-w-11 rounded-xl border px-3 text-sm font-semibold ${days.includes(day) ? "border-primary-600 bg-primary-600 text-white" : "border-line bg-white text-ink-700 hover:bg-primary-50"}`}>{DAY_LABELS[day]}</button>)}</div></div>
        </div>
        <div className="mt-4 flex flex-col gap-4 border-t border-line pt-4 sm:flex-row sm:items-end">
          <div className="relative flex-1"><label htmlFor="doctor-search" className="mb-2 block text-sm font-semibold text-ink-700">Search doctors</label><Search size={17} className="absolute left-3 top-[2.65rem] text-ink-500" /><input id="doctor-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, degree or role" className="h-11 w-full rounded-xl border border-line pl-9 pr-3 text-ink-900 placeholder:text-ink-500" /></div>
          <button type="button" role="switch" aria-checked={todayOnly} onClick={() => setTodayOnly(!todayOnly)} className="flex min-h-11 items-center gap-3 text-left text-sm font-medium text-ink-700"><span className={`relative h-6 w-11 rounded-full transition-colors ${todayOnly ? "bg-primary-600" : "bg-slate-300"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${todayOnly ? "translate-x-6" : "translate-x-1"}`} /></span>Available today</button>
          {hasFilters && <button type="button" onClick={clearFilters} className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900"><X size={16} />Clear all</button>}
        </div>
      </section>

      <div className="mb-4 mt-7 flex items-center justify-between"><p className="text-sm font-medium text-ink-500"><span className="font-semibold text-ink-900">{results.length}</span> sample {results.length === 1 ? "doctor" : "doctors"}</p>{hasFilters && <span className="text-xs text-ink-500">Filters are saved in the page URL</span>}</div>
      {results.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{results.map((doctor) => {
        const department = departments.find((item) => item.slug === doctor.departmentSlug);
        return <article key={doctor.slug} className="rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase text-primary-700">{department?.name}</p><h2 className="mt-2 font-display text-lg font-semibold text-ink-900">{doctor.name}</h2><p className="mt-1 text-sm leading-6 text-ink-500">{doctor.degrees}</p><p className="mt-1 text-sm text-ink-500">{doctor.designation}</p></div><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 font-display font-bold text-primary-700" aria-hidden="true">{doctor.name.replace("Dr. ", "").split(" ").slice(0, 2).map((part) => part[0]).join("")}</span></div>
          <div className="mt-5 border-t border-line pt-4"><p className="text-xs font-semibold text-ink-500">VISITING DAYS</p><div className="mt-2 flex flex-wrap gap-1.5">{ALL_DAYS.map((day) => { const available = doctor.schedule.some((item) => item.day === day); return <span key={day} aria-label={`${available ? "Available" : "Not available"} ${DAY_LABELS[day]}`} className={`rounded-lg px-2 py-1 text-xs font-semibold ${available ? "bg-primary-100 text-primary-900" : "bg-surface-muted text-ink-300"}`}>{DAY_LABELS[day]}</span>; })}</div><p className="mt-3 text-sm text-ink-700">{doctor.schedule.map((item) => `${DAY_LABELS[item.day]} ${item.from}–${item.to}`).join(" · ")}</p></div>
          <div className="mt-5 flex gap-2"><Link href={`/appointment?doctor=${doctor.slug}&department=${doctor.departmentSlug}`} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white hover:bg-primary-700"><CalendarPlus size={16} />Book</Link><a href={`tel:${doctor.phone ?? HOSPITAL.phoneOfficeTel}`} aria-label={`Call about ${doctor.name}`} className="inline-flex h-10 w-11 items-center justify-center rounded-xl border border-primary-600 text-primary-700 hover:bg-primary-50"><Phone size={17} /></a><Link href={`/doctors/${doctor.slug}`} aria-label={`View ${doctor.name} profile`} className="inline-flex h-10 w-11 items-center justify-center rounded-xl border border-line text-ink-700 hover:bg-surface-muted"><ArrowRight size={17} /></Link></div>
        </article>;
      })}</div> : <div className="rounded-2xl border border-line bg-surface-muted px-5 py-12 text-center"><h2 className="font-display text-xl font-semibold">No doctors match those filters</h2><p className="mt-2 text-sm text-ink-500">Try a different day or search term, or call reception for help.</p><a href={`tel:${HOSPITAL.phoneOfficeTel}`} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-primary-600 px-4 font-semibold text-white"><Phone size={17} />Call hospital</a></div>}
      <p className="mt-8 text-xs leading-5 text-ink-500">All doctor names, qualifications, fees, and schedules are demo content. Confirm current details with the hospital before making a visit.</p>
    </div>
  );
}