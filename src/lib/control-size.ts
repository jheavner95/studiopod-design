/**
 * DS-5M — the canonical owner of the form-control size scale.
 *
 * `src/lib` is the dependency graph's floor (zero internal dependencies), the
 * same pattern `src/lib/tone.ts` (DS-5B) and `src/lib/spacing.ts` (DS-5A)
 * established, so every control imports the scale from here instead of each
 * declaring its own.
 *
 * DS-5L's finding: a size scale was already canonical vocabulary in this system
 * — `Button` (sm/md/lg), `Badge` (sm/md), `Dialog` (sm/md/full) — and the form
 * family was the sole outlier, with `TextInput`/`Checkbox` even omitting the
 * native `size` attribute without offering one of their own. That made every
 * dense, operational usage (toolbars, filter bars, table rows) unreachable.
 *
 * `sm` deliberately lands on **h-8**, the exact height `Button`'s own `sm`
 * renders, so a control and a button sitting in the same toolbar row line up
 * without either side hand-tuning. `md` preserves the original
 * padding-driven sizing byte for byte — it is the default, so no existing
 * consumer changes.
 *
 * Every value is a complete, statically written class string so Tailwind's
 * build-time scanner generates it (the dynamic-string hazard engineering note
 * 15 documents).
 */

/** The two operational densities. `md` is the default and matches pre-DS-5M rendering. */
export type ControlSize = "sm" | "md";

/**
 * DS-5P — the four-step scale for things that are a *glyph* rather than a
 * control: an icon button's footprint, a spinner. It extends `ControlSize`
 * downward (`xs`) and upward (`lg`) because dense table hover-actions and
 * table-overlay spinners demonstrably need those steps (DS-5L's "design
 * around demonstrated need"), while keeping the same four names the rest of
 * the system already uses — no component invents its own vocabulary.
 *
 * `IconButtonSize` is an alias of this type, not a second declaration.
 * Per-component pixel maps still differ (an icon button's glyph is sized
 * relative to its button footprint; a bare spinner is sized absolutely), so
 * the *scale* is shared here while each map stays with its component's
 * concern — the same split `CONTROL_TAB_CLASSES` vs `CONTROL_SEGMENT_CLASSES`
 * already uses.
 */
export type GlyphSize = "xs" | "sm" | "md" | "lg";

/**
 * `Spinner`'s glyph. Absolute sizes, since a bare spinner is dropped into a
 * caller-owned row rather than sized by a parent control: `xs` 12px for a
 * dense inline activity dot, `sm` 14px beside caption text, `md` 16px (the
 * default) beside body text, `lg` 24px for a region or table overlay.
 */
export const CONTROL_SPINNER_CLASSES: Record<GlyphSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-6",
};

/**
 * The bordered single-line frame `TextInput`/`SearchInput` render around their
 * input. `sm` pins an explicit h-8; `md` keeps the original padding-driven
 * height (no explicit height) so it renders exactly as before.
 */
export const CONTROL_FRAME_CLASSES: Record<ControlSize, string> = {
  sm: "h-8 gap-1.5 px-2.5",
  md: "gap-2 px-3",
};

/** The `<input>` inside that frame — `sm` takes its height from the frame, `md` from its own padding. */
export const CONTROL_FRAME_INPUT_CLASSES: Record<ControlSize, string> = {
  sm: "py-0 text-caption",
  md: "py-2 text-body-sm",
};

/** A native `<select>`, which carries its own border and height (no frame element). */
export const CONTROL_SELECT_CLASSES: Record<ControlSize, string> = {
  sm: "h-8 pl-2.5 pr-8 text-caption",
  md: "py-2 pl-3 pr-9 text-body-sm",
};

/** Extra left padding when a select/combobox renders a leading icon. */
export const CONTROL_LEADING_ICON_PADDING: Record<ControlSize, string> = {
  sm: "pl-8",
  md: "pl-9",
};

/** `<textarea>` — deliberately no fixed height (its `rows` governs), so size drives padding and text only. */
export const CONTROL_TEXTAREA_CLASSES: Record<ControlSize, string> = {
  sm: "px-2.5 py-1.5 text-caption",
  md: "px-3 py-2 text-body-sm",
};

/** The checkbox's visual box. */
export const CONTROL_BOX_CLASSES: Record<ControlSize, string> = {
  sm: "size-4",
  md: "size-5",
};

