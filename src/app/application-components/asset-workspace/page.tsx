import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionShell, CardGrid } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Card, Badge, Body, Caption, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { AssetWorkspaceAnatomyExplorer } from "./_components/AssetWorkspaceAnatomyExplorer";
import { AssetCardDemo } from "./_components/AssetCardDemo";
import { SELECTION_BEHAVIORS } from "./_data/selection-model";
import { EMPTY_STATES } from "./_data/empty-states";
import { ASSET_WORKSPACE_PRINCIPLES } from "./_data/principles";
import { ASSET_WORKSPACE_REGIONS } from "./_data/regions";
import { ACCESSIBILITY_GUIDANCE } from "./_data/accessibility";
import { ASSET_WORKSPACE_FUTURE_EXTENSIONS } from "./_data/future-extensions";

const APPLIES_TO = [
  "Artwork Projects",
  "Products",
  "Styles",
  "Ratios",
  "Export Presets",
  "Publishing Jobs",
  "Orders",
  "Assets",
  "Integrations",
  "AI Models",
  "Providers",
  "Future business objects",
];

const entry = getEntry("asset-workspace")!;
const relatedComponents = [getEntry("workspace-framework")!, getEntry("workspace-layout")!, getEntry("workspace-toolbar")!];

export default function AssetWorkspacePage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Four regions, top to bottom — select one to see its full purpose, examples, and the rules that keep it from overlapping the others."
            descriptionMaxWidth={false}
          />
          <AssetWorkspaceAnatomyExplorer />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="The asset workspace anatomy is the same for every browsable business object in StudioPOD — only the objects change, never the four regions or the rules governing them."
            descriptionMaxWidth={false}
          />
          <div className="flex flex-wrap gap-2">
            {APPLIES_TO.map((object) => (
              <Badge key={object} tone="neutral" size="sm">
                {object}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeader id="principles" title="Principles" descriptionMaxWidth={false} />
            <CardGrid columns={4}>
              {ASSET_WORKSPACE_PRINCIPLES.map((principle) => (
                <Card key={principle.title} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{principle.title}</span>
                  <Body size="sm" muted>
                    {principle.explanation}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Examples"
            description="A real, interactive card — hover it, tab to it, click to select, or use Quick Actions and More. Every part is documented alongside it."
            descriptionMaxWidth={false}
          />
          <AssetCardDemo />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-14">
          <SectionHeader
            id="behavior"
            eyebrow={<Eyebrow tone="accent">Behavior</Eyebrow>}
            title="Behavior"
            description="How selection responds to a click, and what a workspace shows when it has nothing to browse."
            descriptionMaxWidth={false}
          />

          <div className="flex flex-col gap-6">
            <SectionHeader id="selection-model" title="Selection model" descriptionMaxWidth={false} />
            <CardGrid columns={4}>
              {SELECTION_BEHAVIORS.map((behavior) => (
                <Card key={behavior.title} className="flex flex-col gap-2">
                  <span className="text-body-sm font-medium text-ink-primary">{behavior.title}</span>
                  <Body size="sm" muted>
                    {behavior.explanation}
                  </Body>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeader
              id="empty-states"
              title="Empty states"
              description="Eight distinct reasons an Asset Workspace can show nothing — each needs its own messaging, not one generic empty state."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {EMPTY_STATES.map((state) => (
                <Card key={state.id} className="flex h-full flex-col gap-3">
                  <span className="text-body-sm font-medium text-ink-primary">{state.name}</span>
                  <Body size="sm" muted>
                    {state.purpose}
                  </Body>
                  <div className="flex flex-col gap-1 border-t border-border-subtle pt-3">
                    <Caption className="text-ink-tertiary">Messaging</Caption>
                    <Body size="sm" muted>
                      {state.messaging}
                    </Body>
                  </div>
                  {state.actions.length > 0 ? (
                    <div className="mt-auto flex flex-col gap-2 border-t border-border-subtle pt-3">
                      <Caption className="text-ink-tertiary">Recommended actions</Caption>
                      <div className="flex flex-wrap gap-2">
                        {state.actions.map((action) => (
                          <Badge key={action} tone="neutral" size="sm">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader id="accessibility" eyebrow={<Eyebrow tone="accent">Accessibility</Eyebrow>} title="Accessibility" descriptionMaxWidth={false} />
          <DescriptionList
            items={ACCESSIBILITY_GUIDANCE.map((item) => ({
              label: item.label,
              value: (
                <div className="flex min-w-0 flex-col gap-2">
                  <span className="min-w-0 break-words">{item.text}</span>
                  {item.links ? (
                    <span className="flex flex-wrap gap-4">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 hover:text-accent-300"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3.5" aria-hidden />
                        </Link>
                      ))}
                    </span>
                  ) : null}
                </div>
              ),
            }))}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="None of the four regions were designed in isolation — each one reuses or specializes a pattern documented elsewhere in the system."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={2}>
            {ASSET_WORKSPACE_REGIONS.map((region) => (
              <Card key={region.id} className="flex flex-col gap-3">
                <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
                <Body size="sm" muted>
                  {region.reuseNotes}
                </Body>
                {region.reuseLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-4 border-t border-border-subtle pt-3">
                    {region.reuseLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 hover:text-accent-300"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </Card>
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
            description="The rest of the six-tier workspace blueprint this framework fits into."
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
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current asset workspace anatomy leaves for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={3}>
              {ASSET_WORKSPACE_FUTURE_EXTENSIONS.map((extension) => (
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
