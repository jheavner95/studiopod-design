import { Caption } from "@/components/ui";
import { PreviewSection, Swatch } from "@/app/docs/_components/DocsShowcase";

const canvas = [
  { name: "canvas", cssVar: "--color-canvas", usage: "The page background. The base of every screen.", swatchClassName: "bg-canvas" },
  {
    name: "canvas-raised",
    cssVar: "--color-canvas-raised",
    usage: "A faint step up from canvas, for raised full-bleed sections.",
    swatchClassName: "bg-canvas-raised",
  },
];

const surfaces = [
  { name: "surface", cssVar: "--color-surface", usage: "Default card and panel background.", swatchClassName: "bg-surface" },
  {
    name: "surface-hover",
    cssVar: "--color-surface-hover",
    usage: "Hover state for interactive surfaces.",
    swatchClassName: "bg-surface-hover",
  },
  {
    name: "surface-active",
    cssVar: "--color-surface-active",
    usage: "Pressed state, or an elevated surface that needs emphasis.",
    swatchClassName: "bg-surface-active",
  },
  {
    name: "panel",
    cssVar: "--color-panel",
    usage: "Base tint for glass panels, before the blur is applied.",
    swatchClassName: "bg-panel",
  },
];

const borders = [
  {
    name: "border-subtle",
    cssVar: "--color-border-subtle",
    usage: "Faint separators, for dividers and quiet outlines.",
    swatchClassName: "bg-surface border-border-subtle",
  },
  {
    name: "border",
    cssVar: "--color-border",
    usage: "Default component border.",
    swatchClassName: "bg-surface border-border",
  },
  {
    name: "border-strong",
    cssVar: "--color-border-strong",
    usage: "Emphasized border for hover/focus states.",
    swatchClassName: "bg-surface border-border-strong",
  },
  {
    name: "border-accent",
    cssVar: "--color-border-accent",
    usage: "Accent-tinted border for active or selected states.",
    swatchClassName: "bg-surface border-2 border-border-accent",
  },
];

const ink = [
  { name: "ink-primary", cssVar: "--color-ink-primary", usage: "Primary text and headings.", swatchClassName: "bg-ink-primary" },
  {
    name: "ink-secondary",
    cssVar: "--color-ink-secondary",
    usage: "Supporting body copy.",
    swatchClassName: "bg-ink-secondary",
  },
  {
    name: "ink-tertiary",
    cssVar: "--color-ink-tertiary",
    usage: "Captions and metadata: the least emphasis.",
    swatchClassName: "bg-ink-tertiary",
  },
  {
    name: "ink-disabled",
    cssVar: "--color-ink-disabled",
    usage: "Disabled text and icons.",
    swatchClassName: "bg-ink-disabled",
  },
];

const accent = [
  { name: "accent-300", cssVar: "--color-accent-300", usage: "Lightest tint, for text on a dark accent fill.", swatchClassName: "bg-accent-300" },
  { name: "accent-400", cssVar: "--color-accent-400", usage: "Links, icon accents, hover states.", swatchClassName: "bg-accent-400" },
  { name: "accent-500", cssVar: "--color-accent-500", usage: "The brand accent. Primary buttons, active states.", swatchClassName: "bg-accent-500" },
  { name: "accent-600", cssVar: "--color-accent-600", usage: "Pressed state for accent-500 fills.", swatchClassName: "bg-accent-600" },
  { name: "accent-700", cssVar: "--color-accent-700", usage: "Deepest accent, rarely used directly.", swatchClassName: "bg-accent-700" },
  { name: "accent-soft", cssVar: "--color-accent-soft", usage: "Tinted background for accent badges and pills.", swatchClassName: "bg-accent-soft" },
];

const status = [
  { name: "success", cssVar: "--color-success", usage: "Completed states, positive trends.", swatchClassName: "bg-success" },
  { name: "warning", cssVar: "--color-warning", usage: "Needs-attention states.", swatchClassName: "bg-warning" },
  { name: "error", cssVar: "--color-error", usage: "Failed states, destructive actions.", swatchClassName: "bg-error" },
  { name: "neutral", cssVar: "--color-neutral", usage: "Idle or inactive states.", swatchClassName: "bg-neutral" },
];

function ColorGroup({ label, items }: { label: string; items: typeof canvas }) {
  return (
    <div>
      <Caption className="mb-4">{label}</Caption>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Swatch key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

export function ColorsSection() {
  return (
    <PreviewSection
      id="colors"
      eyebrow="colors"
      title="Color tokens"
      description="Six hierarchies, one palette. Every color a component uses traces back to one of these."
    >
      <div className="flex flex-col gap-10">
        <ColorGroup label="Canvas hierarchy" items={canvas} />
        <ColorGroup label="Surface hierarchy" items={surfaces} />
        <ColorGroup label="Border hierarchy" items={borders} />
        <ColorGroup label="Ink hierarchy" items={ink} />
        <ColorGroup label="Accent scale" items={accent} />
        <ColorGroup label="Status colors" items={status} />
      </div>
    </PreviewSection>
  );
}
