export interface TimelineAccessibilityTopic {
  label: string;
  text: string;
}

export const TIMELINE_ACCESSIBILITY_TOPICS: TimelineAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "WorkflowTimelineEvent renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable event (open its full detail) is natively Tab-reachable and Enter/Space-operable. WorkflowTimelineFilters' SegmentedControl options are native radio-group semantics inherited unchanged from Foundation Navigation.",
  },
  {
    label: "Focus",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Header/Filters, then Groups top to bottom, each Group's Events top to bottom). Filtering the timeline does not programmatically move focus.",
  },
  {
    label: "ARIA",
    text: "Groups render as a labeled heading (a plain span, not a native <h*> — callers nesting a timeline inside a page's own heading outline supply real heading markup around WorkflowTimelineGroup's title themselves). WorkflowTimelineMarker's icons are all aria-hidden, since WorkflowTimelineEvent's own title/description text already carries the meaning a screen reader needs.",
  },
  {
    label: "Status announcements",
    text: "No built-in aria-live region announces a new event arriving or a status changing — add one when composing a live feed from this family.",
  },
  {
    label: "Timeline semantics",
    text: "This family renders plain <div>/<span> markup, not the HTML5 <time> element or a native ARIA \"log\"/\"feed\" role — a screen composing a live-updating activity feed from this family should add role=\"feed\" and wrap each WorkflowTimelineEvent's timestamp in <time dateTime=...> itself, since the components accept ReactNode timestamps (already-formatted strings or elements) rather than owning date parsing.",
  },
  {
    label: "Color independence",
    text: "WorkflowTimelineMarker never relies on marker color alone — Completed/Failed/Blocked/Skipped each pair their tone with a distinct icon (Check/X/AlertTriangle/SkipForward), Waiting uses a dashed border plus a clock icon, and Pending/Cancelled use an outlined (not filled) marker rather than a color-only distinction from each other.",
  },
];
