export interface AccessibilityFinding {
  label: string;
  text: string;
}

export const ACCESSIBILITY_STRENGTHS: AccessibilityFinding[] = [
  { label: "Keyboard navigation", text: "Every interactive element in the pilot — artwork rows, Tabs, dialog buttons, Undo/Redo — is reachable and operable by keyboard alone, manually verified via Tab-through in DS-5.4's own browser QA." },
  { label: "Focus management", text: "WorkflowStep renders a real <button type=\"button\"> with a focus-ring class when given an onClick — confirmed by direct source read, not assumed from its own docs." },
  { label: "ARIA", text: "Tabs implements the full ARIA tabs pattern (role=\"tablist\"/\"tab\"/\"tabpanel\", aria-selected, aria-controls, roving tabindex, arrow-key navigation) — inherited unmodified from Foundation Navigation." },
  { label: "Dialogs", text: "Foundation's own Dialog owns a focus trap (useFocusTrap), closes on Escape (useEscapeKey), and returns focus to the trigger on close — verified by direct source read of Dialog.tsx, not assumed." },
  { label: "Selection", text: "Selecting an artwork updates a visible ring highlight and the Inspector/Validation panels in the same interaction — manually verified end to end in browser QA." },
  { label: "Color independence", text: "Every status indicator in the pilot pairs color with a text label (Badge always renders its text; WorkflowStep's colored marker sits beside a text label) — no status is conveyed by color alone." },
  { label: "Reduced motion", text: "Dialog's own entrance animation is gated by useMotionEnabled() and disabled entirely when the user prefers reduced motion — inherited for free from Foundation, not re-implemented by the pilot." },
  { label: "Responsive behavior", text: "Desktop, tablet, and mobile were all manually verified with zero horizontal overflow in DS-5.4's own QA — the sidebar correctly collapses below the lg breakpoint, and the Dashboard view's metrics fixed from 4 to 2 columns during that same pass." },
];

export const ACCESSIBILITY_GAPS: AccessibilityFinding[] = [
  {
    label: "Status announcements",
    text: "No aria-live wiring exists for state changes (selection, stage advance, validation advance, dialog confirm) — a screen reader user gets no announcement when an action completes. Foundation's own Toast component already implements aria-live=\"polite\" (confirmed by direct source read), so the pattern exists in the design system; the pilot simply doesn't compose it yet. This refines, rather than repeats, DS-2.5.10/DS-3.9/DS-4.10's own claim that no first-party live-region pattern exists at all — one does, one tier down, unused here.",
  },
];
