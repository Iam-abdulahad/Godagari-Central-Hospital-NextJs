import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { notices } from "@/data/notices";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: notices.find((notice) => notice.slug === slug)?.title ?? "Notice" };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const notice = notices.find((item) => item.slug === slug);
  if (!notice) notFound();
  return <><PageHeading eyebrow={notice.category.toUpperCase()} title={notice.title} description={new Date(`${notice.date}T12:00:00`).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })} /><article className="container-custom max-w-3xl py-10 md:py-14"><p className="whitespace-pre-line text-base leading-8 text-ink-700">{notice.body}</p><p className="mt-8 rounded-xl border border-warning-500/40 bg-amber-50 p-4 text-sm leading-6 text-ink-700">This page contains demo notice content. Confirm current information directly with the hospital.</p><Link href="/notices" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-700"><ArrowLeft size={16} />All notices</Link></article></>;
}