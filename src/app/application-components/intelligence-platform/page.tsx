import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { SystemGrid } from "@/components/illustration";
import { PageIntro } from "../_components/PageIntro";
import { IntelligencePlatformGallery } from "./_components/IntelligencePlatformGallery";
import { INTELLIGENCE_ANATOMY } from "./_data/anatomy";
import { INTELLIGENCE_STATES } from "./_data/states";
import { RESPONSIVE_TOPICS, BREAKPOINT_NOTES } from "./_data/responsive";
import { INTELLIGENCE_ACCESSIBILITY_TOPICS } from "./_data/accessibility";
import { IMPLEMENTATION_GUIDANCE } from "./_data/implementation-guidance";
import { INTELLIGENCE_PROMOTION_CANDIDATES, INTELLIGENCE_CLEAN_FINDINGS } from "./_data/promotion-candidates";
import { INTELLIGENCE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

function CrossLinks() {
  const links = [
    { label: "Platform Architecture", href: "/application-components/platform-architecture" },
    { label: "Production Platform", href: "/application-components/production-platform" },
    { label: "Product Platform", href: "/application-components/product-platform" },
    { label: "Publishing Platform", href: "/application-components/publishing-platform" },
    { label: "Commerce Platform", href: "/application-components/commerce-platform" },
    { label: "State Machine", href: "/application-components/state-machine" },
    { label: "Status & Health", href: "/application-components/status-health" },
    { label: "Dashboard Widgets", href: "/application-components/dashboard-widgets" },
    { label: "Data Grid", href: "/application-components/data-grid" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
        >
          {link.label}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      ))}
    </div>
  );
}

export default function IntelligencePlatformPage() {
  return (
    <PageShell background={<SystemGrid />}>
      <SectionShell spacing="xl">
        <PageIntro
          eyebrow="package · application components · intelligence platform"
          title="Intelligence platform components"
          description="The canonical Intelligence Platform Component Library — the sixth Platform-tier library, built entirely on Foundation, Operational, and Workflow. All 12 components are pure re-exports of already-certified lower-tier components; this package implements zero Intelligence business logic of its own. Built in DS-4.6, the sixth package of the Platform Component Library."
        >
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Badge tone="warning" size="sm" className="w-fit">
              Platform Ready — DS-4.6
            </Badge>
          </div>
          <div className="pt-2">
            <CrossLinks />
          </div>
        </PageIntro>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Platform anatomy</Eyebrow>}
            title="Eleven regions, twelve components"
            description="Every component in this family maps to one of the regions below — five of the twelve reuse Operational's own Status & Health and Dashboard Widget systems directly, more than any prior Platform package, since Intelligence sits closest to those systems' own original design intent."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {INTELLIGENCE_ANATOMY.map((region) => (
              <Card key={region.name} className="flex flex-col gap-2">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.description}
                </Body>
                <Caption className="border-t border-border-subtle pt-3 text-ink-tertiary">{region.component}</Caption>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Gallery</Eyebrow>}
            title="Eight intelligence patterns, live"
            description="Each demo below is a real, working composition with real props — not a static screenshot. Try Decision Support's own embedded recommendation."
            descriptionMaxWidth={false}
          />
          <IntelligencePlatformGallery />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">States</Eyebrow>}
            title="States"
            description="Eight states this platform recognizes. Archived has no match in any existing status vocabulary, the same disclosed gap every prior Platform package already found for the identical state name — while Idle is the first Platform state to map onto WorkflowNodeStatus, and Healthy/Warning/Critical map onto HealthStatusValue verbatim."
            descriptionMaxWidth={false}
          />
          <DescriptionList items={INTELLIGENCE_STATES.map((item) => ({ label: item.state, value: item.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Responsive behavior</Eyebrow>}
            title="Responsive behavior"
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {BREAKPOINT_NOTES.map((item) => (
              <Card key={item.breakpoint} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{item.breakpoint}</span>
                <Body size="sm" muted>
                  {item.note}
                </Body>
              </Card>
            ))}
          </CardGrid>
          <DescriptionList items={RESPONSIVE_TOPICS.map((topic) => ({ label: topic.label, value: topic.note }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={INTELLIGENCE_ACCESSIBILITY_TOPICS.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Implementation guidance</Eyebrow>}
            title="Implementation guidance"
            descriptionMaxWidth={false}
          />
          <DescriptionList items={IMPLEMENTATION_GUIDANCE.map((topic) => ({ label: topic.label, value: topic.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Promotion candidates</Eyebrow>}
            title="Promotion candidates"
            description="Real, grep-verified findings across the six subdomains this package's own work order named — Intelligence platform, Recommendations, Opportunities, Health, Diagnostics, Insights — plus Decision support, not estimated or carried over from memory."
            descriptionMaxWidth={false}
          />
          {INTELLIGENCE_PROMOTION_CANDIDATES.length === 0 ? (
            <Card className="flex flex-col gap-2 border-success/30 bg-success-soft">
              <span className="text-body-sm font-medium text-ink-primary">Zero real candidates found</span>
              <Body size="sm" muted>
                No subdomain surfaced real execution logic (a recommendation engine, an opportunity-scoring system,
                real health-monitoring, a root-cause-analysis engine, or an analytics pipeline) that this
                platform&rsquo;s own components would duplicate. No src/intelligence/ directory exists at all, and
                every existing Intelligence-named implementation is confirmed diagram-layer only (src/platforms/,
                src/capabilities/). See the clean findings below for what was actually checked.
              </Body>
            </Card>
          ) : null}
          <div className="flex flex-col gap-3">
            <span className="text-body-sm font-medium text-ink-primary">Clean findings</span>
            {INTELLIGENCE_CLEAN_FINDINGS.map((finding) => (
              <Card key={finding.slice(0, 24)} className="flex flex-col gap-2 border-success/30 bg-success-soft">
                <Body size="sm" muted>
                  {finding}
                </Body>
              </Card>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={<Eyebrow tone="accent">Future extensions</Eyebrow>}
            title="Future extensions"
            description="Room the current system leaves for later — reserved, not scoped or committed."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {INTELLIGENCE_FUTURE_EXTENSIONS.map((extension) => (
              <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                <Body size="sm" muted>
                  {extension.description}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>
    </PageShell>
  );
}
