export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "When to use Data Grid",
    text: "When rows need any operational behavior beyond static display — search, filtering, sorting, selection, bulk actions, or pagination. DataGrid is the composed, ready-to-use layer; reach for it first for anything queue/list/inventory-shaped.",
  },
  {
    label: "When to use Foundation Table instead",
    text: "When the shape is genuinely bespoke — a comparison matrix, a sticky-first-column reference table, or another one-off layout that doesn't fit DataGrid's column/row/selection model. Compose Table's own pieces directly rather than forcing DataGrid's column-accessor model onto non-tabular data.",
  },
  {
    label: "Performance guidance",
    text: "DataGrid re-renders its full row set on every prop change like any other React list — for the row counts every gallery variant below demonstrates (dozens, not thousands), this is not a concern. It becomes one well before Virtualization is worth building; see Large datasets below.",
  },
  {
    label: "Large datasets",
    text: "DataGridPagination (wrapping Foundation Navigation's Pagination) is the answer today — page the data server- or client-side and only ever pass one page's worth of rows to DataGrid. The Large Dataset Grid gallery variant demonstrates exactly this: 250 rows paged at 10 per page, not 250 DOM rows at once.",
  },
  {
    label: "Virtualization readiness",
    text: "Not built. DataGrid's row rendering is a plain rows.map(...) with no windowing — deliberately, since no real screen has needed to render more rows at once than pagination already handles well. See Future Extensions.",
  },
];
