# ADR 0010 — Certification is the definition of done

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

The repository already practises certification. Thirty-odd work-package reports
sit in `docs/`, and `docs/CERTIFICATION.md` describes the process. Several
reports carry genuinely useful verdicts — "CERTIFIED WITH FOLLOW-UP," and in one
case a certification that concluded an extension was **not** justified.

Two problems.

**Certification stops at the repository boundary.** A work package can be
certified while its changes remain unpublished, which means "done" and "reaching
consumers" are different events with no defined relationship. For a repository
whose entire purpose is being consumed, that is the wrong place to stop counting.
Work that sits unreleased has not shipped, however well it was certified.

**The reports have become the architecture.** Thirty-odd `DS-*.md` files in
`docs/` are the most detailed record of why things are the way they are.
Reconstructing the architecture from them requires reading all of them in order,
which nobody will do — and several contain decisions that were never promoted
into a durable document, so the report is the only place they exist.

There is also a governance gap: nothing states who may approve a release, or
whether the author may approve their own.

## Decision

**A work package is complete when it is certified. A work package that changes
the public API is not certified until its release is published or explicitly
deferred, with the deferral recorded.**

### The certification report

States: what was built · how it was verified · what was deliberately not done ·
what a future engineer should know · a verdict.

**Certification is honest before it is favourable.** A named gap is a managed
risk; the same gap unnamed is a trap, and the report is worthless because a
reader cannot tell the two cases apart.

**A verdict may be negative.** A process that cannot fail is not a check.

### Reports are not architecture

A certification report records what happened in a work package. It is **not** a
source of architectural truth.

Any decision that emerges from a work package is promoted, in the same commit, to
an ADR or to the document that owns the concern. If a decision exists only in a
report, it has not been recorded — it has been mentioned.

This applies retroactively: the existing `DS-*` reports are historical records.
Where they contain live architectural decisions, those decisions are promoted as
they are discovered, and the report stays as history.

### Release approval

A release requires an approver who is **not the sole author** of the changes.

The approver confirms: `verify:full` passes on a clean checkout · the version
class matches the change class · the changelog is complete · every break has a
migration guide · the API baseline is updated · the Preview graduation review has
happened · affected consumers have been told.

**Breaking releases additionally require the architecture owner's approval.**

An approver who cannot state what changed for consumers in one paragraph has not
reviewed the release.

## Alternatives considered

### Alternative A — Certification ends at merge

The current practice: a work package is done when its code is merged and its
report is written. Release is separate.

Rejected because it lets the repository accumulate certified-but-unreleased work,
which is invisible to consumers and gets riskier the longer it sits. It also
creates a gap in accountability: whoever eventually releases a batch of changes
inherits the verification burden for work they did not do, weeks after the
context is gone.

Tying certification to release keeps the person who made the change accountable
for it reaching the people who need it.

### Alternative B — Continuous release; every merge publishes

Remove the gap entirely by publishing on every merge.

Rejected because it is incompatible with batching breaking changes
([ADR 0006](0006-versioning-and-compatibility.md)), which exists to move upgrade
cost from consumers to us. It would also produce a release stream too noisy to
follow — a changelog nobody reads is not better than no changelog. The deferral
mechanism gives the same accountability without the churn: a work package may
defer its release, but it must say so.

### Alternative C — Author may approve their own release

Faster, and defensible for a small team.

Rejected because release approval is the **only** gate on version classification,
which is the one judgement no check can make
([ADR 0006](0006-versioning-and-compatibility.md) § Enforcement). Whether a DOM
change is load-bearing for a consumer's layout is exactly the question an author
is worst placed to answer about their own change — not through carelessness, but
because they know what they intended and consumers only see what shipped.

If the team is too small for a second approver, that is a constraint to state
openly rather than a rule to drop.

### Alternative D — Formal sign-off with a checklist tool

Structured approval workflow with recorded sign-offs.

Rejected as disproportionate. The checklist in § Release approval is short enough
to be a pull-request template. Tooling would add process weight without changing
what is actually checked, and process weight is what makes teams route around
governance.

## Consequences

### What this makes easier

- "Done" means the same thing to everyone, including consumers
- Unreleased work becomes visible instead of accumulating quietly
- Version misclassification gets a second reader
- The architecture stays in ADRs and documents rather than dissolving into
  reports

### What this makes harder

- **Work packages take longer to close**, because closing one may require a
  release.
- **A second person is required for every release**, which is a real constraint
  on a small team and will occasionally block on availability.
- **Deferrals must be written down**, which is extra ceremony for something that
  feels obvious at the time and is not obvious three months later.
- **Promoting decisions out of reports is ongoing work**, and the existing
  backlog of thirty reports will not be promoted quickly.

### What this commits us to

- Releasing, or explicitly deferring, at the close of every API-affecting work
  package
- Never approving one's own release
- Promoting decisions into ADRs rather than leaving them in reports
- Writing honest verdicts, including negative ones, and including when a
  favourable verdict would be more comfortable

## Enforcement

- **`verify:full`** — mechanical, and a precondition of release.
- **Release approval** — process obligation, enforced by branch protection
  requiring a second approver.
- **Certification report existence** — review obligation. A work package without
  a report is not merged.
- **Report honesty** — **not enforceable.** This is the part that depends
  entirely on culture, and saying so is more useful than pretending a check could
  substitute. The one structural support is Article IX § 3: a verdict may be
  negative, so a report has somewhere honest to land.

## References

- [CONSTITUTION.md Article IX](../../CONSTITUTION.md#article-ix--certification)
- [../contributing/governance.md](../contributing/governance.md)
- [../engineering/publishing.md](../engineering/publishing.md)
- [ADR 0006 — Versioning and compatibility](0006-versioning-and-compatibility.md)
- `docs/CERTIFICATION.md` — the existing process this builds on
