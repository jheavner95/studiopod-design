# ADR 0017 — Foundation owns the typeface, Design loads it

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-5.5
- **Scope:** Ecosystem
- **Supersedes:** —
- **Superseded by:** —

## Context

Geist and Geist Mono have been the canonical StudioPOD typefaces since DS-7.2.
Foundation names them, the fluid type scale is built around their metrics, and
`--font-sans` has carried them into every generated stylesheet the whole time.

No consumer has ever rendered them.

DH-5.5 traced the chain and found it broken in three places at once, which is
why no single fix had ever been obvious:

1. **Nothing loaded a font.** Neither Foundation nor Design shipped a font file
   or a single `@font-face` rule. The one place Geist rendered was the
   documentation site, which loaded it privately through `next/font/google`.
2. **The variable had no provider.** Foundation's stacks read
   `var(--font-geist-sans), …`, and `metadata.externallyProvidedVariables`
   declared that some consumer would inject it. Exactly one ever did — the
   original Next.js application, through `next/font`. DH-3 removed Next.js from
   the package; the contract's only implementation left with it.
3. **The fallback stack did not work.** Foundation documented the degradation
   as benign: a consumer without the variable "still gets a working stack — the
   CSS falls through to the system fonts after the undefined reference." CSS
   does not behave that way. A `var()` whose variable is undefined and which
   carries no fallback makes the **entire declaration** invalid at
   computed-value time; the rest of the comma-separated list is discarded with
   it, and `font-family` reverts to its initial value, which is the browser's
   default **serif**.

The third point is why the failure was so loud. Cloud was not rendering in
system sans and looking slightly off-brand — every surface, including headings,
inputs and buttons, was rendering in Times. Measured in a browser before any
fix:

```
--font-geist-sans   (UNDEFINED)
--font-sans         (UNDEFINED — invalid at computed-value time)
html/body/h2/input/button   font-family: Times
document.fonts              0 faces loaded
```

The documentation site, meanwhile, looked perfect. It was a false witness: a
privileged implementation that made the package's central visual promise appear
kept while every real consumer inherited browser defaults.

## Decision

**Foundation owns the typeface. Design loads it. Applications do nothing.**

Concretely:

1. **The font files live in Foundation**, at `src/assets/fonts`, shipped
   through the `./assets/*` export subpath that has existed since DS-7.1.
   Foundation's own `src/assets/README.md` has reserved that slot for webfonts
   since it was written, and `metadata.pendingMigration` listed `"fonts"` as
   outstanding. This decision does not invent a home; it fills the one the
   architecture already declared.

2. **Design distributes and declares them.** The bridge that already copies
   token _values_ out of Foundation now also copies the font _files_, and
   `packages/design/src/styles/fonts.css` holds the `@font-face` rules and the
   base typography layer. `dist/styles.css` references `./fonts/*.woff2`
   alongside itself.

3. **`styles.css` remains the single consumer entry point.** No second
   stylesheet, no font import, no `<link>` tag. The import a consumer already
   writes is the whole of the setup.

4. **The font stacks gain an inner fallback** —
   `var(--font-geist-sans, "Geist"), …` — which is what makes the declaration
   valid at all. `--font-geist-*` survive as _optional override hooks_: an
   application that would rather load Geist its own way still wins by setting
   them, and nothing depends on them any more.

5. **The documentation site loses its privilege.** `next/font` is gone from
   `apps/docs`, and so is its `body { font-family }`. It now receives
   typography through the same contract Cloud does.

### Why Design loads them, when Foundation owns them

Because **Design is the only package a consumer installs**. Cloud depends on
`@studiopod/design`; it has never depended on `@studiopod/foundation`, and
Foundation is a _build-time_ dependency inside the Design repository — never a
runtime one. That is deliberate and predates this ADR: the token bridge emits
literal values precisely so that Foundation's tree never reaches a consumer's
bundle.

Two alternatives follow from that constraint, and both are worse:

