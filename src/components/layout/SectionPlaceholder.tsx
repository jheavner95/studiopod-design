import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "./PageShell";
import { SectionShell } from "./SectionShell";
import { CardGrid } from "./CardGrid";
import { SectionBadge, SectionHeader, Eyebrow, Display, Body, Card, Badge } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import type { DesignSystemSection } from "@/lib/design-system-nav";

interface SectionPlaceholderProps {
  section: DesignSystemSection;
  /** Bespoke notes specific to this package, rendered between the intro and the reference links. */
  children?: ReactNode;
}

/** Shared shell for every Design System nav-section page: intro, status, optional bespoke notes, then links into the existing implementation. */
export function SectionPlaceholder({ section, children }: SectionPlaceholderProps) {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <div className="flex flex-col gap-6">
          <SectionBadge>{section.eyebrow}</SectionBadge>
          <Display>{section.title}</Display>
          <Body size="lg" muted className="max-w-[var(--container-narrow)]">
            {section.description}
          </Body>
          <Badge size="sm" className="w-fit">
            {section.status}
          </Badge>
        </div>
      </SectionShell>

      {children ? <SectionShell spacing="md">{children}</SectionShell> : null}

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Where this lives today</Eyebrow>}
            title="Existing implementation"
            description="Nothing below was deleted for this restructure — these are the current playgrounds this package will consolidate."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={section.references.length > 2 ? 3 : 2}>
            {section.references.map((ref) =>
              ref.href ? (
                <Link
                  key={ref.title}
                  href={ref.href}
                  className="focus-ring rounded-lg"
                  aria-label={`${ref.title}: ${ref.description}`}
                >
                  <Card interactive className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-body-md font-medium text-ink-primary">{ref.title}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
                    </div>
                    <Body size="sm" muted>
                      {ref.description}
                    </Body>
                  </Card>
                </Link>
              ) : (
                <Card key={ref.title} className="flex h-full flex-col gap-3">
                  <span className="text-body-md font-medium text-ink-primary">{ref.title}</span>
                  <Body size="sm" muted>
                    {ref.description}
                  </Body>
                </Card>
              ),
            )}
          </CardGrid>
        </div>
      </SectionShell>
    </PageShell>
  );
}
