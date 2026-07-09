export interface TableAnatomyRegion {
  id: string;
  name: string;
  purpose: string;
  component: string;
  notes: string;
}

/** The seven regions of the canonical StudioPOD table, top to bottom — Footer and Console-style regions are optional, everything else is expected on every real table. */
export const TABLE_ANATOMY_REGIONS: TableAnatomyRegion[] = [
  {
    id: "toolbar",
    name: "Toolbar",
    purpose: "Search, filters, and view controls above the table — or a bulk-action bar once rows are selected.",
    component: "TableToolbar",
    notes: "Optional. A table with no filtering or bulk actions (a small, fixed reference list) can skip it entirely.",
  },
  {
    id: "header",
    name: "Header",
    purpose: "Column labels, sticky by default so they stay visible while rows scroll beneath them.",
    component: "TableHeader + TableHead",
    notes: "Sortable columns live here — TableHead owns the sort icon and click handler, not the row beneath it.",
  },
  {
    id: "rows",
    name: "Rows",
    purpose: "One row per record — selectable, clickable, or both depending on the table's variant.",
    component: "TableBody + TableRow",
    notes: "A row's selected/interactive state is visual only; the actual selection state lives with whoever renders the table, not inside TableRow.",
  },
  {
    id: "cells",
    name: "Cells",
    purpose: "The general-purpose cell — text, numbers, dates, anything without a more specific cell type.",
    component: "TableCell",
    notes: "Reads density (comfortable/compact/dense) from the Table it's inside, so padding never has to be repeated per cell.",
  },
  {
    id: "status",
    name: "Status",
    purpose: "A dedicated column for the record's status, rendered as a Badge rather than buried in a text cell.",
    component: "TableStatusCell",
    notes: "Gets its own anatomy region specifically so status stays scannable down the whole column, not just readable one row at a time.",
  },
  {
    id: "actions",
    name: "Actions",
    purpose: "Row-level triggers, right-aligned and capped at 2–3 visible actions.",
    component: "TableActionCell",
    notes: "A row needing more than 3 actions belongs behind a Menu (see Foundation Components) triggered from this same cell, not a wider action column.",
  },
  {
    id: "footer",
    name: "Footer",
    purpose: "Totals or pagination controls, rendered outside the scrolling row count.",
    component: "TableFooter",
    notes: "Optional, and the least common region — most StudioPOD tables paginate from the Toolbar or don't paginate at all.",
  },
];
