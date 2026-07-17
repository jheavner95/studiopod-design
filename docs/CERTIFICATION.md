# Component Certification

The contributor guide to how a component earns "Certified" (or "Locked") status: what the checklist covers, what's automated versus manual, how to certify a new component, and how to read a certification panel on a docs page. For the audit and architecture reasoning behind these choices — including why this deliberately isn't a repeat of the pre-RM-5 certification pattern — see [docs/engineering-notes/12-component-certification.md](./engineering-notes/12-component-certification.md).

**This phase (DS-1F) built the framework. It certified exactly one component (Button) as a pilot. Certifying the rest of the library is explicitly out of scope here — that's DS-2+ work.**

## 1. Goals

- Make "is this component production-ready" a checkable fact, not a matter of opinion or memory.
- Reuse the certification level vocabulary that already existed (`Concept → Prototype → Production Ready → Certified → Locked` — see `src/app/application-components/_data/maturity.ts`) rather than inventing a competing one.
- Automate every check that can genuinely be automated; be honest about the ones that can't.
- Never require hand-typing certification status into a docs page — a page always reads live from the registry.
- Never gate CI on certification completeness. This is a reporting and review tool, not a merge blocker.

## 2. Certification levels

| Level | Means |
|---|---|
| Concept | Named and scoped, no implementation. |
| Prototype | A working version exists, often borrowing an adjacent component's pattern. |
| Production Ready | A real, reusable component exists and is safe to build a screen with. |
| **Certified** | Production Ready, plus every automated check passes and every manual check has been reviewed and signed off. |
| Locked | Certified, plus the API is stable enough to be a contract — changing it requires a deliberate migration. |

## 3. The checklist

Eleven categories, thirty-nine checks total (`src/lib/certification.ts`'s `CERTIFICATION_CHECKLIST`): Identity, API, Accessibility, Responsive, Motion, Design Tokens, Documentation, Testing, Visual Verification, Performance, Release. Every single check declares its own `owner` — this is the framework's central honesty mechanism, not an afterthought:

- **`automated`** (21 checks) — a real, running check produces the verdict. No human opinion involved.
- **`manual`** (13 checks) — requires human judgment. Tracked, reviewed, and signed off by a person — nothing in this codebase can verify these mechanically.
- **`advisory`** (5 checks) — an automated signal exists but isn't authoritative on its own (e.g. a token-bypass finding might be a real defect or a reviewed, legitimate exception — see §5).

Run `npm run certification:report` for the current checklist shape and every tracked component's coverage.

## 4. How a component gets certified

1. Add an entry to `CERTIFICATION_REGISTRY` in `src/lib/certification.ts`: `componentName`, `sourcePath`, a starting `level`, `completedChecks: []`, `lastReviewed`.
2. Work through the checklist by category. For each `automated` check, the mechanism column in `CERTIFICATION_CHECKLIST` names exactly what to run (a Vitest suite following `src/components/ui/Button.test.tsx`'s pattern, a Playwright visual spec following `e2e/visual/button-gallery.visual.spec.ts`'s pattern, etc.).
3. For each `manual` check, a reviewer confirms it directly against the component and docs page, then adds the check's id to `completedChecks`.
4. For each `advisory` check, run the relevant utility (`src/lib/certification-checks.ts`) and use judgment — a nonzero finding count isn't automatically a failure (see Button's own `size-[18px]` finding, reviewed and accepted, in its registry entry's `notes`).
5. Once every check that should apply is either complete or explicitly and honestly excluded (with a reason in `notes`), update `level` to `Certified`.
6. Add `<CertificationPanel componentName="..." />` (`src/components/docs`) to the component's docs page — it reads the registry live; there is nothing else to wire up.

## 5. What "advisory" really means — read this before dismissing a finding

An advisory check existing at all means real automation is running and producing real output — it is not a placeholder. What makes it advisory is that the tool cannot see everything a human can. `checkTokenBypasses()` (`src/lib/certification-checks.ts`) finding `size-[18px]` in `Button.tsx` is a genuine, correct finding — that value really is outside the token system. Whether it's a *defect* depends on whether an equivalent spacing token exists that should have been used instead (it doesn't, for Button's case), which is a judgment call the scanner cannot make. Treat every advisory finding as "a human needs to look at this and write down why," not "ignore this" or "this blocks certification."

## 6. Reading a certification panel

`<CertificationPanel componentName="Button" />` (live on `/core-components`, in the Component Gallery section) reads `getCertificationRecord()` + `getChecklistCoverage()` and renders: the current level, a coverage bar, a per-category breakdown, the specific remaining checks (labeled by owner), and the record's own review notes. A component with no registry entry renders an honest "Not yet certified" state rather than crashing — no `!` non-null assertion on the lookup.

## 7. Verification integration

`npm run certification:report` is a standalone, advisory command — it is **not** part of `verify`/`verify:fast`/`verify:full`, and it always exits `0`. The real, gating automation is `src/lib/certification.test.ts`, which **is** part of `npm test` (and therefore every `verify*` tier) — but what it gates is the *framework's own integrity* (no dangling checklist references, the pilot's automated claims are backed by real passing checks), not "every component must be certified." Certifying more components never fails a build; the framework not doing what it says it does would. See `docs/VERIFICATION.md` for the full pipeline this composes with.

## 8. What this is not

Not a repeat of the pre-RM-5 certification pages (`final-certification`, `enterprise-architecture-audit`, and the per-package certification pages listed in `docs/engineering-notes/`) — those were one-off, hand-authored audit documents that went stale and were eventually deleted as "obsolete implementation." This framework is data (`CERTIFICATION_REGISTRY`) plus one reusable display component, so a certification panel can never say something that isn't true the moment you look at it — there's no separate document to fall out of sync with reality.
