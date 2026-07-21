"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";
import { siteCopy } from "@/lib/site-copy";
import { hasWhatsApp } from "@/lib/site";
import { buildCartMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { lines, totalInCents, updateQuantity, removeItem, clearCart } =
    useCart();
  const whatsappReady = hasWhatsApp();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSend = () => {
    const url = buildWhatsAppUrl(buildCartMessage(lines));
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Fechar pedido"
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <aside className="animate-slide-up relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl sm:animate-none">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-2xl text-charcoal">
              {siteCopy.cart.title}
            </h2>
            <p className="text-sm text-muted">
              {siteCopy.cart.counter(
                lines.reduce((sum, line) => sum + line.quantity, 0),
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:text-charcoal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted">
              {siteCopy.cart.empty}
            </p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li
                  key={`${line.itemId}-${line.note ?? ""}`}
                  className="rounded-2xl border border-border bg-cream/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-charcoal">{line.name}</p>
                      {line.note ? (
                        <p className="mt-1 text-xs text-muted">{line.note}</p>
                      ) : null}
                      <p className="mt-2 text-sm font-semibold text-charcoal">
                        {formatPrice(line.priceInCents * line.quantity)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.itemId, line.note)}
                      aria-label="Remover item"
                      className="text-muted transition hover:text-accent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.itemId,
                          line.quantity - 1,
                          line.note,
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.itemId,
                          line.quantity + 1,
                          line.note,
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{siteCopy.cart.total}</span>
            <span className="text-lg font-semibold text-charcoal">
              {formatPrice(totalInCents)}
            </span>
          </div>

          {whatsappReady ? (
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={handleSend}
              className="mt-4 h-12 w-full rounded-full bg-accent text-sm font-semibold text-white transition enabled:hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {siteCopy.cart.sendWhatsApp}
            </button>
          ) : (
            <p className="mt-4 text-center text-sm text-muted">
              {siteCopy.cart.noWhatsApp}
            </p>
          )}

          {lines.length > 0 ? (
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-sm text-muted transition hover:text-accent"
            >
              {siteCopy.cart.clear}
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
