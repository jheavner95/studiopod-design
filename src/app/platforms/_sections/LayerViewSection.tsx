import { PlatformLayerDiagram } from "@/platforms";
import { completeArchitecture, platformLayers } from "@/platforms/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/** PlatformLayerDiagram stacks each architecture's layers top to bottom, one platform-per-layer or many, connected by arrows. */
export function LayerViewSection() {
  return (
    <PreviewSection
      id="layer-view"
      eyebrow="layer view"
      title="Layered architecture"
      description="Each PlatformLayer renders as its own region, with member platforms wrapping responsively inside it, no coordinate math required."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <DemoLabel>{completeArchitecture.title} (multi-platform layers)</DemoLabel>
          <PlatformLayerDiagram architecture={completeArchitecture} />
        </div>
        <div className="flex flex-col gap-3">
          <DemoLabel>{platformLayers.title} (single-platform layers)</DemoLabel>
          <PlatformLayerDiagram architecture={platformLayers} />
        </div>
      </div>
    </PreviewSection>
  );
}
