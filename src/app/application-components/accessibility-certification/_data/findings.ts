export type FindingCategory = "aria" | "keyboard" | "touch" | "other";

export interface FindingEntry {
  title: string;
  tier: "Foundation" | "Operational";
  file: string;
  line?: number;
  category: FindingCategory;
  detail: string;
}

/**
 * Every finding from the Foundation and Operational accessibility/interaction
 * audit, reclassified into Resolved / Deferred / Rejected. Per this package's
 * own instruction, no speculative issues — every entry below traces to a
 * specific file:line, and every Resolved entry was independently
 * re-verified present in the current source during this certification (not
 * just trusted from the audit's own claim). No finding is marked Resolved
 * that verification could not confirm.
 */
export const RESOLVED: FindingEntry[] = [
  {
    title: "False \"richest accessibility wiring\" claim in the Foundation inventory",
    tier: "Foundation",
    file: "src/app/application-components/foundation-audit/_data/inventory.ts",
    line: 38,
    category: "other",
    detail: "Docs claimed Table has \"the richest accessibility wiring of any family\" — grep-verified false (0 onKeyDown handlers, 0 explicit role= attributes in components/table/, versus 6 onKeyDown + 13 role= in overlay/ and 2 onKeyDown + 16 role= in navigation/). Rewritten to state Table has the least custom interaction wiring of any family by design, with the grep counts cited. Re-verified present in the current file.",
  },
  {
    title: "Same false superlative repeated in the Foundation certification reasoning",
    tier: "Foundation",
    file: "src/app/application-components/foundation-audit/_data/certification.ts",
    line: 41,
    category: "other",
    detail: "The Certified reasoning bullet repeated the same false claim, contradicting the file's own later note that Table's sortable headers need \"no custom keyboard handling to audit.\" Corrected to match the grep-verified reality. Re-verified present in the current file.",
  },
  {
    title: "Tooltip label never reached screen readers",
    tier: "Foundation",
    file: "src/components/overlay/Tooltip.tsx",
    line: 25,
    category: "aria",
    detail: "role=\"tooltip\" content had no id and the trigger had no aria-describedby, so the label reached sighted hover/focus users only. Fixed with a useId() content id plus cloneElement on the trigger to merge in aria-describedby, preserving any caller-supplied aria-describedby. Re-verified present: Tooltip.tsx now imports cloneElement/isValidElement/useId and computes contentId/describedBy.",
  },
  {
    title: "Collapsed nav items had an empty accessible name",
    tier: "Foundation",
    file: "src/components/navigation/NavigationItem.tsx",
    line: 54,
    category: "aria",
    detail: "Icon-only collapsed nav items relied solely on Tooltip for a label, but Tooltip only ever added a visual/hover description, not an accessible name — every collapsed item had an empty accessible name. Fixed with aria-label={accessibleLabel} directly on the Link/button, independent of the Tooltip wrapper. Re-verified present on both the Link and button render paths.",
  },
  {
    title: "Canonical Tooltip demo modeled the icon-button-with-no-name defect",
    tier: "Foundation",
    file: "src/app/application-components/foundation-overlays/_components/OverlayGallery.tsx",
    line: 150,
    category: "aria",
    detail: "The Tooltip demo's icon-only trigger button had no aria-label and no aria-hidden on its icon — the canonical usage example modeled the exact defect found in Tooltip/NavigationItem. Fixed with aria-label on the button and aria-hidden on the decorative Info icon. Re-verified present in the current TooltipDemo render.",
  },
  {
    title: "Popover had no way to name itself for screen readers",
    tier: "Foundation",
    file: "src/components/overlay/Popover.tsx",
    line: 11,
    category: "aria",
    detail: "Popover renders role=\"dialog\" aria-modal=\"true\" but had no labelledBy or aria-label prop, unlike Dialog/Drawer. Fixed with optional labelledBy and aria-label props matching Dialog's naming convention, wired to aria-labelledby/aria-label on the content div; the foundation-overlays docs demo now passes aria-label as an example. Re-verified present. Two out-of-scope consumers (src/components/operational/FilterPopover.tsx, DataGridColumnPicker.tsx) still don't pass either prop — tracked as a Remaining Blocker below rather than left silently unresolved.",
  },
  {
    title: "Table's horizontal-scroll container was not a keyboard stop",
    tier: "Foundation",
    file: "src/components/layout/ScrollArea.tsx",
    line: 21,
    category: "keyboard",
    detail: "overflow-x-auto/overflow-y-auto had no tabIndex, so a keyboard-only user had no way to scroll a region whose content has no focusable descendant early enough to pull it into view (e.g. a wide table with plain-text first columns). Fixed with tabIndex={0} plus the shared focus-ring class. Re-verified present in the current file.",
  },
  {
    title: "ValidationSummary re-derived the error/warning role split locally",
    tier: "Foundation",
    file: "src/components/form/ValidationSummary.tsx",
    line: 33,
    category: "other",
    detail: "Re-derived errorCount > 0 ? \"alert\" : \"status\" locally instead of reusing the shared feedbackRole(tone) helper FieldError already consolidates onto, risking drift. Fixed by importing feedbackRole from @/components/feedback/Alert and calling it. Re-verified present in the current file.",
  },
  {
    title: "PropertyColor's hex input had no accessible name",
    tier: "Operational",
    file: "src/components/operational/PropertyColor.tsx",
    line: 41,
    category: "aria",
    detail: "The hex-value text input had no id/htmlFor, aria-label, or aria-labelledby (only the adjacent color-swatch input was associated with the visible label). Fixed with a visually-hidden span (id={hexLabelId}) and aria-labelledby on the text input, following RadioGroup.tsx's existing id-reference pattern. Verified live in the browser: both \"Accent color\" and \"Tag color\" hex inputs compute an accessible name of \"<Label> hex value.\" Re-verified present in the current file.",
  },
  {
    title: "GlobalSearchDemo never wired SearchSuggestions' required keyboard model",
    tier: "Operational",
    file: "src/app/application-components/filter-search/_components/FilterSearchGallery.tsx",
    line: 106,
    category: "keyboard",
    detail: "SearchSuggestions' own docstring requires the caller to provide the ArrowUp/ArrowDown/Enter/Escape model, but the demo only wired onMouseDown — suggestions were mouse-only. Fixed with activeId state and a handleKeyDown on the wrapping div (native keydown bubbles up from SearchField's inner input). Verified live: ArrowDown moves aria-selected, Enter commits and closes, Escape closes while preserving the typed query. Re-verified present in the current file.",
  },
];

