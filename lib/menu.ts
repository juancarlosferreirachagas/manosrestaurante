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

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

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
        imageUrl: img("1546069901-ba9599a7e63c"),
        popular: true,
        tags: ["caseiro"],
      },
      {
        id: "marmitex-medio",
        name: "Marmitex médio",
        description: "Porção individual com arroz, feijão e acompanhamentos.",
        priceInCents: 2490,
        imageUrl: img("1546833999-b4f4a389df41"),
      },
      {
        id: "feijoada",
        name: "Feijoada completa",
        description: "Arroz, couve, farofa, laranja e torresmo.",
        priceInCents: 3890,
        imageUrl: img("1512058564366-31410b017e85"),
        popular: true,
      },
      {
        id: "strogonoff-frango",
        name: "Strogonoff de frango",
        description: "Arroz branco e batata palha crocante.",
        priceInCents: 2990,
        imageUrl: img("1632774946440-2615d2b74d0c"),
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
        imageUrl: img("1598103447897-25b3817fb1f3"),
      },
      {
        id: "bife-acebolado",
        name: "Bife acebolado",
        description: "Com arroz, feijão tropeiro e batata frita.",
        priceInCents: 3290,
        imageUrl: img("1558030006-450675393462"),
        popular: true,
      },
      {
        id: "calabresa-acebolada",
        name: "Calabresa acebolada",
        description: "Na chapa, com pão de alho opcional.",
        priceInCents: 3490,
        imageUrl: img("1529042410757-b6d8a4c366d4"),
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
        imageUrl: img("1568908519248-5279bdb039a5"),
        popular: true,
      },
      {
        id: "misto-quente",
        name: "Misto quente",
        description: "Pão, presunto e queijo na chapa.",
        priceInCents: 1490,
        imageUrl: img("1528735602780-2552fd46c7af"),
      },
      {
        id: "hot-dog-completo",
        name: "Hot dog completo",
        description: "Purê, milho, batata palha e molhos.",
        priceInCents: 1790,
        imageUrl: img("1612392062631-94c5b1a7d6e3"),
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
        imageUrl: img("1621506286607-9c3ea4c8753b"),
      },
      {
        id: "refrigerante-lata",
        name: "Refrigerante lata",
        description: "350 ml — consulte sabores no balcão.",
        priceInCents: 790,
        imageUrl: img("1629203851127-3726ecdf080e"),
      },
      {
        id: "agua-mineral",
        name: "Água mineral",
        description: "500 ml, com ou sem gás.",
        priceInCents: 590,
        imageUrl: img("1548839140-29a751e1d231"),
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
        imageUrl: img("1587314163834-6a1e23d4b1c1"),
        popular: true,
      },
      {
        id: "mousse-maracuja",
        name: "Mousse de maracujá",
        description: "Leve e refrescante.",
        priceInCents: 1190,
        imageUrl: img("1488477181946-6428a0291777"),
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
