export interface FeedbackAccessibilityTopic {
  label: string;
  text: string;
}

export const FEEDBACK_ACCESSIBILITY_TOPICS: FeedbackAccessibilityTopic[] = [
  {
    label: "ARIA live regions",
    text: "Alert, Banner, InlineMessage, EmptyState/SuccessState/WarningState/ErrorState/InfoState, LoadingState, and ValidationSummary all render role=\"status\" (polite) or role=\"alert\" (assertive, error tone only) directly on their own root — feedbackRole(tone) in Alert.tsx is the single shared rule every tone-aware component in this family applies. Toast's viewport is a dedicated aria-live=\"polite\" aria-atomic=\"false\" region so each new toast is announced individually as it's added.",
  },
  {
    label: "Announcements",
    text: "Nothing in this family introduces a second, separate announcement layer on top of its own role — the live region *is* the announcement. A ProgressBar/ProgressRing's percentage is exposed via aria-valuenow, not a redundant visually-hidden string.",
  },
  {
    label: "Focus management",
    text: "This family never moves or traps focus — that's the Overlay System's job (Dialog/Drawer/Menu already do it). A Toast's dismiss button and any action slot are reachable by Tab like any other in-flow control, but appearing/disappearing never steals or restores focus the way a modal does.",
  },
  {
    label: "Timing",
    text: "Toast's only timing-sensitive behavior — the auto-dismiss timer — pauses on hover and on focus (via onMouseEnter/onFocus on the toast item), so a screen-reader or keyboard user reading a toast's content never has it disappear out from under them mid-read.",
  },
  {
    label: "Dismissal",
    text: "Every dismissible component (Alert, Banner, Notification/Toast) renders its own close button with aria-label=\"Dismiss\" rather than an unlabeled icon-only control, and dismissal is always caller-driven (onDismiss) — this family holds no hidden internal \"already dismissed\" state that could desync from what's actually rendered.",
  },
  {
    label: "Reduced motion",
    text: "Toast's enter/exit and ProgressBar/ProgressRing's indeterminate sweep all check useMotionEnabled() and fall back to an instant, static presentation — a still bar/ring instead of a moving one — exactly like the rest of this design system's motion engine. Skeleton's pulse and LoadingState's spinner are plain CSS animations already covered by the global prefers-reduced-motion rule in tokens.css, not by this per-component check.",
  },
];
