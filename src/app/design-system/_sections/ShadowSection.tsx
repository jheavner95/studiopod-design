import { PreviewSection, ShadowCard } from "../_components/preview-primitives";

const ELEVATIONS = [
  { name: "none", shadowClassName: "shadow-none", description: "Flush with the surface. Inline content, list rows." },
  { name: "subtle", shadowClassName: "shadow-subtle", description: "Barely lifted. Default resting card state." },
  { name: "card", shadowClassName: "shadow-card", description: "A card that separates from its background." },
  { name: "panel", shadowClassName: "shadow-panel", description: "A panel grouping several cards or a hovered card." },
  { name: "floating", shadowClassName: "shadow-floating", description: "Dropdowns, popovers: floats above the page." },
  { name: "modal", shadowClassName: "shadow-modal", description: "Modals and dialogs. The highest resting elevation." },
];

export function ShadowSection() {
  return (
    <PreviewSection
      id="shadows"
      eyebrow="shadows"
      title="Elevation"
      description="Six levels of lift. Hover any tile to feel how a bigger, softer shadow reads as further off the canvas."
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {ELEVATIONS.map((elevation) => (
          <ShadowCard key={elevation.name} {...elevation} />
        ))}
      </div>
    </PreviewSection>
  );
}
