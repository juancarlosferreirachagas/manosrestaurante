"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { SITE_LOGO, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  onCartOpen: () => void;
};

export function Header({ onCartOpen }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="group flex items-center gap-3">
          <Image
            src={SITE_LOGO}
            alt={`Logo ${SITE_NAME}`}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border border-border object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight text-charcoal transition-colors group-hover:text-accent sm:text-2xl">
              {SITE_NAME}
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-muted">
              {SITE_TAGLINE}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-charcoal/80 md:flex">
          <a href="#cardapio" className="transition-colors hover:text-accent">
            Cardápio
          </a>
          <a href="#sobre" className="transition-colors hover:text-accent">
            Sobre
          </a>
          <a href="#contato" className="transition-colors hover:text-accent">
            Contato
          </a>
        </nav>

        <button
          type="button"
          onClick={onCartOpen}
          aria-label="Abrir pedido"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-charcoal transition hover:border-accent/30 hover:text-accent"
        >
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
              {itemCount}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Image
        src={SITE_LOGO}
        alt={`Logo ${SITE_NAME}`}
        width={140}
        height={140}
        priority
        className="h-28 w-28 rounded-full border-4 border-white/20 object-cover shadow-2xl sm:h-36 sm:w-36"
      />
      <span className="mt-5 font-display text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.9] tracking-tight text-white drop-shadow-lg">
        {SITE_NAME}
      </span>
      <span className="mt-3 text-xs uppercase tracking-[0.35em] text-white/80">
        {SITE_TAGLINE}
      </span>
    </div>
  );
}
