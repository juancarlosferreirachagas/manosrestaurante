import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import {
  getSiteUrl,
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_HOURS,
  SITE_NAME,
} from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} Restaurante | Cardápio digital`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} Restaurante`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
};

function RestaurantJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${SITE_NAME} Restaurante`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barueri",
      addressRegion: "SP",
      addressCountry: "BR",
      streetAddress: SITE_ADDRESS,
    },
    openingHours: SITE_HOURS,
    servesCuisine: "Brasileira",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <RestaurantJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
