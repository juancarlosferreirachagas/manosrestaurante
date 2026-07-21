"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { siteCopy } from "@/lib/site-copy";

type WhatsAppFabProps = {
  onOpenCart: () => void;
};

export function WhatsAppFab({ onOpenCart }: WhatsAppFabProps) {
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal">Seu pedido</p>
            <p className="text-xs text-muted">{siteCopy.cart.counter(itemCount)}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenCart}
          className="h-11 rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          Ver pedido ({itemCount})
        </button>
      </div>
    </div>
  );
}
