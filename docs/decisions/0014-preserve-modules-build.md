# ADR 0014 — The package emits one module per source file

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-3
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

## Context

DH-2 recorded defect N1: `dist/index.js` began with `"use client"`, which makes
**every** export in the package a client reference — `cn`, the token constants,
and every purely presentational component included. Any consumer with a Server
Component paid for interactivity it never asked for, and Cloud and Web are both
App Router applications.

The directive was not an oversight. The package bundled, and esbuild drops a
module-level directive prologue the moment it bundles — it treats a directive as
unsafe to keep once tree-shaking can reorder and merge modules. So the build ran
a post-step that re-added one directive per entry point. That was the only way
to keep client components working, and its cost was N1.

The constraint is structural: **React's client/server boundary is defined per
module, and a bundler's job is to stop modules being modules.** No amount of
care about which entry gets the directive fixes that, because the granularity is
wrong by a factor of the bundle size.

Measured on this package: 392 of 538 modules — 73% — do nothing that requires a
client. Under a bundled build, all 538 were client references.

## Decision

**The package does not bundle its JavaScript. Each source module is emitted as
one output module, carrying its own `"use client"` directive or its own absence
of one.**

Concretely:

1. **`tsup` runs with `bundle: false`** over `src/**/*.{ts,tsx}`. esbuild
   preserves the directive prologue when it is not bundling.
2. **Declarations come from `tsc --emitDeclarationOnly`**, not from
   rollup-plugin-dts, which would bundle types into one file per entry and undo
   the per-module shape on the type side.
3. **`scripts/resolve-specifiers.mjs` rewrites emitted specifiers.** This is the
   cost of not bundling: esbuild in transform mode resolves nothing, so output
   keeps the source's `@/…` path aliases and extensionless relative imports,
   neither of which is valid ESM. The rewrite resolves both against the emitted
   tree and **fails if any specifier does not resolve to a file that exists**.
4. **The stylesheet still bundles.** `styles.css` is a concatenation of five
   generated token files and consumers import one file.
5. **Entry point paths are unchanged** — `dist/index.js`, `dist/tokens.js`, and
   so on — so the export map, and every consumer's import, is untouched.

## Alternatives considered

### Alternative A — Keep bundling; add a separate server-safe entry point

Publish `@studiopod/design/utils` without a directive for `cn` and the token
constants, leaving the root entry client.

Rejected because it fixes the smallest part of the problem. Pure utilities are a
handful of exports; the other 380-odd server-safe modules are **components** —
`Card`, `Stack`, `Badge`, the entire workflow and operational families. A Server
Component rendering `<Card>` would still open a client boundary. It also adds an
entry point, which [ADR 0004](0004-one-published-package.md) makes a breaking
change, to deliver a fraction of the benefit.

### Alternative B — Keep bundling; attach directives per emitted chunk

Let esbuild split as it likes, then add a directive to each chunk containing any
client module.

Rejected as unsound. Chunk membership is the bundler's decision and mixes client
and server modules freely; a chunk containing one client component would mark
every other module in it client. It would produce a result that is correct only
by accident and silently wrong when chunking changes.

### Alternative C — Move to Rollup with `preserveModules: true`

The output shape this ADR wants, from a bundler that resolves aliases natively —
removing the need for the specifier-rewrite step.

Genuinely the tidier build. Rejected for DH-3 on scope: it means replacing the
whole build toolchain, and every check that reads `dist/` alongside it, inside a
work package whose stated objective is framework independence. The rewrite
script is ~90 lines and fails loudly.

**This is the alternative to revisit first** if the rewrite step ever becomes
troublesome.

### Alternative D — Hand-maintain a list of client entry points

Keep bundling, but split the source into "client bundle" and "server bundle"
entries by hand.

Rejected. It is the esbuild barrel shims of DH-2 in a new costume: a boundary
maintained by memory, correct only for the modules someone remembered to
classify, and wrong by default for every module added later.

## Consequences

### What this makes easier

- 392 of 538 modules are server-safe, where all 538 were client references
- Consumers with Server Components stop paying for interactivity they do not use
- The client boundary is where React says it is — at the module
- A new component's classification is decided by what it does, and checked

### What this makes harder

- **The output is 538 files instead of 12.** Larger `node_modules` footprint and
  more files for a consumer's bundler to walk, though it does not change what
  ends up in their bundle.
- **The specifier rewrite is a build step that can fail**, and it is bespoke.
  Alternative C exists to remove it.
- **The API check had to be rewritten.** It parsed the single trailing
  `export { … }` block that only a bundled module has, and reported 267 exports
  removed from an API that had not changed. It now resolves the declaration
  graph with the TypeScript compiler — more work, and more durable.
- **Tree-shaking now depends entirely on the consumer's bundler**, since the
  package no longer pre-bundles. This is normal for a preserve-modules library
  and is still unmeasured here — DH-1 gap 16 remains open.

### What this commits us to

- Keeping `resolve-specifiers.mjs` correct, and its failure loud
- Classifying every new module's client requirement, enforced by
  `check-client-boundaries.mjs`
- Never reintroducing a whole-entry directive as a shortcut

## Enforcement

- **`check-client-boundaries.mjs`** — mechanical. No entry point carries a
  directive; every module that needs one has one; none carries one it does not
  need; emitted output agrees with source.
- **`resolve-specifiers.mjs`** — mechanical, and part of the build. A specifier
  that does not resolve fails the build rather than shipping.
- **`check-exports.mjs`** — mechanical. Every declared entry resolves and is
  well-formed.
- **`check-api.mjs`** — mechanical. The full export surface, resolved through
  the re-export graph, matches the baseline.

## References

- [ADR 0013 — Framework capabilities are props](0013-framework-capabilities-are-props.md)
- [ADR 0004 — One published package](0004-one-published-package.md)
- [../certification/DH-2.md](../certification/DH-2.md) § 7 A — where N1 was found
- [../certification/DH-3.md](../certification/DH-3.md)
