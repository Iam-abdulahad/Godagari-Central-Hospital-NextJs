"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  CalendarPlus,
  CircleAlert,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { HOSPITAL } from "@/data/hospital";
import { DAY_LABELS, type Day } from "@/data/types";
import { getWhatsAppUrl } from "@/lib/utils";

const appointmentSchema = z
  .object({
    name: z.string().trim().min(2, "Enter the patient's name.").max(100),
    phone: z.string().trim().min(7, "Enter a valid phone number.").max(20),
    age: z
      .number()
      .int()
      .min(0, "Age must be 0 or above.")
      .max(120, "Enter a valid age."),
    gender: z.enum(["Female", "Male", "Other", "Prefer not to say"]),
    department: z.string().min(1, "Choose a department."),
    doctor: z.string().min(1, "Choose a doctor."),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose an available date."),
    note: z.string().max(500, "Keep the note under 500 characters.").optional(),
  })
  .superRefine((values, context) => {
    const doctor = doctors.find((item) => item.slug === values.doctor);
    if (doctor && doctor.departmentSlug !== values.department) {
      context.addIssue({
        code: "custom",
        path: ["doctor"],
        message: "Choose a doctor in the selected department.",
      });
    }
    const selectedDate = new Date(`${values.date}T12:00:00Z`);
    const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
      selectedDate.getUTCDay()
    ] as Day;
    if (doctor && !doctor.schedule.some((item) => item.day === day)) {
      context.addIssue({
        code: "custom",
        path: ["date"],
        message: "Choose a date when this doctor is available.",
      });
    }
    if (values.date < getDhakaDate(0).value) {
      context.addIssue({
        code: "custom",
        path: ["date"],
        message: "Choose a future date.",
      });
    }
  });

type AppointmentValues = z.infer<typeof appointmentSchema>;
const weekdayKeys: Record<string, Day> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

function getDhakaDate(offset: number) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";
  const date = new Date(
    Date.UTC(
      Number(part("year")),
      Number(part("month")) - 1,
      Number(part("day")) + offset,
    ),
  );
  const value = date.toISOString().slice(0, 10);
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
  return { value, day: weekdayKeys[weekday] };
}

