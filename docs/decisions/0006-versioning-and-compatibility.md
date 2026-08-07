# ADR 0006 — SemVer with pre-1.0 major discipline, and the road to 1.0

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

The package is at `0.14.0`. SemVer permits breaking changes freely before
`1.0.0` — only the minor digit must move — which means a `0.x` version number
conveys almost nothing about compatibility.

A previous work package (RM-5.5) declined that latitude and adopted a policy:
every consumer-visible break is treated with major-version discipline even
pre-1.0, documented and reviewed as a major, bumping the only digit SemVer allows
to move. **That policy is correct and DH-1 preserves it.** It is one of the
strongest pieces of existing practice in the repository.

Three things remain unresolved.

**What counts as breaking is under-specified.** The existing policy enumerates
removed exports, required prop changes, behavioural contract changes, token
semantics, entry-point changes, and peer-range narrowing. That list is good and
it is incomplete: it does not name DOM structure, rendered element, ref
forwarding, `className` pass-through, CSS custom property names, or accessibility
regressions — every one of which breaks real consumers while leaving type
signatures untouched.

**There is no stated route to 1.0.0.** A package can stay at `0.x` indefinitely,
and packages that do tend to stay there because nobody ever has to justify not
moving. Meanwhile `0.x` signals instability to consumers who are, in fact,
depending on it in production.

**There is no stated support window.** Consumers cannot plan upgrades without
knowing which versions receive fixes.

## Decision

**SemVer, with pre-1.0 major discipline, and an evidence-based route to 1.0.0.**

### Change classification

| Change                                                     | Pre-1.0     | Post-1.0 |
| ---------------------------------------------------------- | ----------- | -------- |
| Compatible defect fix                                      | patch       | patch    |
| Accessibility correction, no API shape change              | patch       | patch    |
| Visual correction within an existing semantic contract     | patch       | patch    |
| New component, optional prop, token, or export             | minor       | minor    |
| Introducing a deprecated alias                             | minor       | minor    |
| **Any consumer-visible break**                             | **minor** ¹ | major    |

¹ Documented, reviewed, and changelogged **exactly as a major** — a real
breaking-change entry, never folded into a routine minor.

### What "consumer-visible break" means

Expanded beyond the type signature, because that is where the existing policy was
thin. All of these are breaking:

- Props, defaults, and their types
- **DOM structure** — an added wrapper element that changes layout in a flex or
  grid parent
- **The rendered element** — `<button>` becoming `<div role="button">`
- **Ref forwarding, `className` pass-through, and `...rest` spreading**, wherever
  they exist
- **Accessibility semantics** — a lost label association, a removed focus trap, a
  keyboard interaction that stops working
- **Keyboard behaviour** — `Escape` no longer closing an overlay
- Controlled/uncontrolled behaviour
- Documented class-name hooks and CSS custom property names
- Token semantics — what a token *means*, not just its value
- Entry-point membership — an export moving between entries
- Peer dependency range narrowing

