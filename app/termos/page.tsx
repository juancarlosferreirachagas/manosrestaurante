import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos",
  description: `Termos de uso do cardápio digital do ${SITE_NAME} Restaurante.`,
};

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link href="/" className="text-sm text-accent hover:underline">
        ← Voltar ao cardápio
      </Link>
      <h1 className="mt-6 font-display text-4xl text-charcoal">Termos de uso</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Os preços e a disponibilidade dos itens podem variar sem aviso prévio.
          O total exibido no cardápio é estimado e será confirmado no
          atendimento.
        </p>
        <p>
          Imagens são ilustrativas. Ao enviar o pedido pelo WhatsApp, você
          concorda em receber o atendimento do restaurante pelos canais
          informados.
        </p>
        <p>
          Este site não processa pagamentos. A confirmação do pedido e do valor
          final acontece diretamente com a equipe do {SITE_NAME}.
        </p>
      </div>
    </main>
  );
}
