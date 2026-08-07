import { Fragment } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pulse } from "@/motion";
import { IllustrationGroup, IllustrationNode } from "@/illustrations";
import { groupPlatformsByLayer, compilePlatformToNode } from "../utils";
import type { PlatformArchitecture } from "../types";

export interface PlatformLayerDiagramProps {
  architecture: PlatformArchitecture;
  selectedPlatformId?: string;
  onSelectPlatform?: (id: string) => void;
  className?: string;
}

/**
 * The stacked-layer view: each PlatformLayer renders as an IllustrationGroup
 * containing a responsive row of its member platforms, connected top to
 * bottom by a simple arrow. Flexbox handles the mobile stack automatically,
 * no coordinate-based layout is needed for this literal top-to-bottom story.
 */
export function PlatformLayerDiagram({
  architecture,
  selectedPlatformId,
  onSelectPlatform,
  className,
}: PlatformLayerDiagramProps) {
  const layerGroups = groupPlatformsByLayer(architecture);

  return (
    <div className={cn("flex flex-col items-stretch gap-4", className)} role="group" aria-label="Platform layers">
      {layerGroups.map(({ layer, platforms }, index) => (
        <Fragment key={layer.id}>
          {index > 0 && (
            <div className="flex justify-center" aria-hidden>
              <Pulse duration="hero">
                <ArrowDown className="size-5 text-ink-tertiary" />
              </Pulse>
            </div>
          )}
          <IllustrationGroup
            group={{
              id: layer.id,
              title: layer.title,
              description: layer.description,
              nodes: platforms.map((platform) => platform.id),
            }}
          >
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 pb-10 pt-2">
              {platforms.map((platform) => (
                <IllustrationNode
                  key={platform.id}
                  node={compilePlatformToNode(platform, selectedPlatformId)}
                  onSelect={onSelectPlatform}
                />
              ))}
            </div>
          </IllustrationGroup>
        </Fragment>
      ))}
    </div>
  );
}
