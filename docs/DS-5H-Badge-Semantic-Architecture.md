# DS-5H — Badge Semantic Architecture Review

**Verdict:** ✅ **CERTIFIED WITH DEFERRED ITEMS.**

The canonical Badge architecture is **determined and internally consistent** — it follows directly from DS-5B's already-shipped tone doctrine (`src/lib/tone.ts`, engineering note 15). No architectural redesign is required. **One minor, additive API item must ship in the Design System before DS-6.3 may resume:** a static, tone-inheriting `dot?: boolean` on `Badge`. Everything else the application asks for is a rename/remap onto the existing canonical model, not a Design-System gap.

This is a review. Nothing was implemented. The application was not modified.

---

## Phase 1 — Badge Philosophy

**What a Badge is.** An inline, non-interactive **label pill**: a short word or count, tinted by one semantic tone, rendered `inline-flex … rounded-full` (Badge.tsx docstring: *"counts, 'Beta', plan tiers, pipeline states"*). It is a *presentation of a state that already exists elsewhere* — it does not own the state, does not fetch it, and is not clickable.

**What it communicates.** Exactly two things: (1) a short label (its `children`), and (2) one `StatusTone` — the five-value canonical semantic scale `neutral | accent | success | warning | error`. Nothing more.

**What is outside its responsibility.**
- **Liveness / animation** — a pulsing "this is happening now" signal is `PulseStatus`, not Badge.
- **Interaction** — a dismissible/removable token is `FilterChip`. A clickable filter control is `FilterChip`/`FilterBar`.
- **Composite dot+label status rows** — `StatusIndicator` (dot + label + `role="status"`).
- **Metric display** — `StatCard` / `StatGroup`.
- **Object lifecycle vocabulary** — `draft`/`archived`/`published` are *domain state*, not a Badge concern; Badge only renders the *tone* such a state resolves to.

**Responsibility boundaries (the status-primitive family):**

