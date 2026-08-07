# Consuming StudioPOD Design

**Owns:** how an application installs, uses, and upgrades `@studiopod/design`,
and what it owes in return.

Audience: engineers in Cloud, Web, and every application after them.

---

## 1. The contract, in four sentences

1. You install `@studiopod/design` and compose its exports.
2. You do not reimplement them.
3. When you need something it does not have, you propose it here — you do not
   fork it locally and plan to upstream later.
4. You get a stable API, honest version numbers, and a migration path for every
   break.

Point 3 is the one that decides whether this works. "Local now, upstream later"
is how a design system becomes three design systems, and the later never comes.

---

## 2. Installing

The package is on GitHub Packages. Consumers need one registry line and a token
with `read:packages`.

```
@studiopod:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @studiopod/design
```

Peer dependencies: `react` and `react-dom` (`^18 || ^19`). **That is all.**
DH-3 removed the `next` peer — the package no longer requires Next.js, or any
framework, and `check-framework-imports.mjs` fails the build if one reappears.

### Wiring it up

```
1. Import the stylesheet once, at the application root
2. Add the @source line — it is REQUIRED, see below
3. Import components from the entry point that matches what you need
4. Optionally, pass your link component to the components that navigate
```

**Step 2 is not optional.** Tailwind ignores `node_modules`, so without

```css
@source '../node_modules/@studiopod/design/dist';
```

none of the design system's classes are generated and **every component renders
unstyled**, with no error. Full setup: [../DISTRIBUTION.md](../DISTRIBUTION.md)
§ 3.

### Step 4 — links, images, and navigation

Design renders a plain `<a>` by default, so **everything works with no wiring at
all**. `<Button href="/x">` is a working link today. The cost of doing nothing is
a full page load instead of a client-side transition.

To get client-side routing, pass your link component:

```tsx
import Link from "next/link";

<Button href="/pricing" linkComponent={Link}>Pricing</Button>
<NavigationItem href="/docs" linkComponent={Link}>Docs</NavigationItem>
```

To apply it everywhere, wrap once in your own application — Design deliberately
has no provider or global registry for this, because a React context read would
make every one of these components client-only
([ADR 0013](../decisions/0013-framework-capabilities-are-props.md)):

```tsx
// app/design.tsx
import Link from "next/link";
import { Button as DesignButton, type ButtonProps } from "@studiopod/design";

export const Button = (props: ButtonProps) => <DesignButton linkComponent={Link} {...props} />;
```

| Capability              | Prop               | Default                  | Components                                                        |
| ----------------------- | ------------------ | ------------------------ | ------------------------------------------------------------------ |
| Link navigation         | `linkComponent`    | `"a"`                    | `Button`, `NavigationItem`, `Breadcrumbs`, `QueueWidget`, `RelationshipList` |
| Image rendering         | `imageComponent`   | `"img"`                  | `AssetThumbnail`                                                   |
| Programmatic navigation | `onNavigate`       | `window.location.assign` | `Breadcrumbs`                                                      |

`next/image` must be pre-bound to fill mode, since Design always renders images
filling their positioned parent:

```tsx
import Image from "next/image";
import type { ImageComponentProps } from "@studiopod/design";

const FillImage = (props: ImageComponentProps) => <Image {...props} fill />;
```

### Server Components

Most of the package is server-safe: 392 of 538 modules carry no `"use client"`
directive, so a Server Component can render `Button`, `Card`, `Stack`, the
layout and workflow families, `cn`, and the token constants without opening a
client boundary. Only genuinely interactive modules — overlays, form controls,
anything with state or motion — are client, and they are marked individually.

Before DH-3 this was not true: the root entry carried a single `"use client"`
directive, which made **every** export a client reference.

---

## 3. Which entry point

| You want                            | Import from                     |
| ----------------------------------- | -------------------------------- |
| Buttons, inputs, layout, tables, patterns | `@studiopod/design`        |
| Page-section archetypes for marketing surfaces | `@studiopod/design/marketing` |
| The illustration engine             | `@studiopod/design/illustrations` |
| Semantic token values in JS         | `@studiopod/design/tokens`      |
| The stylesheet                      | `@studiopod/design/styles.css`  |

