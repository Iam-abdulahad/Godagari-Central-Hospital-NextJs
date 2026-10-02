import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarPlus,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { HOSPITAL } from "@/data/hospital";
import { DAY_LABELS } from "@/data/types";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return doctors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  return { title: doctor?.name ?? "Doctor profile" };
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();

  const department = departments.find(
    (item) => item.slug === doctor.departmentSlug,
  );

  const scheduleText = doctor.schedule.length
    ? doctor.schedule
        .map((item) => `${DAY_LABELS[item.day]} ${item.from}–${item.to}`)
        .join(", ")
    : "No visiting schedule was published";

  const whatsappMessage = [
    `Hello ${HOSPITAL.name},`,
    `I would like to know about an appointment with ${doctor.name}.`,
    `Department: ${department?.name ?? doctor.departmentSlug}`,
    `Doctor schedule: ${scheduleText}`,
    "Please confirm the available date and time.",
  ].join("\n");

  const whatsappUrl = `https://wa.me/${HOSPITAL.phoneWhatsAppTel}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  return (
    <>
      <PageHeading
        eyebrow={department?.name ?? "DOCTOR PROFILE"}
        title={doctor.name}
        description={`${doctor.designation} · ${doctor.degrees}`}
      />

      <section className="container-custom grid gap-8 py-10 md:grid-cols-[1fr_0.8fr] md:py-14">
        <div>
          <h2 className="text-xl font-bold">Visiting schedule</h2>
          <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white px-5">
            {doctor.schedule.length ? (
              doctor.schedule.map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span className="font-medium">
                    {DAY_LABELS[schedule.day]}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-ink-500">
                    <Clock3 size={16} />
                    {schedule.from}–{schedule.to}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-5 text-sm leading-6 text-ink-500">
                No visiting schedule was shown in the supplied doctor list.
                Please call or WhatsApp the hospital to confirm availability.
              </p>
            )}
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-500">
            Schedules can change. Confirm the doctor&apos;s current visiting
            hours before travelling.
          </p>
        </div>

        <div className="h-fit rounded-2xl border border-line bg-surface-muted p-5">
          <h2 className="font-display text-lg font-semibold">
            Visit information
          </h2>
          <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-ink-700">
            <MapPin size={17} className="mt-0.5 shrink-0 text-primary-700" />
            {HOSPITAL.address}
            {doctor.room ? ` · Room ${doctor.room}` : ""}
          </p>
          {doctor.fee ? (
            <p className="mt-3 text-sm text-ink-700">
              Sample consultation fee: ৳{doctor.fee}
            </p>
          ) : null}

          <div className="mt-5 grid gap-2">
            {doctor.schedule.length ? (
              <Link
                href={`/appointment?doctor=${doctor.slug}&department=${doctor.departmentSlug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 font-semibold text-white hover:bg-primary-700"
              >
                <CalendarPlus size={17} />
                Request appointment
              </Link>
            ) : (
              <a
                href={`tel:${doctor.phone ?? HOSPITAL.phoneOfficeTel}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 font-semibold text-white"
              >
                <Phone size={17} />
                Call to confirm availability
              </a>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-green-600 px-4 font-semibold text-green-700 hover:bg-green-50"
            >
              <MessageCircle size={17} />
              WhatsApp about schedule
            </a>

            <a
              href={`tel:${doctor.phone ?? HOSPITAL.phoneOfficeTel}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary-600 px-4 font-semibold text-primary-700 hover:bg-primary-50"
            >
              <Phone size={17} />
              Call reception
            </a>
          </div>
        </div>

        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700"
        >
          <ArrowLeft size={16} />
          All doctors
        </Link>
      </section>
    </>
  );
}
