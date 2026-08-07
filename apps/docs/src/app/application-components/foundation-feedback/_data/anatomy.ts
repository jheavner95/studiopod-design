export interface FeedbackAnatomyRegion {
  name: string;
  description: string;
  components: string;
}

/** The six axes this system is organized along — most components sit on more than one (Toast is both Transient and Non-blocking, for example); this groups by the axis each is most defined by. */
export const FEEDBACK_ANATOMY: FeedbackAnatomyRegion[] = [
  {
    name: "Transient",
    description: "Appears on its own, then disappears without the user doing anything — communicates something that just happened.",
    components: "Toast, Notification",
  },
  {
    name: "Persistent",
    description: "Stays in the layout until the user (or the underlying condition) dismisses it.",
    components: "Alert, Banner, ValidationSummary, EmptyState, SuccessState, WarningState, ErrorState, InfoState",
  },
  {
    name: "Blocking",
    description: "Nothing in this family blocks the page the way Dialog/Drawer do — every component here stays in normal document flow. LoadingState and Skeleton are the closest thing to blocking, since they typically replace the content they're covering for — LoadingState with a spinner + label when no shape is known yet, Skeleton with a shape-accurate placeholder when it is.",
    components: "LoadingState, Skeleton (both region-blocking, not page-blocking)",
  },
  {
    name: "Non-blocking",
    description: "Coexists with the content around it — the user can keep working while it's visible.",
    components: "Toast, Banner, InlineMessage, StatusIndicator, ProgressBar, ProgressRing",
  },
  {
    name: "Inline",
    description: "Rendered exactly where the thing it's about lives — next to a field, inside a card, in a data cell.",
    components: "InlineMessage, StatusIndicator, ProgressBar, ProgressRing",
  },
  {
    name: "Global",
    description: "Not scoped to one piece of content — announces something true for the whole page or workspace.",
    components: "Banner, Toast (rendered through a page-level Portal regardless of where useToast().show() was called from)",
  },
];
