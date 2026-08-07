# ADR 0007 — No framework coupling in the package

- **Status:** Accepted
- **Date:** 2026-08-06
- **Work package:** DH-1
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —
- **Refined by:** [ADR 0013](0013-framework-capabilities-are-props.md) — § The injection mechanism
- **Implemented by:** DH-3

## Context

`@studiopod/design` declares `next` as a **required peer dependency**:

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "next": ">=14.0.0"
}
```

The build externalises `next`, `next/link`, `next/navigation`, and `next/image`.
The coupling comes from the brand compositions, which use `next/link` for
navigation.

This is not a theoretical purity concern. It is the stated reason a consumer
declined to adopt the package. Cloud ADR 0033 records that
`@studiopod/design` "carries marketing compositions, an illustration engine and a
`next/link` coupling Cloud does not want" — and concludes, correctly, that this
is an argument for **improving Design**, not for Cloud owning a second copy of
the design system.

The structural problem is that a framework coupling introduced for one consumer
becomes a tax on all of them. Every consumer must install Next.js, must satisfy a
version range they did not choose, and inherits a constraint on their runtime
that has nothing to do with why they wanted a Button.

There is a second, subtler cost. A library that imports a router is a library
that knows about routing, which means it has opinions about navigation that
belong to the application. `next/link` prefetches, participates in client-side
transitions, and behaves differently under different router configurations.
Design should not be making those choices on a consumer's behalf.

## Decision

**The package targets React. It does not target any framework.**

Concretely:

1. **`next` is removed from `peerDependencies`.** Peers become `react` and
   `react-dom` only.
2. **No `next/*` import may appear in package source**, ever. Enforced
   mechanically.
3. **Framework capabilities are injected by the consumer**, not imported by the
   library.

### The injection mechanism

> **Superseded in part by [ADR 0013](0013-framework-capabilities-are-props.md).**
> DH-3 implemented this ADR and inverted the two mechanisms below: capabilities
> are injected as **props**, and there is no provider. The reason is that a
> provider is React context, and a context read makes a component client —
> which would have made `Button` and four other families permanently client,
> undoing the other half of DH-3. The decision to remove the coupling is
> unchanged; only the mechanism is. The rest of this ADR stands.

Two complementary mechanisms, because they suit different cases.

**A link adapter on the theme provider**, for components that navigate:

The consumer supplies its link component once, at the application root. Design
components that navigate render **the consumer's** component. In a Next.js
application that is `next/link`; in a different runtime it is something else; in
a test it is an anchor. Design never needs to know which.

The default, when nothing is supplied, is a plain `<a>`. That is the correct
default: it works everywhere, it is accessible, and it degrades honestly rather
than failing.

**Polymorphic rendering (`asChild` / `as`)**, for one-off cases where a consumer
needs a specific element or component in a specific place without configuring
anything globally.

The same approach covers images — `next/image` is a consumer capability, not a
library dependency.

### Scope of the rule

This applies to **any** framework or application coupling, not just Next.js:
routers, data-fetching libraries, application state, analytics, feature flags,
and internationalisation runtimes. If a component needs one, it is injected.

## Alternatives considered

### Alternative A — Make `next` an optional peer dependency

`peerDependenciesMeta: { next: { optional: true } }`. Consumers who do not use
Next.js skip the install, and the import fails only if they use a marketing
composition.

Rejected because it converts a build-time error into a runtime one. A consumer
who imports a component that transitively reaches `next/link` gets a resolution
failure at bundle time or, worse, a broken page — with no signal at install time
that the dependency was needed. Optional peers are appropriate for genuinely
optional capabilities, not for a dependency that some code paths hard-require.

It also leaves the deeper problem untouched: Design still decides how navigation
works.

### Alternative B — Move brand compositions to a package that may depend on Next.js

The coupling is confined to `/marketing`, so a separate `@studiopod/design-marketing`
could declare `next` and leave the core clean.

Rejected. It fails the second-package test in
[ADR 0004](0004-one-published-package.md) § "Divergent consumers" — there is no
consumer that wants marketing and not the core. More importantly, it accepts the
coupling as permanent and builds a package boundary to contain it, when the
coupling itself is removable in a bounded amount of work. Fixing the cause is
cheaper than architecting around it.

### Alternative C — Detect the framework at runtime

Try to resolve `next/link` and fall back to `<a>` if it is absent.

Rejected. Conditional resolution breaks static analysis, defeats tree-shaking,
produces different behaviour in development and production, and makes the
component's behaviour depend on what happens to be installed rather than on what
the consumer asked for. Magic that inspects its environment is precisely what
"explicit dependencies" rules out.

### Alternative D — Accept the coupling; every consumer uses Next.js today

True at this moment: Cloud, Web, and the documentation site are all Next.js.

Rejected on the evidence in front of us. Cloud is a Next.js application and
**still declined the package over this coupling**, because the objection is not
"we cannot run Next.js" but "we did not choose this dependency and we do not want
Design deciding our navigation." A coupling that a same-framework consumer
rejects is not a coupling justified by shared framework choice.

It also forecloses futures cheaply given up: a React Native surface, an embedded
widget, a Vite-based internal tool, a Storybook-like host. None is planned. All
become impossible.

## Consequences

### What this makes easier

- **Cloud can consume the package**, removing the stated blocker
- Consumers control their own navigation and image behaviour
- The package works in any React environment, including tests, without a
  framework harness
- Testing components that navigate no longer requires mocking a router
- Future non-Next.js surfaces stay possible

### What this makes harder

- **Consumers must wire the link adapter.** One line at the application root, but
  a real setup step, and a consumer who forgets it gets plain anchors and loses
  client-side transitions — a subtle failure rather than a loud one.
- **The default is worse than the coupled version** for Next.js consumers who do
  nothing. A plain `<a>` triggers a full page load.
- **Every navigating component must accept the adapter**, which is more plumbing
  than importing `next/link` directly.
- **Migration is a breaking change for Web**, which currently gets Next.js
  behaviour for free.

The second and fourth costs are real and were weighed. The mitigation is
documentation and a codemod, not a compromise on the rule — a partial exception
would leave the peer dependency in place, which is the whole problem.

### What this commits us to

- Never importing a framework module in package source, including when it is
  clearly convenient
- Maintaining the adapter surface as new capabilities appear
- Documenting the wiring prominently enough that consumers do not miss it
- Treating any future framework need as an injection design problem

## Enforcement

- **Framework import check** (DH-2) — mechanical. No `next/*` or other framework
  specifier in package source or in the built bundle. This check does not exist
  yet and is a DH-2 deliverable.
- **`identity-check`** — mechanical. Peer dependencies must be exactly `react`
  and `react-dom`.
- **Pack inspection** — mechanical. The built output must externalise nothing
  framework-shaped.
- **Test environment** — structural. The package's tests run without a framework
  installed, so a coupling fails the test run rather than reaching a consumer.

That last one is the most useful of the four: it makes the constraint felt
immediately by whoever introduces it.

## References

- Cloud ADR 0033 — StudioPOD ecosystem architecture
- [ADR 0004 — One published package](0004-one-published-package.md)
- [../architecture/packages.md](../architecture/packages.md) § 6
- [../consuming/README.md](../consuming/README.md) § 2
