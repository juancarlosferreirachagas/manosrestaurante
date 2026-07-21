"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MenuItemSheet } from "@/components/MenuItemSheet";
import {
  menuCategories,
  searchMenuItems,
  type MenuItem,
} from "@/lib/menu";
import { siteCopy } from "@/lib/site-copy";
import { cn, formatPrice } from "@/lib/utils";

export function MenuSection() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]?.id ?? "");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillsRef = useRef<HTMLDivElement>(null);

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return menuCategories;

    const matchingIds = new Set(searchMenuItems(query).map((item) => item.id));
    return menuCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => matchingIds.has(item.id)),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const resolvedActiveCategory = filteredCategories.some(
    (category) => category.id === activeCategory,
  )
    ? activeCategory
    : (filteredCategories[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) {
          setActiveCategory(top.target.id.replace("category-", ""));
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6],
      },
    );

    filteredCategories.forEach((category) => {
      const element = sectionRefs.current[category.id];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [filteredCategories]);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = sectionRefs.current[categoryId];
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 132;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const openItem = (item: MenuItem) => {
    setSelectedItem(item);
    setSheetOpen(true);
  };

  return (
    <section id="cardapio" className="py-20 pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Cardápio
          </p>
          <h2 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
            {siteCopy.menu.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{siteCopy.menu.subtitle}</p>
        </div>

        <div className="relative mt-10">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={siteCopy.menu.searchPlaceholder}
            className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-accent/40"
          />
        </div>

        <div
          ref={pillsRef}
          className="sticky top-16 z-20 -mx-4 mt-8 overflow-x-auto border-b border-border bg-cream/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6"
        >
          <div className="flex min-w-max gap-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToCategory(category.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  resolvedActiveCategory === category.id
                    ? "bg-charcoal text-white"
                    : "bg-surface text-charcoal/80 hover:text-charcoal",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-14">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-muted">{siteCopy.menu.emptySearch}</p>
          ) : (
            filteredCategories.map((category) => (
              <section
                key={category.id}
                id={`category-${category.id}`}
                ref={(element) => {
                  sectionRefs.current[category.id] = element;
                }}
                className="scroll-mt-36"
              >
                <div className="mb-6">
                  <h3 className="font-display text-3xl text-charcoal">
                    {category.name}
                  </h3>
                  {category.description ? (
                    <p className="mt-2 text-sm text-muted">
                      {category.description}
                    </p>
                  ) : null}
                </div>

                <ul className="divide-y divide-border border-y border-border">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => openItem(item)}
                        className="group flex w-full items-start justify-between gap-4 py-5 text-left transition hover:bg-surface/70"
                      >
                        {item.imageUrl ? (
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-cream">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover transition duration-300 group-hover:scale-105"
                              sizes="80px"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-charcoal transition group-hover:text-accent">
                              {item.name}
                            </span>
                            {item.popular ? (
                              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                                Destaque
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {item.description}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-charcoal">
                          {formatPrice(item.priceInCents)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>

      <MenuItemSheet
        item={selectedItem}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
}
