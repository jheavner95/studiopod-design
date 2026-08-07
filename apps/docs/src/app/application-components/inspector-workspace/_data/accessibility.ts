export interface AccessibilityGuidance {
  label: string;
  text: string;
}

export const ACCESSIBILITY_GUIDANCE: AccessibilityGuidance[] = [
  {
    label: "Keyboard navigation",
    text: "Tab moves through regions top to bottom in anatomy order; within a region, arrow keys move between its own fields or list items.",
  },
  {
    label: "Focus management",
    text: "Selecting a new object moves focus to the Inspector Header, not buried inside whatever region happened to be scrolled to — a screen reader user should always land somewhere sensible after a selection change.",
  },
  {
    label: "Screen readers",
    text: "A selection change announces the new object's name and type before anything else — the same Identity-first principle, read aloud.",
  },
  {
    label: "Landmarks",
    text: "The Inspector is its own labeled landmark, and each of its eight regions is a labeled sub-section, so assistive technology can jump directly to Validation or Activity without scanning past the rest.",
  },
  {
    label: "Reduced motion",
    text: "Region expand/collapse and the sticky header's own transitions respect the same reduced-motion preference every other primitive in this design system already does.",
  },
  {
    label: "Sticky regions",
    text: "The Inspector Header's sticky behavior never traps keyboard focus — Tab continues normally into the regions scrolling beneath it.",
  },
];
