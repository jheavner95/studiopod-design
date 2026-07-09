export interface FieldStateDoc {
  id: string;
  name: string;
  behavior: string;
}

export const FIELD_STATE_DOCS: FieldStateDoc[] = [
  { id: "default", name: "Default", behavior: "Resting appearance — border-border, no status color." },
  { id: "hover", name: "Hover", behavior: "A subtle border-strength change on interactive controls (Button, Checkbox, ToggleSwitch) — text inputs don't change on hover, only on focus." },
  { id: "focus", name: "Focus", behavior: "focus-ring on every control — a visible outline, never suppressed, satisfying keyboard-visibility on its own." },
  { id: "disabled", name: "Disabled", behavior: "opacity-40 plus cursor-not-allowed; the native disabled attribute is always set, not just styled to look disabled." },
  { id: "read-only", name: "Read Only", behavior: "Not yet a distinct visual state in any *Field component — today, read-only information is a job for Foundation Metadata, not a Form field in a read-only mode. See Implementation Guidance." },
  { id: "required", name: "Required", behavior: "RequiredIndicator's red asterisk appended to the label — never conveyed by placeholder text alone." },
  { id: "optional", name: "Optional", behavior: "The absence of RequiredIndicator — StudioPOD doesn't label optional fields explicitly, since required is the marked exception, not the default." },
  { id: "error", name: "Error", behavior: "status=\"error\" on the base control (red border) plus a FieldError below with role=\"alert\" — blocking, assertively announced." },
  { id: "warning", name: "Warning", behavior: "FieldError's tone=\"warning\" — amber, role=\"status\" (polite, not assertive) — non-blocking." },
  { id: "success", name: "Success", behavior: "status=\"success\" on the base control (green border) — confirms a value passed validation, most useful for async-checked fields (username availability, etc.)." },
  { id: "loading", name: "Loading", behavior: "Not a built-in status on the base inputs today — an async-validating field composes its own spinner alongside the control (see SearchInput's own loading prop for the established pattern) until a shared loading state lands as a Future Extension." },
];
