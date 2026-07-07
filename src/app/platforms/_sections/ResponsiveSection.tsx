import { PlatformArchitectureDiagram } from "@/platforms";
import { valueChain } from "@/platforms/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const FRAMES = [
  { label: "Desktop (1100px container)", width: 1100 },
  { label: "Tablet (700px container)", width: 700 },
  { label: "Mobile (340px container)", width: 340 },
];

/**
 * Each frame constrains the diagram's *container*, not the browser
 * viewport, since IllustrationCanvas measures its own rendered width via
 * ResizeObserver. Desktop keeps the free grid layout, tablet compresses
 * spacing, mobile stacks the platforms automatically.
 */
export function ResponsiveSection() {
  return (
    <PreviewSection
      id="platform-responsive"
      eyebrow="responsive behavior"
      title="Desktop, tablet, mobile"
      description="The same value chain architecture at three container widths, readability maintained at every size."
    >
      <div className="flex flex-col gap-10">
        {FRAMES.map((frame) => (
          <div key={frame.label} className="flex flex-col gap-3">
            <DemoLabel>{frame.label}</DemoLabel>
            <div
              className="scrollbar-none overflow-x-auto rounded-lg border border-dashed border-border-strong p-4"
              style={{ maxWidth: frame.width }}
            >
              <PlatformArchitectureDiagram architecture={valueChain} layout="horizontal" nodeSize="sm" />
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  );
}
