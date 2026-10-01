import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import AppointmentForm from "./AppointmentForm";

export const metadata: Metadata = { title: "Request an Appointment" };

export default async function AppointmentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const initialDoctor = typeof params.doctor === "string" ? params.doctor : "";
  const initialDepartment = typeof params.department === "string" ? params.department : "";
  return <><PageHeading eyebrow="APPOINTMENTS" title="Request an appointment" description="Tell us how to reach you and choose a preferred visit date. The hospital will confirm your request by phone." /><section className="container-custom py-8 md:py-10"><AppointmentForm initialDoctor={initialDoctor} initialDepartment={initialDepartment} /></section></>;
}