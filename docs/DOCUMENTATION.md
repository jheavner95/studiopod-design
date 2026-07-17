# Documentation & Showcase Infrastructure

The contributor guide to how this site's documentation stays accurate as the design system grows: page contracts, how pages register, how examples register, what's validated automatically, and how to add something new. For the audit and architecture reasoning behind these choices, see [docs/engineering-notes/11-documentation-infrastructure.md](./engineering-notes/11-documentation-infrastructure.md).

`NAV_REGISTRY` (`src/lib/design-system-navigation.ts`) is the one source of truth for every routable page's metadata — title, description, badge, section/group placement, and its relationships to other pages. Everything in this document exists to keep that registry and the real `page.tsx` files it describes from drifting apart, and to make new pages cheap to wire up correctly the first time.

## 1. Philosophy

- **The registry describes pages; it doesn't generate them.** `page.tsx` files are still hand-written — nothing here changes that, and nothing here is trying to change that. What changes is that the registry's own internal consistency, and its relationship to the real routes, is now a test (`src/lib/design-system-navigation.test.ts`) instead of something someone has to remember to check by hand.
- **Prefer deriving from the registry over hand-typing a parallel copy.** The clearest finding from this phase's audit: `entry.related` and `getRelated()` already existed to solve "which pages are related to this one," but every page ignored them and hand-built its own `[getEntry(id)!, ...]` array instead — and at least one page's hand-built array had already drifted from what the registry itself declared. `getRelatedLinks(entry)` (§4) exists so a new page doesn't have to choose between the two; there's only one now.
- **Validation checks what's mechanically checkable from data.** Registry integrity, route resolution, and `getEntry()` reference validity are all things a test can assert on directly. Whether a reference page's JSX actually contains a "when to use" section is not — that's a content-review concern (DS-1F), not something this phase's registry-level validator claims to catch. See §6.

## 2. Page archetypes and contracts

Every registry entry already carries `pageType` (`landing | reference | pattern | architecture`) and an optional `badge` (8 values). Rather than adding a third classification field, `src/lib/docs-contracts.ts` derives one of **seven archetypes** — the set this document and the original brief both use — from those two existing fields:

| Archetype | Derived from | Purpose |
|---|---|---|
| Landing | `pageType: "landing"` (any badge) | Orient a first-time visitor, route them onward |
| Reference | `pageType: "reference"`, badge absent/`reference`/`component`/`foundation` | Document one component family: states, examples, accessibility |
| Pattern | `badge: "pattern"`, or `pageType: "pattern"` with no more specific badge | A reusable composition solving a recurring problem |
| Application | `badge: "application"` | A real domain platform assembled from the tier stack |
| Architecture | `badge: "architecture"`, or `pageType: "architecture"` | A composition rule or layering relationship, no live examples |
| Playground | `badge: "playground"` | Hands-on exploration, not reference lookup |
| Historical Reference | `badge: "historical-reference"` | A superseded page kept reachable for continuity |

Call `getArchetype(entry)` to get a page's archetype; look it up in `PAGE_CONTRACTS[archetype]` for its expected sections, badge/navigational-grounding requirements, and accessibility note. `design-system-navigation.test.ts`'s "page contracts" suite checks the two things a contract specifies that are actually verifiable without parsing JSX: does the entry have a badge if its contract requires one, and does it have *some* navigational grounding (previous/next or related) if its contract requires that — except for a page that's the sole entry in its own nav group, which structurally cannot have a sibling to chain to.

## 3. How a page registers itself

Every page follows the same shape:

```tsx
import { getEntry, getRelatedLinks } from "@/lib/design-system-navigation";
import { DocsShell, DocsPageHeader, DocsRelatedGrid } from "@/components/docs";

const entry = getEntry("your-page-id")!;
const relatedComponents = getRelatedLinks(entry);

export default function YourPage() {
  return (
    <DocsShell entry={entry}>
      <DocsPageHeader entry={entry} />
      {/* ...page content... */}
      <DocsRelatedGrid entries={relatedComponents} />
    </DocsShell>
  );
}
```

To add a new page:

1. Add one entry to `NAV_REGISTRY` in `src/lib/design-system-navigation.ts` — `id`, `title`, `href`, `section`, `group`, `order`, `description`, and `pageType` are required; set `badge` if the archetype table above says its archetype requires one; set `previous`/`next` if it joins an existing chain, or `related` if it doesn't.
2. Create the matching `src/app<href>/page.tsx`.
3. Use `getEntry("your-id")!` and `getRelatedLinks(entry)` as shown above — don't hand-build a related-links array from individual `getEntry()` calls; that's the exact duplication this phase found already causing drift.
4. Run `npm test` — `design-system-navigation.test.ts` will fail loudly if the id, href, or any `previous`/`next`/`related` reference doesn't resolve, before you ever open a browser.

