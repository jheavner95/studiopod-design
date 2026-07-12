import { Body, SectionHeader, Eyebrow } from "@/components/ui";
import { CardGrid, SectionShell } from "@/components/layout";
import { MetricCard } from "@/components/operational";
import { DocsLinkCard } from "@/components/docs";
import type { NavEntry, NavGroup } from "@/lib/design-system-navigation";

interface DocsSectionLandingStat {
  label: string;
  value: string;
}

interface DocsSectionLandingProps {
  purpose: string;
  whatYoullLearn: string[];
  stats: DocsSectionLandingStat[];
  primaryEntryPoints: NavEntry[];
  relatedGroups: NavGroup[];
}

/**
 * DS-6.1 — the visual-hub landing pattern every /docs/* group landing page
 * adopts: a purpose statement and learning outline, a component/page-count
 * scorecard, a small set of featured starting points (distinct from the
 * full page grid a caller renders separately via DocsEntryGrid), and
 * cross-links to sibling sections. Callers compose this above their own
 * DocsEntryGrid("Most commonly used pages") rather than this owning that
 * grid itself, since the grid's entry list is often filtered differently
 * per page (e.g. excluding the landing entry itself).
 */
export function DocsSectionLanding({ purpose, whatYoullLearn, stats, primaryEntryPoints, relatedGroups }: DocsSectionLandingProps) {
  return (
    <>
      <SectionShell spacing="lg" divider>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">Purpose</Eyebrow>
            <Body size="lg" className="max-w-[65ch]">
              {purpose}
            </Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow tone="accent">What you&apos;ll learn</Eyebrow>
            <ul className="flex flex-col gap-2">
              {whatYoullLearn.map((item) => (
                <li key={item} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <CardGrid columns={stats.length >= 4 ? 4 : 3} gap="md">
          {stats.map((stat) => (
            <MetricCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </CardGrid>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="entry-points"
            eyebrow={<Eyebrow tone="accent">Start here</Eyebrow>}
            title="Primary entry points"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={primaryEntryPoints.length === 2 ? 2 : 3} gap="md">
            {primaryEntryPoints.map((item) => (
              <DocsLinkCard key={item.id} href={item.href} title={item.title} description={item.description} size="lg" />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      {relatedGroups.length > 0 ? (
        <SectionShell spacing="lg" divider>
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="related-sections"
              eyebrow={<Eyebrow tone="accent">Continue exploring</Eyebrow>}
              title="Related sections"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={relatedGroups.length === 2 ? 2 : 3} gap="md">
              {relatedGroups.map((group) => (
                <DocsLinkCard key={group.id} href={group.href} title={group.title} description={group.description} />
              ))}
            </CardGrid>
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}
