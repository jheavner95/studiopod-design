# ADR 0015 — Stability is declared in the API manifest, and earned by evidence

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-5
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

> **Amends [ADR 0005](0005-public-api-tiers.md) § Stable.** That ADR required a
> Stable export to have "at least one real consumer". DH-4 produced the first
> consumer and showed the criterion cannot survive contact with it. The tier
> vocabulary, the Preview graduation rule and the declaration requirement are
> unchanged.

## Context

ADR 0005 established three tiers and required every export to declare one. It
did not say *where* the declaration lives, and nothing was ever declared: DH-5
inherited 876 root exports with no tier on any of them, which is DH-1 gap 5.

Two things had to be decided: where a tier is recorded, and how the first 1,175
of them get assigned without being arbitrary.

The second is the harder one, because ADR 0005's Stable bar has four criteria —
documentation, unit and accessibility tests, **at least one real consumer**, and
a settled shape — and the third does not work at this scale.

Measured after DH-4: Cloud, the only consumer, uses **10** exports. Applying
"at least one real consumer" literally would admit ten of 1,175 exports to
Stable and mark everything else Preview, including `Card`, `Stack` and `Panel` —
components with tests, documentation and years of use in the documentation
product. A tier that says "beware everything" tells a consumer nothing they
could act on.

The criterion was written when Design had **zero** consumers, as a way of saying
"do not promise stability for an API nobody has tried." That instinct is right.
Tying it to consumer count is what fails.

## Decision

**Stability is declared in `api-baseline/<entry>.json`, which maps every export
name to its tier. It is the single source of truth, it ships in the package, and
`check-api.mjs` enforces it.**

```json
{ "Button": "stable", "ActivityWidget": "preview", … }
```

Before DH-5 that file was a flat array of names. It answered "did the surface
change" and nothing else — a consumer could see that `Button` and
`ActivityWidget` were both exported and had no way to learn that one is pinned
by tests and documented and the other is neither.

### The Stable criteria, amended

An export is Stable when it is:

1. **Pinned by tests** — the module has a test file, so its behaviour cannot
   change without someone editing an assertion.
2. **Documented** — it appears in the documentation product.
3. **Typed** — a component exports its props type, so a consumer can wrap it.

**"At least one real consumer" is replaced by "pinned by tests."** The reason
the original criterion existed was that an untried API should not be promised.
Tests are a better proxy for that than consumer count: they are the mechanism
that actually makes an API expensive to change by accident, they scale with the
library instead of with adoption, and they are already measured.

Consumer usage remains excellent evidence — of **value**, and of what to promote
next. It is not evidence of stability, and DH-4 is why: Cloud's ten components
were no more stable the day before it adopted them.

### One documented exception

Every export of `@studiopod/design/tokens` is Stable, with no test file. Those
values are generated from `@studiopod/foundation` and `token:bridge-check` fails
the build if one drifts by a single character — a stronger guarantee than a unit
test, not a weaker one.

### The resulting assignment

| Entry | Stable | Preview |
| --- | --- | --- |
| `.` | 211 | 665 |
| `./tokens` | 5 | 0 |
| `./marketing` | 0 | 44 |
| `./illustrations` | 2 | 248 |

`./marketing` and `./illustrations` are almost entirely Preview because **they
have no test files at all** — 0 across eleven brand compositions and 0 across
the four diagram engines. That is not a harsh grading of good code; it is the
first time the package has said out loud which half of it is pinned.

## Alternatives considered

### Alternative A — Apply ADR 0005 literally

Ten Stable exports; everything else Preview.

Rejected. It is technically faithful and practically useless: a consumer reading
it learns that `cn`, `Card` and `Stack` carry the same promise as an untested
diagram helper, which is false and would push them to pin exact versions and
ignore the tier entirely. A signal nobody can act on is not a conservative
signal — it is noise with a cautious tone.

### Alternative B — JSDoc `@stability` tags in source

Put the tier on each declaration, so editors surface it on hover.

Rejected as the *source of truth*, though the ergonomics are genuinely better.
1,175 tags is a large hand-authored surface with no way to diff a change to it,
and a tag and a manifest would be two homes for one concern — the failure the
constitution names directly. The manifest is one file, machine-checked, and
diffable in review. Editor visibility is worth revisiting as a **generated**
tag, which keeps one source of truth.

### Alternative C — Tier per module rather than per export

One tier per component file, inherited by its exports.

Rejected because it forces a lie in the common case: a component can be Stable
while a type it exports alongside is still moving. Per-export costs nothing
extra — the manifest is generated — and it is what a consumer actually needs to
know.

### Alternative D — Everything starts Stable; demote what proves unstable

Optimistic, and it flatters the library.

Rejected. It promises compatibility the package has not earned on 665 exports
and would make the first demotion a breaking change. Starting at Preview and
promoting on evidence is the direction that costs a consumer nothing when we are
wrong.

## Consequences

### What this makes easier

- A consumer can tell what each of 1,175 exports promises, before depending on it
- The manifest ships in the package, so the answer travels with the code
- Promotion is a reviewable event: the tier is in the diff
- "Which parts are untested" became a question the API answers

### What this makes harder

- **Promotion needs a decision.** New exports enter at `preview` and stay there
  until someone promotes them; nothing promotes automatically.
- **The Stable set is now a commitment.** 218 exports carry a real promise, and
  breaking one is now unambiguously a breaking change.
- **The manifest must be regenerated** on any intentional API change, or the
  build fails — a small, deliberate friction on every API edit.
- **`marketing` and `illustrations` look bad in the table**, and the honest fix
  is tests, not a re-grading.

### What this commits us to

- Never promoting to Stable without the three criteria
- Reviewing the Preview set at every release, per ADR 0005's graduation rule
- Writing tests for the brand compositions and the diagram engines, or leaving
  them Preview permanently and saying so

## Enforcement

- **`check-api.mjs`** — mechanical. Every export is in the manifest; every
  manifest entry is exported; every tier is from the vocabulary. An export that
  reaches the surface without being accepted fails the build, with a message
  naming the decision. Proven falsifiable against an injected export.
- **`--write`** — mechanical. New names enter at `preview`; the script cannot
  hand out `stable`.
- **Promotion correctness** — review obligation. Nothing verifies that a
  `stable` entry really has tests, documentation and a props type. A check that
  re-derives the criteria and fails on a promotion that does not meet them is
  buildable, and is recorded as an open gap.

## References

- [ADR 0005 — Public API tiers](0005-public-api-tiers.md) — amended here
- [ADR 0016 — The root entry is constructed](0016-intentional-exports.md)
- [../architecture/public-api.md](../architecture/public-api.md)
- [../certification/DH-5.md](../certification/DH-5.md)
- Cloud DH-4 § 3 E — the consumer evidence behind the props criterion
