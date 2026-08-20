# The DOM contract

**Owns:** what a component promises about the DOM element it renders — which
native capabilities a consumer may rely on, which are deliberately withheld,
and why.

Produced by UX-5.7A, after the same defect was rediscovered five times in a
consuming application.

---

## 1. The rule

**A component that owns a native DOM element exposes that element's native
contract, except where a restriction is deliberate and documented.**

Concretely, for the element a component owns:

- arbitrary `data-*` reach it
- `aria-*` reach it
- `id`, `title`, `role` and the element's other native attributes reach it
- native event handlers reach it
- `className` is **composed** with the component's own, never replaced
- the component's own computed attributes stay authoritative where correctness
  depends on them

This is not "spread props everywhere". It is a claim about one element, and the
component has to be able to say which element that is.

## 2. Why this needs stating

The failure is silent, and the silence has a specific cause.

**TypeScript deliberately exempts hyphenated JSX attributes from
excess-property checking.** `data-*` and `aria-*` type-check against _any_
component whether or not its props admit them. A closed component therefore
accepts the attribute at compile time and discards it at render. Nothing fails.
The served DOM is the only place the loss is observable.

That is how all five sightings were found — by reading served HTML while
debugging something else — and it is why each one was worked around locally
rather than recognised as a class.

## 3. DOM ownership

Every component answers one question before anything else:

> Which DOM node does a caller reasonably believe this component owns?

Three shapes, three answers.

**Single-element components** — `Badge`, `Stack`, `Surface`. The answer is the
one element. Extend the matching `HTMLAttributes<…>` and spread the rest onto
it.

**Multi-element components** — `Panel`, `Alert`. The answer is the _outer
boundary_: the thing that is visibly, or semantically, the component. Interior
structure belongs to the component, and forwarding to it would let a caller
address a box they cannot see. A caller who needs to reach inside is given a
slot — `header`, `children`, `action` — where they own their own element
outright.

**Compositions** — components whose root is another component. They inherit
whatever that component promises; they add no contract of their own unless they
own an element too.

Worked examples:

| Component | Renders                                  | Owns                  |
| --------- | ---------------------------------------- | --------------------- |
| `Badge`   | `span` + optional decorative dot `span`  | the outer `span`      |
| `Stack`   | one element, `as`-polymorphic            | that element          |
| `Surface` | one element, `as`-polymorphic            | that element          |
| `Panel`   | `Surface` + header `div` + content `div` | the `Surface`         |
| `Alert`   | `div[role]` + `Surface` + icon + dismiss | the outer `div[role]` |
| `Button`  | `button`, or a link when `href` is given | whichever it renders  |

## 4. Precedence

Caller props are spread **first**; the component applies its own afterwards.
The consequence is that anything the component computes wins, and everything
else is the caller's.

What a component keeps:

- **`className`** — composed via `cn`, so the caller adds rather than replaces.
- **Attributes it derives from its own props.** `Alert`'s `role` comes from
  `tone` by a documented rule (error announces assertively, everything else
  politely), so a caller cannot silently make a warning assertive. Refinement
  is still available through `aria-live` and `aria-atomic`, which forward.
- **Guards.** `Button` owns `aria-disabled`/`aria-busy` _while loading_ and
  nowhere else: a caller cannot re-enable a control the component has closed,
  and when the component has no opinion the caller's value is left alone rather
  than overwritten with `undefined`.

What a component yields: everything it does not compute. `Surface` yields
`role`, because nothing it does depends on one.

## 5. Intentional restrictions

Restrictions are fine. Undocumented ones are not.

- **`Badge` is not interactive.** It states a status. Nothing gives it a role,
  a tab stop or a default handler, and a status needing an action gets a
  `Button` beside it. Its dot is `aria-hidden`: the meaning is the text, never
  the colour or the mark.
- **`Alert` does not accept the native `title` attribute.** `title` is already
  its own prop — the visible heading, a `ReactNode` — and that is by far the
  more important of the two meanings. An accessible name goes in `aria-label`
  or `aria-labelledby`, both of which forward.
- **Refs are not blanket-forwarded.** See § 7.

## 6. Types

Prefer inheriting the native attribute type for the owned element over
restating props by hand:

```tsx
export interface BadgeProps
  extends VariantProps<typeof badgeStyles>,
    Omit<HTMLAttributes<HTMLSpanElement>, "color"> { … }
```

Two rules follow from that:

- **Name collisions are resolved in favour of the component's own prop**, and
  the native one is `Omit`ted and documented. A component prop that shadows a
  native attribute silently is worse than one that removes it loudly.
- **The compile-time contract and the runtime forwarding must agree.** A prop
  the type admits and the implementation drops is the original defect.

## 7. Refs

Refs are **not** part of the default contract, and are added per component on
evidence that a consumer needs one — an element to anchor a menu or a popover
to, a control to focus programmatically.

This is deliberate. Converting the library to `forwardRef` wholesale would be a
large change justified by nothing measured, and a consumer wrapping a component
in an element to hold a ref is a reasonable adaptation. `Button` forwards a ref;
most components do not.

## 8. Adding a component

1. Name the element it owns. If you cannot, the component probably owns more
   than one thing and wants splitting or a slot.
2. Extend that element's `HTMLAttributes` and spread the rest onto it.
3. Apply the component's own attributes after the spread.
4. `Omit` and document any native attribute whose name you are taking.
5. Add the four contract assertions — `data-*`, `aria-*`, `id`, `className` —
   to `src/components/dom-contract.test.tsx`.

## 9. Testing

`src/components/dom-contract.test.tsx` holds the contract for every primitive
that has one, table-driven so a new component is one row.

**Prove the assertions detect the defect.** Reintroduce the closed branch and
watch them fail before trusting them. At UX-5.7A, doing that across the five
primitives failed 26 of 30 — a test that has only ever run against correct code
has demonstrated nothing.

## 10. Known gaps

The audit scoped itself to the surface a real consumer uses: 55 components,
40 of which own native elements. Beyond that surface, most of the library's
202 native-DOM-owning exported components still declare closed prop sets.

They are not broken — nothing consumes them yet — but the first consumer of
each will meet the defect in § 2 unless the contract is added when they do.
Follow § 8.
