export interface PropertyStateNote {
  state: string;
  note: string;
}

export const PROPERTY_STATES: PropertyStateNote[] = [
  { state: "Read-only", note: "PropertyRow's default — pass value (not editor) and it renders PropertyLabel/PropertyValue, no edit affordance at all." },
  { state: "Editing", note: "The instant a PropertyRow renders an editor instead of value — PropertyEditor's dispatch, or any Foundation Forms field passed directly, matching Inspector Panel's own \"no separate edit-mode toggle\" rule." },
  { state: "Modified", note: "PropertyRow's modified prop shows PropertyReset next to the row — the caller decides what counts as \"modified\" (usually value !== defaultValue), this family doesn't track dirty state itself." },
  { state: "Unsaved", note: "Not a per-row state — a panel-wide concern the caller surfaces via PropertyActions (e.g. a Save button that's disabled until something changed), the same way Inspector Panel never tracked panel-wide dirty state itself either." },
  { state: "Error", note: "Each PropertyEditor variant accepts its own error prop, passed straight through to the underlying Foundation Forms field's own accessibly-announced error message — there's no second, panel-wide error list duplicating what InspectorValidation already does for Inspector Panel." },
  { state: "Warning", note: "Not a distinct built-in state — the same error prop/tone system covers it; a caller wanting a softer warning tone can still use InspectorValidation (re-exported from the same operational/ family) above the sections for a panel-wide summary." },
  { state: "Disabled", note: "Every Property* editor accepts disabled, passed straight through to its underlying Foundation Forms/ui control — never a separate read-only-looking-but-still-clickable fake state." },
  { state: "Loading", note: "Inherited from PropertyPanel (= InspectorPanel) directly — its loading prop swaps the body for Foundation Feedback's LoadingState." },
];
