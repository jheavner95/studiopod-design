# Publishing

**Owns:** how a change becomes a version consumers can install.

---

## 1. What is published

One package, `@studiopod/design`, to **GitHub Packages**
(`https://npm.pkg.github.com`).

The registry choice is deliberate: the package is not open source, the consumers
are all inside the same GitHub organisation, and the alternative — a private
registry — adds infrastructure to own for no capability we need. It costs
consumers one `.npmrc` line and an authentication token, which is documented in
[../consuming/README.md](../consuming/README.md) § 2.

The documentation site deploys separately and is not versioned with the package.
It always documents the **latest published version**, with older versions
reachable through the Releases section rather than through a versioned site.
Maintaining N documentation sites is a cost that only pays off when consumers are
routinely several majors behind — and if they are, that is the problem to fix.

---

## 2. Release cadence

**Releases are event-driven, not calendar-driven**, within stated bounds.

| Class                | Trigger                                          | Expected latency        |
| -------------------- | ------------------------------------------------- | ----------------------- |
| Patch                | A defect is fixed                                 | Within days             |
| Minor                | A work package completes                          | On certification        |
| Breaking             | A work package completes                          | Batched — see below     |
| Security             | Immediately                                       | Same day                |

**Breaking changes are batched.** They accumulate on a release branch and ship
together, at most **once per quarter**, with one migration guide covering the
set.

The reasoning: the cost of a breaking release is paid by consumers, and it is
nearly fixed regardless of how many breaks it contains. Four separate breaking
releases in a quarter cost four upgrade projects per consumer; one release
containing four breaks costs one. Batching moves cost from consumers to us, which
is the correct direction.

The counter-cost is honest: a break that lands early waits, and the deprecated
code stays alive longer. Accepted.

**A calendar bound applies anyway:** if there are unreleased consumer-visible
changes older than six weeks, the release is overdue. Work that sits unreleased
is work that has not shipped, and long gaps make each release riskier than the
last.

---

## 3. The release process

1. **Verify.** `npm run verify:full` passes on a clean checkout. Non-negotiable.
2. **Classify.** Determine the change class per
   [../architecture/public-api.md](../architecture/public-api.md) § 3. The
   classification is stated in the release pull request, not inferred from the
   version number.
3. **Baseline.** `api-baseline/*.json` matches the built surface. A diff must be
   accounted for in the changelog.
4. **Changelog.** Every consumer-visible change has an entry under
   `Added`/`Changed`/`Deprecated`/`Removed`/`Fixed`. "Internal refactor, no API
   change" is an acceptable line; **silence about an export change is not.**
5. **Migration.** Every break has a migration page and, where scale warrants, a
   codemod.
6. **Preview graduation review.** Any export at Preview for three consecutive
   minors is promoted or removed. This gate is part of the release, not a
   separate cleanup that never happens.
7. **Approve.** Release approval per
   [../contributing/governance.md](../contributing/governance.md) § 4.
8. **Publish.** Tagged, versioned, `prepublishOnly` runs the package's own
   verify chain.
9. **Announce.** Consumers are told what changed and whether they need to act.

**The release is transactional.** A failure at any step leaves nothing
half-published — no tag without an artefact, no artefact without a changelog.
The repository already learned this the expensive way; the fix is preserved.

---

## 4. Compatibility policy

What consumers can rely on, stated as ranges rather than intentions.

| Dependency              | Supported                    | Change policy                                         |
| ----------------------- | ---------------------------- | ----------------------------------------------------- |
| `react`, `react-dom`    | `^18 \|\| ^19` (peer)        | Narrowing is a breaking change                        |
| `next`                  | **Not a dependency**         | Removing it is the DH-2 deliverable; see ADR 0007     |
| Node (build-time)       | Current LTS and one prior    | Dropping a line is a breaking change                  |
| `@studiopod/foundation` | Exact, build-time only       | See § 5                                               |
| Tailwind                | v4                           | A major move is a breaking change for consumers       |
| Module format           | ESM only                     | Adding CJS would be additive; dropping ESM is not     |

**Browser support** follows the consuming applications' targets. Design does not
maintain a separate, looser matrix — that would be a promise nobody verifies.

### The Tailwind question

The package ships a stylesheet built against Tailwind v4. This is a real coupling
and it is worth naming rather than hiding: a consumer on a different Tailwind
major cannot use the stylesheet as shipped.

It is accepted because every StudioPOD application uses Tailwind v4 and a
framework-neutral CSS output would mean abandoning the utility composition the
components are written in. If a future consumer cannot take Tailwind v4, that is
an ADR, not a workaround.

---

## 5. The Foundation relationship

`@studiopod/foundation` is a **build-time input**, pinned exactly, consumed
through the token bridge. Its values are baked into Design's generated tokens and
stylesheet. It is not a runtime dependency and not a peer dependency.

The consequence, stated plainly: **a Foundation token change does not reach
applications until Design releases.** Design is on the critical path for every
brand change.

This is accepted, and the reason is that the alternative is worse. A runtime
Foundation dependency would let a consumer resolve a Foundation version Design
was never built against — meaning a semantic token could reference a value that
no longer exists, at runtime, in production, with no build-time signal. A slow
path is better than a silent one.

The cost is mitigated by policy: **a Foundation release that changes values gets
a Design release within one week.** If that becomes routinely hard, the
constraint to revisit is the release process, not the dependency direction.
[ADR 0008](../decisions/0008-foundation-is-a-build-time-input.md).

---

## 6. What consumers can expect

1. **Changelog before code.** Every release has a written entry before it is
   installable.
2. **No surprise breaks.** A break is labelled unmistakably, pre-1.0 included.
3. **A migration path for every break**, with a codemod where scale warrants.
4. **No unannounced dependency additions.** A new runtime dependency is something
   every consumer installs, so it requires an ADR.
5. **Security patches on the oldest supported minor**, not only on latest.
6. **Support for the current minor and one prior.** Older versions receive
   security fixes only. Stated so consumers can plan, rather than discovering the
   policy when they need it.

---

## 7. References

- [ADR 0006 — Versioning and compatibility](../decisions/0006-versioning-and-compatibility.md)
- [ADR 0008 — Foundation is a build-time input](../decisions/0008-foundation-is-a-build-time-input.md)
- [../architecture/public-api.md](../architecture/public-api.md)
- [../consuming/README.md](../consuming/README.md)
- [quality-gates.md](quality-gates.md)
