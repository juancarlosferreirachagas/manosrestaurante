import { Clock, MapPin, MessageCircle } from "lucide-react";
import { siteCopy } from "@/lib/site-copy";
import {
  getWhatsAppNumber,
  hasWhatsApp,
  SITE_ADDRESS,
  SITE_HOURS,
  SITE_IFOOD_URL,
} from "@/lib/site";

export function ContactSection() {
  const whatsappNumber = getWhatsAppNumber();
  const whatsappReady = hasWhatsApp();

  return (
    <section id="contato" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Contato
          </p>
          <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
            {siteCopy.contact.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{siteCopy.contact.body}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <MessageCircle className="h-5 w-5 text-accent" />
            <p className="mt-4 text-sm font-semibold text-charcoal">
              {siteCopy.contact.whatsapp}
            </p>
            <p className="mt-2 text-sm text-muted">
              {whatsappReady
                ? `+${whatsappNumber?.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "$1 $2 $3-$4")}`
                : "Configure NEXT_PUBLIC_WHATSAPP no .env"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <MapPin className="h-5 w-5 text-accent" />
            <p className="mt-4 text-sm font-semibold text-charcoal">
              {siteCopy.contact.address}
            </p>
            <p className="mt-2 text-sm text-muted">{SITE_ADDRESS}</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <Clock className="h-5 w-5 text-accent" />
            <p className="mt-4 text-sm font-semibold text-charcoal">
              {siteCopy.contact.hours}
            </p>
            <p className="mt-2 text-sm text-muted">{SITE_HOURS}</p>
          </div>

          <a
            href={SITE_IFOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-charcoal p-6 text-white transition hover:bg-charcoal/90"
          >
            <p className="text-sm font-semibold">{siteCopy.contact.ifood}</p>
            <p className="mt-2 text-sm text-white/70">
              Delivery pelo app quando preferir.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
