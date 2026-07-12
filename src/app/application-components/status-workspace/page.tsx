import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { StatusAnatomyExplorer } from "./_components/StatusAnatomyExplorer";
import { VariantCard } from "./_components/VariantCard";
import { PlatformExampleCard } from "./_components/PlatformExampleCard";
import { STATUS_VARIANTS } from "./_data/variants";
import { STATUS_PRINCIPLES } from "./_data/principles";
import { STATUS_RESPONSIVE_MODES } from "./_data/responsive-modes";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { STATUS_FUTURE_EXTENSIONS } from "./_data/future-extensions";
import { PLATFORM_EXAMPLES } from "./_data/platform-examples";
import { DESIGN_CONTRACT } from "./_data/design-contract";

const entry = getEntry("status-workspace")!;
const relatedComponents = [getEntry("inspector-workspace")!, getEntry("workspace-toolbar")!, getEntry("workspace-layout")!];

export default function StatusWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Seven regions, top to bottom — select one to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <StatusAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The seven principles every region in this anatomy follows — when status should stay passive, and when it needs the user's attention."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {STATUS_PRINCIPLES.map((principle) => (
              <Card key={principle.title} className="flex flex-col gap-2">
                <span className="text-body-sm font-medium text-ink-primary">{principle.title}</span>
                <Body size="sm" muted>
                  {principle.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="The same seven regions, weighted differently depending on what's selected — six named variants covering the shapes a status workspace actually takes."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={4}>
            {STATUS_VARIANTS.map((variant) => (
              <VariantCard key={variant.id} variant={variant} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="Five presentation modes, each appropriate at a different breakpoint — see Workspace Layout's own responsive rules for how this coordinates with the rest of the anatomy."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {STATUS_RESPONSIVE_MODES.map((mode) => (
              <Card key={mode.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-body-sm font-medium text-ink-primary">{mode.name}</span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {mode.appropriateAt.map((breakpoint) => (
                      <Badge key={breakpoint} tone="accent" size="sm">
                        {breakpoint}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Body size="sm" muted>
                  {mode.explanation}
                </Body>
              </Card>
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList items={ACCESSIBILITY_GUIDANCE.map((item) => ({ label: item.label, value: item.text }))} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Six named status workspaces, each built from the same seven regions with a different emphasis depending on the platform it operates."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_EXAMPLES.map((example) => (
              <PlatformExampleCard key={example.id} example={example} />
            ))}
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="related-components"
            eyebrow={<Eyebrow tone="accent">Related components</Eyebrow>}
            title="Related components"
            descriptionMaxWidth={false}
          />
          <DocsRelatedGrid entries={relatedComponents} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="design-considerations"
              title="Design considerations"
              description="What every Operational Status implementation follows — each item traces back to a specific region or principle documented above."
              descriptionMaxWidth={false}
            />
            <div className="rounded-lg border border-accent-500/30 bg-accent-soft/10 p-4 sm:p-6">
              <ul className="flex flex-col">
                {DESIGN_CONTRACT.map((item, index) => (
                  <li
                    key={item.label}
                    className={
                      index < DESIGN_CONTRACT.length - 1
                        ? "flex items-start gap-3 border-b border-border-subtle py-4 first:pt-0"
                        : "flex items-start gap-3 py-4 first:pt-0"
                    }
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-body-sm font-medium text-ink-primary">{item.label}</span>
                      <Body size="sm" muted className="min-w-0 break-words">
                        {item.note}
                      </Body>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Caption className="text-ink-tertiary">
              See also{" "}
              <Link href="/application-components/workspace-framework" className="text-accent-400 hover:text-accent-300">
                Workspace Framework
              </Link>
              ,{" "}
              <Link href="/application-components/workspace-layout" className="text-accent-400 hover:text-accent-300">
                Workspace Layout
              </Link>
              ,{" "}
              <Link href="/application-components/workspace-toolbar" className="text-accent-400 hover:text-accent-300">
                Workspace Toolbar
              </Link>
              ,{" "}
              <Link href="/application-components/primary-workspace" className="text-accent-400 hover:text-accent-300">
                Primary Workspace
              </Link>
              , and{" "}
              <Link href="/application-components/inspector-workspace" className="text-accent-400 hover:text-accent-300">
                Inspector Workspace
              </Link>{" "}
              for how Operational Status fits into the full workspace anatomy.
            </Caption>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Capabilities this anatomy does not currently include:"
              descriptionMaxWidth={false}
            />
            <CardGrid columns={4}>
              {STATUS_FUTURE_EXTENSIONS.map((extension) => (
                <Card key={extension.title} className="flex flex-col gap-2 border-dashed">
                  <span className="text-body-sm font-medium text-ink-primary">{extension.title}</span>
                  <Body size="sm" muted>
                    {extension.description}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
