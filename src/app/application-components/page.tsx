import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SectionPlaceholder, CardGrid } from "@/components/layout";
import { Card, Body, Badge, Caption } from "@/components/ui";
import { DESIGN_SYSTEM_SECTIONS } from "@/lib/design-system-nav";
import { CANONICAL_APPLICATION_GROUPS, getGroup, getGroupEntries } from "@/lib/design-system-navigation";

const section = DESIGN_SYSTEM_SECTIONS.find((s) => s.id === "application-components")!;

const GROUP_CARDS = CANONICAL_APPLICATION_GROUPS.map((groupId) => {
  const group = getGroup(groupId)!;
  const entries = getGroupEntries(groupId);
  // Every group's own landing entry (order 0) isn't a "page" to browse to from this card — subtract it.
  const itemCount = entries.length - 1;
  const certifiedCount = entries.filter((entry) => entry.status === "certified").length;
  return { group, itemCount, certifiedCount };
});

const META_ENTRIES = getGroupEntries("app-meta").filter((entry) => entry.id !== "application-components");

export default function ApplicationComponentsPage() {
  return (
    <SectionPlaceholder section={section}>
      <div className="flex flex-col gap-10">
        <Card className="flex flex-col gap-4 border-accent-500/30 bg-accent-soft/40 sm:flex-row sm:items-start">
          <Sparkles className="size-5 shrink-0 text-accent-400" aria-hidden />
          <div className="flex flex-col gap-3">
            <Body size="sm" muted>
              The components, patterns, and diagram libraries the StudioPOD application&rsquo;s own screens are built
              from — organized into six systems, from workspace architecture up through platform-specific libraries
              and certification.
            </Body>
            <Link
              href="/docs"
              className="focus-ring w-fit rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
            >
              Browse the full documentation IA →
            </Link>
          </div>
        </Card>

        <CardGrid columns={3} gap="md">
          {GROUP_CARDS.map(({ group, itemCount, certifiedCount }) => (
            <Link key={group.id} href={group.href} className="focus-ring block rounded-lg">
              <Card interactive className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md font-medium text-ink-primary">{group.title}</span>
                  {certifiedCount > 0 ? (
                    <Badge tone="success" size="sm">
                      Certified
                    </Badge>
                  ) : null}
                </div>
                <Body size="sm" muted className="flex-1">
                  {group.description}
                </Body>
                <Caption className="text-ink-tertiary">
                  {itemCount} {itemCount === 1 ? "page" : "pages"}
                </Caption>
              </Card>
            </Link>
          ))}
        </CardGrid>

        <div className="flex flex-col gap-3">
          <Caption className="uppercase tracking-wide text-ink-tertiary">Overview & meta</Caption>
          <div className="flex flex-wrap gap-3">
            {META_ENTRIES.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="focus-ring rounded-md border border-border px-3 py-1.5 text-caption text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:text-ink-primary"
              >
                {entry.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionPlaceholder>
  );
}
