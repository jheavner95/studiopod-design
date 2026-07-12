import { SectionShell, CardGrid, DescriptionList } from "@/components/layout";
import { Card, Body, SectionHeader, Eyebrow } from "@/components/ui";
import { DocsShell, DocsPageHeader, DocsTableOfContents, DocsRelatedGrid } from "@/components/docs";
import { getEntry } from "@/lib/design-system-navigation";
import { TemplateCard } from "../_components/TemplateCard";
import { FamilyCard } from "../_components/FamilyCard";
import { PLATFORM_TEMPLATES, templateReadiness } from "../_data/templates";
import { COMPONENT_FAMILIES } from "../_data/families";

const entry = getEntry("templates")!;
const relatedEntries = [getEntry("architecture-doc")!, getEntry("coverage")!, getEntry("maturity")!];

const platformTemplatesFamily = COMPONENT_FAMILIES.find((family) => family.id === "platform-templates")!;
const analyticsFamily = COMPONENT_FAMILIES.find((family) => family.id === "analytics")!;
const intelligenceTemplate = PLATFORM_TEMPLATES.find((template) => template.id === "intelligence")!;

const averageReadiness = Math.round(
  PLATFORM_TEMPLATES.reduce((sum, template) => sum + templateReadiness(template), 0) / PLATFORM_TEMPLATES.length,
);

export default function TemplatesPage() {
  return (
    <DocsShell entry={entry} toc={<DocsTableOfContents />}>
      <DocsPageHeader entry={entry} />

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="overview"
            eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
            title="Overview"
            description="Seven platform-screen templates, each a spec for the component families a workspace needs before it can be built — not a built screen itself."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              { label: "Templates", value: `${PLATFORM_TEMPLATES.length} platform workspaces, one per StudioPOD domain.` },
              {
                label: "Average readiness",
                value: `${averageReadiness}% — the mean of each template's required families' own completion, not a hand-typed number.`,
              },
              { label: "Build status", value: "Not started — every template is a specification, waiting on its required families." },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="when-to-use"
            eyebrow={<Eyebrow tone="accent">When to use</Eyebrow>}
            title="When to use"
            description="This page answers one question: what does a given platform screen depend on, and how close is that dependency to done? For the pieces themselves, use the other Overview & Meta pages."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Scoping a new workspace</span>
              <Body size="sm" muted>
                Start here to see which component families a platform screen needs and which one is currently the long pole.
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Looking up a family&apos;s definition</span>
              <Body size="sm" muted>
                Go to Architecture — {relatedEntries[0].description}
              </Body>
            </Card>
            <Card className="flex flex-col gap-2">
              <span className="text-body-sm font-medium text-ink-primary">Checking coverage or the maturity ladder</span>
              <Body size="sm" muted>
                Use Coverage Matrix or Maturity Model — {relatedEntries[1].description.toLowerCase()} and{" "}
                {relatedEntries[2].description.toLowerCase()}
              </Body>
            </Card>
          </CardGrid>
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="examples"
            eyebrow={<Eyebrow tone="accent">Examples</Eyebrow>}
            title="Seven workspaces"
            description="Every template links its required families back to the Architecture page, so the family that's blocking a template is always one click away."
            descriptionMaxWidth={false}
          />
          <CardGrid columns={3}>
            {PLATFORM_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
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
            description="Nothing on this page is hand-typed — every number and link is resolved live against the family and inventory data underneath it."
            descriptionMaxWidth={false}
          />
          <DescriptionList
            items={[
              {
                label: "Readiness score",
                value:
                  "Each card's readiness badge is the average of its required families' own completion score, which itself weights each family's inventory items (Exists = 1, Partial = 0.5, Needed = 0).",
              },
              {
                label: "Status line",
                value:
                  "Every card currently reads \"Not started — required families average N% complete,\" because none of the seven templates exist as built screens yet.",
              },
              {
                label: "Family links",
                value:
                  "Each required-family badge links to its anchor on the Architecture page, so the family blocking a template is always one click away.",
              },
            ]}
          />
        </div>
      </SectionShell>

      <SectionShell spacing="lg" divider>
        <div className="flex flex-col gap-10">
          <SectionHeader
            id="composition"
            eyebrow={<Eyebrow tone="accent">Composition</Eyebrow>}
            title="Composition"
            description="Platform Templates is itself one of the nine component families — the composition layer that assembles the other eight into a complete workspace."
            descriptionMaxWidth={false}
          />
          <div className="max-w-xl">
            <FamilyCard family={platformTemplatesFamily} />
          </div>
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
          <DocsRelatedGrid entries={relatedEntries} columns={3} />
        </div>
      </SectionShell>

      <SectionShell spacing="lg">
        <div className="flex flex-col gap-14">
          <SectionHeader id="reference" eyebrow={<Eyebrow tone="accent">Reference</Eyebrow>} title="Reference" descriptionMaxWidth={false} />

          <div className="flex flex-col gap-10">
            <SectionHeader
              id="future-enhancements"
              title="Future enhancements"
              description="Room the current templates leave for later — reserved, not scoped or committed."
              descriptionMaxWidth={false}
            />
            <CardGrid columns={2}>
              <Card className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">{intelligenceTemplate.title} drill-down</span>
                <Body size="sm" muted>{intelligenceTemplate.layoutPattern}</Body>
              </Card>
              <Card className="flex flex-col gap-2 border-dashed">
                <span className="text-body-sm font-medium text-ink-primary">Analytics family coverage</span>
                <Body size="sm" muted>
                  {analyticsFamily.roadmapNotes} It backs both the Intelligence and Operations workspaces above, so its readiness stays
                  at 0% until it enters the inventory.
                </Body>
              </Card>
            </CardGrid>
          </div>
        </div>
      </SectionShell>
    </DocsShell>
  );
}
