# @studiopod/design-system — Versioning Policy

## Pre-1.0 policy (adopted in RM-5.5)

The package is currently `0.1.0`. SemVer technically permits breaking changes within `0.x` without a major-version bump (only `0.(x+1).0` is required, not `1.0.0`). **This package does not use that latitude.**

**Adopted policy: every consumer-visible breaking change is treated with major-version discipline, even before `1.0.0`.** Concretely, while the package stays in the `0.x` series, a breaking change bumps the **minor** digit (the only digit SemVer lets move pre-1.0) but is documented, reviewed, and changelogged exactly as if it were a major version under normal SemVer — a real breaking-change entry, not a routine minor. Once the package reaches `1.0.0`, breaking changes bump the major digit as SemVer intends. The reasoning: `studiopod-web` and `paws-bones-studio` are real consumers making real integration decisions (RM-6 and later), and "pre-1.0 so anything goes" would undermine the entire point of freezing this contract in RM-5.5.

## PATCH

- Compatible defect fixes.
- Accessibility corrections that don't change the public API shape.
- Internal implementation changes (e.g. reclassifying an accidental export as internal, as done in RM-5.5, **counts as patch-level once past 1.0.0** only if nothing depended on the removed export yet — see "removed export" under MAJOR below for the general rule once consumers exist).
- Visual corrections within an existing semantic contract (e.g. a spacing/color bug fix that doesn't change a prop's type or a token's meaning).

## MINOR

- New backward-compatible components.
- New optional props on an existing component.
- New tokens (additive — a new key in `motionDuration`/`zIndex`/etc.).
- New public exports (a new component, hook, or utility that didn't exist before).
- Introducing a deprecated alias ahead of a future removal (the alias itself is additive; the future removal of the *original* is the breaking half — see MAJOR).

## MAJOR (or, pre-1.0, a documented breaking minor — see above)

- Removed or renamed exports.
- Required prop changes (an optional prop becoming required, or a required prop's type narrowing incompatibly).
- Behavioral contract changes (e.g. a component that used to be uncontrolled becoming controlled-only).
- Token removals or semantic reassignment (changing what an existing token *means*, not just its value — e.g. if `motionDuration.base` started representing milliseconds instead of seconds).
- Entry-point changes (removing an entry point, or changing what it's allowed to export per `API.md`'s frozen list).
- Peer-dependency compatibility breaks (narrowing the `react`/`react-dom`/`next` peer range in a way that drops support for a version a real consumer is on).

## Deprecation procedure

1. Mark the export with a `@deprecated` JSDoc tag pointing at its replacement, so it surfaces in editor tooltips.
2. Add an entry to `CHANGELOG.md` under "Deprecated" for that release.
3. Keep the deprecated export working (a re-export/alias of its replacement, not a stub) for **at least one full subsequent release** before removing it.
4. The removal itself, when it lands, is documented as a breaking change per the MAJOR rules above (a "breaking minor" pre-1.0, a real major once past 1.0.0) — never silently folded into an unrelated patch/minor release.

**Minimum deprecation window: one full release.** Introduce the deprecation in `N.M.0`; the earliest the deprecated export may be removed is `N.(M+1).0` or later (or the equivalent major bump once past 1.0.0) — never in the same release it was deprecated in.

## Changelog expectations

`CHANGELOG.md` (see that file) follows a Keep-a-Changelog-style structure: every release gets its own dated section with `Added`/`Changed`/`Deprecated`/`Removed`/`Fixed` subsections as applicable. A release that touches the public export surface must say so explicitly — "internal refactor, no API change" is an acceptable changelog line, but silence about an export change is not.

## Consumer upgrade expectations

- **Patch**: safe to accept automatically (e.g. via a `^0.1.0` or `~0.1.0` range) — no action needed.
- **Minor (non-breaking)**: safe to accept automatically; new capability, nothing existing changes shape.
- **Minor (breaking, pre-1.0 only, per the adopted policy above) / Major (post-1.0)**: requires a deliberate consumer-side upgrade — read the changelog entry before bumping the installed version, run `npm run package:api-check`-equivalent verification in the consumer if available, and expect to touch call sites named in the changelog's "Removed"/"Changed" sections.

## What RM-5.5 did under this policy

The two accidental-export removals in RM-5.5 (`@/motion` engine's ~30 symbols, and the illustrations `dev` tooling's 4 symbols) are recorded in `CHANGELOG.md` as removed exports. Per the task's own explicit instruction, the version **stays at `0.1.0`** rather than bumping, because this happened before any real consumer adopted the package (RM-6 hasn't started) — there is no one to break yet. Once `studiopod-web` (RM-6) or `paws-bones-studio` depend on a published or locally-referenced version, any further export removal follows the full procedure above, including a version bump.
