# Changelog

All notable changes to `@studiopod/design-system` are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/); versioning discipline is documented in `VERSIONING.md`.

## 0.1.0 — unreleased (not published)

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
