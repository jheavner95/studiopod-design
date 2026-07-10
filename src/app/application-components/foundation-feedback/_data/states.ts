export interface FeedbackStateNote {
  state: string;
  note: string;
}

export const FEEDBACK_STATES: FeedbackStateNote[] = [
  { state: "Idle", note: "The resting state before any feedback is needed — most of this family only mounts once there's something to say; Alert/Banner/EmptyState simply aren't rendered yet." },
  { state: "Loading", note: "LoadingState (full-region) and ProgressBar/ProgressRing's indeterminate mode (no knowable duration) both cover this; Skeleton covers the shape-accurate variant of the same state." },
  { state: "Success", note: "SuccessState for a full-block outcome, Alert/Toast/Notification tone=\"success\" for a message-shaped one, ProgressBar/ProgressRing at value=1." },
  { state: "Warning", note: "WarningState, or tone=\"warning\" on Alert/Banner/InlineMessage/Toast/Notification — non-blocking, the reader can still proceed." },
  { state: "Error", note: "ErrorState, or tone=\"error\" on Alert/Banner/InlineMessage/Toast/Notification — the only tone that escalates role=\"status\" to role=\"alert\" (see Accessibility)." },
  { state: "Disabled", note: "Only meaningful on the interactive pieces of this family — a Toast/Notification's action button, or an Alert/Banner/EmptyState's action slot; every component here otherwise renders unconditionally once mounted." },
  { state: "Retry", note: "EmptyState/ErrorState's action slot is where a retry action lives — this family doesn't special-case retry as its own visual state, it's just an action prop." },
  { state: "Dismissed", note: "Alert/Banner/Notification all accept an onDismiss and render nothing once the caller stops rendering them; Toast dismisses itself the same way, either on its own timer or via ToastItem's dismiss(id) call." },
];
