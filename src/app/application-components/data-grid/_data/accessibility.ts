export interface GridAccessibilityTopic {
  label: string;
  text: string;
}

export const GRID_ACCESSIBILITY_TOPICS: GridAccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "DataGrid renders a native <table> (via Foundation Table), so Tab moves between the header's sortable buttons, each row's selection checkbox, and any interactive cell content in natural DOM order — no custom grid-role keyboard model is layered on top.",
  },
  {
    label: "Row selection",
    text: "TableSelectionCell's Checkbox is a real, individually-labeled <input type=\"checkbox\"> — reachable and toggleable exactly like any other checkbox, including the header's select-all with its native indeterminate state.",
  },
  {
    label: "Header associations",
    text: "Every column renders a real <th scope=\"col\"> (via TableHead), so screen readers announce which column a cell belongs to when navigating row by row — DataGrid never falls back to styled <td>s for headers.",
  },
  {
    label: "Focus",
    text: "Nothing in DataGrid traps or redirects focus — that's the Overlay System's job. DataGridColumnPicker's Popover returns focus to its trigger button on close, the one place this family opens a floating surface.",
  },
  {
    label: "Screen readers",
    text: "DataGrid's required caption prop is announced via Table's visually-hidden <caption> — every real grid must describe what it's a grid of, not just \"table.\"",
  },
  {
    label: "ARIA",
    text: "Sortable columns expose aria-sort (via TableHead), selected rows expose aria-selected (via TableRow), and DataGridEmptyState/DataGridLoadingState replace the body with real <tr>/<td> content rather than an ARIA live region — a grid's row count changing is a content change, not an announcement DataGrid manufactures on top.",
  },
];
