export interface GuidanceLink {
  label: string;
  href: string;
}

export interface ImplementationGuidance {
  label: string;
  text: string;
  links?: GuidanceLink[];
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidance[] = [
  {
    label: "Required regions",
    text: "Platform Identity and Actions. Every header needs to say what platform this is and offer at least one thing to do.",
  },
  {
    label: "Optional regions",
    text: "Context and Status. Both are conditional — Context only past the platform root, Status only when there's a signal worth surfacing.",
  },
  {
    label: "Recommended spacing",
    text: "Generous — the header is the one region every screen in a platform shares, so its rhythm sets the tone. Match the design system's existing section spacing scale rather than inventing a tighter one.",
  },
  {
    label: "Action limits",
    text: "One Primary Action, up to two Secondary Actions visible, everything else in the Overflow Menu.",
  },
  {
    label: "Badge limits",
    text: "Three Status badges visible at once, maximum — see the Status region's collapse behavior above.",
  },
  {
    label: "Accessibility guidance",
    text: "Every region is a labeled landmark. Status badges pair color with a text label. The Primary Action is reachable by keyboard before any Secondary or Utility action.",
  },
  {
    label: "Responsive rules",
    text: "Status collapses before Actions. Actions collapse before Identity. Identity's icon and name are the last thing to ever disappear — see Responsive Behavior below.",
  },
  {
    label: "Reuse opportunities",
    text: "Every region maps onto an existing component family or Workspace Framework region — nothing here should be built as a one-off.",
    links: [
      { label: "Component families", href: "/application-components/architecture" },
      { label: "Workspace Framework", href: "/application-components/workspace-framework" },
    ],
  },
  {
    label: "Future extensions",
    text: "A second Platform Identity for Comparison View is the only variant-specific region defined so far — every other variant reuses the same four.",
  },
];
