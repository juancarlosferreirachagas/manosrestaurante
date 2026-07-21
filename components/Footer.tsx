import { ExternalLink } from "lucide-react";
import { siteCopy } from "@/lib/site-copy";
import {
  SITE_ADDRESS,
  SITE_HOURS,
  SITE_IFOOD_URL,
  SITE_NAME,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-white">{SITE_NAME}</p>
          <p className="mt-3 text-sm leading-relaxed">{siteCopy.about.body}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Navegação
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#cardapio" className="transition hover:text-white">
                Cardápio
              </a>
            </li>
            <li>
              <a href="#sobre" className="transition hover:text-white">
                Sobre
              </a>
            </li>
            <li>
              <a href="#contato" className="transition hover:text-white">
                Contato
              </a>
            </li>
            <li>
              <a href="/privacidade" className="transition hover:text-white">
                Privacidade
              </a>
            </li>
            <li>
              <a href="/termos" className="transition hover:text-white">
                Termos
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            Também no
          </p>
          <a
            href={SITE_IFOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-accent"
          >
            iFood
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="mt-6 text-sm">{SITE_ADDRESS}</p>
          <p className="mt-1 text-sm">{SITE_HOURS}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-white/45 sm:px-6">
          © {new Date().getFullYear()} {SITE_NAME}. {siteCopy.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
