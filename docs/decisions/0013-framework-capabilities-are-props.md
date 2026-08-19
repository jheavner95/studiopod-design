# ADR 0013 — Framework capabilities are injected as props, not through context

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-3
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

> **Refines [ADR 0007](0007-framework-neutrality.md) § The injection mechanism.**
> That ADR chose a link adapter on the theme provider as the primary mechanism,
> with polymorphic rendering secondary. DH-3 inverted the order. The decision to
> remove the framework coupling is unchanged; only how it is removed changes.

## Context

ADR 0007 required the package to stop importing Next.js and proposed two
mechanisms: a link adapter supplied once through the theme provider, and
per-call polymorphic rendering for one-off cases.

The provider was the primary because it is better ergonomics — one line at the
application root instead of a prop at every link.

Implementing it alongside DH-3's other objective showed the two are in direct
conflict.

**A provider is React context, and context makes its readers client
components.** A component that calls `useContext` cannot be a Server Component,
and neither can anything it renders. Routing links through a provider would
therefore make `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget` and
`RelationshipList` permanently client — including `Button`, which is the single
most-used export in the system.

That is the same contamination DH-3 exists to remove. Defect N1 was a
`"use client"` directive at the package root turning every export into a client
reference; a link provider would reintroduce it for the link-rendering subset,
by a different route, and permanently — a directive can be moved, a context read
cannot.

The measured cost is concrete: `Button` is server-safe under the prop design and
client-only under the provider design.

## Decision

**Framework capabilities are injected as props on the components that need
them, with a plain HTML default. There is no provider and no global registry.**

| Capability             | Prop              | Default | Components                                                        |
| ---------------------- | ----------------- | ------- | ------------------------------------------------------------------ |
| Link navigation        | `linkComponent`   | `"a"`   | `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`, `RelationshipList` |
| Image rendering        | `imageComponent`  | `"img"` | `AssetThumbnail`                                                   |
| Programmatic navigation| `onNavigate`      | `window.location.assign` | `Breadcrumbs`                                     |

Types `LinkComponent`, `LinkComponentProps`, `ImageComponent` and
`ImageComponentProps` are exported from the root entry so consumers can type
their own bindings.

**The defaults are load-bearing.** Every one is a plain HTML element, so every
existing call site keeps working untouched — `<Button href="/x">` still renders
a working link. A consumer who wants client-side routing adds one prop; a
consumer who does not, does nothing. That is what made DH-3 a `minor` rather
than a migration.

**Applying one component application-wide is the application's job**, and it is
four lines:

```tsx
import Link from "next/link";
import { Button as DesignButton, type ButtonProps } from "@jheavner95/design";
export const Button = (props: ButtonProps) => <DesignButton linkComponent={Link} {...props} />;
```

Explicit, greppable, owned by the consumer, and it costs Design nothing.

## Alternatives considered

### Alternative A — The theme provider, as ADR 0007 proposed

Better ergonomics: one line at the root, no prop threading.

Rejected because context readers are client components. It would make five
component families client permanently and undo the larger half of DH-3 to
improve the ergonomics of the smaller half. Measured across the documentation
application, the ergonomic cost it would have saved is **18 call sites**; the
correctness cost it would have imposed is every server-rendered `Button` in
every consumer.

If React ever offers a server-readable configuration primitive, this is worth
revisiting.

### Alternative B — `asChild` / Slot composition

The Radix pattern: `<Button asChild><Link href="/x">Go</Link></Button>`, merging
props onto the child. Server-safe, and familiar to anyone who has used Radix.

Rejected on migration cost, not on merit. It changes the shape of every existing
call site — `href` moves from the component to a child element — which would
have made DH-3 a breaking change for all five components and every consumer of
them. The prop design leaves those call sites untouched.

Worth reconsidering if Design later needs prop merging for reasons beyond links,
where Slot earns its complexity.

### Alternative C — A module-level registry

`setLinkComponent(Link)` once at startup.

Rejected. It is hidden global state with no defined behaviour across the
server/client boundary — the module instance a Server Component sees is not
necessarily the one the client bundle initialised. It also fails the explicitness
the constitution asks for: nothing at a call site would say where the link
component came from.

### Alternative D — Keep `next` as an optional peer dependency

Import Next.js when present, fall back otherwise.

Rejected — this is ADR 0007 § Alternative A, and DH-3 found nothing to change
about its reasoning. Conditional resolution breaks static analysis, defeats
tree-shaking, and turns a build-time error into a runtime one.

## Consequences

### What this makes easier

- `Button`, `QueueWidget` and `RelationshipList` are server-safe, where the
  provider design would have made them client
- Existing call sites compile and behave unchanged — the documentation
  application typechecked with **zero** errors after the coupling was removed
- What renders a link is visible at the call site
- Testing needs no framework mock: `Breadcrumbs`' navigation test now passes a
  spy instead of mocking `next/navigation`

### What this makes harder

- **A consumer wanting client-side routing everywhere must write the wrapper.**
  Four lines, once, but it is work the provider would have done.
- **Five components carry an extra optional prop**, which is API surface.
- **The default is a full page load**, so a consumer who forgets the prop gets
  working but slower navigation — a quiet degradation rather than a loud
  failure. Documented in [consuming/README.md](../consuming/README.md).

### What this commits us to

- Never introducing a context that components must read to render correctly
- Keeping every framework capability's default a working plain-HTML element
- Treating any new framework need as a prop with a default, not an import

## Enforcement

- **`check-framework-imports.mjs`** — mechanical. No framework specifier in
  source, in the emitted output, or in the manifest.
- **`check-client-boundaries.mjs`** — mechanical. Catches a context read that
  would make a component client, because the component would then need a
  directive it did not have before.
- **"No provider for framework capabilities"** — review obligation. Nothing
  prevents someone adding one; the checks above would show the client-boundary
  cost, which is the signal that matters.

## References

- [ADR 0007 — Framework neutrality](0007-framework-neutrality.md) — refined here
- [ADR 0014 — One module per source file](0014-preserve-modules-build.md)
- `packages/design/src/framework/types.ts`
- [../certification/DH-3.md](../certification/DH-3.md)
