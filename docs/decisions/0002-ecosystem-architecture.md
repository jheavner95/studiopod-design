# ADR 0002 — Adopt the ecosystem architecture, and relocate its canonical text

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Ecosystem
- **Supersedes:** —
- **Superseded by:** —

## Context

StudioPOD is four repositories: Foundation, Design, Cloud, Web. The ownership
boundary between them was decided in **Cloud ADR 0033**, which established:

```
Foundation      canonical design values
     ↓
Design          the visual language
     ↓
Cloud, Web      applications
```

That decision binds this repository. Design's entire identity — what it may own,
what it may not, which direction its dependencies point — is downstream of it.

Two things follow that this ADR must handle.

**First, Design has never formally adopted it.** Cloud ADR 0033 was written in
Cloud, to reverse two of Cloud's own decisions. It states what Design owns, but
Design was not the author and has no record of accepting the constraint. An
architecture that binds a repository which never agreed to it is an architecture
that gets quietly renegotiated the first time it is inconvenient.

**Second, its location is wrong.** An ecosystem-scoped decision lives in a leaf
repository — the one furthest down the dependency chain, and the one with the
least standing to define what its upstreams own. Cloud ADR 0033 says so itself:
"Unlike every other ADR in this repository, this one applies to all StudioPOD
repositories."

That is not a filing inconvenience. It means:

- Foundation is bound by a document in a repository it must never depend on
- Web is bound by a document it has no reason to read
- A future application must know to look in Cloud to find out what it may own
- Amending the ecosystem boundary means editing an application repository

## Decision

**Design adopts the ecosystem architecture as binding**, and restates its
consequences for Design in
[CONSTITUTION.md Article III](../../CONSTITUTION.md#article-iii--position-in-the-ecosystem).

Specifically, Design accepts:

1. **Dependencies flow downward only.** Design depends on Foundation. Design never
   depends on Cloud, Web, or any application.
2. **Design does not own design values.** Colour, spacing, type, motion, radius,
   and icon geometry are Foundation's, and they arrive here through a generator.
3. **Design owns the visual language** — semantic names, primitives, patterns,
   brand compositions, accessibility contracts, documentation, and component
   APIs.
4. **Applications compose; they do not redefine.** A generally useful component in
   an application is promoted here, not copied.
5. **Design must be consumable by every application**, which means it may not
   carry any one application's coupling.

Point 5 is Design's own obligation under the arrangement, and it is the one this
repository has been failing. Cloud declined to consume `@studiopod/design`
because of a `next/link` coupling and a marketing surface it does not want. Under
Cloud ADR 0033 that is not Cloud's problem to solve locally — it is Design's
defect. [ADR 0007](0007-framework-neutrality.md) fixes it.

**Additionally: the canonical ecosystem ADR should move to Foundation.**

Foundation is the correct home because it is the root of the dependency graph —
the only repository every other repository already depends on, and the only one
that can define the boundary without a reverse dependency. This is a
recommendation to the ecosystem, not a unilateral action; Design cannot move
another repository's decision record.

Until it moves:

- **Cloud ADR 0033 remains the canonical text.** This ADR does not supersede it.
- Design's Article III restates its consequences for Design only, and is marked
  ecosystem-scoped and not unilaterally amendable.
- Cross-repository references always name the repository — "Cloud ADR 0033,"
  never "ADR 0033."

## Alternatives considered

### Alternative A — Reference Cloud ADR 0033 and write nothing here

Plausible: it avoids duplication, and duplication of architectural text is
exactly how documents drift apart.

Rejected because a constraint a repository has never accepted is a constraint
that erodes. The specific risk is concrete and predictable: a future work package
here finds the boundary inconvenient, notes that the decision lives in another
repository, and treats it as advisory. Article III's restatement is deliberately
scoped to **Design's obligations**, not the whole ecosystem, so there are not two
canonical texts — there is one canonical text and one repository's acceptance of
it.

### Alternative B — Move the ecosystem ADR to Design

Plausible: Design sits between Foundation and applications, so it might seem
like the natural coordination point.

Rejected. Design is upstream of applications but downstream of Foundation, so a
boundary defined here still fails for Foundation — which would be bound by a
document in a repository it must never depend on. The same objection that
disqualifies Cloud disqualifies Design, just less severely.

### Alternative C — A fifth repository for ecosystem governance

Plausible and architecturally clean: ecosystem decisions get a home that is
nobody's leaf.

Rejected as disproportionate. A repository with no code, no build, and perhaps
four documents is infrastructure to maintain, permissions to manage, and a place
people forget to look. Foundation already has every property required — it is
depended on by everything, it is framework-neutral, and it is already the
ecosystem's root of truth for values. Revisit if ecosystem-scoped decisions grow
past a handful.

### Alternative D — Renegotiate the boundary now

Design could argue that some of what Cloud ADR 0033 assigned is wrong.

Rejected because it is not. Having examined the boundary in detail while writing
[boundaries.md](../architecture/boundaries.md), the assignment holds. The
problems in this repository are Design's failures to meet the boundary, not
defects in the boundary. Reopening a sound decision to avoid the work it implies
is the pattern the constitution's amendment article exists to prevent.

## Consequences

### What this makes easier

- Design's scope is settled, and disputes have a written answer
- A future application knows what it may own before it starts
- The reason Cloud cannot consume Design becomes a defect with an owner, rather
  than a standoff

### What this makes harder

- **Design cannot solve its own blockers by absorbing responsibility.** When
  Foundation lacks a value, the answer is to open work in Foundation and record
  the block — not to add it here temporarily.
- **Article III is not amendable here alone.** Changing the boundary requires
  agreement across repositories, which is slower than an ADR.
- **The relocation recommendation may not be accepted**, in which case the
  awkward location persists and every future reader pays a small tax.

### What this commits us to

- Never becoming a second owner of design values, however convenient
- Removing every application-specific coupling from the package
- Keeping Article III synchronised with the canonical ecosystem text
- Raising boundary disputes as cross-repository decisions rather than local ones

## Enforcement

- `token:bridge-check` — mechanical. A hand-edited generated token file fails.
- Dependency check — mechanical. The package may not declare an application
  dependency.
- Framework import check — mechanical, DH-2. See
  [ADR 0007](0007-framework-neutrality.md).
- **Boundary judgement is a review obligation**, not a check. "Is this an
  application concern" is answered by
  [boundaries.md](../architecture/boundaries.md) § 5 and a reviewer, and no
  script will do it.

## References

- Cloud ADR 0033 — StudioPOD ecosystem architecture (canonical)
- [CONSTITUTION.md Article III](../../CONSTITUTION.md#article-iii--position-in-the-ecosystem)
- [../architecture/boundaries.md](../architecture/boundaries.md)
- [ADR 0007 — Framework neutrality](0007-framework-neutrality.md)
- [ADR 0008 — Foundation is a build-time input](0008-foundation-is-a-build-time-input.md)
