import {
  IllustrationConnection,
  type ConnectionStatus,
  type ConnectionDirection,
  type ConnectionStyle,
} from "@/illustrations";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

const WIDTH = 160;
const HEIGHT = 40;
const START = { x: 8, y: HEIGHT / 2 };
const END = { x: WIDTH - 8, y: HEIGHT / 2 };

interface ConnectionDemoProps {
  label: string;
  status?: ConnectionStatus;
  direction?: ConnectionDirection;
  style?: ConnectionStyle;
  weight?: number;
}

function ConnectionDemo({ label, status, direction, style, weight }: ConnectionDemoProps) {
  return (
    <div className="flex flex-col items-center gap-3 pb-2">
      <DemoLabel>{label}</DemoLabel>
      <svg width={WIDTH} height={HEIGHT} className="overflow-visible">
        <IllustrationConnection
          connection={{ id: label, source: "a", target: "b", status, direction, style, weight }}
          start={START}
          end={END}
        />
      </svg>
    </div>
  );
}

export function ConnectionGallerySection() {
  return (
    <PreviewSection
      id="connection-gallery"
      eyebrow="connection gallery"
      title="IllustrationConnection"
      description="A connector between two computed anchor points. Every status, style, direction, and weight combination."
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <ConnectionDemo label="inactive" status="inactive" />
        <ConnectionDemo label="active" status="active" />
        <ConnectionDemo label="flowing" status="flowing" />
        <ConnectionDemo label="highlighted" status="highlighted" />
        <ConnectionDemo label="disabled" status="disabled" />
        <ConnectionDemo label="dashed" status="active" style="dashed" />
        <ConnectionDemo label="dotted" status="active" style="dotted" />
        <ConnectionDemo label="weight 3" status="active" weight={3} />
        <ConnectionDemo label="bidirectional" status="active" direction="bidirectional" />
        <ConnectionDemo label="backward" status="active" direction="backward" />
      </div>
    </PreviewSection>
  );
}