There is a fifth code entry, `@studiopod/design/internal`. **It is not for you.**
It exists so this repository's own documentation application can render the
engine internals it documents; it has no compatibility promise and its contents
may change in any release, including a patch. If you need something that is only
reachable there, that is a gap to report, not a door to use —
[ADR 0011](../decisions/0011-internal-entry-point.md).

**Import from the entry point, never from a deep path.** `@studiopod/design/dist/...`
is not a public API, and a version that reorganises internals will break you with
no changelog entry, because nothing was documented as changing.

---

## 4. Version ranges

| Consumer type                        | Recommended range                            |
| ------------------------------------ | -------------------------------------------- |
| Production application               | **Exact** (`0.14.0`), upgraded deliberately  |
| Anything depending on a Preview export| **Exact.** Preview may change in any release |
| Prototypes and internal tools        | Caret is fine                                |

Exact pinning in production is the recommendation for the same reason Cloud pins
every other dependency exactly: an upgrade should be an event with a commit and a
reviewer, not something that happens during an unrelated install.

---

## 5. Per-consumer notes

### Cloud — the SaaS product

Cloud consumes the root entry and the stylesheet. It has no use for
`./marketing` or `./illustrations`, and never resolves them.

Cloud's own rules apply on top: application-specific compositions live in Cloud
and are built **from** Design's primitives. A component defined in Cloud that is
not application-specific is a code-review finding there, and the fix is promotion
into Design.

Two facts worth stating for Cloud specifically, because they were the stated
blockers:

- The `next` peer dependency is **gone** (DH-3,
  [ADR 0007](../decisions/0007-framework-neutrality.md)). Cloud does not inherit
  a framework coupling it did not choose.
- Cloud's Server Components can render Design components directly, without a
  client boundary per component — the defect DH-2 found as N1 and DH-3 fixed.
- The marketing surface is a separate entry point Cloud never imports. It is not
  in Cloud's bundle and not in Cloud's API surface.

### Web — the public web presence

Web consumes the root entry, `./marketing`, and `./illustrations`.

Web is the primary consumer of brand compositions. That gives Web the most
influence over their evolution and the most responsibility for keeping them
**general** — a brand composition that only works for one page's copy is a Web
page, not a Design export, and it belongs in Web.

### Future applications

Facility, Mobile, Admin, a Customer Portal, and anything after them consume
Design the same way. None of them consumes another application, and none defines
its own primitives.

A future consumer that cannot use Design has found a Design defect. The response
is to fix Design, not to let the consumer start a second system — and the earlier
that is said, the cheaper it is to hold to.

---

## 6. Upgrading

| Change     | What to do                                                        |
| ---------- | ------------------------------------------------------------------ |
| Patch      | Take it. Nothing looks or behaves differently except what was wrong |
| Minor      | Take it. Read the changelog for new capability                     |
| Breaking   | Read the migration guide. Run the codemod. Budget the work.        |

Breaking changes are batched, at most quarterly, with one migration guide for the
set ([../engineering/publishing.md](../engineering/publishing.md) § 2). One
upgrade project per quarter, not four.

**If an upgrade breaks you and there is no migration note, that is our defect.**
Report it. The absence of a note means either the break was unintended or the
changelog was wrong, and both are worth knowing immediately.

---

## 7. What consumers owe

1. **Report gaps.** A workaround you did not tell us about is a gap we cannot
   close.
2. **Propose before forking.** Even a rough proposal beats a local copy.
3. **Promote what is general.** If you built something two applications would
   want, it belongs here.
4. **Stay current.** Support covers the current minor and one prior. A consumer
   four versions behind makes every break more expensive for everyone.
5. **Do not depend on internals.** A deep import is a dependency on something
   that was never promised.

---

## 8. Getting something changed

1. Open the request here, describing the **problem**, not your preferred
   solution. The problem is the part we cannot reconstruct.
2. Say who else would use it. A second consumer is the strongest argument
   available.
3. Expect one of: it exists (here is how), it should exist (here is when), or it
   is application-specific (here is why).

That third answer is not a brush-off. "This is yours" is a real architectural
answer, and getting it early is cheaper than getting it after the component is
public.

---

## 9. References

- [../architecture/boundaries.md](../architecture/boundaries.md)
- [../architecture/public-api.md](../architecture/public-api.md)
- [../engineering/publishing.md](../engineering/publishing.md)
- [../contributing/governance.md](../contributing/governance.md)
