# DH-7 — Text primitives that can be composed with (finding D8)

**Certification: CERTIFIED**

One defect, one correction, one release. Nothing else in the library changed.

---

## The finding

`Body` and `Caption` accepted three props — `children`, `className`, `as` — and
forwarded **none** of them beyond `className`. A consumer needing an `id`, a
`data-` hook, an `aria-` attribute or a handler had no way to put one on the
text, so it wrapped the text in a `div`.

Those wrappers are how invalid `<p>` nesting reached three separate StudioPOD
Cloud packages, twice as a **real hydration failure**:

| Package | What happened |
| --- | --- |
| UX-2.5 | Recorded the finding: `Body` renders a `<p>` and drops unknown props |
| UX-2.6 | Upgraded it from a note to a demonstrated hazard — a `<p>` inside a `<p>` |
| UX-2.7 | Worked around it again, at a third composition site |
| UX-2.9B | Classified it **must fix before Studio certification** — repeated consumer failure is now the justification |

Three consumers hitting the same wall is a library problem, not three consumer
problems.

## The correction

**Prop forwarding, with polymorphic typing.**

```tsx
type Polymorphic<E extends ElementType, P> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | "as"> & { as?: E };

export function Body<E extends ElementType = "p">({ … , ...rest }: BodyProps<E>)
```

`as` already existed and was the right escape hatch; what was missing was the
ability to say anything else about the element. Now `<Body as="div" data-x
id="y">` is expressible, and the generic keeps it honest — choosing `as="div"`
types the remainder as div attributes, so the hatch cannot smuggle nonsense onto
a paragraph.

**Own props stay out of the DOM.** `size` and `muted` are consumed, not
forwarded; a test asserts it.

### Alternatives considered

**Separate inline and block primitives** — `Text` (span) beside `Paragraph`
(p). Semantically the clearest, and it breaks every existing consumer for a
problem that `as` already half-solved. **Rejected** on compatibility.

**Change the default element to `div`** — makes the common case
semantically wrong to fix an uncommon one. **Rejected**: running text is a
paragraph.

**A development-time warning when block children appear inside a `p`** — cute,
and it tells a consumer they have a problem without giving them the tool to fix
it. **Rejected.**

**Prop forwarding. Accepted** — the smallest change that makes the composition
possible, with nothing that compiles today ceasing to.

## Compatibility

**Additive.** `BodyProps` and `CaptionProps` keep their names and remain
assignable for the default element; every existing call site compiles unchanged.
No visual output changes. Published as a **minor** version accordingly.

## Verification

`npm run verify` — **all 14 steps passed**, including the package API contract,
CSS contract, framework independence, client boundaries, entry points, identity,
and the documentation build.

**New coverage:** `Typography.test.tsx` — 7 tests asserting the two properties
the correction rests on (the element is choosable; everything else reaches it),
plus that styling props do not leak into the DOM.

## Release

- **Version:** `0.19.0`
- **Registry:** GitHub Packages, `@studiopod` scope
- **Mechanism:** `release.yml`, `mode: bump`, `release_type: minor` — the only
  place a write credential exists
- **Tag:** applied by the workflow **after** a successful publish

## Consumer follow-up

StudioPOD Cloud adopts `0.19.0` in UX-2.9D and removes the wrapper `div`s the
finding produced. The Cloud-side report records which ones.

## Observations

**`Display`, `Heading` and `Metadata` have the same shape and have not been
changed.** Nothing has hit them, and UX-2.9D § 4 is explicit that unrelated
primitives stay unrelated. When one of them does block a consumer, the
correction is now a known one-line pattern.
