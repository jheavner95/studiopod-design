export interface CellType {
  id: string;
  name: string;
  alignment: string;
  wrapping: string;
  truncation: string;
  accessibility: string;
}

export const CELL_TYPES: CellType[] = [
  {
    id: "text",
    name: "Text",
    alignment: "Left — the default for TableCell.",
    wrapping: "Wraps by default (min-w-0 break-words); the common case for names and descriptions.",
    truncation: "Only when a column has a hard width constraint — pair truncate with a title attribute so the full value is still available.",
    accessibility: "No special handling — a plain text node reads naturally.",
  },
  {
    id: "number",
    name: "Number",
    alignment: "Right — so digits line up vertically down the column for comparison.",
    wrapping: "nowrap — a number that wraps mid-value is unreadable.",
    truncation: "Never — a truncated number is a wrong number. Widen the column instead.",
    accessibility: "Include the unit in the accessible text (\"24 jobs\", not just \"24\") when the column header alone doesn't make it obvious.",
  },
  {
    id: "date",
    name: "Date",
    alignment: "Left, matching Text.",
    wrapping: "nowrap — a fixed-format date shouldn't break across two lines.",
    truncation: "Never — prefer a shorter format (relative time, \"3d ago\") over truncating an absolute date.",
    accessibility: "A relative label (\"3 days ago\") should carry the absolute date in a title attribute for precision on demand.",
  },
  {
    id: "status",
    name: "Status",
    alignment: "Left, rendered via TableStatusCell rather than a plain TableCell.",
    wrapping: "N/A — a Badge doesn't wrap internally.",
    truncation: "Never — status labels are short and fixed by design.",
    accessibility: "Tone (color) is never the only signal — the label text itself states the status.",
  },
  {
    id: "badge",
    name: "Badge",
    alignment: "Left or center depending on the column's semantic weight.",
    wrapping: "N/A, same as Status.",
    truncation: "Never.",
    accessibility: "Same rule as Status — text carries the meaning, tone reinforces it.",
  },
  {
    id: "progress",
    name: "Progress",
    alignment: "Left, typically paired with a percentage label.",
    wrapping: "N/A — a fixed-width fill bar.",
    truncation: "N/A.",
    accessibility: "Use the Progress foundation component's own role=\"progressbar\" with aria-valuenow — never a bare styled div.",
  },
  {
    id: "avatar",
    name: "Avatar",
    alignment: "Left, usually paired with a name in the same cell.",
    wrapping: "N/A — fixed circular size.",
    truncation: "N/A.",
    accessibility: "The accessible name belongs to the person/team, not the image — see the Avatar entry in Foundation Components.",
  },
  {
    id: "icon",
    name: "Icon",
    alignment: "Center, when the icon is the cell's only content.",
    wrapping: "N/A.",
    truncation: "N/A.",
    accessibility: "aria-hidden with a text alternative elsewhere in the row — an icon-only cell with no accessible name announces nothing.",
  },
  {
    id: "actions",
    name: "Actions",
    alignment: "Right, via TableActionCell.",
    wrapping: "nowrap (wrap={false} on the Inline actions sit in) — actions never wrap onto a second line.",
    truncation: "N/A — actions are icons/short labels, not truncatable text.",
    accessibility: "Every action button has its own accessible label — never rely on row context alone.",
  },
  {
    id: "selection",
    name: "Selection",
    alignment: "Left, fixed narrow width, via TableSelectionCell.",
    wrapping: "N/A.",
    truncation: "N/A.",
    accessibility: "Each checkbox's aria-label names the specific row (\"Select Homepage Banner\"), not a generic \"Select row.\"",
  },
  {
    id: "relationship",
    name: "Relationship",
    alignment: "Left, usually a link or count (\"3 linked assets\").",
    wrapping: "Wraps like Text when it's a name; nowrap when it's a count.",
    truncation: "Only for a long linked-object name, same rule as Text.",
    accessibility: "A relationship link needs a distinguishing accessible name beyond \"View\" if more than one appears in the same row.",
  },
  {
    id: "health",
    name: "Health",
    alignment: "Left or center, typically an indicator plus a short label.",
    wrapping: "N/A.",
    truncation: "N/A.",
    accessibility: "Matches Status — severity is stated in words (\"Degraded\"), never color alone, echoing Operational Status's own Diagnostics guidance.",
  },
];
