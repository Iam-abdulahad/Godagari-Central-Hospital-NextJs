import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = { title: "Departments" };

export default function DepartmentsPage() {
  return (
    <>
      <PageHeading eyebrow="OUR DEPARTMENTS" title="Find care by speciality" description="Explore the services offered by each department. Doctor schedules shown on this site are sample data; please confirm availability before visiting." />
      <section className="container-custom py-10 md:py-14"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{departments.map((department) => { const Icon = getIcon(department.icon); const count = doctors.filter((doctor) => doctor.departmentSlug === department.slug).length; return <Link key={department.slug} href={`/departments/${department.slug}`} className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"><span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><Icon size={21} /></span><h2 className="font-display text-lg font-semibold">{department.name}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-ink-500">{department.description}</p><div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm"><span className="text-ink-500">{count} sample {count === 1 ? "profile" : "profiles"}</span><span className="inline-flex items-center gap-1 font-semibold text-primary-700">Details <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></div></Link>; })}</div></section>
    </>
  );
}