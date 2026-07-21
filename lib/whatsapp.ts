import { formatPrice } from "@/lib/utils";
import { getWhatsAppNumber, SITE_NAME } from "@/lib/site";

export type CartLine = {
  itemId: string;
  name: string;
  quantity: number;
  priceInCents: number;
  note?: string;
};

export function buildCartMessage(lines: CartLine[]): string {
  const itemsText = lines
    .map((line) => {
      const note = line.note ? ` (${line.note})` : "";
      return `• ${line.quantity}x ${line.name}${note} — ${formatPrice(line.priceInCents * line.quantity)}`;
    })
    .join("\n");

  const total = lines.reduce(
    (sum, line) => sum + line.priceInCents * line.quantity,
    0,
  );

  return [
    `*Pedido ${SITE_NAME}*`,
    "",
    itemsText,
    "",
    `Total estimado: ${formatPrice(total)}`,
    "(Atendimento no balcão)",
  ].join("\n");
}

export function buildSingleItemMessage(
  name: string,
  quantity: number,
  priceInCents: number,
  note?: string,
): string {
  const noteLine = note ? `\nObs: ${note}` : "";
  return [
    `*Pedido ${SITE_NAME}*`,
    "",
    `• ${quantity}x ${name} — ${formatPrice(priceInCents * quantity)}${noteLine}`,
    "",
    "(Atendimento no balcão)",
  ].join("\n");
}

export function buildWhatsAppUrl(message: string): string | null {
  const phone = getWhatsAppNumber();
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
