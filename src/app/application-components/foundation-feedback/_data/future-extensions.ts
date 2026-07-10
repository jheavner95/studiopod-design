export interface FeedbackFutureExtension {
  title: string;
  description: string;
}

export const FEEDBACK_FUTURE_EXTENSIONS: FeedbackFutureExtension[] = [
  {
    title: "Notification Center",
    description: "A persistent, dismissible list of past Notifications (bell-icon dropdown) — Notification.tsx is already the presentational row this would reuse unchanged; only the list/tray chrome around it is missing.",
  },
  {
    title: "Activity Feed",
    description: "A chronological, non-dismissible log of everything that happened, distinct from Notification Center's \"things you haven't acknowledged yet\" — deferred until a real screen needs it.",
  },
  {
    title: "Task Progress",
    description: "A named, trackable unit of work (not just a bar/ring value) with its own identity, status, and history — ProgressBar/ProgressRing are the visual primitive this would be built on top of.",
  },
  {
    title: "Background Jobs",
    description: "A queue of Task Progress items running outside the current view, surfaced via a persistent indicator — the reuseTargets the Foundation Component Catalog's \"progress\" entry already names.",
  },
  {
    title: "Realtime Updates",
    description: "Toasts/Notifications pushed from a live server connection rather than local component state — ToastProvider's show() API is already transport-agnostic (it doesn't care who calls it), so this is a data-layer extension, not a component one.",
  },
  {
    title: "Undo Actions",
    description: "A Toast/Notification variant whose action is specifically \"undo the thing that just happened\" with its own countdown — a real, common pattern, but distinct enough from a generic action slot to warrant its own design pass rather than being assumed into the current action prop.",
  },
];