| Primitive | Shape | Owns | Tone source | Client? |
|---|---|---|---|---|
| **Badge** (`ui/`) | tinted **pill** + label | short static label + one tone | `StatusTone` | server-safe |
| **FilterChip** (`operational/`) | pill + optional ✕ | one *applied filter*, dismissible | `StatusTone` | server-safe |
| **PulseStatus** (`motion/`) | a **dot** (optionally pulsing) | the "live" signal recipe | `PulseTone` (= StatusTone) | **"use client"** (framer) |
| **StatusIndicator** (`illustration/`, re-exported by `feedback/`) | **dot + label**, `role=status/alert` | announced status *row* | `SystemStatus`→tone | via PulseStatus |
| **SectionBadge** (`ui/`) | bordered section-title pill | section eyebrow label | — | server-safe |
| **StatCard / StatGroup** | metric block | value/label/trend | — | server-safe |
| **Metadata/** (StatusSummary, IdentityBlock, …) | key/value rows | record fields (consume tone) | `StatusTone` | server-safe |

No two of these overlap: **pill = Badge, dot = PulseStatus, dot+label row = StatusIndicator, removable pill = FilterChip.** DS-5B ratified this split deliberately (see Phase 2).

---

## Phase 2 — Status Indicator Review — does `dot` belong on Badge?

**What the DS already decided (DS-5B, note 15, Classification 2).** *"a dot's tone and a badge's tone are the same semantic concept even though their rendered recipe (solid dot vs. pill) differs."* The dot recipe (`PulseStatus.toneMap`) was **kept separate from** the pill recipe (`STATUS_TONE_PILL_CLASSES`) on purpose. So the DS's standing position is: **a free-standing status dot is `PulseStatus`; a dot-with-label row is `StatusIndicator`; neither is a Badge prop.**

**But the application's `<Badge dot>` is a third recipe that the DS does not currently have.** The app renders a **static leading dot *inside* the pill** — `[● Active]`, one tinted rounded unit — across 23 sites. Critically:
- **All 23 are static** — the app's dot is a plain `<span>` (`dot: "bg-status-info"` etc.), never animated. It is *not* a "this is live" signal.
- **It is inside the pill**, so `StatusIndicator` (dot + label with **no** pill) is not a visual equivalent — composing it would drop the pill and change the visual.
- **Composing `PulseStatus` as a Badge child** *works today* (`<Badge tone="success"><PulseStatus active={false} size="sm"/> Active</Badge>` — Badge's cva already ships `gap-1.5 items-center`, a leading-element slot), **but has two real costs**: PulseStatus is `"use client"` (framer-motion), so it would pull the client boundary + framer into 23 currently-server-rendered pills; and the tone must be passed twice (once to Badge, once to PulseStatus) with no coupling guaranteeing they match.

**Decision: A — Badge should support `dot`, narrowly.** A **static, tone-inheriting** dot is a legitimate first-class *badge* affordance (a labeled status pill with a leading indicator is one semantic unit, not two composed units), and it is the one recipe the family lacks. It must be implemented as a **plain server-safe `<span>` that inherits the Badge's own tone** — **not** by embedding `PulseStatus` — so Badge stays server-safe and the tone is specified once. `PulseStatus` remains the canonical **live/animated** dot; `StatusIndicator` remains the canonical **dot+label row**; `Badge.dot` is specifically *"a static status dot within a label pill."* Boundaries stay disjoint.

**Canonical composition patterns (for the cases that are NOT `Badge.dot`):**
- Live/animated standalone dot → `<PulseStatus tone active />`.
- Announced status row (dot + text, no pill, screen-reader `role`) → `<StatusIndicator status label />`.
- Static dot inside a label pill → **`<Badge tone dot>Label</Badge>`** (after the deferred item ships).

---

## Phase 3 — Tone Taxonomy

Audited against the canonical `StatusTone` (5) and the app Badge's actual tokens.

| App variant | App token | Classification | Canonical resolution | Justification |
|---|---|---|---|---|
| `success` | `status-success` | **Canonical semantic tone** | `tone="success"` | 1:1 with StatusTone |
| `warning` | `status-warning` | **Canonical semantic tone** | `tone="warning"` | 1:1 |
| `error` | `status-error` | **Canonical semantic tone** | `tone="error"` | 1:1 |
| `neutral` | `canvas-*` | **Canonical semantic tone** | `tone="neutral"` | 1:1 |
| `info` | `status-info` (blue) | **Presentation alias of `accent`** | `tone="accent"` | DS-5B note 15, Classification 6 states verbatim that `FeedbackTone`'s `"info"` and `StatusTone`'s `"accent"` *"render near-identically … the same slot under different key names."* `accent` is the canonical key. |
| `blue` | brand blue | **Presentation alias of `accent`** | `tone="accent"` | The brand/accent blue *is* the `accent` slot; "blue" names a color, not a semantic. |
| `cyan` | `accent-cyan` | **Application-specific presentation color** (obsolete as a tone) | remap → `accent` or `neutral` (product call) | A raw brand accent color, not a semantic tone. Exactly the kind of thing DS-5B declined to fold into `StatusTone` (Part 3: presentation colors are not semantic tones). 1 use ("Queued"). The DS must **not** add a `cyan` tone. |
| `draft` | `canvas`/muted | **Lifecycle state** (not a tone) | tone `neutral` | See Phase 4. |
| `archived` | `canvas`/muted | **Lifecycle state** (not a tone) | tone `neutral` | See Phase 4. |

**Canonical tone set stays at five. No tone is added.** The application did not reveal a missing *semantic* tone — it revealed presentation aliases (`info`/`blue`), one app-specific presentation color (`cyan`), and two lifecycle states (`draft`/`archived`) that the app had flattened into its `variant` enum. DS-5B already answered "did StatusTone need a wider set?" — *No* — and this audit reaches the same answer independently.

---

## Phase 4 — Lifecycle Semantics (`draft`, `archived`)

**These are object lifecycle states, not Badge tones.** They describe *what a record is* (a draft product, an archived job), not *what severity/emphasis to render*. This is precisely DS-5B's **Classification 3**: the ~15 workflow-tier vocabularies (`WorkflowNodeStatus`, `StateValue`, `ApprovalStateValue`, …) are domain status vocabularies that **map into a tone** via a per-domain `*_TONE` Record; they are deliberately **not** merged into `StatusTone`.

**Canonical DS pattern:** the application owns a small lifecycle vocabulary (e.g. `type ContentLifecycle = "draft" | "active" | "archived"`) and a resolver mapping it to a canonical tone (`draft → neutral`, `active → success`/`accent`, `archived → neutral`), then renders `<Badge tone={lifecycleTone(state)}>`. The DS supplies the *tone*; the app supplies the *lifecycle meaning*. The DS does **not** add `draft`/`archived` tones.

> Note on collapse: `draft` and `archived` both resolving to `neutral` is acceptable — Badge conveys *emphasis*, the **label text** ("Draft" / "Archived") conveys the *distinction*. Tone is not required to be a unique key per lifecycle state. (If the product genuinely needs `archived` and `draft` to look different, that is a product/lifecycle-vocabulary decision resolving to *different existing tones* — e.g. `archived → neutral`, `draft → accent` — never a new tone.)

---

## Phase 5 — Canonical Badge API

```ts
type StatusTone = "neutral" | "accent" | "success" | "warning" | "error"; // src/lib/tone.ts (unchanged)

interface BadgeProps {
  children: ReactNode;         // the label — carries the meaning
  tone?: StatusTone;           // default "neutral"
  size?: "sm" | "md";          // default "md"
  dot?: boolean;               // NEW (deferred item) — default false
  className?: string;
}
```

- **Tones:** the five canonical `StatusTone` values. No `info`/`blue`/`cyan`/`draft`/`archived`.
- **Sizes:** `sm | md` (unchanged).
- **`dot`: YES, it exists on Badge** — as a **static, tone-inheriting leading dot**, rendered as a plain `<span>` reusing the badge's tone color (a `STATUS_TONE_DOT_CLASSES` sibling of `STATUS_TONE_PILL_CLASSES` in `src/lib/tone.ts`, or a `bg-current`/opacity treatment). **It does not embed `PulseStatus`; it introduces no `"use client"`; it never pulses.** For a live dot use `PulseStatus`; for a dot+label row use `StatusIndicator`.
- **Composition rules:** Badge is a leaf label. It does not wrap interactive children, does not host a close button (that's FilterChip), does not animate.
- **Accessibility:** the dot is decorative (`aria-hidden`) — tone must never be the sole carrier of meaning; the label text always states the status (matches the app's existing `aria-hidden` dot and DS-5D's "don't rely on color" convention). Badge remains a non-interactive `<span>`; no role needed. Announced status belongs to `StatusIndicator` (`role="status"/"alert"`).
- **Interaction rules:** none. Badge is non-interactive by definition. Interaction → FilterChip.

---

## Phase 6 — Migration Matrix (canonical)

| App capability | Class | Canonical DS target |
|---|---|---|
| `variant="success"/"warning"/"error"/"neutral"` | **Rename** | `tone="…"` (same key) |
| `variant="info"` | **Rename** | `tone="accent"` (presentation alias) |
| `variant="blue"` | **Rename** | `tone="accent"` (presentation alias) |
| `variant="cyan"` | **Remove / Remap** | `tone="accent"` or `"neutral"` — no cyan tone (product decides; 1 site) |
| `variant="draft"` | **Composition (lifecycle→tone)** | app resolves `draft → tone="neutral"` |
| `variant="archived"` | **Composition (lifecycle→tone)** | app resolves `archived → tone="neutral"` |
| `dot` (23 sites) | **Direct** *(once deferred item ships)* | `dot` prop on Badge |
| `solid` (0 sites) | **Remove** | unused; drop |
| `children` / `className` | **Direct** | same |
| convenience exports (`InfoBadge`, `DraftBadge`, …; 0 uses) | **Remove** | app deletes; unused |
| `size` | **Direct** | `size` (sm/md) |

**No capability is "Unsupported"** once the single deferred item ships. Every app usage lands as Direct, Rename, Composition, or Remove.

---

## Phase 7 — Recommendation

**Recommendation: (2) Minor API additions.** One additive, backward-compatible change ships in the Design System; then DS-6.3 proceeds as a pure rename/remap.

**What must ship in the DS before DS-6.3 may resume:**

1. **`Badge` gains `dot?: boolean`** (default `false`) — a static, tone-inheriting leading dot rendered as a plain server-safe `<span>` (add `STATUS_TONE_DOT_CLASSES` to `src/lib/tone.ts` alongside `STATUS_TONE_PILL_CLASSES`, or use a `bg-current`-based treatment). **Must not** import/embed `PulseStatus`; **must not** introduce `"use client"`; **must** keep Badge server-safe. Dot is `aria-hidden`. Tests: assert each tone renders the right dot class, dot absent by default, Badge still server-safe (no framer import). This is additive → release **`0.2.2`**.

**What must NOT change:**
- **No new tones.** `StatusTone` stays five values. `info`/`blue` → `accent` (documented alias), `cyan` → app remap, `draft`/`archived` → lifecycle-resolved `neutral`. Adding `info`/`cyan`/`draft`/`archived` tones would re-introduce exactly the presentation/lifecycle-into-tone conflation DS-5B spent a whole phase removing.
- **No `solid` prop, no convenience exports** — unused in the app (0 sites), not DS-canonical.
- **PulseStatus / StatusIndicator unchanged** — they already own their recipes.

**The application's responsibilities at DS-6.3 (not DS work):** repoint imports; rename `variant`→`tone`; remap `info`/`blue`→`accent`, `cyan`→`accent`/`neutral`; introduce a lifecycle→tone resolver for `draft`/`archived`; convert `dot` usages to the new prop; delete the app Badge, its `solid` path, and unused convenience exports. The DS's "no adapters / no wrappers" rule holds — every landing is a rename or a product-owned remap onto canonical primitives.

---

## Certification

**VERDICT: CERTIFIED WITH DEFERRED ITEMS.**

The canonical Badge architecture is settled and consistent with the system already shipped in DS-5B: Badge is a server-safe semantic label pill over the five-value `StatusTone`; dots-as-liveness are `PulseStatus`; dot+label rows are `StatusIndicator`; removable tokens are `FilterChip`; lifecycle vocabularies resolve *into* a tone rather than being tones. The application's nine `variant`s decompose cleanly onto this model — four canonical tones, two presentation aliases of `accent`, one app-specific color to remap, and two lifecycle states — with **no new tone required**. The only genuine gap the audit found is the **static dot-inside-a-pill** recipe, which the family lacks; the canonical fix is a **minor, additive, server-safe `dot?: boolean` on Badge** (not a redesign, not a `PulseStatus` embed).

**Deferred item blocking DS-6.3:** ship `Badge.dot` (static, tone-inheriting, server-safe) in `@studiopod/design-system@0.2.2`. Once released and the consumer is bumped, DS-6.3 resumes as a pure rename/remap migration.

**Do not implement. Application not modified. Stopping after DS-5H.**
