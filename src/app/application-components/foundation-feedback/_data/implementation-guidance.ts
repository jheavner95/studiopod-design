export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Blocking vs. non-blocking",
    text: "Nothing in this family blocks the page — that's the Overlay System's Dialog. If the user must acknowledge something before continuing, that's a Dialog with an Alert inside it, not an Alert alone. Reach for this family only when the user can keep working while the message is visible.",
  },
  {
    label: "Transient vs. persistent",
    text: "Toast/Notification are for something that already happened and doesn't need to stay visible — the user missed nothing by missing it. Alert/Banner/ValidationSummary are for something the user still needs to act on or be aware of while it's true; don't use a Toast for a validation error the user still needs to fix, since it'll disappear before they've read the field it's about.",
  },
  {
    label: "Alert vs. Banner",
    text: "Alert is boxed and scoped to a section — it sits among the content it's about. Banner is a full-bleed strip for a page- or workspace-level announcement, closer to the top of the layout. Don't use Banner for a single field or card's feedback; that's Alert or InlineMessage.",
  },
  {
    label: "InlineMessage vs. FieldError/FieldHelp",
    text: "Field-level validation and help text stay on the Foundation Form System's FieldError.tsx/FieldHelp.tsx — they're wired to a specific input's aria-describedby. InlineMessage is for feedback that isn't attached to one input, e.g. \"Saved 2 minutes ago\" next to a save button.",
  },
  {
    label: "EmptyState vs. SuccessState/WarningState/ErrorState/InfoState",
    text: "EmptyState's default (neutral tone) is for an absence — no data, no results. The four tone-preset wrappers are for an outcome — a result the system is telling the user about. Both share the same icon/title/description/action layout on purpose; don't build a fifth bespoke \"result screen\" layout when one of these five already fits.",
  },
  {
    label: "LoadingState vs. Skeleton vs. ProgressBar/ProgressRing",
    text: "LoadingState is for an async region with no meaningful shape to preview yet. Skeleton is for a region whose shape you already know (a list, a card) and want to preview before content arrives. ProgressBar/ProgressRing (determinate) are for a task with a knowable completion percentage; their indeterminate mode is for a knowable task with an unknowable duration — different from LoadingState's \"we don't know anything yet.\"",
  },
  {
    label: "StatusIndicator",
    text: "For a persistent, at-a-glance system/entity status (a pipeline stage, a connection state) that isn't tied to one specific action just taken — distinct from Toast/Notification, which are about a specific event that just occurred.",
  },
  {
    label: "When not to build a new feedback pattern",
    text: "This package's own duplication audit came back clean — no hand-rolled feedback UI was found anywhere in src/app to migrate (see Promotion Candidates). Before adding a new one-off status/loading/validation block to a page, check whether Alert, Banner, Toast, EmptyState, or one of its tone presets already covers it.",
  },
];