export default function AppointmentForm({
  initialDoctor = "",
  initialDepartment = "",
}: {
  initialDoctor?: string;
  initialDepartment?: string;
}) {
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      age: undefined,
      gender: "Prefer not to say",
      department: initialDepartment,
      doctor: initialDoctor,
      date: "",
      note: "",
    },
  });
  const departmentSlug = useWatch({ control, name: "department" });
  const doctorSlug = useWatch({ control, name: "doctor" });
  const watchDate = useWatch({ control, name: "date" });
  const selectedDoctor = doctors.find((doctor) => doctor.slug === doctorSlug);
  const availableDoctors = doctors.filter(
    (doctor) => !departmentSlug || doctor.departmentSlug === departmentSlug,
  );
  const availableDates = selectedDoctor?.schedule.length
    ? Array.from({ length: 60 }, (_, index) => getDhakaDate(index)).filter(
        (date) =>
          selectedDoctor.schedule.some((entry) => entry.day === date.day),
      )
    : [];
  const selectedSchedule =
    selectedDoctor && watchDate
      ? selectedDoctor.schedule.find((entry) => {
          const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
            new Date(`${watchDate}T12:00:00Z`).getUTCDay()
          ] as Day;
          return entry.day === day;
        })
      : null;

  function submit(values: AppointmentValues) {
    const doctor = doctors.find((item) => item.slug === values.doctor);
    const department = departments.find(
      (item) => item.slug === values.department,
    );
    const message = [
      `Appointment request for ${HOSPITAL.name}`,
      `Patient: ${values.name}`,
      `Phone: ${values.phone}`,
      `Age: ${values.age}`,
      `Gender: ${values.gender}`,
      `Department: ${department?.name ?? values.department}`,
      `Doctor: ${doctor?.name ?? values.doctor}`,
      `Preferred date: ${values.date}`,
      doctor?.schedule.length
        ? `Doctor visiting time: ${
            doctor.schedule.find((entry) => {
              const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
                new Date(`${values.date}T12:00:00Z`).getUTCDay()
              ] as Day;
              return entry.day === day;
            })?.from ?? ""
          }–${
            doctor.schedule.find((entry) => {
              const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
                new Date(`${values.date}T12:00:00Z`).getUTCDay()
              ] as Day;
              return entry.day === day;
            })?.to ?? ""
          }`
        : "",
      values.note?.trim() ? `Note: ${values.note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    setWhatsAppUrl(getWhatsAppUrl(HOSPITAL.phoneWhatsAppTel, message));
  }

  const fieldClass =
    "mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-ink-900 placeholder:text-ink-500";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        className="rounded-2xl border border-line bg-white p-5 md:p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-semibold">
              Patient name <span className="text-emergency-500">*</span>
            </label>
            <input
              id="name"
              autoComplete="name"
              {...register("name")}
              className={fieldClass}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone number <span className="text-emergency-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              className={fieldClass}
              placeholder="01XXXXXXXXX"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="age" className="text-sm font-semibold">
              Age <span className="text-emergency-500">*</span>
            </label>
            <input
              id="age"
              type="number"
              min="0"
              max="120"
              {...register("age", { valueAsNumber: true })}
              className={fieldClass}
              aria-invalid={Boolean(errors.age)}
            />
            {errors.age && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.age.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="gender" className="text-sm font-semibold">
              Gender <span className="text-emergency-500">*</span>
            </label>
            <select id="gender" {...register("gender")} className={fieldClass}>
              <option>Prefer not to say</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="department" className="text-sm font-semibold">
              Department <span className="text-emergency-500">*</span>
            </label>
            <select
              id="department"
              {...register("department", {
                onChange: () => {
                  setValue("doctor", "");
                  setValue("date", "");
                },
              })}
              className={fieldClass}
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department.slug} value={department.slug}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.department.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="doctor" className="text-sm font-semibold">
              Doctor <span className="text-emergency-500">*</span>
            </label>
            <select
              id="doctor"
              {...register("doctor", { onChange: () => setValue("date", "") })}
              className={fieldClass}
              disabled={!departmentSlug}
            >
              <option value="">
                {departmentSlug
                  ? "Select a doctor"
                  : "Select a department first"}
              </option>
              {availableDoctors.map((doctor) => (
                <option key={doctor.slug} value={doctor.slug}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {errors.doctor && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.doctor.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="date" className="text-sm font-semibold">
              Preferred date <span className="text-emergency-500">*</span>
            </label>
            <select
              id="date"
              {...register("date")}
              className={fieldClass}
              disabled={!selectedDoctor?.schedule.length}
            >
              <option value="">
                {selectedDoctor?.schedule.length
                  ? "Select an available date"
                  : "Choose a doctor with a published schedule"}
              </option>
              {availableDates.map(({ value, day }) => (
                <option key={value} value={value}>
                  {new Date(`${value}T12:00:00Z`).toLocaleDateString("en", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  })}{" "}
                  · {DAY_LABELS[day]}
                </option>
              ))}
            </select>
            {errors.date && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.date.message}
              </p>
            )}
            {selectedSchedule && (
              <p className="mt-2 text-xs font-medium text-primary-700">
                Visiting time: {selectedSchedule.from}–{selectedSchedule.to}
              </p>
            )}
            {selectedDoctor && !selectedDoctor.schedule.length && (
              <a
                href={`https://wa.me/${HOSPITAL.phoneWhatsAppTel}?text=${encodeURIComponent(`Hello ${HOSPITAL.name}, please confirm the visiting schedule for ${selectedDoctor.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700"
              >
                <MessageCircle size={14} />
                Ask about this doctor on WhatsApp
              </a>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="note" className="text-sm font-semibold">
              Note <span className="font-normal text-ink-500">(optional)</span>
            </label>
            <textarea
              id="note"
              rows={3}
              {...register("note")}
              className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-ink-900"
              placeholder="Avoid including sensitive medical details."
            />
            {errors.note && (
              <p role="alert" className="mt-1 text-sm text-emergency-500">
                {errors.note.message}
              </p>
            )}
          </div>
        </div>
        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-ink-500">
          <CircleAlert size={15} className="mt-0.5 shrink-0" />
          Your information is placed in a WhatsApp draft only after you submit;
          it is not saved on this website. Do not include sensitive medical
          details.
        </p>
        <button
          type="submit"
          disabled={isSubmitting || !selectedDoctor?.schedule.length}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 font-semibold text-white hover:bg-primary-700 disabled:opacity-60 sm:w-auto"
        >
          <CalendarPlus size={18} />
          Prepare WhatsApp request <ArrowRight size={17} />
        </button>
        {whatsAppUrl && (
          <div
            className="mt-4 rounded-xl border border-primary-100 bg-primary-50 p-4"
            role="status"
          >
            <p className="font-semibold text-primary-900">
              Your request is ready
            </p>
            <p className="mt-1 text-sm text-primary-900">
              Review the message in WhatsApp and press send to contact the
              hospital.
            </p>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl bg-primary-600 px-4 text-sm font-semibold text-white"
            >
              Continue in WhatsApp <ExternalLink size={15} />
            </a>
          </div>
        )}
      </form>
      <aside className="h-fit rounded-2xl bg-surface-muted p-5 md:p-6">
        <h2 className="font-display text-lg font-semibold">Need help?</h2>
        <p className="mt-2 text-sm leading-6 text-ink-500">
          Select a department, then a doctor. Available dates are generated from
          that doctor&apos;s published weekly schedule.
        </p>
        <a
          href={`https://wa.me/${HOSPITAL.phoneWhatsAppTel}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700"
        >
          <MessageCircle size={17} />
          WhatsApp {HOSPITAL.phoneWhatsApp}
        </a>
        <a
          href={`tel:${HOSPITAL.phoneOfficeTel}`}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl border border-primary-600 font-semibold text-primary-700"
        >
          Call {HOSPITAL.phoneOffice}
        </a>
        <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-ink-500">
          Appointment requests are not confirmed until the hospital contacts
          you. Please do not use this form for emergencies.
        </p>
      </aside>
    </div>
  );
}
