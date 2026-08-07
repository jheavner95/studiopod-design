# DH-3 — Framework Independence

- **Work package:** DH-3
- **Date:** 2026-08-07
- **Verdict:** **CERTIFIED WITH OBSERVATIONS.** Both objectives met and verified
  in a project with no Next.js installed. Three observations in § 8.

---

## 1. Implementation summary

DH-3 addressed the two consumer-facing framework assumptions: gap 3/17 (`next`
as a required peer dependency) and N1 (a root `"use client"` directive making
every export a client reference).

| | Before | After |
| --- | --- | --- |
| Peer dependencies | `react`, `react-dom`, **`next >=14`** | `react`, `react-dom` |
| `next/*` imports in source | 7 across 6 files | **0** |
| Server-safe emitted modules | **0 of 538** | **392 of 538 (73%)** |
| Entry points carrying `"use client"` | 4 of 5 | **0** |
| Public exports | 616 / 5 / 44 / 249 | 620 / 5 / 44 / 249 (**+4, nothing removed**) |

Two changes did the work, and they are independent.

**Framework capabilities became props.** Five components took `next/link`, one
took `next/image`, one took `useRouter`. All are now injected — `linkComponent`,
`imageComponent`, `onNavigate` — each with a working plain-HTML default. Because
the defaults work, existing call sites needed no changes at all: the
documentation application, which imports the package 636 times, typechecked with
**zero errors** after the coupling was removed.

**The package stopped bundling.** esbuild drops module-level directives when it
bundles, which is why the old build re-injected one per entry point — and that
re-injection *was* N1. The package now emits one module per source file, so each
carries its own directive or its own absence of one. React's client boundary is
defined per module; this is the output shape it was designed for.

The boundary is not a judgement call. A rule set — React hooks, custom hook
calls, `createContext`, value imports of framer-motion, browser globals, inline
event handlers on JSX props — decides which modules need the directive, and
`check-client-boundaries.mjs` fails the build if source and rules disagree in
**either** direction.

### Scope discipline

DH-3 addressed **N1, gap 3, gap 17** and nothing else. Confirmed untouched:
stability tiers (gap 5), the root-entry audit (gap 13), the tier layout (gap 8),
banned directory names (gap 6), entry scope corrections (gap 9), documentation IA
(gaps 10–12). No component was redesigned; the only behaviour change is the one
DOM-contract correction in § 4.

---

## 2. Framework assumptions removed

| Assumption | Where | Replaced by |
| --- | --- | --- |
| `next/link` | `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`, `RelationshipList` | `linkComponent` prop, default `"a"` |
| `next/image` | `AssetThumbnail` | `imageComponent` prop, default `"img"` |
| `next/navigation` `useRouter()` | `Breadcrumbs` | `onNavigate` prop, default `window.location.assign` |
| `next >=14` peer dependency | `package.json` | removed |
| `vi.mock("next/navigation")` | `Breadcrumbs.test.tsx` | a spy passed to `onNavigate` |

The last row is small but worth noting: a test that has to mock a framework
module is evidence the component depends on one. It now passes a function,
because that is what the contract asks for.

**Enforcement.** `check-framework-imports.mjs` fails on any framework specifier
in source, in emitted output, or in the manifest — and covers routers and data
layers (`react-router`, `@remix-run/react`, `@tanstack/react-query`, `swr`, …)
rather than only Next.js, since importing any of them decides an application
concern on the consumer's behalf. This closes gap 17.

---

## 3. Client boundary redesign

**Before:** the build bundled, esbuild stripped every per-module directive, and
a post-step re-added one to the top of `index.js`, `marketing.js` and
`illustrations.js`. A directive at the top of an entry marks every export
reachable from it as a client reference. Every one of the 538 modules was client.

**After:** one output module per source module, each with its own directive. An
entry point is a re-export graph and carries no directive at all.

A module is a client module when **it itself** does something only a client can
do:

| Reason | Modules |
| --- | --- |
| React hooks | 46 |
| Custom hook calls | 38 |
| Inline event handler on a JSX prop | 22 |
| framer-motion (value import) | 34 |
| `createContext` | 11 |
| Browser globals | 12 |

