"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/whatsapp";

const STORAGE_KEY = "manos-cart-v1";
const EMPTY_CART: CartLine[] = [];

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  totalInCents: number;
  addItem: (line: Omit<CartLine, "itemId"> & { itemId: string }) => void;
  removeItem: (itemId: string, note?: string) => void;
  updateQuantity: (itemId: string, quantity: number, note?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const listeners = new Set<() => void>();
let snapshot: CartLine[] = EMPTY_CART;

function lineKey(itemId: string, note?: string) {
  return `${itemId}::${note ?? ""}`;
}

function loadLines(): CartLine[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function setSnapshot(lines: CartLine[]) {
  snapshot = lines;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

function persistLines(lines: CartLine[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  setSnapshot(lines);
  emitChange();
}

function ensureClientSnapshot() {
  if (typeof window !== "undefined" && snapshot === EMPTY_CART) {
    setSnapshot(loadLines());
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  ensureClientSnapshot();

  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback(
    (line: Omit<CartLine, "itemId"> & { itemId: string }) => {
      const current = getSnapshot();
      const key = lineKey(line.itemId, line.note);
      const existingIndex = current.findIndex(
        (entry) => lineKey(entry.itemId, entry.note) === key,
      );

      if (existingIndex === -1) {
        persistLines([...current, line]);
        return;
      }

      persistLines(
        current.map((entry, index) =>
          index === existingIndex
            ? { ...entry, quantity: entry.quantity + line.quantity }
            : entry,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback((itemId: string, note?: string) => {
    const key = lineKey(itemId, note);
    persistLines(
      getSnapshot().filter(
        (entry) => lineKey(entry.itemId, entry.note) !== key,
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, quantity: number, note?: string) => {
      const key = lineKey(itemId, note);
      if (quantity <= 0) {
        persistLines(
          getSnapshot().filter(
            (entry) => lineKey(entry.itemId, entry.note) !== key,
          ),
        );
        return;
      }

      persistLines(
        getSnapshot().map((entry) =>
          lineKey(entry.itemId, entry.note) === key
            ? { ...entry, quantity }
            : entry,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => persistLines(EMPTY_CART), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const totalInCents = useMemo(
    () =>
      lines.reduce((sum, line) => sum + line.priceInCents * line.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      totalInCents,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [lines, itemCount, totalInCents, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
