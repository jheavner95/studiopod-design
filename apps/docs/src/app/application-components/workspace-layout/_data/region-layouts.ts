export interface LayoutSegment {
  label: string;
  /** Relative proportion within the row — rendered as a flex-grow ratio, never a pixel or percent literal. */
  weight: number;
}

export interface RegionLayout {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  segments: LayoutSegment[];
}

/** Six canonical proportions for the Library / Primary Workspace / Inspector row — expressed as relative weights, not pixel or percent literals. */
export const REGION_LAYOUTS: RegionLayout[] = [
  {
    id: "20-60-20",
    name: "20 / 60 / 20",
    description: "The default: a moderate Library rail, most space to the Primary Workspace, a moderate Inspector rail.",
    whenToUse:
      "Most Library Header screens — enough Library to browse, enough Inspector to see identity and a couple of properties, without either crowding the Primary Workspace.",
    segments: [
      { label: "Library", weight: 20 },
      { label: "Primary Workspace", weight: 60 },
      { label: "Inspector", weight: 20 },
    ],
  },
  {
    id: "25-50-25",
    name: "25 / 50 / 25",
    description: "A wider Library and Inspector, trading Primary Workspace room for more list and detail context.",
    whenToUse:
      "When the Library itself needs more room — a Library Table with several columns, or an Inspector with Validation, Health, and Activity all open at once.",
    segments: [
      { label: "Library", weight: 25 },
      { label: "Primary Workspace", weight: 50 },
      { label: "Inspector", weight: 25 },
    ],
  },
  {
    id: "collapsed-inspector",
    name: "Collapsed Inspector",
    description: "Inspector hidden entirely until something is selected.",
    whenToUse:
      "Empty-selection states, or any workspace where most of a session has nothing selected yet — Library and Primary Workspace share the freed width.",
    segments: [
      { label: "Library", weight: 30 },
      { label: "Primary Workspace", weight: 70 },
    ],
  },
  {
    id: "collapsed-library",
    name: "Collapsed Library",
    description: "Library hidden behind a toggle; Primary Workspace and Inspector take the width.",
    whenToUse: "Editor-mode workflows where the user already knows what they're working on and doesn't need to keep browsing.",
    segments: [
      { label: "Primary Workspace", weight: 75 },
      { label: "Inspector", weight: 25 },
    ],
  },
  {
    id: "canvas-mode",
    name: "Canvas Mode",
    description: "Library and Inspector both collapse to floating overlays; Primary Workspace claims the full width.",
    whenToUse: "Freeform Canvas primary-workspace mode — see the Canvas width mode above.",
    segments: [{ label: "Primary Workspace", weight: 100 }],
  },
  {
    id: "dual-inspector",
    name: "Dual Inspector",
    description: "Two Inspector rails, one on each side of the Primary Workspace.",
    whenToUse: "Comparison View — comparing two selected objects needs two Inspectors, not one that swaps between them.",
    segments: [
      { label: "Inspector", weight: 20 },
      { label: "Primary Workspace", weight: 60 },
      { label: "Inspector", weight: 20 },
    ],
  },
];