It is **not** a client module because it renders or re-exports one — that is the
normal server-renders-client direction, and the boundary belongs at the client
module. Nor because it passes a handler through from its own props: the parent
owns that function, and the parent is where the boundary belongs.

Two rules were added after the first classification proved too crude, and both
were found by checking the answer rather than trusting it:

- **Type-only imports do not count.** `motion/tokens.ts` and `motion/utils.ts`
  import framer-motion's `Easing`/`Transition` types and nothing else. They are
  pure helpers, and a naive scan marked them client.
- **Comments do not count.** A JSDoc line reading ``pair with `useToast()``` is
  documentation, not a hook call.

Result: **392 server-safe, 146 client.** The classifier is not a one-off script
— it is `check-client-boundaries.mjs`, and it runs in `verify`.

---

## 4. API impact

**Additive, plus one DOM-contract correction.** Nothing was removed or renamed.
Baseline moved 616 → 620 on the root entry; the other three entries are
byte-identical.

### Added — no consumer action required

| Export / prop | On | Default |
| --- | --- | --- |
| `linkComponent` | `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`, `RelationshipList` | `"a"` |
| `imageComponent` | `AssetThumbnail` | `"img"` |
| `onNavigate` | `Breadcrumbs` | `window.location.assign` |
| `LinkComponent`, `LinkComponentProps`, `ImageComponent`, `ImageComponentProps` | root entry | — |

### Changed — behaviour

**Components that navigate render a plain `<a>` unless told otherwise.**
Previously they rendered `next/link`. Everything still works; the cost of doing
nothing is a full page load instead of a client-side transition.

Migration is one prop:

```tsx
import Link from "next/link";
<Button href="/pricing" linkComponent={Link}>Pricing</Button>
```

Or once, application-wide, in the consumer's own wrapper — Design deliberately
provides no provider for this, because a context read would make every one of
these components client-only, undoing the other half of DH-3
([ADR 0013](../decisions/0013-framework-capabilities-are-props.md)):

```tsx
export const Button = (props: ButtonProps) => <DesignButton linkComponent={Link} {...props} />;
```

### Changed — DOM contract (the one real break)

**`Button` with both `href` and `loading`** rendered
`onClick={e => e.preventDefault()}`. It now renders `tabIndex={-1}` and no
handler.

The behaviour is the same: the base class already carries
`aria-disabled:pointer-events-none`, which blocks the pointer path, and
`tabIndex={-1}` closes the keyboard path. The handler had to go because an
inline event handler makes the whole component a client module — and `Button` is
the most-used export in the system, so keeping it would have forfeited the single
largest share of the benefit for a guard the stylesheet already provides.

Per [public-api.md](../architecture/public-api.md) § 1 a DOM-structure change is
breaking, so this is classified as one. **It affects only consumers asserting on
that attribute in a test.** No visual, keyboard or pointer behaviour changes.

**Version class:** `minor`, documented as a breaking change per the pre-1.0
policy ([ADR 0006](../decisions/0006-versioning-and-compatibility.md)).
`CHANGELOG.md` carries the full entry.

---

## 5. Verification

`npm run verify` — **14 of 14 steps pass**, including two new gates.

```
✔ Foundation token bridge      ✔ Package API contract          (620/5/44/249)
✔ Package build                ✔ Package CSS contract
✔ Boundary                     ✔ Package framework independence  ← new
✔ TypeScript — library & docs  ✔ Package client boundaries       ← new
✔ TypeScript — tests           ✔ Package entry points
✔ ESLint  (0 errors)           ✔ Package identity
✔ Unit & component tests       ✔ Documentation build             (76 routes)
   1013 passed / 1013
```

Against the six required demonstrations:

