import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  NAV_REGISTRY,
  NAV_SECTIONS,
  NAV_GROUPS,
  getEntry,
  getPrevious,
  getNext,
  getRelated,
  getRelatedLinks,
  getGroupEntries,
} from "./design-system-navigation";
import { getArchetype, PAGE_CONTRACTS } from "./docs-contracts";

/**
 * DS-1E — the documentation platform's own integrity test. Everything here
 * was previously verified by hand, once, per page, by whoever happened to
 * be looking (see docs/engineering-notes/11-documentation-infrastructure.md
 * §1 for the audit that found this). Nothing enforced any of it. This file
 * is that enforcement: it runs as a normal Vitest file (co-located per
 * docs/TESTING.md's own convention), so it's already part of `npm test` →
 * `verify:fast` → `verify` → `verify:full` with zero pipeline changes.
 */

const APP_DIR = join(process.cwd(), "src", "app");

/**
 * Routes that intentionally have no NAV_REGISTRY entry. Every exclusion
 * here must be justified — see /compositions/frame's own doc-comment
 * (src/app/compositions/frame/page.tsx) for the shape a justification
 * should take. This is the ONE list a future non-navigable route needs to
 * be added to; forgetting is a loud test failure, not a silent gap.
 */
const INTENTIONALLY_UNREGISTERED_ROUTES = new Set<string>(["/compositions/frame"]);

function findPageFiles(dir: string, routePrefix: string, out: { route: string; file: string }[]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      findPageFiles(full, `${routePrefix}/${entry.name}`, out);
    } else if (entry.name === "page.tsx") {
      out.push({ route: routePrefix || "/", file: full });
    }
  }
}

function allPageFiles(): { route: string; file: string }[] {
  const out: { route: string; file: string }[] = [];
  findPageFiles(APP_DIR, "", out);
  return out;
}

