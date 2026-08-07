export interface AccessibilityGuidance {
  label: string;
  text: string;
}

export const ACCESSIBILITY_GUIDANCE: AccessibilityGuidance[] = [
  {
    label: "Announcements",
    text: "A new Error or Warning notification announces itself the moment it appears — the user shouldn't have to notice a badge count changed on its own.",
  },
  {
    label: "Screen readers",
    text: "Operational Health and Background Jobs describe their state in words (\"Degraded,\" \"3 running\"), never a color or icon alone.",
  },
  {
    label: "Live regions",
    text: "Notifications and Background Jobs use ARIA live regions scoped to polite, not assertive — ambient awareness, not an interruption, even for assistive technology.",
  },
  {
    label: "Keyboard access",
    text: "Every dismissible notification and cancellable job is reachable and actionable by keyboard, with no mouse-only affordance anywhere in the anatomy.",
  },
  {
    label: "Reduced motion",
    text: "Progress fills, notification entrances, and the Console's own scrolling output all respect the same reduced-motion preference every other primitive in this design system already does.",
  },
  {
    label: "Notification timing",
    text: "Auto-dismissing notifications stay on screen long enough to be read at a deliberately slow pace, not tuned to how fast a sighted, unhurried user can scan them.",
  },
  {
    label: "Focus behavior",
    text: "A new notification never steals focus from whatever the user is doing — it announces itself without moving keyboard focus away from the Primary Workspace.",
  },
];
