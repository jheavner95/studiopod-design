import type { ReactNode } from "react";
import { Boxes, Database, Workflow, GitBranch, ShieldCheck, TrendingUp, Zap, Layers3 } from "lucide-react";
import { Button, Badge, Eyebrow, SectionBadge, CTAGroup, GlassPanel, SurfacePanel } from "@/components/ui";
import { FlowCard, ProgressRail } from "@/components/illustration";
import {
  HeroComposition,
  WorkflowComposition,
  PlatformComposition,
  FeatureGridComposition,
  ComparisonComposition,
  MetricsComposition,
  TimelineComposition,
  CTAComposition,
  FAQComposition,
  TestimonialComposition,
  EmptyComposition,
} from "@/compositions";

export interface RegistryEntry {
  slug: string;
  group: string;
  label: string;
  /** Gets the dual desktop + mobile-iframe treatment on the main playground page. */
  primary?: boolean;
  render: () => ReactNode;
}

const sampleProgressSteps = [
  { label: "Received", status: "success" as const },
  { label: "Production", status: "success" as const },
  { label: "QA", status: "active" as const },
  { label: "Packed", status: "idle" as const },
  { label: "Shipped", status: "idle" as const },
];

export const REGISTRY: RegistryEntry[] = [
  // ---------------------------------------------------------------- Hero
  {
    slug: "hero-centered",
    group: "Hero",
    label: "Centered",
    primary: true,
    render: () => (
      <HeroComposition
        layout="centered"
        eyebrow={<SectionBadge icon={<Boxes className="size-3.5" />}>Production OS</SectionBadge>}
        title="Production, operationalized."
        subtitle="One system for inventory, production routing, and fulfillment, built for teams who ship physical goods at scale."
        cta={
          <CTAGroup align="center">
            <Button size="lg">Start free trial</Button>
            <Button size="lg" variant="secondary">
              See how it works
            </Button>
          </CTAGroup>
        }
        metrics={[
          { value: "128k", label: "Units produced" },
          { value: "99.98%", label: "Order accuracy" },
          { value: "4.2min", label: "Avg. sync latency" },
        ]}
        trustRow={{ label: "Trusted by teams at", items: ["Northwind", "Fenwick Goods", "Larkspur", "Ambercraft"] }}
      />
    ),
  },
  {
    slug: "hero-split",
    group: "Hero",
    label: "Split",
    render: () => (
      <HeroComposition
        layout="split"
        eyebrow={<Eyebrow tone="accent">Platform</Eyebrow>}
        title="A system, not a spreadsheet."
        subtitle="Track every unit from raw material to shipped order without leaving one screen."
        cta={
          <CTAGroup>
            <Button>Get started</Button>
            <Button variant="ghost">Book a demo</Button>
          </CTAGroup>
        }
        illustration={
          <GlassPanel>
            <ProgressRail steps={sampleProgressSteps} />
          </GlassPanel>
        }
      />
    ),
  },
  {
    slug: "hero-illustration-first",
    group: "Hero",
    label: "Illustration-first",
    render: () => (
      <HeroComposition
        layout="illustration-first"
        eyebrow={<Eyebrow tone="accent">Overview</Eyebrow>}
        title="See your whole operation at once."
        subtitle="Every order, every step, one system."
        cta={<Button>Explore the platform</Button>}
        illustration={
          <SurfacePanel elevated>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FlowCard icon={<Database className="size-4" />} title="Inventory" status="success" />
              <FlowCard icon={<Workflow className="size-4" />} title="Production" status="active" />
              <FlowCard icon={<GitBranch className="size-4" />} title="Fulfillment" status="idle" />
            </div>
          </SurfacePanel>
        }
      />
    ),
  },

  // ------------------------------------------------------------ Workflow
  {
    slug: "workflow-prepare-validate-produce",
    group: "Workflow",
    label: "Prepare → Validate → Produce",
    primary: true,
    render: () => (
      <WorkflowComposition
        eyebrow={<Eyebrow tone="accent">workflow</Eyebrow>}
        title="Every order follows the same three stages."
        description="From raw intake to a produced, ready-to-ship unit, nothing skips a step."
        steps={[
          {
            id: "prepare",
            label: "Prepare",
            summary: "Materials are reserved and routed to a line.",
            details:
              "Inventory is checked against the bill of materials, reserved against other open orders, and routed to whichever line has capacity.",
            status: "success",
          },
          {
            id: "validate",
            label: "Validate",
            summary: "Quality checks run before production starts.",
            details:
              "Automated and manual checks confirm the batch meets spec before a single unit is produced.",
            status: "active",
          },
          {
            id: "produce",
            label: "Produce",
            summary: "Units are built, logged, and staged for fulfillment.",
            status: "idle",
          },
        ]}
        cta={<Button variant="secondary">See the full pipeline</Button>}
      />
    ),
  },

  // ------------------------------------------------------------- Platform
  {
    slug: "platform-architecture",
    group: "Platform",
    label: "Architecture",
    primary: true,
    render: () => (
      <PlatformComposition
        eyebrow={<Eyebrow tone="accent">platform</Eyebrow>}
        title="Four modules, one core."
        description="Every module reads and writes to the same ledger, so nothing drifts out of sync."
        hubIcon={<Boxes className="size-5" />}
        platforms={[
          {
            id: "inventory",
            label: "Inventory",
            icon: <Database className="size-4" />,
            description: "Raw materials, WIP, and finished goods.",
            status: "success",
          },
          {
            id: "production",
            label: "Production",
            icon: <Workflow className="size-4" />,
            description: "Routing, scheduling, line capacity.",
            status: "active",
          },
          {
            id: "fulfillment",
            label: "Fulfillment",
            icon: <GitBranch className="size-4" />,
            description: "Packing, shipping, carrier selection.",
            status: "idle",
          },
          {
            id: "analytics",
            label: "Analytics",
            icon: <TrendingUp className="size-4" />,
            description: "Forecasting and demand planning.",
            status: "idle",
          },
        ]}
      />
    ),
  },

  // --------------------------------------------------------- Feature grid
  {
    slug: "feature-grid-3col",
    group: "Feature grid",
    label: "3 columns",
    primary: true,
    render: () => (
      <FeatureGridComposition
        eyebrow={<Eyebrow tone="accent">features</Eyebrow>}
        title="Everything a production team needs."
        columns={3}
        items={[
          {
            icon: <Database className="size-5" />,
            title: "Unified inventory",
            description: "One ledger for raw materials, WIP, and finished goods across every channel.",
            status: "success",
          },
          {
            icon: <Workflow className="size-5" />,
            title: "Production routing",
            description: "Route orders to the right facility or line automatically, by rule.",
            badge: <Badge tone="accent">New</Badge>,
          },
          {
            icon: <ShieldCheck className="size-5" />,
            title: "Audit-ready history",
            description: "Every state change is recorded, never overwritten, only appended.",
          },
        ]}
      />
    ),
  },
  {
    slug: "feature-grid-6col",
    group: "Feature grid",
    label: "6 columns",
    render: () => (
      <FeatureGridComposition
        title="Connects to what you already run"
        columns={6}
        items={[
          { icon: <Zap className="size-5" />, title: "Shopify", description: "Order sync." },
          { icon: <Zap className="size-5" />, title: "NetSuite", description: "Finance sync." },
          { icon: <Zap className="size-5" />, title: "ShipStation", description: "Carrier rates." },
          { icon: <Zap className="size-5" />, title: "Slack", description: "Alerts." },
          { icon: <Zap className="size-5" />, title: "Zapier", description: "Automations." },
          { icon: <Zap className="size-5" />, title: "REST API", description: "Everything else." },
        ]}
      />
    ),
  },

  // ---------------------------------------------------------- Comparison
  {
    slug: "comparison-cards",
    group: "Comparison",
    label: "Cards",
    primary: true,
    render: () => (
      <ComparisonComposition
        eyebrow={<Eyebrow tone="accent">plans</Eyebrow>}
        title="Plans built for how you produce."
        variant="cards"
        cards={[
          {
            title: "Starter",
            description: "One facility, getting off spreadsheets.",
            points: [
              { label: "Single facility", supported: true },
              { label: "Basic routing", supported: true },
              { label: "API access", supported: false },
            ],
          },
          {
            title: "Growth",
            description: "Multiple facilities, real throughput.",
            highlight: true,
            points: [
              { label: "Up to 5 facilities", supported: true },
              { label: "Rule-based routing", supported: true },
              { label: "API access", supported: true },
            ],
            cta: (
              <Button size="sm" className="w-full">
                Choose Growth
              </Button>
            ),
          },
          {
            title: "Enterprise",
            description: "Unlimited scale, dedicated support.",
            points: [
              { label: "Unlimited facilities", supported: true },
              { label: "Custom routing rules", supported: true },
              { label: "Dedicated support", supported: true },
            ],
          },
        ]}
      />
    ),
  },
  {
    slug: "comparison-matrix",
    group: "Comparison",
    label: "Matrix",
    render: () => (
      <ComparisonComposition
        title="Compare every plan side by side."
        variant="matrix"
        matrix={{
          columns: [
            { id: "starter", label: "Starter" },
            { id: "growth", label: "Growth", highlight: true },
            { id: "enterprise", label: "Enterprise" },
          ],
          rows: [
            { label: "Facilities", values: { starter: false, growth: true, enterprise: true } },
            { label: "Rule-based routing", values: { starter: "partial", growth: true, enterprise: true } },
            { label: "API access", values: { starter: false, growth: true, enterprise: true } },
            { label: "Dedicated support", values: { starter: false, growth: false, enterprise: true } },
          ],
        }}
      />
    ),
  },
  {
    slug: "comparison-before-after",
    group: "Comparison",
    label: "Before / after",
    render: () => (
      <ComparisonComposition
        title="What changes when you switch."
        variant="before-after"
        cards={[
          {
            title: "Without StudioPOD",
            points: [
              { label: "A spreadsheet per facility", supported: false },
              { label: "Routing decided over Slack", supported: false },
              { label: "Manual month-end reconciliation", supported: false },
            ],
          },
          {
            title: "With StudioPOD",
            points: [
              { label: "One system of record", supported: true },
              { label: "Routing decided by rule", supported: true },
              { label: "Reconciliation runs itself", supported: true },
            ],
          },
        ]}
      />
    ),
  },

  // -------------------------------------------------------------- Metrics
  {
    slug: "metrics-stats",
    group: "Metrics",
    label: "Stats",
    primary: true,
    render: () => (
      <MetricsComposition
        eyebrow={<Eyebrow tone="accent">metrics</Eyebrow>}
        title="Production at a glance."
        variant="stats"
        metrics={[
          {
            id: "units",
            label: "Units produced",
            value: 128,
            format: (v) => `${Math.round(v)}k`,
            trend: { direction: "up", value: "+12.4%" },
          },
          {
            id: "accuracy",
            label: "Order accuracy",
            value: 99.98,
            format: (v) => `${v.toFixed(2)}%`,
            trend: { direction: "up", value: "+0.4%" },
          },
          {
            id: "latency",
            label: "Avg. sync latency",
            value: 4.2,
            format: (v) => `${v.toFixed(1)}min`,
            trend: { direction: "down", value: "-1.1min" },
          },
        ]}
      />
    ),
  },
  {
    slug: "metrics-health",
    group: "Metrics",
    label: "Health",
    render: () => (
      <MetricsComposition
        title="System health"
        variant="health"
        metrics={[
          {
            id: "inventory",
            label: "Inventory sync",
            value: 99.9,
            format: (v) => `${v.toFixed(1)}%`,
            status: "success",
            description: "Last synced 2 min ago",
          },
          {
            id: "production",
            label: "Production line 2",
            value: 4,
            format: (v) => `${Math.round(v)} active`,
            status: "active",
            description: "orders in progress",
          },
          {
            id: "fulfillment",
            label: "Fulfillment queue",
            value: 0,
            format: () => "Clear",
            status: "idle",
            description: "No orders waiting",
          },
          {
            id: "alerts",
            label: "Open alerts",
            value: 2,
            format: (v) => `${Math.round(v)}`,
            status: "warning",
            description: "Needs attention",
          },
        ]}
        columns={4}
      />
    ),
  },

  // ------------------------------------------------------------- Timeline
  {
    slug: "timeline-vertical",
    group: "Timeline",
    label: "Roadmap (vertical)",
    primary: true,
    render: () => (
      <TimelineComposition
        eyebrow={<Eyebrow tone="accent">roadmap</Eyebrow>}
        title="Where the platform is headed."
        orientation="vertical"
        items={[
          {
            id: "q1",
            date: "Q1 2026",
            title: "Multi-facility routing",
            description: "Route orders across facilities automatically by capacity and proximity.",
            status: "success",
          },
          {
            id: "q2",
            date: "Q2 2026",
            title: "Predictive demand planning",
            description: "Forecast raw material needs before you run out.",
            status: "active",
          },
          {
            id: "q3",
            date: "Q3 2026",
            title: "Partner API",
            description: "Let 3PLs and vendors read and write directly.",
            status: "idle",
          },
          {
            id: "q4",
            date: "Q4 2026",
            title: "Mobile floor app",
            description: "Scan, confirm, and flag issues from the production floor.",
            status: "idle",
          },
        ]}
      />
    ),
  },
  {
    slug: "timeline-horizontal",
    group: "Timeline",
    label: "Schedule (horizontal)",
    render: () => (
      <TimelineComposition
        title="Day one schedule"
        orientation="horizontal"
        items={[
          { id: "a", date: "9:00 AM", title: "Doors open", status: "success" },
          { id: "b", date: "10:00 AM", title: "Keynote", status: "success" },
          { id: "c", date: "11:30 AM", title: "Workshops", status: "active" },
          { id: "d", date: "1:00 PM", title: "Lunch", status: "idle" },
          { id: "e", date: "2:00 PM", title: "Panels", status: "idle" },
        ]}
      />
    ),
  },

  // ------------------------------------------------------------------ CTA
  {
    slug: "cta-centered-lg",
    group: "CTA",
    label: "Centered · Large",
    primary: true,
    render: () => (
      <CTAComposition
        size="lg"
        layout="centered"
        eyebrow={<Eyebrow tone="accent">get started</Eyebrow>}
        title="Ready to run production on one system?"
        description="Set up your first facility in an afternoon."
        cta={
          <CTAGroup align="center">
            <Button size="lg">Start free trial</Button>
            <Button size="lg" variant="secondary">
              Talk to sales
            </Button>
          </CTAGroup>
        }
      />
    ),
  },
  {
    slug: "cta-split-md",
    group: "CTA",
    label: "Split · Medium",
    render: () => (
      <CTAComposition
        size="md"
        layout="split"
        title="Have questions about a specific workflow?"
        description="We'll walk through your production process live."
        cta={<Button>Book a walkthrough</Button>}
      />
    ),
  },
  {
    slug: "cta-illustration",
    group: "CTA",
    label: "Illustration",
    render: () => (
      <CTAComposition
        size="md"
        layout="illustration"
        title="See it running on real data."
        description="A sandboxed environment, pre-loaded with a sample facility."
        cta={<Button>Launch sandbox</Button>}
        illustration={
          <GlassPanel>
            <ProgressRail steps={sampleProgressSteps} />
          </GlassPanel>
        }
      />
    ),
  },
  {
    slug: "cta-enterprise",
    group: "CTA",
    label: "Enterprise",
    render: () => (
      <CTAComposition
        size="md"
        layout="centered"
        enterprise
        title="Running more than one facility?"
        description="Custom SLAs, dedicated support, and volume-based pricing."
        cta={<Button size="lg">Talk to enterprise sales</Button>}
      />
    ),
  },

  // ------------------------------------------------------------------ FAQ
  {
    slug: "faq-default",
    group: "FAQ",
    label: "With categories & search",
    primary: true,
    render: () => (
      <FAQComposition
        eyebrow={<Eyebrow tone="accent">faq</Eyebrow>}
        title="Common questions."
        searchable
        items={[
          {
            id: "1",
            question: "Can StudioPOD run across multiple facilities?",
            answer: "Yes. Routing rules can span any number of facilities you connect.",
            category: "Platform",
          },
          {
            id: "2",
            question: "Does it replace our existing inventory system?",
            answer: "It can, or it can sit alongside it and sync in one direction while you migrate.",
            category: "Platform",
          },
          {
            id: "3",
            question: "How is data kept in sync?",
            answer: "Every write is appended to a single ledger. Nothing is overwritten.",
            category: "Data",
          },
          {
            id: "4",
            question: "What does onboarding look like?",
            answer: "Most teams are producing their first order inside a week.",
            category: "Getting started",
          },
        ]}
      />
    ),
  },

  // ------------------------------------------------------------ Testimonial
  {
    slug: "testimonial-grid",
    group: "Testimonial",
    label: "Grid",
    primary: true,
    render: () => (
      <TestimonialComposition
        eyebrow={<Eyebrow tone="accent">customers</Eyebrow>}
        title="Teams running on StudioPOD."
        layout="grid"
        testimonials={[
          {
            id: "1",
            quote: "We stopped reconciling three spreadsheets every morning.",
            authorName: "Dana Whitfield",
            authorRole: "Ops Lead",
            company: "Northwind",
            customerType: "Scale-up",
          },
          {
            id: "2",
            quote: "Routing used to be a Slack thread. Now it's automatic.",
            authorName: "Marcus Ilo",
            authorRole: "COO",
            company: "Fenwick Goods",
            customerType: "Enterprise",
            metric: { value: "38%", label: "faster fulfillment" },
          },
          {
            id: "3",
            quote: "Our audit last quarter took an afternoon instead of a week.",
            authorName: "Priya Anand",
            authorRole: "Finance Director",
            company: "Larkspur",
            customerType: "Enterprise",
          },
        ]}
      />
    ),
  },
  {
    slug: "testimonial-spotlight",
    group: "Testimonial",
    label: "Spotlight",
    render: () => (
      <TestimonialComposition
        layout="spotlight"
        testimonials={[
          {
            id: "1",
            quote: "StudioPOD is the first system our production floor actually wanted to use.",
            authorName: "Dana Whitfield",
            authorRole: "Ops Lead",
            company: "Northwind",
            customerType: "Scale-up",
          },
          {
            id: "2",
            quote: "Routing used to be a Slack thread. Now it's automatic.",
            authorName: "Marcus Ilo",
            authorRole: "COO",
            company: "Fenwick Goods",
          },
          {
            id: "3",
            quote: "Our audit last quarter took an afternoon instead of a week.",
            authorName: "Priya Anand",
            authorRole: "Finance Director",
            company: "Larkspur",
          },
        ]}
      />
    ),
  },

  // ---------------------------------------------------------------- Empty
  {
    slug: "empty-default",
    group: "Empty",
    label: "Default",
    primary: true,
    render: () => (
      <EmptyComposition
        icon={<Layers3 className="size-5" />}
        title="Case studies"
        description="This section is being written. Check back soon."
      />
    ),
  },
  {
    slug: "empty-dashed",
    group: "Empty",
    label: "Dashed",
    render: () => (
      <EmptyComposition
        variant="dashed"
        title="Pricing calculator"
        description="Placeholder for an interactive pricing tool."
      />
    ),
  },
  {
    slug: "empty-grid",
    group: "Empty",
    label: "Grid backdrop",
    render: () => (
      <EmptyComposition
        variant="grid"
        title="Integration marketplace"
        description="Browse and connect third-party tools."
        cta={
          <Button variant="secondary" size="sm">
            Notify me
          </Button>
        }
      />
    ),
  },
];
