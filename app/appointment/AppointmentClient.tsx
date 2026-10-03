"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppointmentForm from "./AppointmentForm";

function AppointmentContent() {
  const searchParams = useSearchParams();
  const doctor = searchParams.get("doctor") ?? searchParams.get("doctorName") ?? searchParams.get("doctorId") ?? "";
  const department = searchParams.get("department") ?? "";

  return (
    <div className="container-custom py-8 md:py-10">
      <AppointmentForm
        initialDoctor={doctor}
        initialDepartment={department}
      />
    </div>
  );
}

export default function AppointmentClient() {
  return (
    <Suspense
      fallback={
        <div className="container-custom py-10 text-center">
          Loading appointment form...
        </div>
      }
    >
      <AppointmentContent />
    </Suspense>
  );
}