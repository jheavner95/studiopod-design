import { Database, ShieldCheck, Workflow, Zap } from "lucide-react";
import {
  Button,
  Card,
  Badge,
  SectionBadge,
  SectionHeader,
  Eyebrow,
  StatCard,
  FeatureCard,
  GlassPanel,
  SurfacePanel,
  CTAGroup,
  Skeleton,
  Heading,
  Body,
  Caption,
} from "@/components/ui";
import { PreviewSection, StateLabel } from "@/app/docs/_components/DocsShowcase";

export function ComponentGallerySection() {
  return (
    <PreviewSection
      id="components"
      eyebrow="components"
      title="Component gallery"
      description="Every core primitive, including the interaction states that only show up once a component is wired into a real page."
    >
      <div className="flex flex-col gap-14">
        {/* Buttons */}
        <div>
          <Caption className="mb-4">Buttons, states</Caption>
          <div className="flex flex-wrap gap-6">
            <StateLabel label="Default">
              <Button>Primary</Button>
            </StateLabel>
            <StateLabel label="Hover (simulated)">
              <Button className="bg-accent-400">Primary</Button>
            </StateLabel>
            <StateLabel label="Focus (simulated)">
              <Button style={{ outline: "2px solid var(--color-accent-400)", outlineOffset: "2px" }}>
                Primary
              </Button>
            </StateLabel>
            <StateLabel label="Active (simulated)">
              <Button className="bg-accent-600">Primary</Button>
            </StateLabel>
            <StateLabel label="Disabled">
              <Button disabled>Primary</Button>
            </StateLabel>
            <StateLabel label="Loading">
              <Button loading>Primary</Button>
            </StateLabel>
          </div>
        </div>

        <div>
          <Caption className="mb-4">Buttons, variants &amp; sizes</Caption>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button leadingIcon={<Zap className="size-4" />}>With icon</Button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div>
          <Caption className="mb-4">Cards, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StateLabel label="Default">
              <Card>
                <Body size="sm">Static card</Body>
              </Card>
            </StateLabel>
            <StateLabel label="Hover (interactive, try it)">
              <Card interactive>
                <Body size="sm">Hover me</Body>
              </Card>
            </StateLabel>
            <StateLabel label="Disabled">
              <Card className="pointer-events-none opacity-40">
                <Body size="sm">Disabled card</Body>
              </Card>
            </StateLabel>
            <StateLabel label="Loading">
              <Card className="flex flex-col gap-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </Card>
            </StateLabel>
          </div>
        </div>

        {/* Badges */}
        <div>
          <Caption className="mb-4">Badges &amp; SectionBadge</Caption>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="accent">Accent</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="error">Error</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <SectionBadge icon={<Workflow className="size-3.5" />}>Platform</SectionBadge>
              <SectionBadge>No icon variant</SectionBadge>
            </div>
          </div>
        </div>

        {/* SectionHeader */}
        <div>
          <Caption className="mb-4">SectionHeader</Caption>
          <div className="flex flex-col gap-10">
            <SectionHeader
              eyebrow={<Eyebrow tone="accent">left aligned</Eyebrow>}
              title="A section heading with a description"
              description="Eyebrow, heading, and an optional supporting line, left-aligned by default."
            />
            <SectionHeader
              align="center"
              eyebrow={<Eyebrow tone="accent">center aligned</Eyebrow>}
              title="The same header, centered"
              description="Used for standalone sections that aren't paired with a visual column."
            />
          </div>
        </div>

        {/* Panels */}
        <div>
          <Caption className="mb-4">GlassPanel &amp; SurfacePanel</Caption>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <GlassPanel>
              <Heading level={4}>GlassPanel</Heading>
              <Body size="sm" muted className="mt-2">
                Translucent, blurred. Reserve for hero moments, since glass loses readability if overused.
              </Body>
            </GlassPanel>
            <SurfacePanel elevated>
              <Heading level={4}>SurfacePanel</Heading>
              <Body size="sm" muted className="mt-2">
                Opaque and solid. The default functional container for most content.
              </Body>
            </SurfacePanel>
          </div>
        </div>

        {/* StatCard */}
        <div>
          <Caption className="mb-4">StatCard</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard value="128k" label="Units produced" description="Last 30 days" trend="+12.4%" />
            <StatCard value="99.98%" label="Order accuracy" />
            <StatCard value="4.2min" label="Avg. sync latency" />
          </div>
        </div>

        {/* FeatureCard */}
        <div>
          <Caption className="mb-4">FeatureCard, states</Caption>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StateLabel label="Default">
              <FeatureCard
                icon={<Database className="size-5" />}
                title="Unified inventory"
                description="One ledger for raw materials, WIP, and finished goods across every channel."
              />
            </StateLabel>
            <StateLabel label="Default">
              <FeatureCard
                icon={<ShieldCheck className="size-5" />}
                title="Audit-ready history"
                description="Every state change is recorded, never overwritten, only appended."
              />
            </StateLabel>
            <StateLabel label="Loading">
              <Card className="flex h-full flex-col gap-4">
                <Skeleton className="size-10 rounded-md" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </Card>
            </StateLabel>
          </div>
        </div>

        {/* CTAGroup */}
        <div>
          <Caption className="mb-4">CTAGroup</Caption>
          <div className="flex flex-col gap-6">
            <CTAGroup>
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
            </CTAGroup>
            <CTAGroup align="center">
              <Button>Primary action</Button>
              <Button variant="ghost">Secondary action</Button>
            </CTAGroup>
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
