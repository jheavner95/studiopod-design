export interface FieldDoc {
  id: string;
  name: string;
  purpose: string;
  variants: string[];
  states: string[];
  accessibility: string;
  responsive: string;
  whenToUse: string;
  whenNotToUse: string;
}

export const FIELD_DOCS: FieldDoc[] = [
  {
    id: "input",
    name: "Input",
    purpose: "A single-line text value.",
    variants: ["Text", "Number", "Password", "With leading/trailing icon"],
    states: ["Default", "Focus", "Disabled", "Error", "Success"],
    accessibility: "Native <input> with a real <label>; error status sets aria-invalid via TextInput's own status prop.",
    responsive: "Full width of its FormRow column at every breakpoint — no responsive logic of its own.",
    whenToUse: "Any short, single-line value — names, URLs, short codes.",
    whenNotToUse: "Long-form text — use Textarea. A closed set of choices — use Select or Radio.",
  },
  {
    id: "textarea",
    name: "Textarea",
    purpose: "A multi-line text value.",
    variants: ["Fixed rows", "Resizable"],
    states: ["Default", "Focus", "Disabled", "Error", "Success"],
    accessibility: "Same label/status convention as Input.",
    responsive: "Full width; rows stay fixed across breakpoints unless resizable is set.",
    whenToUse: "Descriptions, notes, anything expected to run more than one line.",
    whenNotToUse: "A single short value — Textarea's extra height reads as an invitation to write more than intended.",
  },
  {
    id: "select",
    name: "Select",
    purpose: "One choice from a closed, known set of options.",
    variants: ["With placeholder option", "Native <select>"],
    states: ["Default", "Focus", "Disabled", "Error", "Success"],
    accessibility: "Native <select> — full keyboard support (type-ahead, arrow keys) comes from the browser, not custom code.",
    responsive: "Full width; the native options list is rendered by the OS, so it always fits the viewport.",
    whenToUse: "A short, known list of options — under ~10 is comfortable in a native select.",
    whenNotToUse: "A large or searchable option set — use Combobox instead.",
  },
  {
    id: "combobox",
    name: "Combobox",
    purpose: "One choice from a large or searchable set of options, found by typing.",
    variants: ["Single-select"],
    states: ["Default", "Focus", "Disabled", "Error", "Open", "No results"],
    accessibility: "ARIA combobox pattern — role=\"combobox\" input plus a role=\"listbox\" popup, arrow-key navigation, Escape to close.",
    responsive: "The dropdown list caps at max-h-56 and scrolls internally rather than overflowing the viewport.",
    whenToUse: "Dozens or hundreds of options — providers, users, any large lookup set.",
    whenNotToUse: "A handful of options — Select's native picker is simpler and needs no custom keyboard handling at all.",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    purpose: "A single independent on/off value, or one item in a multi-select set.",
    variants: ["Standalone", "Indeterminate (parent of a mixed set)"],
    states: ["Default", "Checked", "Indeterminate", "Disabled", "Error"],
    accessibility: "Native checkbox semantics; indeterminate is set via the DOM property, which HTML has no attribute for.",
    responsive: "No responsive behavior of its own — a fixed-size control regardless of viewport.",
    whenToUse: "\"I agree,\" multi-select lists, any independent boolean that isn't strictly on/off in the Switch sense.",
    whenNotToUse: "A setting that takes effect immediately on toggle — see Switch.",
  },
  {
    id: "radio",
    name: "Radio",
    purpose: "One choice from a small, always-visible set of mutually exclusive options.",
    variants: ["Vertical", "Horizontal"],
    states: ["Default", "Checked", "Disabled", "Error"],
    accessibility: "role=\"radiogroup\" on the container; arrow keys move between options, matching native radio-group behavior.",
    responsive: "Vertical orientation is the safer default at narrow widths; horizontal wraps via flex-wrap.",
    whenToUse: "2–5 options where seeing every choice at once helps the decision.",
    whenNotToUse: "More than ~5 options — that's a Select or Combobox instead.",
  },
  {
    id: "switch",
    name: "Switch",
    purpose: "A binary setting that takes effect immediately.",
    variants: ["Standalone", "With helper text"],
    states: ["Default", "Checked", "Disabled", "Error"],
    accessibility: "A native <button role=\"switch\">, not a checkbox — gets Enter/Space toggling for free from button semantics.",
    responsive: "Fixed size at every breakpoint.",
    whenToUse: "Settings that apply immediately (\"Enable notifications\") rather than waiting for a form submit.",
    whenNotToUse: "A value that's part of a larger form submitted together — a plain Checkbox reads more honestly there.",
  },
  {
    id: "slider",
    name: "Slider",
    purpose: "A numeric value chosen from within a bounded range.",
    variants: ["With formatted value label (%, currency, etc.)"],
    states: ["Default", "Focus", "Disabled", "Dragging"],
    accessibility: "Native <input type=\"range\"> — arrow keys, Home/End, and Page Up/Down all work automatically.",
    responsive: "Full width of its column; the thumb's touch target is native and scales with the OS.",
    whenToUse: "A value that's meaningfully bounded and continuous — opacity, volume, a percentage.",
    whenNotToUse: "A precise numeric value a user needs to type exactly — use Input with type=\"number\" instead.",
  },
  {
    id: "date-picker",
    name: "Date Picker",
    purpose: "A calendar date value.",
    variants: ["Single date"],
    states: ["Default", "Focus", "Disabled", "Error"],
    accessibility: "Native <input type=\"date\"> — the browser's own calendar grid provides full keyboard navigation without custom code.",
    responsive: "The calendar popover is rendered by the OS/browser, so it's always positioned correctly for the viewport.",
    whenToUse: "Any real calendar date — schedules, deadlines, birthdates.",
    whenNotToUse: "A relative or approximate time — \"in 3 days\" reads better as a Select of preset options.",
  },
  {
    id: "file-upload",
    name: "File Upload",
    purpose: "Selecting one or more files to attach or import.",
    variants: ["Single file", "Multi-file"],
    states: ["Default", "Drag-over", "Disabled", "Error", "Files attached"],
    accessibility: "The drag-and-drop zone wraps a real, always-present native file input — never drag-only, since drag-and-drop alone excludes keyboard and touch users.",
    responsive: "The drop zone's padding shrinks at narrow widths; file names truncate rather than wrap.",
    whenToUse: "Attaching an existing file — an image, a document, an import.",
    whenNotToUse: "Content the user is creating fresh — that's Textarea or a richer future extension, not a file upload.",
  },
];
