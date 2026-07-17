# @studiopod/design-system — Tokens

The design token architecture: what exists, who owns each category, naming conventions, how to add or deprecate a token, and how a consumer actually gets tokens into their own build. Written during DS-4 (token consolidation); see `docs/engineering-notes/13-token-consolidation.md` for the audit this document is built from and the specific consolidation decisions made — and *not* made — along the way.

## 1. Philosophy

Two layers, and only two: **primitive** (raw values — a color ramp, nothing else) and **semantic** (named by purpose — `surface`, `border`, `accent`). Components consume semantic tokens exclusively; nothing in `src/components/` or `packages/design-system/src/` references a primitive token directly. A third layer, **component tokens**, exists only where a real, recurring need justifies it (see §2.3) — it is not a default every component gets.

The system avoids two failure modes on purpose:
- **Under-abstraction** — hardcoded hex/px values scattered through components, so a rebrand or contrast fix means finding every call site.
- **Over-abstraction** — an alias for every alias, so tracing "what color does this button actually render" takes four hops through `--btn-primary-bg` → `--action-color` → `--brand-blue` → `--palette-blue-500`.

**Do not create aliases without a clear semantic purpose.** If a new token would just be a second name for an existing one with no distinct meaning, don't add it — reference the existing token directly.

## 2. Token hierarchy — who owns what

