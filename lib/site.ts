export const SITE_NAME = "MANO'S";
export const SITE_TAGLINE = "Restaurante";
export const SITE_DESCRIPTION =
  "Comida caseira em Jardim Mutinga, Barueri. Marmitex, lanches, bebidas e sobremesas. Peça pelo WhatsApp e retire no balcão.";

export const SITE_ADDRESS = "Rua Aberlado Luz, 99 — Jardim Mutinga, Barueri — SP";
export const SITE_HOURS = "Seg a Sáb · 10h–15h e 17h–23h · Dom · 11h–15h e 18h–23h";
export const SITE_IFOOD_URL =
  "https://www.ifood.com.br/delivery/barueri-sp/manos-restaurante-jardim-mutinga/fc3387e4-afdc-4715-b671-1a12561a3d0a";

export const SITE_LOGO = "/logo.jpg";
export const SITE_COVER = "/cover.jpg";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function getWhatsAppNumber(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "");
  return raw && raw.length >= 10 ? raw : null;
}

export function hasWhatsApp(): boolean {
  return getWhatsAppNumber() !== null;
}
