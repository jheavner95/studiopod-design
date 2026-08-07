# DH-1 — Design Architecture Foundation

- **Work package:** DH-1
- **Date:** 2026-08-06
- **Verdict:** **CERTIFIED — architecture only. The repository does not yet
  conform.**

---

## 1. What this work package was

DH-1 establishes what `studiopod-design` **is**: its constitution, its position
in the ecosystem, its package architecture, its public API strategy, its
publishing model, its documentation architecture, its governance, and how its
success is measured.

It is the Design equivalent of Cloud's RF-1: a repository architecture package,
not an implementation package.

**DH-1 did not migrate components, redesign the library, or change a single line
of shipping code.** That is deliberate and is the reason the verdict is qualified.

---

## 2. What was built

### Binding documents

| Artefact                                                     | Establishes                                              |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| [CONSTITUTION.md](../../CONSTITUTION.md)                     | Ten articles. Supreme authority within this repository.  |
| [CLAUDE.md](../../CLAUDE.md)                                 | The working guide and the non-negotiables                |

### Architecture

| Document                                                                | Owns                                                        |
| ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| [architecture/overview.md](../architecture/overview.md)                 | The shape of the repository, the three component tiers       |
| [architecture/boundaries.md](../architecture/boundaries.md)             | Ownership across Foundation, Design, and applications        |
| [architecture/packages.md](../architecture/packages.md)                 | One package, entry-point scopes, the second-package test     |
| [architecture/repository-structure.md](../architecture/repository-structure.md) | The target tree                                      |
| [architecture/public-api.md](../architecture/public-api.md)             | Tiers, SemVer, deprecation, the API contract                 |
| [architecture/documentation.md](../architecture/documentation.md)       | The documentation product's information architecture         |
| [engineering/publishing.md](../engineering/publishing.md)               | Registry, cadence, release process, compatibility            |
| [engineering/quality-gates.md](../engineering/quality-gates.md)         | The verification chain and what each gate proves             |
| [consuming/README.md](../consuming/README.md)                           | How Cloud, Web, and future applications consume Design       |
| [contributing/governance.md](../contributing/governance.md)             | Decision rights, review, release approval, promotion         |
| [product/success-metrics.md](../product/success-metrics.md)             | How success is measured, and what is deliberately not        |

### Decisions

Ten ADRs, 0001 through 0010 — [decisions/README.md](../decisions/README.md).

---

## 3. The decisions that matter most

Three of the ten carry the weight. The rest are consequences.

**[ADR 0003](../decisions/0003-library-owns-its-source.md) — the library owns its
source.** The published package currently compiles the documentation site's `src/`
via `baseUrl: "../.."`, and two esbuild resolver plugins exist to amputate
documentation chrome back out of the bundle. Those plugins are the boundary,
hand-implemented per barrel, catching only what someone remembered. This is the
largest structural correction DH-1 makes, and it is a precondition for two others
being truthful.

**[ADR 0007](../decisions/0007-framework-neutrality.md) — no framework coupling.**
`next` is a required peer dependency for every consumer, sourced from
`next/link` in the brand compositions. It is the stated reason Cloud declined to
consume the package. Under Cloud ADR 0033 that is Design's defect, not Cloud's,
and this ADR removes it via link injection.

**[ADR 0004](../decisions/0004-one-published-package.md) — one package.** Against
real pressure to split. Entry points give the isolation consumers need; package
boundaries would add three release processes to solve a problem that is already
solved, and would fail the "divergent consumers" test — no consumer wants
marketing and not the core.

---

## 4. Assumptions challenged

The brief asked for this explicitly. Four were challenged and the outcomes
differed.

**The ecosystem ADR is in the wrong repository.** Cloud ADR 0033 is
ecosystem-scoped but lives in the leaf repository furthest down the dependency
chain — the one with the least standing to define what its upstreams own. It
binds Foundation, which must never depend on Cloud.
[ADR 0002](../decisions/0002-ecosystem-architecture.md) recommends relocating it
to Foundation and adopts it here in the meantime. **This is a recommendation to
the ecosystem; Design cannot move another repository's decision record.**

**"Design is blocked by Cloud's refusal to consume it" is backwards.** The
blockers Cloud named — a `next` coupling and an unwanted marketing surface — are
Design's defects. One is fixed by ADR 0007; the other was already solved by
subpath exports and needed stating rather than building.

