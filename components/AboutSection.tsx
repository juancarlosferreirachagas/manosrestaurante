import { siteCopy } from "@/lib/site-copy";

export function AboutSection() {
  return (
    <section id="sobre" className="border-y border-border bg-surface py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Sobre</p>
        <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
          {siteCopy.about.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {siteCopy.about.body}
        </p>
      </div>
    </section>
  );
}
