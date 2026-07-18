# DS-5Q — Drawer Left-Edge Extension

**Verdict:** ✅ **CERTIFIED.** `DrawerEdge` is now `"left" | "right" | "bottom"`, released as **`@studiopod/design-system@0.8.0`** with the registry resolving `latest = 0.8.0`. The application was not modified.

**Gate:** typecheck clean · lint clean · **698 tests / 0 fail** (+12) · api-baseline unchanged · `package:verify` 9/9 · showcase build exit 0 · **widened union confirmed in the shipped `.d.ts`**.

---

## 1. What the owner directed, and why it was right

DS-6.8B surfaced the mismatch and declined to work around it. The owner's ruling: **extend the DS**, do not convert the panel to a bottom sheet, and do not implement an application positioning override.

That is the correct call, and the reason is worth recording. The application renders a **left-docked device library and a right-docked settings panel on the same screen**. That pairing is what makes this more than "one more variant":

- `edge="right"` would collide with the inspector's *meaning* as well as its position.
- `edge="bottom"` would convert a persistent library into a mobile sheet — changing the interaction model to accommodate an API limit.
- A `className` position override would re-implement Drawer positioning outside the system.

One usage is normally thin evidence under DS-5L. A *paired* usage demonstrates the axis, not a preference.

## 2. Implementation

`left` mirrors `right` on the x axis and nothing else:

| | `left` | `right` | `bottom` |
|---|---|---|---|
| Position | `inset-y-0 left-0 h-full max-w-md` | `inset-y-0 right-0 h-full max-w-md` | `inset-x-0 bottom-0 max-h-[85vh]` |
| Enters from | `x: "-100%"` | `x: "100%"` | `y: "100%"` |
| Border | `border-r` | `border-l` | `border-t` |

**The border faces the content**, so a left drawer borders on its *right*. That asymmetry is why the border moved out of a two-way ternary (`edge === "right" ? "border-l" : "border-t"`) into an `edgeBorderClass` map — with three edges, a two-way ternary silently mislabels one of them. That was a latent trap, not a cosmetic refactor.

Focus trap, Escape, backdrop dismiss, body lock, portal and the shared `DialogContext` (and therefore every `Dialog*` composition part) are **edge-independent and untouched**. `left` adds **no** reduced-motion branch: motion is disabled globally by `tokens.css`, and `left` only flips the sign of an offset.

**`right` remains the default**, so every existing consumer is unchanged.

## 3. Tests — +12 (18 in `Drawer.test.tsx`, 698 suite-wide)

**Positioning:** docks to `left-0` with `border-r` and neither `right-0` nor `border-l` · `right` still the default · `bottom` unchanged · left and right produce genuinely different class strings.
**Motion:** a left drawer never enters from a positive x offset.
**Dismissal:** Escape closes when dismissible; does not when `dismissible={false}`; `DialogClose` closes through the shared context.
**Focus:** focus moves into the left panel.
**Semantics:** accessible name auto-wires from `DialogTitle`; axe clean at the left edge.
**Reduced motion:** the left edge adds no per-edge branch — the panel still renders and stays dismissible.

The `right`/`bottom` assertions sit deliberately alongside the `left` ones so a regression that collapses the three edges into one is caught here.

## 4. Documentation

New engineering note **`21-drawer-edges.md`**: what each edge *means* (left = navigation, right = inspection, bottom = mobile sheet), why `left` required paired evidence rather than a single usage, the mirroring rules, and the border-faces-content asymmetry.

Showcase `OverlayGallery` gains an **Open left drawer** button beside the existing right and bottom examples, and its copy now names all three edges with their conventions.

## 5. Verification

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ clean |
| `npm run lint` | ✅ clean |
| `npx vitest run` | ✅ **698 / 0 fail**, 89 files |
| `check-api.mjs` | ✅ baseline unchanged |
| **Shipped `.d.ts`** | ✅ `type DrawerEdge = "left" \| "right" \| "bottom";` — **verified explicitly** |
| `npm run package:verify` | ✅ 9/9 entries |
| `npm run build` (showcase) | ✅ exit 0 |

**Why the `.d.ts` was checked by hand.** `check-api.mjs` compares export *names*, not type *shapes* — a widened union is invisible to it, so "baseline unchanged" is the expected result and proves nothing about this change. DS-5P was nearly shipped with a missing export behind exactly that kind of green check, so the union was read out of `dist/index.d.ts` directly.

**Live verification was attempted and is NOT claimed.** The showcase's left drawer was driven in the browser pane, but the pane reported `window.innerWidth === 0`, which makes every geometry reading meaningless — and the shared demo instance carried a stale transform between edges, which briefly looked like a stuck-off-screen bug before the environment was ruled out. The `right` drawer showed the identical artifact, confirming it is the harness rather than the `left` edge. **No visual/motion claim is made here**; positioning and behaviour rest on the 18 jsdom tests, the typed contract, and code review.

## 6. Release

`gh workflow run … release_type=minor` → **`@studiopod/design-system@0.8.0`** published to GitHub Packages. `npm view dist-tags` → **`{ latest: '0.8.0' }`**. Release commit `89d3579`.

## 7. Readiness for the application

The blocker DS-6.8B raised is cleared. The next steps, in the owner's sequence:

1. Upgrade the application to `^0.8.0`.
2. Migrate the two `overlay-generator` drawers — left (`:785`) and right (`:1377`) — as part of **DS-6.8C**.

Both drawers can now be expressed directly, with no positioning override and no interaction-model change.

## Certification

**VERDICT: CERTIFIED.**

`DrawerEdge` now expresses the three meanings the system actually needs, with `left` implemented as a strict mirror of `right` and every shared behaviour left untouched. The change is additive — `right` is still the default, so no existing consumer moves. Twelve new tests pin the left edge's positioning, motion direction, dismissal, focus, naming and axe cleanliness, with the other two edges asserted alongside to catch a collapse. The shipped type union was verified by hand because the API baseline structurally cannot see it. 0.8.0 resolves as `latest` on the registry.

One limitation is stated rather than papered over: **the left drawer's visual behaviour was not live-verified**, because the browser pane reported a zero-width viewport that invalidated the measurements. That belongs to DS-6.8V along with the application's own overlay verification.

**Stopping after DS-5Q. The application was not modified. DS-6.8C was not begun.**
