import { CapabilityRegistryDiagram } from "@/capabilities";
import { commerceCapability } from "@/capabilities/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const FRAMES = [
  { label: "Desktop (1100px container)", width: 1100 },
  { label: "Tablet (700px container)", width: 700 },
  { label: "Mobile (340px container)", width: 340 },
];

/**
 * Each frame constrains the diagram's *container*, not the browser
 * viewport, since IllustrationCanvas measures its own rendered width via
 * ResizeObserver. Desktop keeps the free layout, tablet compresses
 * spacing, mobile stacks the capabilities and providers automatically.
 */
export function ResponsiveSection() {
  return (
    <PreviewSection
      id="capability-responsive"
      eyebrow="responsive behavior"
      title="Desktop, tablet, mobile"
      description="The same commerce capability registry at three container widths, readability maintained at every size."
    >
      <div className="flex flex-col gap-10">
        {FRAMES.map((frame) => (
          <div key={frame.label} className="flex flex-col gap-3">
            <DemoLabel>{frame.label}</DemoLabel>
            <div
              className="scrollbar-none overflow-x-auto rounded-lg border border-dashed border-border-strong p-4"
              style={{ maxWidth: frame.width }}
            >
              <CapabilityRegistryDiagram registry={commerceCapability} nodeSize="sm" />
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  );
}