**The marketing entry was examined for removal and kept.** The case for moving
brand compositions to Web is real — they look like Web's page sections. They stay
because brand grammar is ecosystem-owned by the same logic that puts colour in
Foundation, and because Cloud has marketing-adjacent surfaces scheduled. Two
corrections follow: four exports in `/marketing` are not marketing compositions
and belong in the root entry, and brand compositions must stop being the reason
the package couples to Next.js. **If `/marketing` still has one consumer in two
years, this should be revisited by ADR rather than defended out of habit.**

**Documentation route groups named for Cloud's domain are an ownership
inversion.** `capabilities/`, `platforms/`, `production/`, `workflows/` describe
Cloud's business model. Design documenting them asserts ownership it does not
have — and it showed up in the information architecture before it showed up in
the code, which is typical.

---

## 5. What was preserved

DH-1 was explicitly told not to discard strong existing ideas. These were kept
substantially unchanged, because they are good:

| Preserved                                              | Why                                                              |
| ------------------------------------------------------ | ----------------------------------------------------------------- |
| Pre-1.0 major-version discipline (RM-5.5)              | Correct, and unusually disciplined. Expanded, not replaced.      |
| The `API.md` contract and `check-api`                  | The most valuable mechanical check in the repository             |
| The token bridge and `token:bridge-check`              | The only thing preventing a second canonical owner of the brand  |
| The tiered verification runner (`fast ⊂ default ⊂ full`)| Well-designed. Extended with new gates, not rebuilt.             |
| Transactional releases                                 | Learned expensively; kept                                        |
| `identity-check`, `css-check`, `use-client-check`, `exports-check` | Each catches a real class of defect                  |
| `engineering-notes/`                                   | 23 notes of durable architectural conclusions                    |
| Certification as definition of done                    | Already practised. Extended to cover release.                    |

The versioning policy deserves specific mention: declining SemVer's pre-1.0
latitude, before any consumer existed, was the right call made early.
[ADR 0006](../decisions/0006-versioning-and-compatibility.md) expands what counts
as breaking; it does not weaken the discipline.

---

## 6. How this was verified

Honestly: **DH-1 produced no executable artefacts, so there is no test result to
report.** What was verified:

| Claim                                        | How                                                             |
| -------------------------------------------- | ---------------------------------------------------------------- |
| The shared-source problem is real            | Read `packages/design-system/tsconfig.json` (`baseUrl: "../.."`, `@/* → src/*`) and both esbuild plugins in `tsup.config.ts` |
| The `next` coupling is real and required     | Read `packages/design-system/package.json` peer dependencies      |
| The documentation IA problems are real       | Enumerated the route tree — 46 `application-components` routes, both `docs/` and `documentation/`, four Cloud-domain groups |
| Banned directory names are present           | `src/lib/` (20 files), `src/hooks/` (11 files), four `*/utils/`   |
| Documentation tooling sits in the library path | Read `src/lib/` — `showcase-registry`, `docs-contracts`, `design-system-navigation`, `certification*`, `release-*` |
| The ecosystem boundary as stated             | Read Cloud ADR 0033 in full                                       |
| Existing practice worth preserving           | Read `VERSIONING.md`, `API.md` headings, `verify.mjs`, package scripts |

**Not verified:** that the target structure builds, that tree-shaking behaves as
[ADR 0004](../decisions/0004-one-published-package.md) assumes, or that link
injection is sufficient for every navigating component. All three are DH-2
questions, and if any fails, the ADR that depends on it must be amended rather
than worked around.

---

## 7. Conformance gap

**The repository does not currently conform to the architecture DH-1
establishes.** This is the honest state and it is why the verdict is qualified.
Nothing below is a surprise discovered later; it is the DH-2+ work list.

