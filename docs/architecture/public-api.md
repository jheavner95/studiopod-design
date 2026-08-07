# Public API strategy

**Owns:** what "stable" means, how the surface changes, and what a consumer is
entitled to rely on.

The premise: **components are public APIs**
([CONSTITUTION.md](../../CONSTITUTION.md) Article II § 2). Consumers cannot see
our reasoning, only our breaks.

---

## 1. What is actually public

A common failure is to treat the TypeScript signature as the API. It is a
fraction of it. Everything below is contract, and changing any of it is an API
change:

| Surface                    | Example of a break that types would not catch                        |
| -------------------------- | --------------------------------------------------------------------- |
| Props and their types      | (types do catch these)                                                |
| Default prop values        | `size` defaulting to `md` instead of `sm`                             |
| DOM structure              | A wrapper `<div>` appearing inside a flex parent, breaking layout     |
| Rendered element           | `<button>` becoming `<div role="button">`                             |
| Accessibility semantics    | Losing a label association, or a focus trap                           |
| Keyboard behaviour         | `Escape` no longer closing an overlay                                 |
| Controlled/uncontrolled    | A component that accepted no `value` now requiring one                |
| Class-name surface         | A documented class hook disappearing                                  |
| CSS custom properties      | Renaming a variable a consumer themed against                         |
| Token semantics            | `motionDuration.base` changing meaning, not just value                |
| Entry-point membership     | An export moving from `.` to `./marketing`                            |
| Peer dependency ranges     | Narrowing `react` support                                             |

**Ref forwarding, `className` pass-through, and `...rest` spreading are part of
the contract wherever they exist.** A component that stops forwarding its ref has
broken every consumer that measured it.

---

## 2. Stability tiers

Every export carries exactly one tier, declared in
`packages/design/api-baseline/<entry>.json` — a map of export name to tier that
ships in the package. The tier is **declared, never inferred**, and an
undeclared export fails the API check.

DH-5 assigned the first 1,175 of them. See
[ADR 0015](../decisions/0015-stability-tiers.md) for the criteria and for why
"at least one real consumer" was replaced by "pinned by tests" — with one
consumer, the original criterion admitted ten exports and made the tier
meaningless.

### Stable

The default expectation. Changes follow the full deprecation procedure. Documented,
tested, accessibility-verified, and covered by a visual baseline.

An export becomes Stable when it has: complete documentation, unit and
accessibility tests, at least one real consumer, and a settled API shape.

### Preview

Available, documented as Preview, and **may change in any release** including a
patch. Preview exists so a consumer can use a component before its shape is
settled, at a stated price.

Three rules keep Preview from becoming a permanent parking space:

1. Preview exports are named in the changelog on every change.
2. Consumers are expected to pin exactly when they depend on Preview.
3. **An export that has been Preview across three consecutive minor releases is
   promoted to Stable or removed.** There is no fourth option. The graduation
   review is part of release approval.

That third rule is the one that matters. A Preview tier without a forced exit
becomes a way to avoid ever making a decision, and consumers end up depending on
"temporary" APIs for years.

### Internal

Not exported from any entry point. Not documented. No compatibility promise.

**If it is reachable from a _public_ entry point, it is public, whatever it is
named.** Naming a module `_internal` does not make it private; not exporting it
does. The old `src/_internal/` directory was a build-time shim rather than a
privacy mechanism, and DH-2 deleted it.

There is exactly one exception, and it is declared rather than implied:
`@studiopod/design/internal` is **not a public entry point**. It exists so the
documentation application can consume the engine internals it documents without
those becoming public API, it carries no compatibility promise, and no
application may import it. [ADR 0011](../decisions/0011-internal-entry-point.md)
records the amendment and the four alternatives that lost.

---

## 3. Semantic versioning

The repository is currently in `0.x`. SemVer permits breaking changes freely
before `1.0.0`. **This package does not use that latitude**, and that policy —
adopted before DH-1 and preserved by it — is one of the strongest pieces of
existing practice here.

| Change                                                        | Pre-1.0        | Post-1.0 |
| ------------------------------------------------------------- | -------------- | -------- |
| Compatible defect fix                                         | patch          | patch    |
| Accessibility correction with no API shape change             | patch          | patch    |
| Visual correction within an existing semantic contract        | patch          | patch    |
| New component, new optional prop, new token, new export       | minor          | minor    |
| Introducing a deprecated alias                                | minor          | minor    |
| **Any consumer-visible break** (see § 1)                      | **minor** ¹    | major    |
| Accessibility regression                                      | **minor** ¹    | major    |
| Entry-point change                                            | **minor** ¹    | major    |
| Peer range narrowing                                          | **minor** ¹    | major    |