**Accessibility regressions are breaking changes.** A consumer who upgrades and
loses keyboard access has been broken, and the version number must say so. This
follows from
[CONSTITUTION.md Article II § 5](../../CONSTITUTION.md#5-accessibility-is-a-contract-not-a-quality)
and it is the clause most likely to be argued with under deadline.

### Deprecation

1. Mark `@deprecated` in JSDoc, naming the replacement
2. Document the migration — changelog and the documentation product's Migration
   section, with actual before/after code
3. Keep it working as a real alias, never a warning stub
4. Wait **at least one full minor release**: deprecate in `N.M.0`, remove no
   earlier than `N.(M+1).0`
5. Remove as a documented breaking change

**A codemod is expected for any deprecation affecting more than a handful of call
sites.** Prose-only migration guidance transfers our work to every consumer,
multiplied by the number of consumers — the wrong direction for a repository
whose premise is that consumers should not have to think about it.

### The road to 1.0.0

`1.0.0` is earned by evidence, not scheduled:

1. **Two independent consumers in production.** One consumer cannot prove an API
   is general — only that it fits that consumer.
2. **Every root-entry export is Stable-tier**, or has been removed.
3. **No framework coupling** — the `next` peer dependency is gone
   ([ADR 0007](0007-framework-neutrality.md)).
4. **The documentation product covers every Stable export.**
5. **One full release cycle with no breaking change**, demonstrating the surface
   has settled.

### Support window

The **current minor and one prior** receive fixes. Older versions receive
security fixes only. Stated so consumers can plan rather than discovering the
policy when they need it.

## Alternatives considered

### Alternative A — Use SemVer's pre-1.0 latitude

Break freely at `0.x`; it is what the specification permits.

Rejected, and this repository already rejected it once. Web and Cloud are real
consumers making real integration decisions. "Pre-1.0 so anything goes"
converts the version number into decoration, and a consumer who cannot trust the
version reads every diff — which is the cost the whole publishing apparatus
exists to remove.

### Alternative B — Go to 1.0.0 immediately

The package has consumers; call it 1.0 and get honest major versions.

Rejected because it would freeze a surface that is demonstrably not ready. The
root entry has not been audited against
[ADR 0005](0005-public-api-tiers.md)'s tiers, the `next` coupling is unresolved,
and Cloud — one of the two consumers whose existence would justify 1.0 — cannot
currently consume the package at all. Declaring 1.0 now buys the number and sells
what it is supposed to mean, then spends 2.0 and 3.0 fixing what should have been
fixed first.

### Alternative C — Calendar-based versioning

Ship `2026.8.0` and drop compatibility semantics from the version entirely.

Rejected because it moves the entire compatibility question into the changelog.
That is defensible for applications and wrong for a library: a consumer's
dependency range is the primary mechanism for deciding whether to accept a
change, and calendar versions make every range meaningless.

### Alternative D — Break-early, release-often; no batching

Ship each break as it lands.

Rejected. The cost of a breaking release is paid by consumers and is nearly fixed
regardless of how many breaks it contains. Four breaking releases in a quarter
cost four upgrade projects per consumer; one release with four breaks costs one.
Batching moves cost from consumers to us, which is the correct direction — and
[../engineering/publishing.md](../engineering/publishing.md) § 2 accepts the
honest counter-cost, which is that deprecated code lives longer.

## Consequences

### What this makes easier

- Consumers can take a patch or minor without reading a diff
- Breaking changes become planned events with migration paths
- The definition of "breaking" covers what actually breaks consumers, not only
  what TypeScript notices
- 1.0.0 becomes a decision with criteria rather than a mood

### What this makes harder

- **Small improvements become breaking changes.** Removing an unnecessary wrapper
  `<div>` is a real break under this policy, and it will feel disproportionate.
  It is not: a consumer's grid layout does not care that the change was tidy.
- **Every DOM change needs a compatibility judgement**, which slows refactoring
  of internals that turn out not to be internal.
- **1.0.0 may be a long way off**, and `0.x` will keep signalling instability to
  consumers who are depending on the package in production.
- **Codemod expectations add real work** to every deprecation.

### What this commits us to

- Classifying every change honestly, including when the honest class is
  inconvenient
- Batching breaking changes to at most quarterly
- Writing a migration guide for every break, permanently — old guides are never
  pruned, because a consumer upgrading across four versions reads all four
- Not reaching 1.0.0 until the five criteria hold

## Enforcement

- **`api-check` and `api-baseline`** — mechanical for the export surface. A diff
  prompts a version-class review.
- **Visual regression baselines** — mechanical for DOM and appearance changes,
  which is how the non-type-visible breaks get caught.
- **Accessibility tests** — mechanical for a11y regressions.
- **Version-class judgement** — review obligation at release approval. **Not
  mechanically enforced**, and it cannot be: no tool can decide whether a DOM
  change is load-bearing for a consumer's layout. This is the weakest link in the
  policy and the reason release approval requires a second person.

## References

- [../architecture/public-api.md](../architecture/public-api.md)
- [../engineering/publishing.md](../engineering/publishing.md)
- [ADR 0005 — Public API tiers](0005-public-api-tiers.md)
- `packages/design-system/VERSIONING.md` — the RM-5.5 policy this preserves