If a route is intentionally not user-navigable (an iframe embed target, like `src/app/compositions/frame/page.tsx`), it does not get a registry entry — but it must be added to `INTENTIONALLY_UNREGISTERED_ROUTES` in `design-system-navigation.test.ts`, with a doc-comment on the page itself explaining why (follow `compositions/frame/page.tsx`'s own comment as the template). An unregistered, undocumented route fails the "orphan route" test on purpose.

## 4. Related-page links

`getRelatedLinks(entry)` resolves `entry.related` (an array of ids) into the exact shape `DocsRelatedGrid` needs (`{id, href, title, description}`) — no manual mapping required:

```tsx
const relatedComponents = getRelatedLinks(entry);
// ...
<DocsRelatedGrid entries={relatedComponents} />
```

Previous/next footer navigation needs no wiring at all — `DocsShell` renders `DocsPageNavigation`, which reads `entry.previous`/`entry.next` automatically, for every page that passes an `entry` prop.

## 5. Showcase registration (examples & demos)

Example/demo data (`src/workflows/examples/`, `src/platforms/examples/`, `src/production/examples/`, `src/capabilities/examples/`) is plain rendering data — a `Workflow`, `PlatformArchitecture`, etc. — with no title/category/tag/difficulty/ownership metadata of its own, and no registration layer. `src/lib/showcase-registry.ts` adds that metadata layer *alongside* the rendering data, not inside it:

```ts
import { defineShowcase, type ShowcaseMeta } from "@/lib/showcase-registry";

export const MY_SHOWCASES: ShowcaseMeta[] = [
  defineShowcase({
    id: "my-example",              // must match the underlying example's own id
    title: "My Example",
    category: "Production flow",
    tags: ["linear", "validation"],
    difficulty: "beginner",
    relatedPages: ["some-nav-entry-id"],
    owningComponent: "src/workflows/components/WorkflowDiagram.tsx",
  }),
];
```

See `src/workflows/examples/showcase.ts` for the pilot registration (the five pattern-gallery workflow examples). This phase registered one example family as a demonstration, not all four — extending it to `src/platforms/examples/`, `src/production/examples/`, and `src/capabilities/examples/` is a straightforward, low-risk follow-up (same pattern, different files), not something that needed to happen alongside building the infrastructure itself.

## 6. What validation can and can't see

`npm test` runs `src/lib/design-system-navigation.test.ts`, which checks, automatically, on every commit and every CI run (it's a normal co-located test — no separate pipeline step was needed):

- No duplicate `id`s or `href`s in `NAV_REGISTRY`, `NAV_SECTIONS`, or `NAV_GROUPS`.
- Every `previous`/`next`/`related`/`section`/`group` reference resolves to something real.
- Every registry `href` has a matching `page.tsx`, and every `page.tsx` has a matching registry entry (or an explicit, documented exemption).
- Every `getEntry("...")` call anywhere in `src/app` references a real registry id — this is the one check that reads page source directly rather than just the registry, because a typo'd id inside a non-null-asserted `getEntry(id)!` call compiles fine and only crashes at runtime.
- Every entry classifies to a known archetype, and satisfies that archetype's badge/navigational-grounding requirements.

It does **not** check: whether a reference page's rendered content actually matches its archetype's `expectedSections` (e.g., does it really have a "when to use" section) — that requires parsing rendered JSX/output, which this phase deliberately did not build (see the engineering note's "known limitations"). Treat `PAGE_CONTRACTS[archetype].expectedSections` as a reviewer's checklist, not an automated gate, until/unless a future phase adds that capability.

## 7. Documentation coverage

`npm run docs:coverage` prints a report — entries by archetype, entries by section, and component-family export-statement counts for context. It always exits `0` and is **not** part of `verify`/`verify:full`; it's informational, run on demand, not a gate. 100% per-component documentation is explicitly not the goal (see the brief this phase implemented: "Do not require 100%").

## 8. Search

The command palette (`Cmd/Ctrl+K`, `DocsSearchTrigger.tsx`) is built directly from `NAV_REGISTRY` — there is no separate search index to maintain. It matches on a page's title, its description, and its `aliases` (prior names / alternate routes) — the `aliases` field existed before this phase but had zero consumers; it's wired in now instead of staying dead metadata.

## 9. Verification workflow

Everything in this document is exercised by the same commands `docs/VERIFICATION.md` already documents — nothing new to learn:

```bash
npm test              # includes design-system-navigation.test.ts
npm run verify:fast   # includes npm test
npm run verify        # verify:fast + build + package verify
npm run docs:coverage # advisory report, run separately, whenever you want it
```

No new CI job, no new script wiring — the registry test is a normal Vitest file, so it was already covered the moment it existed.
