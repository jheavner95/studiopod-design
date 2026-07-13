# Foundation Layer Architecture

Source: `foundation-audit` (deleted, RM-5).

## Composition/layering (verified by direct grep, zero exceptions found)

```
┌─────────────────────────────────────────────────┐
│ ui/ primitives                                   │
│ Button, TextInput, Select, Checkbox,             │
│ ToggleSwitch, Badge, StatCard…                   │
└───────────────────────┬───────────────────────────┘
                         │  composes (verified)
┌─────────────────────────────────────────────────┐
│ Foundation Layout — 16 files                     │
│ Stack, Inline, Grid, Surface, Panel,             │
│ DescriptionList                                  │
└───────────────────────┬───────────────────────────┘
                         │  composes (verified)
        ┌────────────────┼────────────────┐
        │                │                │
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Foundation     │ │ Foundation     │ │ Foundation     │
│ Table          │ │ Metadata       │ │ Forms          │
└───────────────┘ └───────────────┘ └───────────────┘
                         │  partial adoption (see note below)
┌─────────────────────────────────────────────────┐
│ Workspace Architecture — 9 pages                 │
└─────────────────────────────────────────────────┘
```

**Note on the bottom edge**: at one point in the audit history this was recorded as fully unverified ("no imports found" anywhere). That became stale — by the time of the last audit, 7 of 9 Workspace Architecture pages imported `DescriptionList` from Metadata, and 4–5 of 9 imported Table primitives, as real, measured, zero-regression adoption. Forms remained the only leg of that bottom edge still genuinely unconsumed by any workspace page. If this diagram is ever redrawn, show Table and Metadata as partially adopted and Forms as still unverified — not one uniform dashed edge.

Two hard rules held with **zero exceptions** across every file checked:
- **"Metadata never edits"** — zero `onChange`/`onClick`/`<input>`/`<button>`/`<select>`/`<textarea>`/`contentEditable` in all 16 Metadata files, except one sanctioned `next/link` in `RelationshipList`.
- **"Forms never present read-only information"** — all 11 editing components require a genuine controlled value/onChange pair; Forms explicitly defers read-only display to Metadata rather than building it itself.

Layering confirmed by grep: `ui/` → Foundation Layout → {Table, Metadata, Forms} (each depends only on Layout + ui, never on each other) → Workspace Architecture. Zero cross-imports between Table/Metadata/Forms.

## Design-rules audit verdicts (rule-by-rule, with evidence)

- *"Metadata presents / Forms edit"* — **Followed**, zero exceptions, the most consistently followed rule found in the whole audit.
- *"Foundation components must be boring, reliable, accessible"* — **Followed** structurally across all 68 files checked.
- *"Prefer Stack/Inline/Grid before a custom flex"* — **Needs clarification.** Followed inside the Foundation Layer itself (no file there hand-rolls `flex-col`), but violated at the wider codebase level: 242 raw `flex flex-col gap-N` occurrences remain outside it (see [Duplication & Reuse Discipline](./04-duplication-and-reuse-discipline.md)). The rule as written doesn't distinguish "the primitives follow this" from "the codebase adopts the primitives."
- *"Operational components compose foundations, don't reinvent them"* — **Partially resolved.** Originally violated by every duplication case found; description lists and 6 of 8 table duplicates are now migrated, 2 remain correctly blocked on a real capability gap (below), Panel/Surface (19 files) and ControlDock (5 files) remain fully unmigrated — each explicitly deferred as "refactor existing pages later," so this is accepted, tracked debt, not a surprise regression.
- Forms accessibility default-wiring — **Violated**, self-disclosed (`aria-describedby` gap, see [Accessibility Findings](./02-accessibility-findings.md)).
- *"Real findings, not estimates"* methodology — **Violated in a specific, reproducible way**: two families' own duplication-finding greps were self-referentially inflated — they matched the data files that quote the search string as a literal, and the illustrative demo markup on the docs pages themselves. The real counts used elsewhere in these notes exclude those self-matches.
- What counts as a "real (non-playground) screen" for certification purposes — **genuinely ambiguous**, never formally defined, and directly affected certification decisions. The stricter reading (adoption outside the Foundation Layer's own docs) was assumed, not decreed.

## The Table row-collapse gap: a real, twice-confirmed capability limit

**Foundation Table has no responsive row-collapse** (stacking a wide table into cards below a breakpoint). Two independent migration attempts hit this and were correctly reverted rather than shipped broken or hacked around locally:

- `MaturityTable` (a 40-row div/grid table with card-stacking behavior): measured 640px of content against a 333px viewport when forced onto a native `<table>`.
- `InventoryTable` (initially assumed to be a genuine table; direct code review showed it was the identical div/grid pattern): measured 774px against 333px — worse.

Two independent failures for the same structural reason established this as a real, disclosed gap, not a fluke, rather than papering over it with a per-page workaround.

**Process lesson that followed**: after those two reverts, later migrations (`ScorecardTable`, `CertificationMatrix`, `CoverageMatrix`) added an explicit **"Phase 0" architecture-verification gate** — confirm a migration candidate is a genuine native `<table>` (not a div/grid impersonating one) *before* touching any code. All three passed the gate, migrated cleanly, and needed zero new Table API surface — the one API addition from the whole migration series (`TableHead`'s `sticky` prop, added during the very first migration) proved sufficient for everything after it.

**Migration sequencing principle** (real, transferable): order migrations by risk/dependency, not by importance. Do the "purest possible move" first — the one requiring zero design judgment — to prove the target system on real content cheaply, before attempting the highest-volume, most architecturally consequential migration last, once confidence is highest. This is precisely why the sticky-column gap and the description-list label-width gap (which led to `DescriptionList` gaining an optional `labelWidth` prop) were each found and fixed generically on an early, low-stakes migration, rather than discovered for the first time on a high-stakes one.

## Definition worth keeping

A family reaches "Certified" only when it clears three things at once — a Production Ready baseline, a verified per-component accessibility pass, and real (non-playground) screen usage — not any one of those alone.
