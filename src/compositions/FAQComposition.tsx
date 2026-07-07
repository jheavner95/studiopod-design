"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Card, Expandable, Button, Body } from "@/components/ui";

export interface FAQItem {
  id: string;
  question: string;
  answer: ReactNode;
  category?: string;
}

export interface FAQCompositionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  items: FAQItem[];
  /** Category filter pills. Omit to derive them automatically from `items[].category`. */
  categories?: string[];
  /** Adds a search input that filters by question text (and answer text, when it's a plain string). */
  searchable?: boolean;
  className?: string;
}

function matchesQuery(item: FAQItem, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  if (item.question.toLowerCase().includes(q)) return true;
  if (typeof item.answer === "string" && item.answer.toLowerCase().includes(q)) return true;
  return false;
}

/** An accordion FAQ with optional category filtering and search — the plumbing is wired, real search-as-you-type is free. */
export function FAQComposition({
  eyebrow,
  title,
  description,
  items,
  categories,
  searchable = false,
  className,
}: FAQCompositionProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const derivedCategories = useMemo(
    () =>
      categories ??
      Array.from(new Set(items.map((item) => item.category).filter((c): c is string => Boolean(c)))),
    [categories, items],
  );

  const filtered = items.filter(
    (item) => matchesQuery(item, query) && (!activeCategory || item.category === activeCategory),
  );

  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-10">
        {title ? <SectionHeader eyebrow={eyebrow} title={title} description={description} /> : null}

        {searchable || derivedCategories.length > 0 ? (
          <div className="flex flex-col gap-4">
            {searchable ? (
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-tertiary" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search questions"
                  className="focus-ring w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-body-sm text-ink-primary placeholder:text-ink-tertiary"
                />
              </div>
            ) : null}
            {derivedCategories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={activeCategory === null ? "secondary" : "ghost"}
                  onClick={() => setActiveCategory(null)}
                >
                  All
                </Button>
                {derivedCategories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={activeCategory === category ? "secondary" : "ghost"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <Body muted size="sm">
              No questions match your search.
            </Body>
          ) : (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <Card key={item.id} padding="md">
                  <Expandable
                    open={isOpen}
                    onOpenChange={(open) => setOpenId(open ? item.id : null)}
                    trigger={
                      <div className="flex flex-1 items-center justify-between gap-4">
                        <span className="text-body-md font-medium text-ink-primary">{item.question}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-ink-tertiary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                            isOpen && "rotate-180",
                          )}
                        />
                      </div>
                    }
                    contentClassName="pt-3 text-body-sm text-ink-secondary"
                  >
                    {item.answer}
                  </Expandable>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </SectionShell>
  );
}
