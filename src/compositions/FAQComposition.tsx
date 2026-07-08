"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Card, Expandable, Body, FilterBar } from "@/components/ui";

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
          <FilterBar
            search={searchable ? { value: query, onChange: setQuery, placeholder: "Search questions" } : undefined}
            chips={derivedCategories.map((category) => ({ key: category, label: category }))}
            activeChip={activeCategory}
            onChipChange={setActiveCategory}
          />
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
