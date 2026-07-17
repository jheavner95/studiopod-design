export interface MetadataComponentDoc {
  id: string;
  name: string;
  purpose: string;
  whenToUse: string;
  whenNotToUse: string;
  accessibility: string;
  responsive: string;
}

export const METADATA_COMPONENTS: MetadataComponentDoc[] = [
  {
    id: "metadata-row",
    name: "Metadata Row",
    purpose: "A single standalone label/value pairing, usable outside a full list.",
    whenToUse: "One or two facts inside a Card or a custom layout that doesn't warrant a full DescriptionList.",
    whenNotToUse: "Three or more related rows — use DescriptionList so screen readers get real list semantics instead of composing several separate MetadataRows.",
    accessibility: "Renders as a real <dl>/<dt>/<dd> (DS-5F) — the dt/dd wrappers add no layout footprint of their own, so it still looks and behaves like the row it always did, just with a real label-value association now. Reach for DescriptionList once there's more than one row to associate as a single list.",
    responsive: "responsive layout (the default) stacks below sm: and sits side by side from sm: up, matching DescriptionList's own row exactly.",
  },
  {
    id: "metadata-group",
    name: "Metadata Group",
    purpose: "A titled vertical group of MetadataRows or other metadata content.",
    whenToUse: "Grouping a handful of related facts under one heading inside an Inspector or Card.",
    whenNotToUse: "A full properties grid — use PropertyGroup, which lays fields out in columns instead of a single stack.",
    accessibility: "The title is a visual heading only; give it a real heading element via className/as if it needs to appear in the document outline.",
    responsive: "No responsive behavior of its own — a vertical Stack reads the same at every width.",
  },
  {
    id: "property-group",
    name: "Property Group",
    purpose: "A titled grid of MetadataFields — the read-only counterpart to a Property Editor's own field grid.",
    whenToUse: "Several short properties that benefit from being scanned in columns (Type, Owner, Created, Size).",
    whenNotToUse: "Properties with long, unpredictable values — those read better as full-width MetadataRows in a DescriptionList.",
    accessibility: "Fields are plain divs, not form controls — screen readers announce label and value in sequence, not as a labelled input.",
    responsive: "Grid's own column collapse applies — a 2-column PropertyGroup becomes 1 column below sm:.",
  },
  {
    id: "description-list",
    name: "Description List",
    purpose: "A bordered card of label/value rows with real dl/dt/dd semantics — re-exported from the Foundation Layout system.",
    whenToUse: "Any list of three or more related facts — Accessibility sections, Inspector identity, read-only property lists.",
    whenNotToUse: "A single fact — use MetadataRow instead of wrapping one row in a full dl.",
    accessibility: "Native dl/dt/dd gives label/value association for free — see Foundation Layout's own Accessibility section for the full guidance.",
    responsive: "\"responsive\" (default) stacks on mobile, side by side from sm: up; \"stacked\" and \"two-column\" are always one or the other.",
  },
  {
    id: "identity-block",
    name: "Identity Block",
    purpose: "Icon, name, type, and an optional quick-status Badge — the first thing metadata always shows.",
    whenToUse: "The top of any Inspector, Card, or detail view — anywhere a user needs to confirm what they're looking at.",
    whenNotToUse: "A dense table row — Foundation Table's own TableStatusCell and TableCell already cover that context.",
    accessibility: "The icon is decorative (aria-hidden); name and type carry the accessible meaning as real text.",
    responsive: "Name and type truncate rather than wrap, keeping Identity a single compact line at every width.",
  },
  {
    id: "relationship-list",
    name: "Relationship List",
    purpose: "A list of linked/related objects, each optionally navigable.",
    whenToUse: "An Inspector's own Relationships region, or any \"linked items\" list.",
    whenNotToUse: "A single related object — a plain Link communicates that more directly than a one-item list.",
    accessibility: "Each linked item is a real <Link>; unlinked items render as plain rows rather than fake, unclickable link styling.",
    responsive: "Labels truncate on narrow widths rather than wrapping, keeping each row a single scannable line.",
  },
  {
    id: "status-summary",
    name: "Status Summary",
    purpose: "One or more status Badges for a single object.",
    whenToUse: "Any place an object's own state needs to be visible — a Card header, an Identity Block's status slot, a dashboard row.",
    whenNotToUse: "Workspace-wide status — that's Operational Status's own Workspace Status region, not an object-level Status Summary.",
    accessibility: "Text carries the meaning; tone (color) is reinforcement only, matching every other status surface in this design system.",
    responsive: "Wraps via Inline rather than overflowing when an object has several statuses at once.",
  },
  {
    id: "health-summary",
    name: "Health Summary",
    purpose: "A passive grid of health indicators, dot + label + detail per metric.",
    whenToUse: "Summarizing the health of systems an object or workspace depends on, at a glance.",
    whenNotToUse: "A single health value — a StatusSummary Badge is lighter weight for one metric.",
    accessibility: "The color dot is decorative; the state is stated in words in the detail line, never color alone.",
    responsive: "Grid's own column collapse applies, same as PropertyGroup.",
  },
  {
    id: "stat-group",
    name: "Stat Group",
    purpose: "A Grid of StatCards for a handful of numeric metrics.",
    whenToUse: "Dashboard summaries and platform overview pages showing 2–6 headline numbers.",
    whenNotToUse: "A single number in running text — a Stat Group is for a dedicated metrics row, not inline prose.",
    accessibility: "Each StatCard's value and label are both in the accessible text — a number alone announces nothing.",
    responsive: "Grid's own column collapse applies — a 4-column Stat Group becomes 2, then 1, at narrower widths.",
  },
  {
    id: "tag-collection",
    name: "Tag Collection",
    purpose: "A wrapping group of tags, rendered as Badges via Cluster.",
    whenToUse: "User- or system-assigned labels attached to an object — distinct from its Status.",
    whenNotToUse: "More than a handful of tags in a dense table row — Foundation Table doesn't have a dedicated tag cell yet.",
    accessibility: "Each tag is plain text in a Badge — no interaction, so no additional accessible name is needed today.",
    responsive: "Always wraps via Cluster — never scrolls or truncates the collection itself.",
  },
  {
    id: "empty-metadata",
    name: "Empty Metadata",
    purpose: "A centered placeholder for a metadata region with nothing to show — the non-tabular counterpart to Foundation Table's own TableEmptyState.",
    whenToUse: "An Inspector or detail panel whose metadata region has no data yet (a new, unconfigured object).",
    whenNotToUse: "A table's own empty state — use TableEmptyState so the empty row stays inside real table structure.",
    accessibility: "Plain text content in document flow — a screen reader reading the region encounters the message in the normal reading order.",
    responsive: "No responsive behavior of its own — the dashed border and centered content read the same at every width.",
  },
  {
    id: "loading-metadata",
    name: "Loading Metadata",
    purpose: "Skeleton rows for a metadata region while its data loads — reuses the same Skeleton primitive Foundation Table's own TableLoadingState uses.",
    whenToUse: "Any metadata region (Inspector, Card, detail panel) that fetches its content asynchronously.",
    whenNotToUse: "A table's own loading state — use TableLoadingState so skeleton rows stay inside real table structure.",
    accessibility: "Plain Skeleton blocks with no ARIA busy/live wiring — pair with a surrounding region's own loading announcement if one is needed.",
    responsive: "No responsive behavior of its own.",
  },
];
