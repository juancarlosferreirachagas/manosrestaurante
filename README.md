# MANO'S Restaurante — Cardápio digital

Site Next.js com cardápio mobile-first e pedido via WhatsApp para atendimento no balcão.

## Rodar local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `NEXT_PUBLIC_WHATSAPP` no `.env.local` com o número do restaurante (DDI + DDD + número, só dígitos).

## Atualizar cardápio

Edite [`lib/menu.ts`](lib/menu.ts) com categorias, pratos e preços em centavos.

## Deploy

Compatível com Vercel. Defina `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_WHATSAPP` nas variáveis de ambiente.
