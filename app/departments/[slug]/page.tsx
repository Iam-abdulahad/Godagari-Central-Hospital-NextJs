import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Stethoscope } from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const department = departments.find((item) => item.slug === slug);
  return { title: department?.name ?? "Department" };
}

export function generateStaticParams() {
  return departments.map(({ slug }) => ({ slug }));
}

export default async function DepartmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const department = departments.find((item) => item.slug === slug);
  if (!department) notFound();
  const departmentDoctors = doctors.filter((doctor) => doctor.departmentSlug === slug);

  return (
    <>
      <PageHeading eyebrow="DEPARTMENT" title={department.name} description={department.description}><span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-ink-700"><Stethoscope size={18} className="text-primary-700" />Typical hours: {department.timing ?? "Contact reception"}</span></PageHeading>
      <section className="container-custom grid gap-10 py-10 md:grid-cols-[1fr_0.8fr] md:py-14"><div><h2 className="text-xl font-bold">Services offered</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{(department.services ?? []).map((service) => <li key={service} className="rounded-xl border border-line p-4 text-sm text-ink-700">{service}</li>)}</ul><Link href="/departments" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-700"><ArrowLeft size={16} />All departments</Link></div><div><h2 className="text-xl font-bold">Doctor profiles</h2><p className="mt-2 text-sm leading-6 text-ink-500">Sample profiles only. Confirm the doctor’s schedule with reception.</p><div className="mt-4 space-y-3">{departmentDoctors.length ? departmentDoctors.map((doctor) => <Link key={doctor.slug} href={`/doctors/${doctor.slug}`} className="flex items-center justify-between gap-3 rounded-xl border border-line p-4 hover:border-primary-500"><span><span className="block font-semibold">{doctor.name}</span><span className="mt-1 block text-sm text-ink-500">{doctor.designation}</span></span><ArrowRight size={17} className="shrink-0 text-primary-700" /></Link>) : <p className="rounded-xl bg-surface-muted p-4 text-sm text-ink-500">No sample doctor profile is listed for this department.</p>}</div></div></section>
    </>
  );
}