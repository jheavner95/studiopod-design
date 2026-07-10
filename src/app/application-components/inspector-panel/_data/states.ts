export interface InspectorStateNote {
  state: string;
  note: string;
}

export const INSPECTOR_STATES: InspectorStateNote[] = [
  { state: "Loading", note: "InspectorPanel's loading prop swaps the body for Foundation Feedback's LoadingState — the header and footer stay put so the panel's shape doesn't shift." },
  { state: "Empty", note: "InspectorPanel's emptyState prop swaps the body for Foundation Feedback's EmptyState — nothing is selected yet, distinct from a selected object that failed to load." },
  { state: "Read-only", note: "InspectorProperty's read mode (label/value via MetadataField) is the default for any field the caller doesn't pass an edit control for — there's no panel-wide read-only toggle, each property decides independently." },
  { state: "Editing", note: "A property is editing the instant its InspectorProperty renders a Foundation Forms field as children instead of a label/value pair — matching the Inspector Workspace's own \"no separate edit-mode toggle\" guidance." },
  { state: "Validation Errors", note: "InspectorValidation renders Foundation Feedback's ValidationSummary, which escalates to role=\"alert\" the instant any item's severity is \"error\"." },
  { state: "Warnings", note: "The same InspectorValidation, with every item at severity \"warning\" — role=\"status\" instead, non-blocking." },
  { state: "Success", note: "InspectorValidation's emptyMessage prop renders a tone=\"success\" Alert once every item clears — an explicit, deliberate state a caller opts into rather than InspectorValidation defaulting to it." },
  { state: "Busy", note: "Not a distinct built-in state — a caller mid-save typically disables InspectorActions' buttons directly (Button's own loading prop) rather than InspectorPanel introducing a second, panel-wide busy flag on top." },
];
