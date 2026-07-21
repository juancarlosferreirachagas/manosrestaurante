export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  imageUrl?: string;
  tags?: string[];
  popular?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

const menuImage = (slug: string) => `/menu/${slug}.jpg`;

export const menuCategories: MenuCategory[] = [
  {
    id: "marmitex",
    name: "Marmitex",
    description: "Comida caseira na hora. Marmitex grande de 900g serve duas pessoas.",
    items: [
      {
        id: "marmitex-grande",
        name: "Marmitex grande (900g)",
        description: "Serve duas pessoas. Arroz, feijão, salada e proteína do dia.",
        priceInCents: 3290,
        imageUrl: menuImage("marmitex-grande"),
        popular: true,
        tags: ["caseiro"],
      },
      {
        id: "marmitex-medio",
        name: "Marmitex médio",
        description: "Porção individual com arroz, feijão e acompanhamentos.",
        priceInCents: 2490,
        imageUrl: menuImage("marmitex-medio"),
      },
      {
        id: "feijoada",
        name: "Feijoada completa",
        description: "Arroz, couve, farofa, laranja e torresmo.",
        priceInCents: 3890,
        imageUrl: menuImage("feijoada"),
        popular: true,
      },
      {
        id: "strogonoff-frango",
        name: "Strogonoff de frango",
        description: "Arroz branco e batata palha crocante.",
        priceInCents: 2990,
        imageUrl: menuImage("strogonoff-frango"),
      },
    ],
  },
  {
    id: "pratos",
    name: "Pratos",
    description: "Sugestões quentes do dia.",
    items: [
      {
        id: "frango-grelhado",
        name: "Frango grelhado",
        description: "Peito temperado, arroz, feijão e salada.",
        priceInCents: 2790,
        imageUrl: menuImage("frango-grelhado"),
      },
      {
        id: "bife-acebolado",
        name: "Bife acebolado",
        description: "Com arroz, feijão tropeiro e batata frita.",
        priceInCents: 3290,
        imageUrl: menuImage("bife-acebolado"),
        popular: true,
      },
      {
        id: "calabresa-acebolada",
        name: "Calabresa acebolada",
        description: "Na chapa, com pão de alho opcional.",
        priceInCents: 3490,
        imageUrl: menuImage("calabresa-acebolada"),
      },
    ],
  },
  {
    id: "lanches",
    name: "Lanches",
    description: "Rápidos e caprichados.",
    items: [
      {
        id: "x-tudo",
        name: "X-Tudo",
        description: "Hambúrguer, queijo, presunto, ovo, salada e molho da casa.",
        priceInCents: 2490,
        imageUrl: menuImage("x-tudo"),
        popular: true,
      },
      {
        id: "misto-quente",
        name: "Misto quente",
        description: "Pão, presunto e queijo na chapa.",
        priceInCents: 1490,
        imageUrl: menuImage("misto-quente"),
      },
      {
        id: "hot-dog-completo",
        name: "Hot dog completo",
        description: "Purê, milho, batata palha e molhos.",
        priceInCents: 1790,
        imageUrl: menuImage("hot-dog-completo"),
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Para acompanhar seu pedido.",
    items: [
      {
        id: "suco-natural",
        name: "Suco natural",
        description: "Laranja, limão ou abacaxi — 500 ml.",
        priceInCents: 1290,
        imageUrl: menuImage("suco-natural"),
      },
      {
        id: "refrigerante-lata",
        name: "Refrigerante lata",
        description: "350 ml — consulte sabores no balcão.",
        priceInCents: 790,
        imageUrl: menuImage("refrigerante-lata"),
      },
      {
        id: "agua-mineral",
        name: "Água mineral",
        description: "500 ml, com ou sem gás.",
        priceInCents: 590,
        imageUrl: menuImage("agua-mineral"),
      },
    ],
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    description: "Para fechar com gosto.",
    items: [
      {
        id: "pudim",
        name: "Pudim de leite",
        description: "Fatia generosa, calda de caramelo.",
        priceInCents: 1290,
        imageUrl: menuImage("pudim"),
        popular: true,
      },
      {
        id: "mousse-maracuja",
        name: "Mousse de maracujá",
        description: "Leve e refrescante.",
        priceInCents: 1190,
        imageUrl: menuImage("mousse-maracuja"),
      },
    ],
  },
];

export function getAllMenuItems(): MenuItem[] {
  return menuCategories.flatMap((category) => category.items);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return getAllMenuItems().find((item) => item.id === id);
}

export function searchMenuItems(query: string): MenuItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getAllMenuItems();

  return getAllMenuItems().filter((item) => {
    const haystack = `${item.name} ${item.description} ${item.tags?.join(" ") ?? ""}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
