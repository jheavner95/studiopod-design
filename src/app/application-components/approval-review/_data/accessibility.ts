export interface ApprovalAccessibilityTopic {
  label: string;
  text: string;
}

export const APPROVAL_ACCESSIBILITY_TOPICS: ApprovalAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "ApprovalStep renders a real <button> only when onClick is supplied, never a div-with-onClick, so a clickable step is natively Tab-reachable and Enter/Space-operable. ApprovalActions' Approve/Reject/Request Changes buttons are real <button> elements via Foundation UI's own Button, inherited unchanged through WorkflowActions/InspectorActions.",
  },
  {
    label: "Focus",
    text: "This family introduces no custom tabindex or focus-trap logic anywhere — DOM order is reading order (Request, then Stages/Steps, then the Review panel's own Comment/Checklist/History, then Actions in the footer). Recording a decision does not programmatically move focus.",
  },
  {
    label: "ARIA",
    text: "ReviewChecklist's items are real Foundation Forms CheckboxFields, each with its own accessibly-associated <label> and error text — no custom checkbox markup. ApprovalDecision's outcome banner inherits Alert's own role=\"alert\"/role=\"status\" split (error decisions are assertive, everything else is polite), the same feedbackRole() convention every Foundation Feedback consumer already uses.",
  },
  {
    label: "Status announcements",
    text: "No built-in aria-live region announces a new decision or status change — the same opt-in convention every prior Workflow Component Library package already follows, and the systemic gap this session's own DS-2.5.10 certification review already flagged across the whole library rather than fixed ad hoc in one package.",
  },
  {
    label: "Review semantics",
    text: "ReviewComment is a real Foundation Forms TextareaField (accessibly labeled, real <textarea>), not a bespoke rich-text or comment-thread control — a screen needing a real comment thread (multiple prior comments, replies) composes multiple ReviewComment reads/ReviewHistory entries itself rather than this package inventing thread semantics of its own.",
  },
  {
    label: "Color independence",
    text: "ApprovalStep and ApprovalStatus never rely on marker color alone — Approved/Completed use a checkmark, Rejected an X, Changes Requested an alert icon, Cancelled a ban icon, Expired a clock icon with a dashed border, and Cancelled/Expired additionally strike through their own label text.",
  },
];