| Required | Evidence |
| --- | --- |
| ✓ **Server components consume Design** | 126 Server Components in the documentation application import the package, and all 76 routes prerender. Independently: `Button`, `Card`, `Stack`, `Badge`, `Caption` and `cn` render through `react-dom/server` in a bare Node project — output below. |
| ✓ **Client components consume Design** | 1013 tests pass, covering the interactive surface. Verified in a browser: the command palette (hooks, focus trap, portal) opens and filters; sidebar navigation updates active state; **zero console errors**. |
| ✓ **Documentation still builds** | 76 static routes, 0 errors, and it typechecked with **zero** errors after the coupling was removed — no call site needed changing. |
| ✓ **Cloud compatibility improved** | Both blockers Cloud named are gone: no `next` peer, and Server Components no longer open a boundary per component. Cloud is an App Router application; 73% of the package is now server-safe to it. |
| ✓ **Web compatibility preserved** | Same public API plus four types. Web's client-side routing is preserved by passing `linkComponent` — done in the documentation application at its three real navigation sites as the reference implementation. |
| ✓ **Public package builds** | 538 modules + declarations + stylesheet. Tarball packs; `check-exports` resolves all 11 entry targets. |
| ✓ **Existing verification continues passing** | Every pre-DH-3 gate still runs. Two added, none removed — see § 8 note on the one that was *replaced*. |

### The decisive test: a consumer with no Next.js

The package was packed and installed into an empty project with only `react` and
`react-dom`:

```
next is NOT installed
no unmet required peer dependency

✓ pure utility runs on the server        a c
✓ token constants import                 motionDuration.base=0.24  zIndex keys=8
✓ Button renders to static markup        <button class="focus-ring inline-flex …
✓ Button as link renders an <a>          <a href="/x" class="focus-ring inline-flex …
✓ Card + Stack + Badge compose           <div class="rounded-lg border border-border …
✓ root entry carries no "use client"     confirmed

All server-side checks passed with no Next.js installed.
```

That is objectives 1 and 2 demonstrated together, outside this repository's
toolchain, in the environment a real consumer has.

---

## 6. Unexpected discoveries

### A. The provider ADR 0007 specified would have undone DH-3's other half

ADR 0007 chose a theme-provider link adapter as the primary injection mechanism.
Implementing it alongside the client-boundary work showed the two are in direct
conflict: a provider is React context, a context read makes a component a client
component, and that would have made `Button`, `NavigationItem`, `Breadcrumbs`,
`QueueWidget` and `RelationshipList` permanently client.

`Button` is server-safe under the prop design and client-only under the provider
design. The ergonomic cost the provider would have saved, measured across the
documentation application, is **18 call sites**.

Recorded as [ADR 0013](../decisions/0013-framework-capabilities-are-props.md),
which refines rather than supersedes ADR 0007 — the decision to remove the
coupling is unchanged, only the mechanism.

### B. The API check was measuring the build shape, not the API

`check-api.mjs` parsed the single trailing `export { … }` block that a *bundled*
ESM module always ends with. The moment the package stopped bundling, it reported
**267 exports removed** from an API that had not changed by one symbol.

Its own header comment had anticipated this — "the parser needs updating for a
new tsup output shape" — which is why the failure was legible rather than
alarming. It now resolves the declaration graph with the TypeScript compiler,
which sees exactly what a consumer's TypeScript sees, through any number of
re-export hops, and does not care what the build emits next.

**This is worth flagging beyond DH-3:** the most valuable check in the repository
was coupled to an implementation detail of the build. It is not any more.

### C. Not bundling means nothing resolves specifiers

esbuild in transform mode does not rewrite imports, so emitted output kept the
source's `@/…` aliases and extensionless relative paths — neither valid ESM.
`resolve-specifiers.mjs` rewrites both against the emitted tree and fails if any
specifier does not resolve to a file that exists. 2,428 specifiers across 1,076
emitted files.

This is a bespoke build step, and it is the strongest argument for the Rollup
`preserveModules` alternative recorded in
[ADR 0014](../decisions/0014-preserve-modules-build.md) § Alternative C.

### D. 13 modules carried a directive they did not need — and 24 lacked one

Reconciling source against the rules found drift in both directions. The
under-marked ones (seven form-field components using `useId`, plus others) were
latent bugs masked entirely by the wholesale entry-level directive: they would
have broken the moment the package stopped over-marking. The over-marked ones
were pure wrappers.

Neither set was discoverable while every export was a client reference. The
wholesale directive was not just a performance defect — it was hiding
correctness defects.

### E. `next/image`'s `fill` has no plain-HTML equivalent

