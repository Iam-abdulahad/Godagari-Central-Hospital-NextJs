"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import { ALL_DAYS, type Day } from "@/data/types";
import DoctorDirectory from "./DoctorDirectory";

function DoctorsContent() {
  const searchParams = useSearchParams();

  const speciality = searchParams.get("speciality") ?? "";
  const dayParam = searchParams.get("day");
  const days = dayParam
    ? dayParam
        .split(",")
        .filter((day): day is Day => ALL_DAYS.includes(day as Day))
    : [];
  const todayParam = searchParams.get("today");
  const today = todayParam === "1" || todayParam === "true";
  const search = searchParams.get("search") ?? "";

  return (
    <>
      <PageHeading
        eyebrow="DOCTORS"
        title="Find the right doctor"
        description="Filter sample profiles by department and visiting day, or search by name. Please confirm all details before visiting."
      />
      <section className="container-custom py-8 md:py-10">
        <DoctorDirectory initialFilters={{ speciality, days, today, search }} />
      </section>
    </>
  );
}

export default function DoctorsClient() {
  return (
    <Suspense
      fallback={
        <div className="container-custom py-10 text-center">
          Loading doctors...
        </div>
      }
    >
      <DoctorsContent />
    </Suspense>
  );
}
