import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { services } from "@/data/services";
import ServiceCatalog from "./ServiceCatalog";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <><PageHeading eyebrow="SERVICES" title="Care and diagnostics" description="Explore the services listed for Godagari Central Hospital. Availability and pricing should be confirmed with reception before your visit." /><section className="container-custom py-10 md:py-14"><ServiceCatalog services={services} /></section></>;
}