| Category | Owner file | Layer |
|---|---|---|
| Color (raw ramps) | `src/styles/palette.css` | Primitive |
| Color (canvas/surface/border/ink/accent/status) | `src/styles/theme.css` `@theme` | Semantic |
| Radius | `src/styles/theme.css` `@theme` | Semantic (no separate primitive layer — a radius scale has no meaningful "raw" form beneath its named steps) |
| Elevation / shadow | `src/styles/theme.css` `@theme` | Semantic — two groups: literal `--shadow-{xs,sm,md,lg,glow,glass,glass-glow,modal}` and a purpose-named alias group (`--shadow-{subtle,card,panel,floating}`) pointing at the literal ones. This is the one place aliasing-for-clarity is deliberate: "how high does this sit" (`card`/`panel`/`floating`) is a more useful question at a call site than "which literal shadow size" |
| Spacing (component-local) | Tailwind's built-in numeric scale (no project override) | Primitive |
| Spacing (page rhythm) | `src/styles/theme.css` `@theme` — `--spacing-gutter`, `--spacing-section-{xs..xl}` | Semantic, fluid (`clamp()`-based, viewport-responsive) |
| Sizing / containers | `src/styles/theme.css` `@theme` — `--container-{narrow,content,wide,shell}` | Semantic |
| Typography | `src/styles/typography.css` — fluid `clamp()` classes, not separable `@theme` font-size tokens | Semantic (size/line-height/letter-spacing travel together as one class, deliberately not decomposable into independent tokens) |
| Motion (raw scale + z-index) | `src/styles/tokens.css` — `--duration-*`, `--motion-*`, `--z-*`, outside `@theme` | Primitive/semantic mix — see §2.1 |
| Focus | `.focus-ring` in `src/styles/utilities.css` | Semantic (one canonical focus treatment; not a `@theme` token because it's a compound rule — outline + offset + border-radius inheritance — not a single value) |
| Component tokens | Co-located with the component (e.g. `Workspace.tsx`'s `workspaceDensityPadding`) | See §2.3 |

### 2.1 Why motion and z-index sit outside `@theme`

Every other category above lives inside `theme.css`'s `@theme` block specifically so it auto-generates a Tailwind utility class. Motion durations/eases and z-index deliberately don't: they need to be readable as raw values by JavaScript (framer-motion needs numeric seconds and cubic-bezier arrays, not a CSS string), so they're plain `:root` custom properties in `tokens.css`, each mirrored by hand into a JS module — `src/lib/tokens.ts` for the older `--duration-*`/`--ease-*` scale (feeds `accentRgb`/`successRgb` box-shadow interpolation), `src/motion/tokens.ts` for the newer `--motion-duration-*`/`--motion-ease-*`/`--motion-delay-*`/`--motion-distance-*` scale (the actual vocabulary `src/motion`'s primitives are built on). **These are two distinct, intentionally-separate systems, not a duplicate pair to merge** — see the engineering note for why collapsing them isn't a safe or clearly-beneficial move.

### 2.2 Light / dark theme readiness

There is one theme today — dark. `--color-canvas`, `--color-surface`, `--color-ink-primary`, etc. are hardcoded to their dark values directly in `@theme`, not layered through a `:root`/`[data-theme]` override pair. **Dark-theme readiness does not require component rewrites** if a light theme is ever added: every component already consumes semantic tokens exclusively (never a raw palette value or a literal hex), so a light theme is purely a `theme.css` change — swap what `--color-canvas`/`--color-surface`/`--color-ink-*`/etc. resolve to, add the selector scoping (`[data-theme="light"] { ... }` or a media-query variant), and every component that already reads `bg-canvas`/`text-ink-primary`/etc. picks it up with zero edits. This document does not build that switcher — none exists today, and none is being added by this pass (see DS-4's own scope: verify readiness, don't build a theme system that isn't asked for).

### 2.3 Component tokens — only where justified

A component-local token map is justified when a component family needs an internal, small, closed vocabulary that doesn't belong in the global theme (it's not reusable outside that family) but does need to stay consistent *within* the family. `Workspace.tsx`'s `workspaceDensityPadding`/`workspaceDensityHeaderHeight` are the canonical example: "comfortable vs. compact" padding is a Workspace-family concept, not a general design-system concept, but `WorkspaceHeader`/`WorkspaceToolbar`/`WorkspaceFooter` all need to agree on it.

This is not a blanket license for every component to invent its own scale. DS-4's audit found several `sm`/`md`/`lg`-keyed padding and gap maps across unrelated layout primitives (`Card`, `Surface`, `Panel`, `GlassPanel`, `SurfacePanel`, `Stack`, `Inline`, `Grid`, `ContentColumns`) that disagree on what those labels mean in pixels — that's drift, not intentional component-token design, and is called out as a named, unresolved finding in the engineering note rather than silently endorsed here. Before adding a new component-local map, check whether an existing one already covers the same semantic need.

## 3. Naming conventions

- CSS custom properties: `--{category}-{name}` (`--color-accent-500`, `--radius-lg`, `--spacing-gutter`). Numeric color steps follow Tailwind's own 50–950 convention where a full ramp exists (`palette.css`); semantic color families expose only the steps they actually need, not a forced full ramp (`--color-accent-{300,400,500,600,700,soft}` — no 50–950 for a semantic color).
- JS token modules mirror their CSS source's naming as closely as JS identifier rules allow (`camelCase` object keys for `kebab-case` CSS suffixes: `--duration-instant` → `motionDuration.instant`).
- "Ink" is used for text color specifically (`--color-ink-*`) to avoid colliding with Tailwind's own `text-{color}` utility naming for *the utility itself* vs. the semantic thing it's naming.
- Semantic aliases exist only where they add real meaning (see the shadow group in §2 above) — not as a matter of course.

## 4. Primitive vs. semantic usage

**Components reach for semantic tokens.** `bg-surface`, not `bg-[#131a2b]`; `text-ink-secondary`, not `text-[#94a3b8]`. The one documented exception to "semantic colors are byte-identical aliases of a palette step": `--color-error` is `--palette-red-500` lightened for AA contrast against `--color-error-soft`, disclosed in `theme.css`'s own comment. That's the *only* place a semantic color's derivation isn't a verbatim copy — if you're adding a new semantic color and considering a similar contrast-driven adjustment, say so in a comment the same way.

**Primitives are for the semantic layer to consume, not for components to reach past it.** `palette.css` deliberately sits outside `@theme` so it never generates a `bg-palette-blue-500`-style utility a component could reach for instead of the semantic `bg-accent-500`.

## 5. Implementation constants vs. tokens

Not every literal number in the codebase is a token gap. DS-4's hardcoded-value review classified every non-token literal found into four buckets — only the first is a defect:

1. **Must use a token** — a value that duplicates or should reference an existing (or newly-justified) token. Example fixed this phase: `GlobalNav.tsx` and `DocsShell.tsx` both hardcoded `max-w-[2160px]` with no shared source of truth; promoted to `--container-shell`.
2. **Legitimate implementation constant** — a value inherent to the component's own math or a one-off with no equivalent token, and no realistic future reuse. Examples: `TreeNavigation.tsx`'s `paddingLeft: 8 + level * 16` (a formula, not a static value — can't be a token by definition), `Button.tsx`'s `size-[18px]` lg-spinner icon (already reviewed and accepted in `src/lib/certification.ts`'s Button record — sized proportionally to a token-derived button height, no equivalent token exists).
3. **Demo/content-specific value** — arbitrary values inside documentation-page decoration or example content, not real component code (e.g. a decorative blur circle's `size-[600px]` in `SystemGrid.tsx`).
4. **Third-party constraint** — a value forced by an external API or browser contract the token system has no jurisdiction over.

Category 1 findings get fixed. Categories 2–4 get documented (a comment, or a line in the engineering note), never mechanically replaced — forcing a token onto a value that doesn't have a genuine semantic equivalent makes the code harder to read, not more consistent.

## 6. Adding a token

1. Decide primitive or semantic (§1) — almost always semantic; a new primitive color/scale is rare and should be questioned.
2. Add it to the correct owner file from the table in §2, in the existing category's comment block, not a new one-off block.
3. If it needs to be readable from JS (motion, anything framer-motion touches), mirror it by hand into the matching `tokens.ts` file, with a comment pointing back at the CSS source — there is no automated CSS→JS sync.
4. If the token is meant to be part of the published package's public API (i.e., a JS export from `@studiopod/design-system/tokens`), it's a **MINOR** version bump per `packages/design-system/VERSIONING.md` — additive, non-breaking. CSS-only additions to `styles.css` (like `--container-shell`) don't touch the JS export surface and don't require an `api-check` baseline update, but are still worth a CHANGELOG line since they ship in the published `styles.css`.
5. Document it on the public `/tokens` page if it's something a consumer would reach for directly (not every internal implementation detail needs a public docs entry).

## 7. Deprecating a token

Same procedure as any other public export — see `VERSIONING.md`'s deprecation procedure in full. In short: mark it `@deprecated` in a comment pointing at its replacement, keep it working for at least one full release, document the deprecation in `CHANGELOG.md`, and only remove it in a later release with a proper breaking-change entry (a "documented breaking minor" pre-1.0, a real major post-1.0). Do not silently delete a token that ships in the published `styles.css` — an external consumer's own CSS may already reference it via `var(--the-token)` even if no component in this repo does; "unused internally" and "safe to remove" are different claims (see the engineering note's reasoning on the still-public `zIndex` export for a worked example of this distinction).

## 8. Consumer installation and imports

```bash
npm install @studiopod/design-system@^0.1.0
```

```css
/* app/globals.css — order matters; later @theme wins */
@import 'tailwindcss';
@import '@studiopod/design-system/styles.css';   /* palette, semantic tokens, typography, utilities */
@source '../node_modules/@studiopod/design-system/dist';  /* REQUIRED — see below */
```

```ts
import { motionDuration, motionEase, zIndex, accentRgb, successRgb } from '@studiopod/design-system/tokens';
```

**The `@source` line is not optional.** Tailwind ignores `node_modules` by default; without it, none of the package's components' Tailwind classes are generated, and every consumer of `@studiopod/design-system` renders unstyled with no error. This is the single most common integration mistake — see `DISTRIBUTION.md` §3.3 and §5 for the full installation/upgrade guide, including what to re-verify on every version bump (tokens can restyle thousands of call sites with no app-side diff — always diff `dist/styles.css` between versions before upgrading).

No internal path is ever required. A consumer never imports `@studiopod/design-system/src/styles/theme.css` or reaches into `dist/` directly — `/tokens` and `/styles.css` are the only two token-bearing entry points, both declared in `package.json`'s `exports` map.

## 9. Migration guidance

- **Upgrading across a MINOR version**: safe to accept automatically per `VERSIONING.md`'s policy for non-breaking minors — but pre-1.0 minors *can* carry a documented breaking change (the package's own adopted discipline treats breaking changes with major-version rigor even before `1.0.0`, while still bumping the minor digit, since that's the only digit SemVer allows to move pre-1.0). Always read the CHANGELOG entry before bumping, not just the version number.
- **A token you're using gets renamed**: it will appear in `CHANGELOG.md` under "Deprecated" for at least one release before removal, with the replacement named. Update the reference during that window, not after.
- **A token's rendered value changes** (not its name — e.g. a color's exact hex shifts for a contrast fix): this is a PATCH per `VERSIONING.md` ("visual corrections within an existing semantic contract"), not a MINOR/MAJOR — expect it to ship without an explicit CHANGELOG line unless the shift is visually significant. Diff `dist/styles.css` if you need certainty before a release.