- **Have Design `@import` Foundation's stylesheet.** This makes Foundation a
  runtime dependency of every consumer, to deliver two files. A `url()`
  pointing into `@studiopod/foundation` resolves on a machine that happens to
  have it hoisted and 404s everywhere else.
- **Have applications install Foundation and load the fonts themselves.** This
  is the state DH-5.5 exists to end: typography ownership sitting in the
  application, differently in each one.

Copying the files across the same bridge the token values already cross keeps
Foundation canonical without making anyone install it. Editing a font file in
Design fails `token:bridge-check` exactly as editing a token value there does.

## Alternatives considered

### Alternative A — `next/font` in the docs app, and document that consumers self-host

Rejected. This is the status quo, stated as a policy rather than an accident.
It leaves the design system's most fundamental visual decision as a setup step
every consumer must discover, implement, and keep in step — and DH-5.5 is the
evidence for what that produces: one consumer with a bespoke Next.js
implementation, one rendering in Times, and no mechanism that would ever have
noticed.

### Alternative B — Load Geist from a CDN

Rejected. It adds a runtime third-party dependency to every StudioPOD
application for 137 KB that could ship in the package, makes the design system
fail when a third party does, and leaks a request to every consumer's users. It
also cannot be verified offline, and the DH-5.5 requirement is explicitly that
no remote dependency be introduced at runtime.

### Alternative C — Ship the font files in Design, not Foundation

Tempting, because Design is what distributes them, and it would need no
Foundation release.

Rejected because it splits ownership of one decision across two repositories:
Foundation would name the typeface while Design held the artefact, and the two
could disagree with nothing to catch it. Foundation's asset README had already
answered this question before DH-5.5 asked it. Design holding a _generated
copy_ is a different thing from Design being the source, and the bridge check
is what keeps that distinction real rather than nominal.

### Alternative D — Inline the fonts as data URIs in `styles.css`

Rejected. ~137 KB of base64 in every consumer's CSS bundle, blocking first
paint on bytes the browser can neither cache independently nor skip when it
already holds the font. The stylesheet is on the critical path; the font
deliberately is not.

## Consequences

### What this makes easier

- A consumer gets StudioPOD typography from the import it already writes.
- Typography regressions are visible in the documentation site, because it now
  consumes the same contract instead of a privileged one.
- The font files have one owner, and drift from it fails a check.
- Native controls inherit the typeface, which no consumer had arranged.

### What this makes harder

- **A font change is now a Foundation release followed by a Design release.**
  That is the same cadence a token change already has, and the same reason:
  values with visual consequences everywhere should not change casually.
- **Design's published package grew by ~137 KB.** Two variable fonts covering
  weights 100–900. The static cuts and the italics are deliberately not
  shipped.
- **Consumers that already set `--font-geist-*` keep winning.** That is
  intended, but it means an application can still opt out of the canonical
  typeface without anything failing. Nothing enforces the override is
  deliberate.

### What this commits us to

- Foundation stays the canonical source of the typeface, including its files.
- `styles.css` stays the single entry point for typography setup.
- Design never declares a font family the token layer does not name.
- The documentation site never regains a privileged typography implementation.

## Enforcement

- **`token:bridge-check`** — mechanical. The font files in
  `packages/design/src/assets/fonts` are byte-compared against Foundation's
  copy, alongside the token stylesheets. Editing one here fails the build.
- **`package:framework-check`** — mechanical, and already existed. It fails on
  any `next/*` import in the package, which is what forbids the `next/font`
  route from returning to the library.
- **Browser verification** — required. DH-5.5's own certification turns on
  computed `font-family` values and loaded font resources in a running browser,
  not on the presence of a token. This ADR exists because the token was present
  and correct for months while nothing rendered.

## References

- [docs/certification/DH-5.5.md](../certification/DH-5.5.md)
- [ADR 0007 — framework neutrality](0007-framework-neutrality.md) ·
  [ADR 0013 — framework capabilities are props](0013-framework-capabilities-are-props.md)
- Foundation `src/assets/README.md` · Foundation CHANGELOG `0.4.0`
- Cloud ADR 0034 — Cloud consumes `@studiopod/design`
