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
        rootMargin: "-20% 0px -60% 0px",
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
      const top = element.getBoundingClientRect().top + window.scrollY - 108;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const openItem = (item: MenuItem) => {
    setSelectedItem(item);
    setSheetOpen(true);
  };

  return (
    <section id="cardapio" className="pb-20 pt-2 md:pb-28 md:pt-0 md:py-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="hidden max-w-2xl md:block">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Cardápio
          </p>
          <h2 className="mt-4 font-display text-5xl text-charcoal">
            {siteCopy.menu.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{siteCopy.menu.subtitle}</p>
        </div>

        <div className="relative md:mt-10">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={siteCopy.menu.searchPlaceholder}
            className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none transition focus:border-accent/40"
          />
        </div>

        <div
          ref={pillsRef}
          className="sticky top-12 z-20 -mx-3 mt-2 overflow-x-auto border-b border-border bg-cream/95 px-3 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 md:top-16 md:mt-8 md:py-3"
        >
          <div className="flex min-w-max gap-1.5 md:gap-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollToCategory(category.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition md:px-4 md:py-2 md:text-sm",
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

        <div className="mt-4 space-y-8 md:mt-10 md:space-y-14">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-sm text-muted">
              {siteCopy.menu.emptySearch}
            </p>
          ) : (
            filteredCategories.map((category) => (
              <section
                key={category.id}
                id={`category-${category.id}`}
                ref={(element) => {
                  sectionRefs.current[category.id] = element;
                }}
                className="scroll-mt-28 md:scroll-mt-36"
              >
                <div className="mb-3 md:mb-6">
                  <h3 className="font-display text-2xl text-charcoal md:text-3xl">
                    {category.name}
                  </h3>
                  {category.description ? (
                    <p className="mt-1 hidden text-sm text-muted md:block">
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
                        className="group flex w-full items-center justify-between gap-3 py-3 text-left transition active:bg-surface/70 md:items-start md:gap-4 md:py-4"
                      >
                        {item.imageUrl ? (
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-cream md:h-20 md:w-20 md:rounded-2xl">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="72px"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-sm font-semibold text-charcoal transition group-hover:text-accent md:text-base md:font-medium">
                              {item.name}
                            </span>
                            {item.popular ? (
                              <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent">
                                Destaque
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted md:mt-1 md:text-sm md:leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-bold text-charcoal md:font-semibold">
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
