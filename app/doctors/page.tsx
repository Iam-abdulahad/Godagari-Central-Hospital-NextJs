import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { ALL_DAYS, type Day } from "@/data/types";
import DoctorDirectory from "./DoctorDirectory";

export const metadata: Metadata = { title: "Find a Doctor" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function DoctorsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const speciality = typeof params.speciality === "string" ? params.speciality : "";
  const days = typeof params.day === "string" ? params.day.split(",").filter((day): day is Day => ALL_DAYS.includes(day as Day)) : [];
  const today = params.today === "1" || params.today === "true";
  const search = typeof params.search === "string" ? params.search : "";
  return <><PageHeading eyebrow="DOCTORS" title="Find the right doctor" description="Filter sample profiles by department and visiting day, or search by name. Please confirm all details before visiting." /><section className="container-custom py-8 md:py-10"><DoctorDirectory initialFilters={{ speciality, days, today, search }} /></section></>;
}