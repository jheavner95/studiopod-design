import { Container, ContentColumns, CardGrid } from "@/components/layout";
import { Card, Caption, SurfacePanel, Heading, Body } from "@/components/ui";
import { PreviewSection } from "../_components/preview-primitives";

const SECTION_SPACINGS = [
  { name: "xs", token: "--spacing-section-xs" },
  { name: "sm", token: "--spacing-section-sm" },
  { name: "md", token: "--spacing-section-md" },
  { name: "lg", token: "--spacing-section-lg" },
  { name: "xl", token: "--spacing-section-xl" },
];

export function LayoutSection() {
  return (
    <PreviewSection
      id="layout"
      eyebrow="layout"
      title="Layout system"
      description="Containers, section rhythm, and the column/grid patterns every page is assembled from."
    >
      <div className="flex flex-col gap-12">
        <div>
          <Caption className="mb-4">Content widths</Caption>
          <div className="flex flex-col gap-3">
            {(["narrow", "content", "wide"] as const).map((size) => (
              <Container key={size} size={size} className="border border-dashed border-border-strong py-3">
                <Caption>max-w-{size}</Caption>
              </Container>
            ))}
          </div>
        </div>

        <div>
          <Caption className="mb-4">Section spacing (fluid, grows with viewport width)</Caption>
          <div className="flex flex-col gap-3">
            {SECTION_SPACINGS.map((spacing) => (
              <div key={spacing.name} className="flex items-center gap-4">
                <span className="w-8 shrink-0 font-mono text-caption text-ink-secondary">{spacing.name}</span>
                <div
                  className="rounded-sm bg-accent-500/60"
                  style={{ height: 8, width: `var(${spacing.token})` }}
                />
                <span className="font-mono text-caption text-ink-tertiary">{spacing.token}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Caption className="mb-4">Two-column layout (ContentColumns)</Caption>
          <ContentColumns
            primary={
              <SurfacePanel>
                <Heading level={4}>Primary column</Heading>
                <Body size="sm" muted className="mt-2">
                  Two-column layout that stacks on mobile. This is the &quot;narrow-wide&quot; ratio.
                </Body>
              </SurfacePanel>
            }
            secondary={
              <SurfacePanel elevated>
                <Heading level={4}>Secondary column</Heading>
                <Body size="sm" muted className="mt-2">
                  Use for a supporting visual, stat block, or code sample beside copy.
                </Body>
              </SurfacePanel>
            }
            ratio="narrow-wide"
          />
        </div>

        <div>
          <Caption className="mb-4">Three-column layout</Caption>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Product", "Company", "Resources"].map((title) => (
              <SurfacePanel key={title}>
                <Heading level={4}>{title}</Heading>
                <Body size="sm" muted className="mt-2">
                  An unrepeated column of distinct content, unlike CardGrid&apos;s identical repeating cards.
                </Body>
              </SurfacePanel>
            ))}
          </div>
        </div>

        <div>
          <Caption className="mb-4">CardGrid: 2 / 3 / 4 columns</Caption>
          <div className="flex flex-col gap-6">
            <CardGrid columns={2}>
              {[1, 2].map((n) => (
                <Card key={n}>
                  <Caption>Card {n}</Caption>
                </Card>
              ))}
            </CardGrid>
            <CardGrid columns={3}>
              {[1, 2, 3].map((n) => (
                <Card key={n}>
                  <Caption>Card {n}</Caption>
                </Card>
              ))}
            </CardGrid>
            <CardGrid columns={4}>
              {[1, 2, 3, 4].map((n) => (
                <Card key={n}>
                  <Caption>Card {n}</Caption>
                </Card>
              ))}
            </CardGrid>
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
