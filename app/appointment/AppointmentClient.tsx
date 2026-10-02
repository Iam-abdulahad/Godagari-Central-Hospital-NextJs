"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppointmentForm from "./AppointmentForm";

function AppointmentContent() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") ?? "";
  const doctorName = searchParams.get("doctorName") ?? "";

  return (
    <div className="container-custom py-8 md:py-10">
      {/* Pass searchParams values to your existing form/component */}
      <AppointmentForm
        initialDoctorId={doctorId}
        initialDoctorName={doctorName}
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
