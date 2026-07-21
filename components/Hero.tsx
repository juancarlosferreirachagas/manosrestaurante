import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Wordmark } from "@/components/Header";
import { siteCopy } from "@/lib/site-copy";
import { hasWhatsApp, SITE_COVER } from "@/lib/site";

export function Hero() {
  const whatsappReady = hasWhatsApp();

  return (
    <>
      {/* Mobile: sem hero grande — cardápio logo abaixo do header */}
      <section className="border-b border-border bg-surface px-4 py-2 md:hidden">
        <p className="text-center text-xs text-muted">
          {siteCopy.hero.eyebrow} · {siteCopy.menu.subtitle}
        </p>
      </section>

      {/* Desktop: hero completo */}
      <section className="relative hidden min-h-[88svh] overflow-hidden md:block">
        <Image
          src={SITE_COVER}
          alt="Pratos do MANO'S Restaurante"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/90" />

        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-28">
          <p className="animate-fade-up text-xs uppercase tracking-[0.3em] text-white/70">
            {siteCopy.hero.eyebrow}
          </p>

          <div className="animate-fade-up mt-6" style={{ animationDelay: "80ms" }}>
            <Wordmark />
          </div>

          <p
            className="animate-fade-up mt-8 max-w-xl text-xl leading-relaxed text-white/90"
            style={{ animationDelay: "160ms" }}
          >
            {siteCopy.hero.headline}
          </p>

          <div
            className="animate-fade-up mt-10 flex gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#cardapio"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              {siteCopy.hero.ctaMenu}
            </a>
            {whatsappReady ? (
              <a
                href="#cardapio"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" />
                {siteCopy.hero.ctaWhatsApp}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