export const DEFERRED: FindingEntry[] = [
  {
    title: "TableRow's shift-click range select has no keyboard equivalent",
    tier: "Foundation",
    file: "src/components/table/TableRow.tsx",
    line: 14,
    category: "keyboard",
    detail: "Used by the real SelectionDemo docs page, but the row itself isn't focusable and has no onKeyDown, so Shift+click range selection is mouse-only. Not fixed: the core row-toggle already has a full keyboard equivalent via the native checkbox in TableSelectionCell (Space toggles it), so this doesn't fail WCAG 2.1.1 outright — only the range-select shortcut lacks a keyboard path. A fix would mean inventing new keyboard semantics (e.g. Shift+Space or Shift+Arrow range-extend) not defined anywhere in this design system — feature work beyond an accessibility refinement pass. Recorded as a known, low-severity gap. Re-verify: whether a keyboard range-select convention gets defined and added to TableRow.",
  },
  {
    title: "TableRow's onClick is mouse/pointer-only for DataGrid and Queue row activation",
    tier: "Operational",
    file: "src/components/table/TableRow.tsx",
    line: 16,
    category: "keyboard",
    detail: "TableRow's onClick is wired only to the native <tr>'s onClick — no tabIndex, role, or onKeyDown — so DataGrid.tsx:111 (onRowClick) and Queue.tsx:103 / QueueRow.tsx:31 (onRowClick) are mouse/pointer-only; keyboard users cannot activate a row. Real, read-verified defect, but the fix belongs in src/components/table/TableRow.tsx, which is Foundation-tier and outside this task's edit scope (src/components/operational/ only) — TableRow doesn't forward extra props, so no operational-layer workaround exists. A follow-up task (task_4992b678) was spawned with exact file:line references rather than left untracked. Re-verify: whether that follow-up has landed a fix in TableRow.tsx.",
  },
  {
    title: "Queue/Job status updates have no live-region announcement",
    tier: "Operational",
    file: "src/components/operational/QueueRow.tsx",
    line: 27,
    category: "aria",
    detail: "QueueStatus, JobProgress, and BulkProgress update visually (color, text, progress bar) with no aria-live announcement — demonstrated live in queue-jobs/_components/QueueJobsGallery.tsx's LiveQueueDemo, where JobProgress advances every 500ms with nothing but DOM text changing. This should likely use the useAnnounce() primitive (src/components/feedback/LiveRegion.tsx, confirmed to exist — see pre-session fixes) but wiring it is a separate phase per this session's own instructions — disclosed, not fixed. Re-verify: whether useAnnounce() has been wired into these components once that phase runs.",
  },
  {
    title: "Dashboard widget value changes have no live-region announcement",
    tier: "Operational",
    file: "src/components/operational/MetricCard.tsx",
    line: 49,
    category: "aria",
    detail: "MetricCard/KPIWidget/TrendWidget/ChartWidget/StatusWidget (exercised by DashboardWidgetsGallery.tsx's refreshable ExecutiveDashboardDemo) convey value changes only through re-rendered text/visuals, with no non-visual notification for a screen-reader user not focused on the region. Same underlying gap as the Queue/Job finding above — needs useAnnounce(), separate phase — disclosed, not fixed. DashboardSection's own loading transition is already announced correctly via LoadingState's role=\"status\"; only the post-refresh value change is unaddressed. Re-verify: whether useAnnounce() has been wired into these components once that phase runs.",
  },
  {
    title: "Several icon-only affordances fall under the WCAG 2.5.8 AA 24×24 CSS px target size",
    tier: "Operational",
    file: "src/components/operational/PropertyReset.tsx",
    line: 18,
    category: "touch",
    detail: "PropertyReset (~22px: size-3.5 icon plus p-1 padding, no min-h/min-w), SavedFilter's delete button (~20px), SearchHistory's remove button (~22px), and FilterChip's remove button (~20px) all fall under the WCAG 2.5.8 AA 24×24 CSS px minimum target size. Re-verified PropertyReset.tsx's current markup matches this description (no minimum size applied). No fix status was recorded for this item in the audit input — treated as unconfirmed rather than assumed resolved, per this package's own rule that unconfirmed fixes are marked Deferred, not Resolved. Re-verify: measured sizes for all four affordances and a remediation pass (e.g. a shared min-h-6 min-w-6 utility) once scheduled.",
  },
];

/**
 * No finding from either tier's audit was investigated and refuted this
 * pass — every finding above traces to a real, source-verified defect that
 * was either fixed (Resolved) or is a real, disclosed gap intentionally not
 * fixed yet (Deferred). This is a stronger outcome than assuming a
 * placeholder Rejected entry belongs here; an empty bucket is reported
 * honestly rather than padded.
 */
export const REJECTED: FindingEntry[] = [];

export const FINDINGS_METHODOLOGY_NOTE =
  "Every finding below traces to a specific file:line from the Foundation and Operational accessibility/interaction audits. Every Resolved entry was independently re-verified present in the current source during this certification — re-reading the actual file, not trusting the audit's own \"fixed\" claim. Every Deferred entry is a real, verified gap with an explicit note on why it wasn't fixed in this pass and what to re-verify before it can move to Resolved. No finding is marked Resolved that this verification could not confirm, and no speculative issues were added beyond what the two tier audits actually found.";
