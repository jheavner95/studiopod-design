export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  { label: "When to use tables", text: "Structured records with the same shape, compared across more than a handful of instances — a job queue, an asset library, or any dataset where every row shares the same columns." },
  { label: "When NOT to use tables", text: "A single record's own detail (use Description List), a small fixed set of options (use List or Cluster), or content that's fundamentally visual rather than tabular (use Grid)." },
  { label: "Preferred row density", text: "comfortable by default; compact for admin/reference lists; dense only for genuinely high-volume operational triage (queues, logs) where scanning many rows outweighs breathing room." },
  { label: "Maximum action count", text: "2–3 visible actions per row via TableActionCell. A fourth action means the row needs a Menu, not a wider action column." },
  { label: "Status placement", text: "Status gets its own TableStatusCell column, positioned early (left of center) so it's visible without scrolling on a wide table." },
  { label: "Selection model", text: "Row checkboxes plus a header select-all with indeterminate support is the selection model Table supports — there's no radio-style single-select variant, since no common use case needs one." },
  { label: "Virtualization guidance", text: "Recommended once a table regularly exceeds a few hundred rows — see Virtualized Table in Future Extensions. Below that, a plain table without virtualization is simpler and fast enough." },
];