`AssetThumbnail` used `fill`, which is a Next.js concept, not an HTML attribute.
The default now reproduces it with `absolute inset-0 size-full object-cover`, and
an injected component pre-bound to fill mode overrides positioning with its own.
Documented on the prop, because a consumer passing a bare `next/image` without
`fill` would get a broken layout with no error.

---

## 7. Remaining conformance gaps

**Closed by DH-3:** N1, gap 3, gap 17.

| # | Gap | Severity |
| --- | --- | --- |
| 5 | No export carries a declared stability tier | High |
| 13 | Root entry built largely by `export *` rather than by decision | Medium |
| 8 | Library source is not organised into tiers; no tier boundary check | Medium |
| 6 | `lib/` and `hooks/` remain in the package, plus four `*/utils/` | Medium |
| 9 | `Empty`, `Workflow`, `Platform`, `Timeline` ship from `/marketing` | Medium |
| 10 | Documentation IA: `docs/` + `documentation/` route groups | Medium |
| 11 | Route groups named for Cloud's domain concepts | Medium |
| 12 | No Accessibility or Migration section in the documentation product | Medium |
| 16 | No bundle-composition check — tree-shaking still unverified | Medium |
| N2 | `motionDuration`/`motionEase` collide across `/tokens` and `/internal` | Medium |
| N3 | Nothing prevents Cloud or Web importing `/internal` | Medium |
| 18 | No Preview-graduation check | Low |
| 19 | No Foundation-staleness check | Low |
| 15 | The `internal` entry point's naming hazard | Low |
| **N4** | **`resolve-specifiers.mjs` is a bespoke build step** — ADR 0014 § Alt C | Low |

Gap 16 deserves a specific note. DH-2 said tree-shaking was unverified; DH-3
changes its *nature* rather than resolving it. The package no longer pre-bundles,
so what reaches a consumer's bundle is now entirely their bundler's decision
working from 538 discrete modules — which is the shape tree-shaking works best
on, but still nothing measures it.

---

## 8. Certification recommendation

# CERTIFIED WITH OBSERVATIONS

Both objectives are met and demonstrated outside this repository's toolchain. The
public API is intact but for four additive types. Every pre-existing gate still
passes and two were added.

### Observations

**1. One gate was replaced, not merely added — and the replacement inverts it.**
`check-use-client.mjs` asserted that entry points **must** carry a `"use client"`
directive; that assertion *was* N1 expressed as a check. It is deleted, and
`check-client-boundaries.mjs` asserts the opposite along with three further
conditions. This is the one place DH-3 removed an existing check, and a reviewer
should satisfy themselves the replacement is stronger. It is: the old check
tested four hardcoded filenames, the new one re-derives the correct answer for
all 538 modules from the source and fails on disagreement in either direction.
`inject-use-client.mjs` was deleted with it, having nothing left to do.

**2. The client-boundary rules are heuristic, and heuristics have edges.** The
classifier reads source text: hook calls, `createContext`, framer-motion value
imports, browser globals, inline JSX handlers. It got two things wrong before
being corrected (type-only imports, comments), which is evidence it can be wrong
again. A module that becomes client-only through a pattern not on the list would
be under-marked, and the failure would appear in a consumer's Server Component
rather than here. The mitigation is that the check runs on every build and any
new pattern shows up as a discrepancy the first time someone adds it — but a
reviewer should know the rules are enumerated, not derived from React itself.

**3. Cloud adoption is now unblocked but not demonstrated.** Both stated blockers
are gone, and a bare-consumer test proves the package works without Next.js. What
has *not* happened is Cloud actually installing it. Until that occurs, "Cloud
compatibility improved" is an inference from removing the things Cloud named, not
an observation of Cloud succeeding. The proving ground is a Cloud integration,
and it is the natural next package.

### Conditions

None. All three observations are for the next package's attention.

---

## 9. Recommended next package

**DH-4 — Cloud Integration.** Cloud is the reason gaps 3 and 17 and N1 were
prioritised; consuming the package there converts every DH-3 claim from inference
to observation, and any defect it surfaces will be the kind only a second real
consumer finds — which is exactly what DH-2's documentation split proved about
first consumers.

The alternative, **DH-4 — API Surface** (gaps 5, 13, 8, 6), is the larger body of
work and the prerequisite for 1.0. It is better done after a second consumer has
exercised the surface, not before.
