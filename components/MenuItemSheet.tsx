"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart-store";
import { siteCopy } from "@/lib/site-copy";
import {
  buildSingleItemMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import { cn, formatPrice } from "@/lib/utils";

type MenuItemSheetProps = {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
};

function MenuItemSheetForm({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const handleAdd = () => {
    addItem({
      itemId: item.id,
      name: item.name,
      quantity,
      priceInCents: item.priceInCents,
      note: note.trim() || undefined,
    });
    onClose();
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(
      buildSingleItemMessage(
        item.name,
        quantity,
        item.priceInCents,
        note.trim() || undefined,
      ),
    );
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-slide-up relative w-full max-w-lg rounded-t-3xl border border-border bg-surface p-6 shadow-2xl sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:text-charcoal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-10">
          {item.imageUrl ? (
            <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl border border-border">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
          ) : null}
          {item.popular ? (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Destaque
            </span>
          ) : null}
          <h3 className="mt-2 font-display text-3xl text-charcoal">{item.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {item.description}
          </p>
          <p className="mt-4 text-xl font-semibold text-charcoal">
            {formatPrice(item.priceInCents)}
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-charcoal">
            {siteCopy.menu.quantity}
          </label>
          <div className="mt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-accent/40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center text-lg font-semibold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((value) => value + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-accent/40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="item-note"
            className="text-sm font-medium text-charcoal"
          >
            {siteCopy.menu.noteLabel}
          </label>
          <textarea
            id="item-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={siteCopy.menu.notePlaceholder}
            rows={3}
            className="mt-2 w-full resize-none rounded-2xl border border-border bg-cream/50 px-4 py-3 text-sm outline-none transition focus:border-accent/40"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="h-12 rounded-full bg-accent text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            {siteCopy.menu.addToCart}
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className={cn(
              "h-12 rounded-full border border-border text-sm font-semibold text-charcoal transition hover:border-accent/30",
            )}
          >
            {siteCopy.menu.orderItem}
          </button>
        </div>
      </div>
  );
}

export function MenuItemSheet({ item, open, onClose }: MenuItemSheetProps) {
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

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <MenuItemSheetForm key={item.id} item={item} onClose={onClose} />
    </div>
  );
}
