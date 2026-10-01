import type { ReactNode } from "react";

export default function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-primary-50/70">
      <div className="container-custom py-10 md:py-14">
        <p className="text-sm font-semibold text-primary-700">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight text-ink-900 md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink-500">{description}</p>
        {children}
      </div>
    </section>
  );
}