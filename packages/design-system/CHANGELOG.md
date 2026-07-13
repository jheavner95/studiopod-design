# Changelog

All notable changes to `@studiopod/design-system` are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versioning discipline is documented in `VERSIONING.md`.

## 0.1.0 — unreleased (not published)

### Fixed (second RM-6 corrective patch — discovered during Web integration, before adoption)

- **`dist/index.js`, `dist/marketing.js`, and `dist/illustrations.js` never emitted a `"use client"` directive**, even though ~160 source files across the package declare one (every context-using hook/provider, `Toast`, `Tabs`, all overlay/navigation/operational/table/motion/form components, etc.). This broke the moment a real Next.js App Router consumer's Server Component transitively imported anything from these entries: Next bundled the entry into the server module graph, where `react`'s `react-server` export condition doesn't provide `createContext`/hooks, and the build failed at page-data-collection time. Root cause: `tsup.config.ts`'s `treeshake: true` makes esbuild actively drop any module-level directive prologue during bundling (esbuild logs "Module level directives cause errors when bundled" and removes it) — even one placed as the literal first line of the entry's own source file. This was never caught by RM-4/RM-5/RM-5.5/the first RM-6 corrective patch's verification because all of it used `react-dom/server`'s `renderToStaticMarkup` in a plain Node/`tsx` script, which never exercises Next's actual React Server Components compiler or client/server module boundary at all.
- Fixed with `scripts/inject-use-client.mjs`, run via `tsup.config.ts`'s `onSuccess` hook — prepends `"use client";` as plain text to `dist/index.js`, `dist/marketing.js`, and `dist/illustrations.js` after esbuild's own transform finishes, sidestepping the tree-shake/directive conflict entirely. `dist/tokens.js` is deliberately excluded (pure constants, no React import — a spurious directive would force it into the client bundle graph for every consumer that only wants plain values). No public exports, prop shapes, token values, or package version changed.
- Added `scripts/check-use-client.mjs` (`npm run package:use-client-check`) — an automated regression check asserting `dist/index.js`/`marketing.js`/`illustrations.js` each begin with the directive.
- See the corrective-patch commit message for the exact re-packed tarball shasum (not recorded here, for the same reason as the CSS fix below: this file ships inside the tarball it would be documenting).

### Fixed (first RM-6 corrective patch — discovered during Web integration, before adoption)

- **`dist/styles.css` was silently missing its entire `@theme` block** (all color/radius/shadow/spacing/easing custom properties from `theme.css`) in the tarball certified at the end of RM-5.5 (shasum `d15dfacebf111214fcb262a18333dde17b318193`). Root cause: `tsup`'s bundled PostCSS integration (via `postcss-load-config`) walks up the directory tree from its `cwd` looking for a PostCSS config, found the documentation app's root `postcss.config.mjs` (which configures `@tailwindcss/postcss`), and silently ran this package's `styles.css` entry through Tailwind's compiler in total isolation — with no content files to scan for utility usage, Tailwind pruned the entire `@theme` block as "unused." This package was never meant to run Tailwind's own compiler (see `README.md`'s CSS section); it ships plain concatenated token CSS for the consumer's own Tailwind build to process.
- Fixed by adding a package-local, empty `postcss.config.mjs` in `packages/design-system/` — `postcss-load-config` finds the nearer config first and never reaches the root one. No canonical token values, ordering, or public exports changed; verified via byte-level diff against the five source CSS files (only difference: esbuild's own CSS printer inserts a formatting space after `radial-gradient(`, present whenever this content is bundled through esbuild at all).
- Added `scripts/check-css.mjs` (`npm run package:css-check`) — an automated regression check asserting `@theme` and representative tokens from all five canonical source files are present, and in the correct order, in `dist/styles.css`. Not caught earlier because RM-4/RM-5/RM-5.5's CSS verification checked import ordering and generic selector markers, never the literal `@theme` keyword or a representative custom property.
- Version stays at `0.1.0` (not bumped) per the same pre-adoption exception RM-5.5 used: this fix landed before any real consumer (RM-6's `studiopod-web` integration) actually adopted the package. See the corrective-patch commit message for the exact re-packed tarball shasum (not recorded here, since this file itself ships inside the tarball and editing it changes the hash it would be documenting).

### Added (RM-4)

- Initial package scaffold: `.` (root), `/tokens`, `/marketing`, `/illustrations`, `/styles.css` entry points, compiling directly from canonical `studiopod-design` source via tsup/esbuild.

### Removed (RM-5.5 — public API freeze)

Both removals happened before any real consumer adopted the package (RM-6 had not started), so the version was **not** bumped, per the versioning policy's explicit pre-adoption exception. Both remain bundled internally where still needed — only the public export was removed.

- Removed the `@/motion` low-level engine's ~30 symbols from the root entry (`Fade`, `Slide`, `Scale`, `Collapse`, `Expand`, `Crossfade`, `Stagger`, `Pulse`, `Highlight`, `Activate`, `Progress`, `ConnectorFlow`, `QueueFlow`, `PublishFlow`, `MotionDebugOverlay`, `ControlDockShell`, `DOCK_CLEARANCE_CLASS`, and the `resolveDuration`/`resolveDelay`/`resolveDistance`/`resolveScaleDelta`/`resolveEase`/`transition`/`stagger`/`sequence`/`repeat`/`flow`/`pulse` utilities and their token types) — reclassified as internal transitive dependencies. See `API.md` for the full rationale.
- Removed `IllustrationDevProvider`, `useIllustrationDev`, `useIllustrationDevControls`, `IllustrationDevState` from the `/illustrations` entry — documentation-playground debug tooling, not consumer API. See `API.md`.

### Changed (RM-5.5)

- `@/components/motion`'s `StaggerGroup`/`StaggerItem` no longer need an `Engine*`-prefixed sibling export — removing `@/motion`'s public export eliminated the naming collision that prefix existed to resolve.

### Governance added (RM-5.5)

- `API.md` — frozen public API contract, per-family classification, marketing/illustrations/tokens/CSS/dependency contracts, portability caveats.
- `VERSIONING.md` — semantic versioning policy, pre-1.0 discipline, deprecation procedure.
- `api-baseline/*.json` + `scripts/check-api.mjs` (`npm run package:api-check`) — automated export-surface drift detection.
