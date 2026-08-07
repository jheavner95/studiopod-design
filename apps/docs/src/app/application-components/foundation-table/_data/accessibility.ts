export interface TableAccessibilityTopic {
  label: string;
  text: string;
}

export const TABLE_ACCESSIBILITY_TOPICS: TableAccessibilityTopic[] = [
  { label: "Keyboard navigation", text: "Every interactive cell (checkbox, sort button, action button) is a real focusable element — Tab moves through them in DOM order, matching visual left-to-right, top-to-bottom order." },
  { label: "Screen readers", text: "The native <table>/<thead>/<tbody>/<th scope> structure gives row/column association for free — no ARIA table role reimplementation needed on top of it." },
  { label: "ARIA", text: "aria-sort on a sortable TableHead, aria-selected on a selected TableRow, aria-label on every TableSelectionCell checkbox naming its specific row." },
  { label: "Sorting", text: "TableHead's sort control is a real <button>, not a clickable <th> — a mouse-only clickable header cell is unreachable by keyboard." },
  { label: "Selection", text: "Select-all uses the Checkbox's own indeterminate state when some, not all, rows are selected — never a plain checked/unchecked binary that lies about partial selection." },
  { label: "Focus", text: "Selecting a row never moves focus away from the checkbox or row that was just interacted with — consistent with Operational Status's own 'never steal focus' rule." },
  { label: "Sticky regions", text: "TableHeader's sticky positioning is visual only — it doesn't trap focus or alter tab order, so keyboard navigation through a long table works exactly as it would without stickiness." },
];
