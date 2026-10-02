import type { Metadata } from "next";
import AppointmentClient from "./AppointmentClient";

export const metadata: Metadata = { title: "Book an Appointment" };

export const dynamic = "force-static";

export default function AppointmentPage() {
  return <AppointmentClient />;
}
