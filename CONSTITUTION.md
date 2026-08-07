# The StudioPOD Design Constitution

**Status:** Ratified · **Established by:** DH-1 · **Applies to:** every commit in
this repository

---

## Article I — Purpose and authority

This document is the supreme architectural authority for `studiopod-design`.
Where it conflicts with any other document in this repository, tool
configuration, review comment, or precedent set by existing code, this document
wins.

It is subordinate to exactly one thing: the **StudioPOD ecosystem
architecture**, which defines what this repository is permitted to own. That
boundary is not ours to move unilaterally — see
[Article III](#article-iii--position-in-the-ecosystem) and
[ADR 0002](docs/decisions/0002-ecosystem-architecture.md).

This repository is not new. It carries roughly 560 component source files, a
published package at `0.14.0`, a documentation site, a verification pipeline,
and thirty-odd work-package reports. That work was the research, and much of it
was good. DH-1 does not discard it. DH-1 establishes what the repository **is**,
so that the next several years of work compound instead of accumulating.

Three obligations follow, and they bind every future work package:

1. **Future packages conform to this constitution; they do not restate it.** A
   package that redefines a standard has forked the standard.
2. **A rule that can be checked mechanically is checked mechanically.** A
   convention that depends on reviewer memory is a convention that decays.
3. **A rule that turns out to be wrong is amended, not ignored.** See
   [Article X](#article-x--amendment).

---

## Article II — The principles

These eight principles are the reasoning behind every rule that follows. When a
rule and a principle appear to conflict, the principle is the intent and the
rule is the bug.

### 1. Design is a product

This repository does not exist to serve one application. It is independently
versioned, independently released, independently documented, and consumed by
products that do not share its release schedule.

The practical test: if a change is only justifiable by what one consumer needs
this week, it is an application change wearing a design-system costume. Send it
back to the application, or justify it in terms every consumer would recognise.

### 2. Components are public APIs

A component's props, its DOM contract, its accessibility semantics, its
class-name surface, and its behaviour under controlled and uncontrolled use are
**published contract**. Changing any of them is an API change, whether or not
the type signature moves.

Consumers cannot see our reasoning. They can only see the break. Every export is
cheap to add and expensive to remove, which makes the decision to export an
architectural decision, reviewed as one.

### 3. Foundation owns values; Design owns presentation

Design never owns a raw design value. Colour, spacing, type scale, motion
duration, radius, elevation, and icon geometry are `@studiopod/foundation`'s, and
they arrive here through a generator, never through a hand-edit.

Design owns the layer above: what the values **mean** in an interface, which
semantic name a surface uses, and how a component composes them. A second
implementation of a token value in this repository is a fork of the brand, and
it is rejected in review.

### 4. The library owns its source

The published package compiles its own source tree and nothing else. The
documentation site is a **consumer** of the package, exactly as Cloud and Web
are.

This is the single largest structural correction DH-1 makes, and the reason is
mechanical: while the library and the documentation site share one `src/`, no
build can tell library code from documentation code, so it must be told — by
hand, per barrel, forever. The repository already carries two esbuild resolver
plugins whose entire job is to amputate documentation chrome out of the shipped
bundle. Those plugins are not a clever solution. They are the boundary,
reimplemented badly, because the boundary does not exist.
[ADR 0003](docs/decisions/0003-library-owns-its-source.md).

### 5. Accessibility is a contract, not a quality

An accessible component is not a better component. It is the component. Keyboard
operability, focus management, name/role/value, contrast, motion preference, and
screen-reader semantics are part of what a consumer purchases by importing the
export.

The corollary: accessibility regressions are **breaking changes**, and are
released as such. A consumer who upgrades and loses keyboard access has been
broken, and the version number must say so.

### 6. Small public surface

Large design systems export surprisingly little. Complexity is hidden behind
component boundaries, not distributed across the import surface.

The current root entry is very large. That is a finding, not a baseline. Every
export must be reachable from documentation, covered by tests, and classified in
the API contract; an export that fails all three was never a public API, it was
an accident of a barrel file.

### 7. Documentation is the product

The documentation site is not a demo of the library and it is not a Storybook.
It is the canonical reference for how StudioPOD applications look and behave —
the artefact a designer, an engineer, and a product person all read, and the
place ecosystem questions are settled.

A component that ships without documentation has not shipped. A change that
makes a document untrue is a broken change, exactly as a change that makes a
test fail is.

### 8. Portable by construction

The package targets React. It does not target Next.js, and it does not target
any application's routing, data-fetching, or runtime.

Every framework coupling in the package is a tax levied on every consumer,
including the ones that do not use the framework. Where a component needs a
capability the framework provides — link navigation, image optimisation — the
capability is **injected by the consumer**, not imported by the library.
[ADR 0007](docs/decisions/0007-framework-neutrality.md).

---

## Article III — Position in the ecosystem

StudioPOD is four repositories with deliberately separated ownership.

```
studiopod-foundation      canonical design values          @studiopod/foundation
        ↓
studiopod-design          the visual language              @studiopod/design
        ↓
studiopod-cloud           the SaaS product
studiopod-web             the public web presence
```

**§1. Dependencies flow downward, always.** Design depends on Foundation. Design
never depends on Cloud, on Web, or on any application. The ecosystem never
consumes its consumers.

**§2. Design owns** semantic token names · the Foundation token bridge ·
component primitives · composed patterns · brand compositions · the illustration
engine · motion primitives · accessibility contracts · the documentation product
· the playground · component APIs · migration guidance.

**§3. Design does not own** raw token values · business workflows ·
authentication · tenancy · authorisation · application routing · persistence ·
API clients · product feature logic · any application's page composition.

**§4. Promotion, never duplication.** When an application builds a component that
is generally useful, it is promoted into Design and consumed back. An
application that keeps its own copy is a fork of the design language, and the
fork is the failure mode this separation exists to prevent.

**§5. Applications compose; they do not redefine.** A consumer may assemble
Design's exports into anything. A consumer that reimplements a Design export has
found a gap in Design, and the fix is upstream.

**§6. This article is ecosystem-scoped and is not amendable here alone.**
Changing the boundary requires agreement across the repositories it binds. See
[ADR 0002](docs/decisions/0002-ecosystem-architecture.md).

---

## Article IV — The library model

**§1. The repository publishes one package.** `@studiopod/design`. A second
published package requires an ADR that clears the three-part test in
[docs/architecture/packages.md](docs/architecture/packages.md) § 4.

**§2. Entry points are the unit of scope, not the unit of packaging.** The
package exposes four code entries and one stylesheet, and each entry has a
declared scope that governs what may be exported from it:

| Entry            | Scope                                                        |
| ---------------- | ------------------------------------------------------------ |
| `.`              | Primitives and patterns — the visual language                |
| `./marketing`    | Brand compositions — page-section archetypes                 |
| `./illustrations`| The illustration engine                                      |
| `./tokens`       | The generated semantic projection of Foundation values       |
| `./styles.css`   | The stylesheet                                               |

Adding, removing, or re-scoping an entry point is a breaking change.

**§3. The library source is organised by design concept.** `primitives`,
`patterns`, `brand`, `illustration`, `motion`, `behavior`, `theme`, `tokens`. A
directory that cannot be explained to a designer is organised around the wrong
thing.

**§4. `shared/`, `common/`, `core/`, `utils/`, `helpers/`, `misc/`, and `lib/`
are not directory names in this repository.** They are admissions that ownership
was never decided. Every one of them currently present is a migration target,
not a precedent.

**§5. No layer of the library may import upward.** `primitives` may not import
`patterns`; `patterns` may not import `brand`. Presentation composes downward,
the same way the ecosystem does.

Enforcement and the full model:
[docs/architecture/repository-structure.md](docs/architecture/repository-structure.md).

---

## Article V — The public API

**§1. Every export carries a stability tier** — Stable, Preview, or Internal —
and the tier is declared in the API contract, not inferred.

**§2. Preview is a promise to break.** A Preview export may change in any
release. It exists so consumers can use a component before its shape is settled,
and it is not permitted to stay in Preview indefinitely: an export that has been
Preview across three minor releases is either promoted or removed.

**§3. Internal is not exported.** If it is reachable from an entry point, it is
public, whatever it is named. Naming a thing `_internal` does not make it
private; not exporting it does.

**§4. Breaking changes are versioned honestly**, including before `1.0.0`. The
repository does not use SemVer's pre-1.0 latitude to break consumers quietly.
[ADR 0006](docs/decisions/0006-versioning-and-compatibility.md).

**§5. Nothing is removed without a deprecation window.** An export is marked
deprecated, documented with its replacement and a migration note, and kept
working for at least one full minor release before removal.

**§6. The API contract is a file, and it is checked.** `API.md` enumerates the
frozen entry points and classifies every export; a build that changes the export
surface without changing the contract fails.

Full policy: [docs/architecture/public-api.md](docs/architecture/public-api.md).

---

## Article VI — Engineering standards

**§1. Strict TypeScript.** No package weakens a compiler flag. `any` is an
error. Suppressions require `@ts-expect-error` with a written justification.

**§2. Zero lint warnings.** A rule is an error or it is off. A warning is a
finding nobody is accountable for.

**§3. Deterministic testing.** A test that passes only sometimes is a failing
test that has not been noticed yet. Time, randomness, and I/O are injected.

**§4. Accessibility is verified, not asserted.** Every component ships with
automated accessibility coverage, and every interactive component ships with
keyboard-operation tests. See
[docs/engineering/quality-gates.md](docs/engineering/quality-gates.md).

**§5. Visual verification.** A component is not done because it compiles. It is
done when it has been observed rendering correctly, in both themes, and the
observation is automated.

**§6. One verification chain.** CI runs the same command, in the same order,
that an engineer runs locally. There is no CI-only check and no local-only
check.

**§7. Never weaken a check to make a build green.** If a check is wrong, fix the
check in its own commit and state what the false positive was.

**§8. One version per external dependency, repository-wide.**

---

## Article VII — Documentation

**§1. Documentation is production code.** Reviewed with the same rigour, landing
in the same commit as the change it describes, verified in CI.

**§2. Documentation has one index.**
[docs/README.md](docs/README.md) is the map of every document in this
repository. A document reachable from nowhere is an orphan.

**§3. There are two documentation surfaces, and they do not overlap.** The
**documentation product** (the site) explains the design language to the
ecosystem. The **repository documentation** (`docs/`) explains this repository to
the people who build it. Nothing is documented in both; the second copy is
always the one that goes stale.

**§4. Work-package reports are not architecture.** A completion report records
what happened. Decisions extracted from it become ADRs or document edits. Future
engineers are never expected to reconstruct the architecture from a pile of
reports.

**§5. Write for the engineer who arrives in two years.** They will not have the
context, the conversation, or the people. Explain the _why_; the _how_ is in the
code.

---

## Article VIII — Decisions

**§1.** An ADR is required for any decision that is expensive to reverse: the
public API surface, an entry point, a published package, a runtime or peer
dependency, the ecosystem boundary, an accessibility contract, a versioning or
release policy, a weakening of any standard in Article VI, or the reversal of an
earlier ADR.

**§2.** ADRs are numbered sequentially, never renumbered, never deleted.

**§3.** A superseded ADR is marked superseded and kept. The rejected reasoning is
the part that stops the same debate recurring in three years.

**§4.** The process and template are in
[docs/decisions/README.md](docs/decisions/README.md).

---

## Article IX — Certification

A work package is not complete when its code works. It is complete when it is
certified.

**§1.** Certification is a written report, committed to this repository, stating
what was built, how it was verified, what was deliberately not done, and what a
future engineer should know.

**§2.** Certification is honest before it is favourable. A named gap is a managed
risk; the same gap unnamed is a trap, and the certification is worthless because
a reader cannot tell the two cases apart.

**§3.** A certification report states a verdict, and a verdict may be negative.

**§4.** A work package that changes the public API is not certified until the
release it belongs to is either published or explicitly deferred, with the
deferral recorded.

---

## Article X — Amendment

This constitution is expected to be wrong about something. A foundation that
cannot be corrected is a foundation that gets worked around.

**§1.** Amendment requires an ADR that names the clause, argues the change, and
states what becomes possible that is not possible today.

**§2.** An amendment updates this document in the same commit as its ADR.

**§3.** [Article III](#article-iii--position-in-the-ecosystem) is
ecosystem-scoped: amending it requires the agreement of the repositories it
binds, not an ADR here alone.

**§4.** Working around a clause is never an amendment. If a rule is wrong, change
the rule in daylight.

---

## Ratification

Ratified by DH-1, the founding architecture package of StudioPOD Design 2.0. The
decisions this constitution encodes are recorded individually in
[docs/decisions/](docs/decisions/README.md) as ADRs 0001 through 0010.
