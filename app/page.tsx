import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Phone, Search, Siren } from "lucide-react";
import hospitalFront from "../images/hospital-front.png";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { faqs } from "@/data/faqs";
import { HOSPITAL } from "@/data/hospital";
import { notices } from "@/data/notices";
import { services } from "@/data/services";
import { ALL_DAYS, DAY_LABELS, type Day } from "@/data/types";

const dayOptions: Day[] = ALL_DAYS;

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-primary-50">
        <div className="container-custom grid items-center gap-10 py-10 md:grid-cols-[0.9fr_1.1fr] md:py-16 lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3 py-1.5 text-xs font-semibold text-primary-900"><span className="h-2 w-2 rounded-full bg-success-600" />Care close to home in Godagari</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-ink-900 md:text-5xl">{HOSPITAL.name}</h1>
            <p className="mt-3 font-display text-xl font-semibold text-primary-900">Thoughtful care for every stage of life.</p>
            <p className="mt-3 max-w-lg text-base leading-7 text-ink-700 md:text-lg">Find a doctor, explore diagnostic services, or get in touch in Godagari, Rajshahi.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/appointment" className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary-600 px-5 font-semibold text-white hover:bg-primary-700">Request an appointment <ArrowRight size={18} /></Link>
              <a href={`tel:${HOSPITAL.phoneEmergencyTel}`} className="inline-flex h-12 items-center gap-2 rounded-xl bg-emergency-500 px-5 font-semibold text-white hover:bg-emergency-700" aria-label={`Call emergency ${HOSPITAL.phoneEmergency}`}><Siren size={18} />Emergency</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-700"><span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-primary-700" />OPD {HOSPITAL.opdHours}</span><span className="inline-flex items-center gap-2"><MapPin size={16} className="text-primary-700" />{HOSPITAL.upazila}, {HOSPITAL.district}</span></div>
          </div>
          <div className="relative min-h-[310px] overflow-hidden rounded-2xl md:min-h-[430px]">
            <Image src={hospitalFront} alt={`${HOSPITAL.name} building in Godagari`} priority fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-5 pt-16 text-white md:p-7 md:pt-20"><p className="text-sm font-medium text-white/80">GODAGARI · RAJSHAHI</p><p className="mt-1 font-display text-xl font-semibold">{HOSPITAL.name}</p></div>
          </div>
        </div>
      </section>

      <section className="container-custom relative z-10 pb-12" aria-labelledby="find-doctor-title">
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Search size={19} /></span><div><h2 id="find-doctor-title" className="text-lg font-bold">Find a doctor</h2><p className="text-sm text-ink-500">Choose a speciality and visiting day.</p></div></div>
          <form action="/doctors" className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <label className="sr-only" htmlFor="home-speciality">Speciality</label><select id="home-speciality" name="speciality" defaultValue="" className="h-12 rounded-xl border border-line bg-white px-3 text-ink-700"><option value="">All specialities</option>{departments.map((department) => <option key={department.slug} value={department.slug}>{department.name}</option>)}</select>
            <label className="sr-only" htmlFor="home-day">Visiting day</label><select id="home-day" name="day" defaultValue="" className="h-12 rounded-xl border border-line bg-white px-3 text-ink-700"><option value="">Any day</option>{dayOptions.map((day) => <option key={day} value={day}>{DAY_LABELS[day]}</option>)}</select>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 font-semibold text-white hover:bg-primary-700" type="submit">Search doctors <ArrowRight size={17} /></button>
          </form>
        </div>
      </section>

      <section className="container-custom py-12 md:py-16">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary-700">CARE THAT MEETS YOU HERE</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Explore our departments</h2></div><Link href="/departments" className="text-sm font-semibold text-primary-700">All departments <ArrowRight size={16} /></Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{departments.slice(0, 6).map((department) => <Link key={department.slug} href={`/departments/${department.slug}`} className="rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"><h3 className="font-display text-lg font-semibold">{department.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-500">{department.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">Explore <ArrowRight size={15} /></span></Link>)}</div>
      </section>

      <section className="bg-surface-muted py-12 md:py-16"><div className="container-custom grid gap-8 lg:grid-cols-2"><div><p className="text-sm font-semibold text-primary-700">SUPPORT FOR YOUR HEALTH</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Services in one place</h2><p className="mt-3 max-w-md leading-7 text-ink-500">From everyday consultations to diagnostic testing, find the information you need before your visit.</p><Link href="/services" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-700">View all services <ArrowRight size={17} /></Link></div><div className="grid gap-x-7 sm:grid-cols-2">{services.slice(0, 4).map((service) => <div key={service.slug} className="border-b border-line py-4"><h3 className="font-semibold">{service.name}</h3><p className="mt-1 text-sm leading-6 text-ink-500">{service.description}</p></div>)}</div></div></section>

      <section className="container-custom py-12 md:py-16"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary-700">MEET THE TEAM</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">Doctors and visiting hours</h2></div><Link href="/doctors" className="text-sm font-semibold text-primary-700">Find a doctor <ArrowRight size={16} /></Link></div><p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500">Sample doctor profiles are for demonstration only. Confirm current schedules with the hospital before visiting.</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{doctors.slice(0, 3).map((doctor) => <article key={doctor.slug} className="rounded-2xl border border-line bg-white p-5"><p className="text-xs font-semibold uppercase text-primary-700">{departments.find((item) => item.slug === doctor.departmentSlug)?.name}</p><h3 className="mt-2 font-display text-lg font-semibold">{doctor.name}</h3><p className="mt-1 text-sm text-ink-500">{doctor.designation} · {doctor.degrees}</p><p className="mt-4 border-t border-line pt-3 text-sm">Visiting: {doctor.schedule.slice(0, 3).map((item) => DAY_LABELS[item.day]).join(", ")}</p></article>)}</div></section>

      <section className="bg-primary-50 py-10 md:py-12"><div className="container-custom flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="text-sm font-semibold text-primary-700">HERE WHEN IT MATTERS</p><h2 className="mt-2 text-2xl font-bold">Emergency support, 24 hours a day</h2><p className="mt-2 max-w-xl text-sm leading-6 text-ink-500">Contact details shown here are demo placeholders and must be verified before launch.</p></div><a href={`tel:${HOSPITAL.phoneEmergencyTel}`} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emergency-500 px-5 font-semibold text-white hover:bg-emergency-700"><Phone size={18} />Call emergency</a></div></section>

      <section className="container-custom grid gap-8 py-12 md:grid-cols-2 md:py-16"><div><p className="text-sm font-semibold text-primary-700">LATEST UPDATES</p><h2 className="mt-2 text-2xl font-bold">Hospital notices</h2><div className="mt-4 divide-y divide-line border-y border-line">{notices.slice(0, 3).map((notice) => <Link key={notice.slug} href={`/notices/${notice.slug}`} className="flex items-center justify-between gap-4 py-4"><div><span className="text-xs font-medium text-ink-500">{notice.category} · {new Date(notice.date).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" })}</span><p className="mt-1 font-semibold text-ink-900">{notice.title}</p></div><ArrowRight size={17} className="shrink-0 text-primary-700" /></Link>)}</div><Link href="/notices" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">All notices <ArrowRight size={16} /></Link></div><div className="flex flex-col justify-between rounded-2xl bg-ink-900 p-6 text-white md:p-8"><div><p className="text-sm font-semibold text-primary-100">PLAN YOUR VISIT</p><h2 className="mt-2 text-2xl font-bold text-white">We’re easy to find.</h2><p className="mt-3 flex items-start gap-2 text-sm leading-6 text-white/75"><MapPin size={18} className="mt-0.5 shrink-0 text-primary-100" />{HOSPITAL.address}</p></div><div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-ink-900">Contact & directions <ArrowRight size={16} /></Link><a href={`tel:${HOSPITAL.phoneOfficeTel}`} className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 px-4 text-sm font-semibold text-white"><Phone size={16} />Call office</a></div></div></section>

      <section className="bg-surface-muted py-12 md:py-16"><div className="container-custom grid gap-10 lg:grid-cols-2"><div><p className="text-sm font-semibold text-primary-700">COMMON QUESTIONS</p><h2 className="mt-2 text-2xl font-bold">Before your visit</h2><div className="mt-5 divide-y divide-line border-y border-line">{faqs.slice(0, 4).map((faq) => <details key={faq.question} className="group py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900"><span>{faq.question}</span><span className="text-xl font-normal text-primary-700 group-open:hidden">+</span><span className="hidden text-xl font-normal text-primary-700 group-open:inline">−</span></summary><p className="mt-3 pr-8 text-sm leading-6 text-ink-500">{faq.answer}</p></details>)}</div></div><div><p className="text-sm font-semibold text-primary-700">FIND US</p><h2 className="mt-2 text-2xl font-bold">Visit us in Godagari</h2><p className="mt-2 text-sm text-ink-500">{HOSPITAL.address}</p><div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-line"><iframe title={`Map to ${HOSPITAL.name}`} src={HOSPITAL.googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-full w-full border-0" /></div><Link href="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">Directions and contact <ArrowRight size={16} /></Link></div></div></section>
    </>
  );
}