/** The check/indeterminate glyph inside that box. */
export const CONTROL_BOX_GLYPH_CLASSES: Record<ControlSize, string> = {
  sm: "size-3",
  md: "size-3.5",
};

/** ToggleSwitch track and thumb, with the thumb's off/on travel. */
export const CONTROL_SWITCH_CLASSES: Record<ControlSize, { track: string; thumb: string; off: string; on: string }> = {
  sm: { track: "h-5 w-9", thumb: "size-3.5", off: "translate-x-0.5", on: "translate-x-5" },
  md: { track: "h-6 w-10", thumb: "size-4", off: "translate-x-1", on: "translate-x-5" },
};

/**
 * Sizes whatever icon a consumer drops into a leading/trailing slot, so a
 * toolbar-density control never gets a form-density icon. Targets the svg
 * child rather than the slot itself — the consumer passes `<Search />`, not a
 * pre-sized element. `md` resolves to size-4, the size consumers already pass,
 * so existing usage is unchanged.
 */
export const CONTROL_ICON_SLOT_CLASSES: Record<ControlSize, string> = {
  sm: "[&_svg]:size-3.5",
  md: "[&_svg]:size-4",
};

/** The chevron a select/combobox overlays on its right edge. */
export const CONTROL_CHEVRON_CLASSES: Record<ControlSize, string> = {
  sm: "right-2 size-3.5",
  md: "right-3 size-4",
};

/**
 * DS-5O — navigation joins the same scale. A `Tab` is a bottom-bordered button,
 * so its height is padding + line-height + the 2px underline: `sm` computes to
 * 8 + 18.2 + 2 ≈ **28px** (the operational density workspace headers and
 * inspector tabs use), and `md` preserves the original
 * `px-3 py-2 text-body-sm` rendering byte for byte.
 */
export const CONTROL_TAB_CLASSES: Record<ControlSize, string> = {
  sm: "px-2.5 py-1 text-caption",
  md: "px-3 py-2 text-body-sm",
};

/**
 * DS-5P — `EmptyState`'s density. `md` reproduces the pre-DS-5P rendering
 * exactly (a `size-11` icon badge, `py-10`); `sm` is the operational density
 * every dense surface needs — inspectors, table regions, library panels and
 * console cards — landing the icon badge at 28px.
 */
export const CONTROL_EMPTY_STATE_CLASSES: Record<
  ControlSize,
  { wrapper: string; badge: string; icon: string; gap: string }
> = {
  sm: { wrapper: "gap-2 py-8", badge: "size-7", icon: "size-3.5", gap: "gap-0.5" },
  md: { wrapper: "gap-3 py-10", badge: "size-11", icon: "size-5", gap: "gap-1" },
};

/** The count/badge pill a `Tab` renders after its label — it tracks the tab's own density. */
export const CONTROL_TAB_COUNT_CLASSES: Record<ControlSize, string> = {
  sm: "px-1 py-0 text-metadata",
  md: "px-1.5 py-0.5 text-caption",
};

/**
 * A `SegmentedControl` segment. Unlike a tab, the segment sits inside a
 * `p-0.5` pill track, so padding alone can't land the *outer* control on the
 * scale — `sm` therefore pins the segment at **h-6**, which plus the track's
 * 4px gives the 28px outer height `sm` means everywhere else in this system.
 * `md` stays padding-driven and unchanged.
 *
 * There is no separately-positioned indicator to keep in sync: the active pill
 * is a background fill on the segment itself, so it follows this sizing for
 * free.
 */
export const CONTROL_SEGMENT_CLASSES: Record<ControlSize, string> = {
  sm: "h-6 px-2.5 text-caption",
  md: "px-3 py-1.5 text-body-sm",
};

/**
 * The pill track the segments sit inside. Its padding and 1px border are
 * *outside* the segment, so they count toward the control's outer height —
 * measured live, `h-6` + `p-0.5` + border rendered 30px, not the 28 `sm`
 * means. `sm` therefore tightens the track to `p-px`: 24 + 2 + 2 = **28**.
 * `md` keeps `p-0.5` and its original 40px.
 */
export const CONTROL_SEGMENT_TRACK_CLASSES: Record<ControlSize, string> = {
  sm: "p-px",
  md: "p-0.5",
};
