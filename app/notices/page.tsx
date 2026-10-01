import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Pin } from "lucide-react";
import PageHeading from "@/components/PageHeading";
import { notices } from "@/data/notices";

export const metadata: Metadata = { title: "Notices" };

export default function NoticesPage() {
  const sortedNotices = [...notices].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || b.date.localeCompare(a.date));
  return <><PageHeading eyebrow="NEWS & UPDATES" title="Notices" description="Announcements and updates. Entries marked as demo should not be treated as current hospital guidance." /><section className="container-custom max-w-4xl py-10 md:py-14"><div className="divide-y divide-line border-y border-line">{sortedNotices.map((notice) => <Link key={notice.slug} href={`/notices/${notice.slug}`} className={`flex gap-4 py-5 ${notice.pinned ? "border-l-2 border-warning-500 pl-4" : "pl-4"}`}><time dateTime={notice.date} className="w-14 shrink-0 text-center"><span className="block text-2xl font-bold text-ink-900">{new Date(`${notice.date}T12:00:00`).getDate()}</span><span className="text-xs font-semibold uppercase text-ink-500">{new Date(`${notice.date}T12:00:00`).toLocaleDateString("en", { month: "short" })}</span></time><span className="min-w-0 flex-1"><span className="flex items-center gap-2 text-xs font-semibold text-primary-700">{notice.pinned && <Pin size={13} />} {notice.category}</span><span className="mt-1 block font-display text-lg font-semibold text-ink-900">{notice.title}</span><span className="mt-1 block line-clamp-2 text-sm leading-6 text-ink-500">{notice.body}</span></span><ArrowRight size={18} className="mt-2 shrink-0 text-primary-700" /></Link>)}</div></section></>;
}