| # | Gap                                                                            | Governing decision | Severity |
| - | ------------------------------------------------------------------------------ | ------------------ | -------- |
| 1 | Package compiles the documentation site's `src/` via `baseUrl: "../.."`        | ADR 0003           | High     |
| 2 | Two esbuild plugins amputate doc chrome from the bundle                        | ADR 0003           | High     |
| 3 | `next` is a required peer dependency                                           | ADR 0007           | High     |
| 4 | Documentation site imports `@/components/...`, never the public API            | ADR 0003, 0009     | High     |
| 5 | No export carries a declared stability tier                                    | ADR 0005           | High     |
| 6 | `src/lib/`, `src/hooks/`, and four `*/utils/` directories exist                | Article IV § 4     | Medium   |
| 7 | Documentation-site tooling lives inside the library's resolution path          | ADR 0003           | Medium   |
| 8 | Library source is not organised into tiers; no boundary check exists           | Article IV § 5     | Medium   |
| 9 | `Empty`, `Workflow`, `Platform`, `Timeline` ship from `/marketing` and are patterns | ADR 0004      | Medium   |
| 10| Documentation IA: `docs/` + `documentation/`, 46-route `application-components` | ADR 0009           | Medium   |
| 11| Route groups named for Cloud's domain concepts                                 | ADR 0009, 0002     | Medium   |
| 12| No Accessibility or Migration section in the documentation product             | ADR 0009           | Medium   |
| 13| Root entry built largely by `export *` rather than by decision                 | ADR 0005           | Medium   |
| 14| Directory `packages/design-system` vs package `@studiopod/design`              | ADR 0003           | Low      |
| 15| `src/_internal/` is a build shim, readable as a privacy mechanism              | ADR 0005           | Low      |
| 16| Bundle composition check does not exist                                        | ADR 0004           | Medium   |
| 17| Framework import check does not exist                                          | ADR 0007           | High     |
| 18| Preview graduation check does not exist                                        | ADR 0005           | Low      |
| 19| Foundation staleness check does not exist                                      | ADR 0008           | Low      |

Gaps 16–19 are the checks DH-1's decisions promise and that do not exist yet.
They are listed separately from the structural gaps because a decision whose
enforcement is unbuilt is a decision that depends on memory — which is the
condition this whole package exists to end.

### Suggested sequencing

DH-2 should take **1, 2, 7, 14, 4** as one arc — they are the same problem, and
splitting them leaves the repository in a worse intermediate state than either
end. **3 and 17** are next and unblock Cloud, which is the highest-value external
outcome available. **5, 13, 8, 6** are the API and structure audit. **10, 11, 12**
are the documentation product. **9, 15, 16, 18, 19** are cleanup.

The migration in gap 1 touches roughly 560 files and must land in reviewable
stages with the package verified at each — a file that moves to the wrong tier is
an unintended API change.

---

## 8. What a future engineer should know

**The current tree is not precedent.** Where it contradicts this architecture, the
architecture wins and the tree is a migration target. That is the single most
important thing to carry forward, because a repository whose documented
architecture and actual architecture diverge teaches readers to trust neither.

**The build plugins are load-bearing until ADR 0003 lands.** Do not remove them
opportunistically. They are the only thing preventing documentation code from
shipping, and they must be deleted as part of the source split, not before it.

**`src/lib/` is two things.** Roughly half is library code that needs a proper
home; the rest is documentation-site tooling that has been sitting inside the
library's resolution path. Sort it before moving it.

**The `next` removal is a breaking change for Web**, which currently gets Next.js
navigation behaviour for free. It needs a migration guide and probably a codemod.

**Three ADRs rest on unverified assumptions.** ADR 0004 assumes tree-shaking
works once the source split lands; ADR 0007 assumes link injection covers every
navigating component; ADR 0003 assumes the tier sort is tractable. If any proves
false, amend the ADR — Article X — rather than quietly working around it.

**Cloud ADR 0033 is canonical and lives elsewhere.** Always reference it by
repository. If it moves to Foundation as
[ADR 0002](../decisions/0002-ecosystem-architecture.md) recommends, Article III's
references must be updated in the same commit.

---

## 9. Verdict

**CERTIFIED — architecture only.**

DH-1 delivers a complete, internally consistent architecture package. Every
required deliverable is present: constitution, package architecture, public API
strategy, publishing strategy, consumption model, repository boundaries,
documentation architecture, governance, and success metrics. Ten ADRs record the
decisions with their alternatives and their costs. **DH-2 can begin without
further architectural clarification**, which was the stated bar.

The qualification is not a formality. **The repository does not conform to this
architecture**, and the gap is 19 items, several of them large. Reading these
documents will tell you what the repository should be; it will not tell you what
it currently is. Section 7 is the difference, and it is deliberately complete —
a named gap is a managed risk, and the same gap unnamed would make this report
worthless.

Two claims in this package are **unverified by construction**: that the target
structure builds, and that tree-shaking behaves as ADR 0004 assumes. Both are
DH-2's first real tests, and either could force an amendment.
