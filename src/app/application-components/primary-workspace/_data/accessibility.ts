export interface AccessibilityGuidance {
  label: string;
  text: string;
}

export const ACCESSIBILITY_GUIDANCE: AccessibilityGuidance[] = [
  {
    label: "Keyboard navigation",
    text: "Every Workflow Control is reachable by Tab in stage order; Canvas and Editor modes support the object-level keyboard shortcuts appropriate to that specific tool.",
  },
  {
    label: "Focus order",
    text: "Context Banner, then Primary Working Surface, then Supporting Panels, then Workflow Controls — the same order the regions read top to bottom.",
  },
  {
    label: "Landmarks",
    text: "The Primary Working Surface is its own labeled landmark, distinct from Supporting Panels, so assistive technology can jump directly to the actual work.",
  },
  {
    label: "Screen reader guidance",
    text: "A mode change (Edit to Review, for instance) announces itself — a screen reader user shouldn't have to rediscover which mode they're in by exploring the page.",
  },
  {
    label: "Reduced motion",
    text: "Canvas pan/zoom and Timeline scrubbing respect the same reduced-motion preference every other animated primitive in this design system already does.",
  },
  {
    label: "Large working surfaces",
    text: "A Canvas or Dashboard spanning most of the viewport still needs a sensible reading order for anything overlaid on it — size doesn't exempt a region from being navigable.",
  },
];