¹ The minor digit is the only digit SemVer allows to move pre-1.0. A breaking
change that bumps it is **documented, reviewed, and changelogged exactly as a
major** — a real breaking-change entry, never folded into a routine minor.

### The road to 1.0.0

`1.0.0` is not a date and not a feature count. It is earned by evidence:

1. **Two independent consumers in production.** One consumer cannot prove an API
   is general; it can only prove it fits that consumer.
2. **Every root-entry export is Stable-tier**, or has been removed.
3. **No framework coupling** — the `next` peer dependency is gone.
4. **The documentation product covers every Stable export.**
5. **One release cycle with no breaking change**, demonstrating the surface has
   settled.

Cutting `1.0.0` before those hold buys a number and sells the thing the number is
supposed to mean.

---

## 4. Deprecation

Nothing is removed without a window. The procedure:

1. **Mark** the export `@deprecated` in JSDoc, naming its replacement, so it
   surfaces in editor tooltips.
2. **Document** the migration in the changelog under `Deprecated`, and in the
   documentation product's migration section — with the actual before/after, not
   a sentence saying it moved.
3. **Keep it working** as a real re-export or alias, never a stub that warns and
   returns nothing.
4. **Wait at least one full minor release.** Deprecate in `N.M.0`; the earliest
   removal is `N.(M+1).0`.
5. **Remove** as a documented breaking change.

**A codemod is expected for any deprecation affecting more than a handful of call
sites.** Migration guidance that consists only of prose transfers our work to
every consumer, multiplied by the number of consumers. That is the wrong
direction for a repository whose whole premise is that consumers should not have
to think about it.

---

## 5. The API contract file

`API.md` in the package is the frozen contract. It enumerates:

- The public entry points, and that the set is frozen. `./internal` is
  deliberately absent: it has no contract to freeze.
- The stability model, and every export's tier — the machine-readable form is
  `api-baseline/<entry>.json`, which ships in the package
- Named exceptions, with reasons
- The dependency contract
- Portability caveats

**The build fails if the export surface and the contract disagree.** That check
already exists (`check-api`) and is preserved. It is the single most valuable
mechanical check in the repository, because it converts "we should be careful
about exports" into something that cannot be forgotten.

### Baselines

`api-baseline/*.json` snapshots the surface per entry. A diff is not a failure —
it is a **prompt**: the reviewer must confirm the version bump matches the
change class in § 3. The baseline update lands in the same commit as the API
change.

---

## 6. What consumers are entitled to

Stated as promises, because consumers make decisions on them:

1. **A patch upgrade will not change how anything looks or behaves**, beyond
   fixing something that was wrong.
2. **A minor upgrade will not break a Stable export** — pre-1.0 minors that do
   break are labelled unmistakably in the changelog, and the changelog is the
   contract.
3. **Every break has a migration note**, and a codemod where the scale warrants.
4. **Preview is labelled everywhere it appears** — in `API.md`, in JSDoc, and in
   the documentation product. A consumer never discovers a Preview dependency by
   being broken.
5. **Accessibility does not regress silently.** If it regresses, the version says
   so.

---

## 7. Reviewing an API change

A reviewer of any change touching the public surface must answer, in the pull
request:

- Which tier does each new or changed export carry?
- Does this break anything in § 1, including the parts types do not check?
- Is the version bump the right class?
- Is the baseline updated, the changelog written, and the migration documented?
- Could this be additive instead? (Adding an optional prop nearly always beats
  changing an existing one.)
- Is this export earning its place, or is it a barrel accident?

That last question deserves emphasis. The root entry is currently very large,
and a meaningful share of it arrived through `export * from` rather than through
a decision. Auditing it against this document is DH-2 work.

---

## 8. References

- [ADR 0005 — Public API tiers](../decisions/0005-public-api-tiers.md)
- [ADR 0006 — Versioning and compatibility](../decisions/0006-versioning-and-compatibility.md)
- [packages.md](packages.md)
- [../engineering/publishing.md](../engineering/publishing.md)
- [../consuming/README.md](../consuming/README.md)
