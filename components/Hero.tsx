import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Wordmark } from "@/components/Header";
import { siteCopy } from "@/lib/site-copy";
import { hasWhatsApp, SITE_COVER } from "@/lib/site";

export function Hero() {
  const whatsappReady = hasWhatsApp();

  return (
    <section className="relative min-h-[92svh] overflow-hidden">
      <Image
        src={SITE_COVER}
        alt="Pratos do MANO'S Restaurante"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/90" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
        <p className="animate-fade-up text-xs uppercase tracking-[0.3em] text-white/70">
          {siteCopy.hero.eyebrow}
        </p>

        <div className="animate-fade-up mt-6" style={{ animationDelay: "80ms" }}>
          <Wordmark />
        </div>

        <p
          className="animate-fade-up mt-8 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          {siteCopy.hero.headline}
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row"
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

        <a
          href="#cardapio"
          aria-label="Ir para o cardápio"
          className="animate-fade-up mt-16 inline-flex items-center gap-2 self-start text-sm text-white/70 transition hover:text-white"
          style={{ animationDelay: "320ms" }}
        >
          <ArrowDown className="h-4 w-4" />
          Explorar cardápio
        </a>
      </div>
    </section>
  );
}
