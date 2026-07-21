export const siteCopy = {
  hero: {
    eyebrow: "Jardim Mutinga · Barueri",
    headline:
      "Comida caseira de verdade — marmitex, lanches e sobremesas na hora.",
    ctaMenu: "Ver cardápio",
    ctaWhatsApp: "Pedir no WhatsApp",
  },
  menu: {
    title: "Cardápio",
    subtitle: "Escolha o que quiser e envie o pedido direto pro balcão.",
    searchPlaceholder: "Buscar prato ou bebida…",
    emptySearch: "Nenhum item encontrado. Tente outro termo.",
    addToCart: "Adicionar ao pedido",
    orderItem: "Pedir este no WhatsApp",
    noteLabel: "Observação",
    notePlaceholder: "Ex.: sem cebola, ponto da carne…",
    quantity: "Quantidade",
  },
  cart: {
    title: "Seu pedido",
    empty: "Nenhum item ainda. Explore o cardápio e monte seu pedido.",
    total: "Total estimado",
    sendWhatsApp: "Enviar no WhatsApp",
    clear: "Limpar pedido",
    counter: (count: number) =>
      count === 1 ? "1 item" : `${count} itens`,
    noWhatsApp:
      "WhatsApp ainda não configurado. Peça no balcão ou pelo iFood.",
  },
  about: {
    title: "Sobre o MANO'S",
    body: "Restaurante com comida caseira em Jardim Mutinga. Fazemos marmitex, lanches, bebidas e sobremesas — com marmitex grande de 900g que serve duas pessoas. Monte o pedido no celular e retire no balcão.",
  },
  contact: {
    title: "Como pedir",
    body: "Monte seu pedido aqui e envie pelo WhatsApp. Retire no balcão ou peça pelo iFood.",
    whatsapp: "WhatsApp",
    ifood: "Pedir no iFood",
    address: "Endereço",
    hours: "Horário",
  },
  footer: {
    disclaimer:
      "Preços e disponibilidade podem variar. Imagens ilustrativas.",
  },
} as const;
