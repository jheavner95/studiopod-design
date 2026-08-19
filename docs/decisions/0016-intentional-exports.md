# ADR 0016 — The public API is constructed, not aggregated

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-5
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

DH-1 gap 13: the root entry was "built largely by `export *` rather than by
decision." Measured in DH-5: **268 of 620 root exports — 43% — arrived through
seven star exports.**

```
export * from "@/components/ui";        64
export * from "@/components/workflow";  125
export * from "@/components/overlay";   23
export * from "@/components/table";     19
export * from "@/components/motion";    17
export * from "@/hooks";                15
export * from "@/providers";             5
```

The problem is not the count. It is that **adding a component to a family
barrel published it.** No review of the public surface, no decision, no entry in
the changelog — the API grew because the file system did. `export *` makes the
repository's internal organisation and its public contract the same thing, and
[ADR 0001](0001-design-is-a-product.md) exists to say they are not.

There was also a silent cost nobody had seen. `ComboboxOption` was exported by
both `@/components/ui` and `@/components/form`. Under star-export semantics an
explicit export shadows a star, so `form`'s won and `ui`'s vanished — silently,
correctly, and invisibly. **A name collision in the public API had been
resolving itself by a language rule nobody had chosen.**

## Decision

**Every public entry point names its exports explicitly. What reaches consumers
is a list somebody wrote, not the contents of a directory.**

DH-5 converted all seven root star exports and the one on `./marketing` into
explicit lists generated from the then-current resolved surface — so the change
was, by construction, invisible to consumers: 876 exports before, 876 after.

The value is entirely in what happens next. A component added to
`@/components/ui` now reaches the public API only when someone adds a line to
`src/index.ts`, and `check-api.mjs` fails the build until the manifest agrees.

### The one star export that stays

`./tokens` remains `export * from "@/lib/tokens"`, deliberately.

That module is **generated** from `@jheavner95/foundation` and never hand-edited.
Naming its exports here would mean a token could be generated into the package
and still not reach consumers until somebody remembered to add a line — a
second, manual, silently-drifting source of truth for a surface whose entire
point is that it is derived. The token bridge check governs its contents, and
the API manifest still records every name, so an addition is visible in review.

**A broad export is justified when the module it aggregates is itself
generated and checked.** That is the only case here.

## Alternatives considered

### Alternative A — Keep `export *` and rely on the API manifest to catch additions

The manifest already fails on an unexpected export. Arguably the star export is
harmless once something downstream notices.

Rejected, and it is the closest call in this ADR. The manifest does catch the
addition — but it catches it as *drift*, at build time, with a message asking
whether this was intended, after the code is written. An explicit list makes the
decision happen where the decision belongs: when someone writes the export line.
One is a smoke alarm; the other is not leaving the pan unattended.

It also would not have surfaced `ComboboxOption`. The manifest saw a stable
surface, because the collision resolved silently and consistently.

### Alternative B — Convert by hand, deciding each export on its merits

Genuinely intentional rather than mechanically transcribed.

Rejected for DH-5, and this is worth being honest about: the lists were
**generated**, so they are intentional in structure but not yet in content.
Deciding whether all 125 workflow exports deserve to be public is the component
audit, which the brief explicitly assigns to a later package. What DH-5 changes
is that the decision is now *possible* and *required* — the next person to add
an export has to make it.

### Alternative C — Split families into their own entry points

`@jheavner95/design/workflow`, `/operational`, and so on.

Rejected. [ADR 0004](0004-one-published-package.md) makes an entry point's set
frozen and its addition a breaking change, and there is no consumer asking to
import a family in isolation. It also solves a different problem — bundle
scoping — not this one.

## Consequences

### What this makes easier

- Adding an export is a decision with a diff, not a side effect of adding a file
- Name collisions surface as build errors instead of resolving silently
- `src/index.ts` is now a readable statement of what the package offers
- The component audit has something to audit

### What this makes harder

- **`src/index.ts` is much longer** — every public name appears in it.
- **Adding a component takes a second edit**, in the root entry. That friction
  is the point, and it will feel like overhead to whoever hits it first.
- **The generated lists are not yet curated.** They preserve today's surface
  exactly, including whatever should not have been public. Marking that clearly
  matters more than pretending otherwise.

### What this commits us to

- Never reintroducing `export *` on a public entry without an ADR
- Auditing the transcribed lists in the component audit
- Treating a new export as an API decision, reviewed as one

## Enforcement

- **`check-api.mjs`** — mechanical. The surface must match the manifest exactly;
  a new export fails the build until accepted.
- **No `export *` on a public entry** — **not mechanically enforced.** A check
  that greps the entry files for `export *` and allows only `./tokens` is three
  lines and is recorded as an open gap.

## References

- [ADR 0001 — Design is a product](0001-design-is-a-product.md)
- [ADR 0004 — One published package](0004-one-published-package.md)
- [ADR 0015 — Stability tiers](0015-stability-tiers.md)
- [../certification/DH-5.md](../certification/DH-5.md)
