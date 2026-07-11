export interface StepperAccessibilityTopic {
  label: string;
  text: string;
}

export const STEPPER_ACCESSIBILITY_TOPICS: StepperAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "WorkflowStepperStep renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable step (jump back to a completed one) is natively Tab-reachable and Enter/Space-operable. WorkflowStepperNavigation's Back/Next are real <button> elements via Foundation UI's own Button.",
  },
  {
    label: "Focus",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Header, then Stages/Steps, then Navigation/Actions in the Footer). Advancing a step does not programmatically move focus; a screen that needs focus moved to the new step's content on Next does that itself.",
  },
  {
    label: "ARIA",
    text: "WorkflowStepperProgress inherits WorkflowProgress's real role=\"progressbar\"/aria-valuenow unchanged. WorkflowStepperNavigation's Back/Next buttons carry their own aria-label (\"Previous step\"/\"Next step\"/\"Finish\") rather than reusing Foundation Navigation's Pagination, whose \"Previous/Next page\" wording would misdescribe a step wizard.",
  },
  {
    label: "Progress announcements",
    text: "WorkflowStepperProgress's label text (\"Step 3 of 7\") changes as the wizard advances, and now announces that transition itself through the shared LiveRegionProvider mounted at the app root whenever currentStep changes — no longer an opt-in region a screen has to wrap it in.",
  },
  {
    label: "Status announcements",
    text: "WorkflowStepperStep's own per-step status (e.g. Current moving to the next step) is still conveyed visually plus via aria-current/STATUS_LABEL text rather than a separate live-region announcement of its own — the wizard-level transition is already covered by WorkflowStepperProgress's announcement above, so a second announcement per step would be redundant with it rather than additive.",
  },
  {
    label: "Color independence",
    text: "WorkflowStepperStep never relies on marker color alone — Completed/Failed/Blocked/Skipped/Cancelled each pair their tone with a distinct icon (Check/X/AlertTriangle/SkipForward) or a struck-through label, and Waiting uses a dashed border rather than a color-only distinction from Not Started.",
  },
];
