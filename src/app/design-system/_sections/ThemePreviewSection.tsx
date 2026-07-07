import { Boxes } from "lucide-react";
import { SectionShell, Container, ContentColumns, CardGrid } from "@/components/layout";
import {
  SectionBadge,
  Eyebrow,
  SectionHeader,
  Display,
  Body,
  CTAGroup,
  Button,
  StatCard,
  FeatureCard,
  GlassPanel,
} from "@/components/ui";
import { StaggerGroup, StaggerItem, SlideUp } from "@/components/motion";
import { ProgressRail } from "@/components/illustration";

/**
 * A complete mock landing section built only from the primitives above.
 * Every string here is a placeholder — this exists to pressure-test the
 * design system's composition, not to preview real StudioPOD copy.
 */
export function ThemePreviewSection() {
  return (
    <SectionShell id="theme-preview" spacing="lg" divider background="raised">
      <div className="mb-10 flex flex-col gap-4">
        <Eyebrow tone="accent">theme preview</Eyebrow>
        <SectionHeader
          title="A mock page section, built only from reusable primitives"
          description="No marketing copy lives here. Every label below is a placeholder used to validate spacing, hierarchy, and composition."
        />
      </div>

      <Container size="wide" className="px-0">
        <div className="flex flex-col gap-20 rounded-2xl border border-border bg-canvas p-6 sm:p-12">
          {/* Hero */}
          <div className="flex flex-col items-center gap-6 text-center">
            <SectionBadge icon={<Boxes className="size-3.5" />}>Placeholder / Category</SectionBadge>
            <Display className="max-w-3xl">Headline placeholder text goes here</Display>
            <Body size="lg" muted className="max-w-[var(--container-narrow)]">
              Supporting paragraph placeholder text, used only to validate measure, line length, and hierarchy
              against a real heading and CTA pair.
            </Body>
            <CTAGroup align="center">
              <Button size="lg">Primary placeholder</Button>
              <Button size="lg" variant="secondary">
                Secondary placeholder
              </Button>
            </CTAGroup>
          </div>

          {/* Stat row */}
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: "00%", label: "Metric placeholder" },
              { value: "00k", label: "Metric placeholder" },
              { value: "0.0x", label: "Metric placeholder" },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <StatCard value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Two-column: copy + visual */}
          <ContentColumns
            ratio="narrow-wide"
            primary={
              <SlideUp className="flex flex-col gap-4">
                <Eyebrow tone="accent">Placeholder eyebrow</Eyebrow>
                <SectionHeader
                  title="Subsection heading placeholder"
                  description="Placeholder body copy describing a subsection, kept short enough to sit beside a supporting visual."
                  descriptionMaxWidth={false}
                />
              </SlideUp>
            }
            secondary={
              <GlassPanel>
                <ProgressRail
                  steps={[
                    { label: "Step 1", status: "success" },
                    { label: "Step 2", status: "success" },
                    { label: "Step 3", status: "active" },
                    { label: "Step 4", status: "idle" },
                  ]}
                />
              </GlassPanel>
            }
          />

          {/* Feature grid */}
          <CardGrid columns={3}>
            {[1, 2, 3].map((n) => (
              <FeatureCard
                key={n}
                title={`Feature placeholder ${n}`}
                description="Placeholder description text validating card height, padding, and line count."
              />
            ))}
          </CardGrid>

          {/* Closing CTA */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Body muted>Closing placeholder line, before a final call to action.</Body>
            <CTAGroup align="center">
              <Button>Primary placeholder</Button>
              <Button variant="ghost">Secondary placeholder</Button>
            </CTAGroup>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
