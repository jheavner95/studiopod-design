export interface FeedbackAccessibilityTopic {
  label: string;
  text: string;
}

export const FEEDBACK_ACCESSIBILITY_TOPICS: FeedbackAccessibilityTopic[] = [
  {
    label: "ARIA live regions",
    text: "Alert, Banner, InlineMessage, EmptyState/SuccessState/WarningState/ErrorState/InfoState, LoadingState, StatusIndicator, and ValidationSummary all render role=\"status\" (polite) or role=\"alert\" (assertive, error tone only) directly on their own root — feedbackRole(tone) in Alert.tsx is the single shared rule every tone-aware component in this family applies. StatusIndicator's own role was added in DS-5D — previously the only component in the family with no ARIA wiring at all, so a status transition (idle -> active -> error) was rendered purely visually. Toast's viewport is a dedicated aria-live=\"polite\" aria-atomic=\"false\" region so each new toast is announced individually as it's added.",
  },
  {
    label: "Announcements",
    text: "Nothing in this family introduces a second, separate announcement layer on top of its own role — the live region *is* the announcement. A ProgressBar/ProgressRing's percentage is exposed via aria-valuenow, not a redundant visually-hidden string.",
  },
  {
    label: "Shared announcement infrastructure",
    text: "LiveRegionProvider/useAnnounce (src/components/feedback/LiveRegion.tsx, mounted once at the app root) is the one case this family needs a message announced without a persistent, visible element to carry a role on — ValidationSummary uses it today, to announce \"Validation passed\" when a form's errors clear and its own role=\"alert\"/role=\"status\" region unmounts (an unmounted region can't announce its own removal). Every other component in this family owns a real, rendered element to carry role=\"status\"/\"alert\" on directly, so it doesn't need useAnnounce — DS-5D confirmed this is the correct default (reach for your own role first) with LiveRegion reserved for the transition-to-empty/removal case a role alone can't cover.",
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
