import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidade",
  description: `Política de privacidade do ${SITE_NAME} Restaurante.`,
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link href="/" className="text-sm text-accent hover:underline">
        ← Voltar ao cardápio
      </Link>
      <h1 className="mt-6 font-display text-4xl text-charcoal">Privacidade</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Este site é um cardápio digital do {SITE_NAME} Restaurante. Não
          coletamos dados pessoais além do que você envia voluntariamente ao
          abrir o WhatsApp para fazer seu pedido.
        </p>
        <p>
          O carrinho fica salvo apenas no seu navegador (localStorage) para
          facilitar o pedido. Você pode limpar a qualquer momento.
        </p>
        <p>
          Para dúvidas sobre seus dados, fale conosco pelo WhatsApp ou no
          balcão.
        </p>
      </div>
    </main>
  );
}
