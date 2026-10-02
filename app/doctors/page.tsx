import type { Metadata } from "next";
import DoctorsClient from "./DoctorsClient";

export const metadata: Metadata = { title: "Find a Doctor" };

export const dynamic = "force-static";

export default function DoctorsPage() {
  return <DoctorsClient />;
}