describe("NAV_REGISTRY integrity", () => {
  it("has no duplicate ids", () => {
    const ids = NAV_REGISTRY.map((e) => e.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect([...new Set(duplicates)]).toEqual([]);
  });

  it("has no duplicate hrefs", () => {
    const hrefs = NAV_REGISTRY.map((e) => e.href);
    const duplicates = hrefs.filter((href, i) => hrefs.indexOf(href) !== i);
    expect([...new Set(duplicates)]).toEqual([]);
  });

  it("every `previous` reference resolves to a real entry", () => {
    const dangling = NAV_REGISTRY.filter((e) => e.previous && !getEntry(e.previous)).map((e) => `${e.id} -> previous: "${e.previous}"`);
    expect(dangling).toEqual([]);
  });

  it("every `next` reference resolves to a real entry", () => {
    const dangling = NAV_REGISTRY.filter((e) => e.next && !getEntry(e.next)).map((e) => `${e.id} -> next: "${e.next}"`);
    expect(dangling).toEqual([]);
  });

  it("every `related` reference resolves to a real entry", () => {
    const dangling = NAV_REGISTRY.flatMap((e) =>
      (e.related ?? []).filter((id) => !getEntry(id)).map((id) => `${e.id} -> related: "${id}"`),
    );
    expect(dangling).toEqual([]);
  });

  it("every entry's `section` resolves to a real NAV_SECTIONS entry", () => {
    const sectionIds = new Set(NAV_SECTIONS.map((s) => s.id));
    const orphaned = NAV_REGISTRY.filter((e) => !sectionIds.has(e.section)).map((e) => `${e.id} -> section: "${e.section}"`);
    expect(orphaned).toEqual([]);
  });

  it("every entry's `group` resolves to a real NAV_GROUPS entry", () => {
    const groupIds = new Set(NAV_GROUPS.map((g) => g.id));
    const orphaned = NAV_REGISTRY.filter((e) => !groupIds.has(e.group)).map((e) => `${e.id} -> group: "${e.group}"`);
    expect(orphaned).toEqual([]);
  });

  it("every group's `section` resolves to a real NAV_SECTIONS entry", () => {
    const sectionIds = new Set(NAV_SECTIONS.map((s) => s.id));
    const orphaned = NAV_GROUPS.filter((g) => !sectionIds.has(g.section)).map((g) => `${g.id} -> section: "${g.section}"`);
    expect(orphaned).toEqual([]);
  });

  it("has no duplicate NAV_SECTIONS ids", () => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no duplicate NAV_GROUPS ids", () => {
    const ids = NAV_GROUPS.map((g) => g.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("route integrity", () => {
  it("every NAV_REGISTRY href resolves to a real page.tsx", () => {
    const missing = NAV_REGISTRY.filter((e) => {
      const pagePath = e.href === "/" ? join(APP_DIR, "page.tsx") : join(APP_DIR, e.href, "page.tsx");
      return !existsSync(pagePath) || !statSync(pagePath).isFile();
    }).map((e) => `${e.id} -> ${e.href}`);
    expect(missing).toEqual([]);
  });

  it("every page.tsx route is either registered or explicitly documented as intentionally unregistered", () => {
    const registeredHrefs = new Set(NAV_REGISTRY.map((e) => e.href));
    const unregistered = allPageFiles()
      .map((p) => p.route)
      .filter((route) => !registeredHrefs.has(route) && !INTENTIONALLY_UNREGISTERED_ROUTES.has(route));
    expect(unregistered).toEqual([]);
  });

  it("every route in INTENTIONALLY_UNREGISTERED_ROUTES still exists as a real page (the allowlist itself doesn't rot)", () => {
    const allRoutes = new Set(allPageFiles().map((p) => p.route));
    const stale = [...INTENTIONALLY_UNREGISTERED_ROUTES].filter((route) => !allRoutes.has(route));
    expect(stale).toEqual([]);
  });
});

describe("getEntry() reference integrity across page.tsx files", () => {
  it("every getEntry(\"id\") call site references a real registry id", () => {
    // Catches the class of bug a non-null assertion (`getEntry(id)!`) hides
    // at compile time: a typo'd or removed id resolves to `undefined` and
    // only crashes at runtime, on whichever page happens to render it.
    const registryIds = new Set(NAV_REGISTRY.map((e) => e.id));
    const badReferences: string[] = [];
    for (const { route, file } of allPageFiles()) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/getEntry\(\s*["'`]([^"'`]+)["'`]\s*\)/g)) {
        const id = match[1];
        if (!registryIds.has(id)) badReferences.push(`${route}: getEntry("${id}")`);
      }
    }
    expect(badReferences).toEqual([]);
  });
});

describe("page contracts", () => {
  it("every registry entry classifies to exactly one archetype with a defined contract", () => {
    const unclassified = NAV_REGISTRY.filter((e) => !PAGE_CONTRACTS[getArchetype(e)]).map((e) => e.id);
    expect(unclassified).toEqual([]);
  });

  it("every entry whose archetype contract requires a badge has one", () => {
    const missingBadge = NAV_REGISTRY.filter((e) => PAGE_CONTRACTS[getArchetype(e)].requiresBadge && !e.badge).map(
      (e) => `${e.id} (archetype: ${getArchetype(e)})`,
    );
    expect(missingBadge).toEqual([]);
  });

  it("every entry whose archetype contract requires navigational grounding has previous, next, or related — unless it's the sole entry in its group", () => {
    // A page can't have a previous/next sibling that doesn't exist, and
    // requiring `related` to be hand-populated for every sole-entry group
    // would mean adding a "related components" section to pages that don't
    // have one today — exactly the page rewriting this phase is scoped to
    // avoid. Still findable via the sidebar (its group is always listed),
    // so this is a real but lower-severity gap than a multi-entry group's
    // page having no chain at all.
    const ungrounded = NAV_REGISTRY.filter((e) => {
      const contract = PAGE_CONTRACTS[getArchetype(e)];
      if (!contract.requiresRelatedOrPrevNext) return false;
      const isSoleEntryInGroup = getGroupEntries(e.group).length === 1;
      if (isSoleEntryInGroup) return false;
      return !e.previous && !e.next && (!e.related || e.related.length === 0);
    }).map((e) => `${e.id} (archetype: ${getArchetype(e)})`);
    expect(ungrounded).toEqual([]);
  });
});

describe("query helpers", () => {
  it("getPrevious/getNext/getRelated never throw on any real entry", () => {
    // Cheap regression guard: these are called on every docs page render
    // (DocsPageNavigation, and getRelatedLinks wherever it's adopted) —
    // a throw here is a broken page, not a failed assertion.
    for (const entry of NAV_REGISTRY) {
      expect(() => {
        getPrevious(entry);
        getNext(entry);
        getRelated(entry);
      }).not.toThrow();
    }
  });

  it("getRelatedLinks returns a fully-resolved, render-ready shape for every entry with related ids", () => {
    const withRelated = NAV_REGISTRY.filter((e) => (e.related ?? []).length > 0);
    expect(withRelated.length).toBeGreaterThan(0); // guards against this test silently checking nothing
    for (const entry of withRelated) {
      const links = getRelatedLinks(entry);
      expect(links.length).toBe(entry.related!.length);
      for (const link of links) {
        expect(link.href).toMatch(/^\//);
        expect(link.title.length).toBeGreaterThan(0);
      }
    }
  });
});
