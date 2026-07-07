import { PreviewSection, TypeSample } from "../_components/preview-primitives";

export function TypographySection() {
  return (
    <PreviewSection
      id="typography"
      eyebrow="typography"
      title="Typography gallery"
      description="Twelve styles, all fluid. Resize the window and watch every size scale smoothly, with no breakpoint jumps."
    >
      <div className="flex flex-col">
        <TypeSample
          label="Display XL"
          spec="44–88px · 1.02 · -0.02em"
          className="text-display-1 font-semibold"
          sample="Production, operationalized."
        />
        <TypeSample
          label="Display L"
          spec="36–64px · 1.05 · -0.018em"
          className="text-display-2 font-semibold"
          sample="A system, not a spreadsheet."
        />
        <TypeSample
          label="H1"
          spec="32–44px · 1.1 · -0.014em"
          className="text-heading-1 font-semibold"
          sample="Every order, every step, one system."
        />
        <TypeSample
          label="H2"
          spec="24–32px · 1.15 · -0.01em"
          className="text-heading-2 font-semibold"
          sample="Built for makers who ship at scale."
        />
        <TypeSample
          label="H3"
          spec="20–24px · 1.25 · -0.006em"
          className="text-heading-3 font-semibold"
          sample="Inventory that reconciles itself."
        />
        <TypeSample
          label="H4"
          spec="17–20px · 1.3"
          className="text-heading-4 font-medium"
          sample="Connect your tools in minutes."
        />
        <TypeSample
          label="Body Large"
          spec="17–19px · 1.6"
          className="text-body-lg"
          sample="StudioPOD gives product businesses one operating system for production, inventory, and fulfillment."
          paragraph="Use Body Large for the one or two supporting sentences directly under a heading, the copy a reader sees before deciding whether to keep reading."
        />
        <TypeSample
          label="Body"
          spec="16px · 1.6"
          className="text-body-md"
          sample="Track every unit from raw material to shipped order without leaving one screen."
          paragraph="The default paragraph style for anything longer than a sentence: feature descriptions, help text, card bodies."
        />
        <TypeSample
          label="Small"
          spec="14px · 1.55"
          className="text-body-sm"
          sample="Supports batch, made-to-order, and hybrid production models."
          paragraph="For secondary copy inside dense components: card descriptions, table cells, form hints."
        />
        <TypeSample label="Caption" spec="13px · 1.4" className="text-caption text-ink-secondary" sample="Last synced 2 minutes ago" />
        <TypeSample
          label="Metadata"
          spec="12px · 1.2 · +0.08em"
          className="text-metadata text-ink-tertiary"
          sample="Order Status · Fulfillment"
        />
        <TypeSample
          label="Mono"
          spec="14px · font-mono"
          className="text-body-sm font-mono text-ink-secondary"
          sample="order_id: sp_8f21ac0e · status: in_production"
        />
      </div>
    </PreviewSection>
  );
}
