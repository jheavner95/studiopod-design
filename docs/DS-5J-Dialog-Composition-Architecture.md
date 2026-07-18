# DS-5J — Dialog Composition Architecture Review

**Verdict:** ✅ **CERTIFIED WITH DEFERRED ITEMS.**

The canonical Dialog composition model is **decided** and consistent with this Design System's existing conventions (composition families like `Inspector*`; context coordination in `Tabs`/`Table`/`Toast`; `useId` aria-wiring across every form input). Resolving the DS-6.4 gap requires **one implementation work package — DS-5K** — to ship the composition sub-components (with context-based accessibility auto-registration) and a `ConfirmDialog` convenience for both `Dialog` and `Drawer`. No code was written; the application was not touched. DS-6.4 may resume only after DS-5K ships.

This is a review. Nothing was implemented.

---

## Phase 1 — Dialog Philosophy

**What Dialog is.** A **blocking modal surface**: it takes over the page — overlay, focus, scroll — until dismissed. It is a *behavior + surface* primitive, not a content component.

**Three ownership tiers (the architectural boundary):**

| Tier | Owns | Examples |
|---|---|---|
| **Primitive** (`Dialog`) | The surface & behavior: portal, backdrop, **focus trap + restore**, Escape, body-lock (+ `inert`), dismissibility, `role="dialog"`/`aria-modal`, z-index, sizing, enter/exit animation. | (already shipped) |
| **Composition** (`Dialog*` sub-components) | The *internal structure*: header, title, description, body, footer, close affordance — and the a11y wiring **between** the title/description and the primitive. | `DialogHeader`, `DialogTitle`, … |
| **Application** | The *content and intent*: what the dialog says, what "confirm" does, which record is deleted, the surrounding workflow. | "Delete style?", `handleDelete()` |

The primitive must never dictate content; composition must never encode business logic; the application must never re-implement behavior. DS-6.4's failure was that the DS shipped tier 1 but not tier 2, forcing every consumer to hand-build structure — which is either duplication or a wrapper.

---

## Phase 2 — Composition Model

Canonical sub-component set (all owned by the DS, all children of `Dialog`, coordinated by a `DialogContext` the root provides):

| Component | Required? | Role | Rules |
|---|---|---|---|
| **`Dialog`** | **Required** (root) | The primitive surface + behavior + `DialogContext` provider. | The only mandatory element. |
| **`DialogHeader`** | Optional | Layout row for title/description + slot for `DialogClose`. | At most one; canonically first. |
| **`DialogTitle`** | Optional (strongly recommended) | The accessible name (`<h2>`). **Auto-registers** as `aria-labelledby` (Phase 3). | At most one. |
| **`DialogDescription`** | Optional | Supporting text (`<p>`). **Auto-registers** as `aria-describedby`. | At most one. |
| **`DialogBody`** | Optional | Scrollable content region (`overflow-y-auto`, the scroll boundary). | At most one; canonically middle. |
| **`DialogFooter`** | Optional | Action row (right-aligned button cluster, `gap`). | At most one; canonically last. |
| **`DialogClose`** | Optional | The ✕ button; calls `onOpenChange(false)` via context; `aria-label="Close"`. | Any number (header ✕, a footer "Cancel", etc.). |

**Assembly** — consumers compose, they don't configure:
```
<Dialog open={open} onOpenChange={setOpen} size="md">
  <DialogHeader>
    <DialogTitle>Rename workspace</DialogTitle>
    <DialogDescription>This changes the URL slug.</DialogDescription>
    <DialogClose />
  </DialogHeader>
  <DialogBody> …form… </DialogBody>
  <DialogFooter>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={save}>Save</Button>
  </DialogFooter>
</Dialog>
```
Sub-components are **optional and independently usable** (a bare `<Dialog>` with arbitrary children still works — backward compatible with today's API). They must be descendants of `Dialog` (they read `DialogContext`); used outside, they no-op or throw a dev-time error. **Ownership: the DS owns every sub-component**; the application owns only what goes inside `DialogTitle`/`DialogBody`/etc.

---

## Phase 3 — Accessibility Ownership

The core fix DS-6.4 demands: **eliminate per-consumer id plumbing.**

| Behavior | Owner | Mechanism |
|---|---|---|
| Focus trap, focus **restore**, Escape, body-lock/`inert`, dismissibility | **`Dialog` (primitive)** | already implemented (`useFocusTrap`/`useEscapeKey`/`useBodyLock`) |
| `role="dialog"` / `aria-modal` | **`Dialog`** | already implemented |
| **`aria-labelledby`** | **`DialogTitle` (auto)** | `DialogTitle` generates a `useId`, sets it on its `<h2 id>`, and registers it into `DialogContext`; `Dialog` reads it onto the panel. |
| **`aria-describedby`** | **`DialogDescription` (auto)** | same registration path. |
| Close-button semantics | **`DialogClose`** | `type="button"`, `aria-label="Close"`, wired to `onOpenChange(false)`. |
| Screen-reader semantics for destructive confirms | **`ConfirmDialog`** | `role="alertdialog"` (Phase 5). |

**Decisions:**
- **`DialogTitle` automatically registers** its id → `aria-labelledby`. **Yes.**
- **`DialogDescription` automatically registers** its id → `aria-describedby`. **Yes.**
- **Consumers do NOT wire ids manually.** The existing `labelledBy`/`describedBy` props on `Dialog` are **retained as override escape-hatches** only (e.g., labelling by an element outside the title, or a visually-hidden label). Default path = zero plumbing.

This is idiomatic here: the DS already uses `createContext` to coordinate sub-components (`Tabs`, `Table`, `NavigationItem`, `Toast`) and already auto-generates + wires aria ids in every form input (`TextInput`, `Checkbox`, `InputField`, …). `DialogContext` is the same pattern applied to the overlay family.

---

## Phase 4 — Drawer Architecture

`Drawer` is **behaviorally identical** to `Dialog` — same `Portal` + `useFocusTrap` + `useEscapeKey` + `useBodyLock` + `AnimatePresence`, differing only in docking to an edge and translating instead of scaling. Its source comment already says so: *"same focus-trap/Escape/backdrop machinery as Dialog."*

**Decision: one shared composition philosophy, one shared implementation.** Drawer needs the same header/title/description/body/footer/close structure. Rather than author a parallel, near-identical `Drawer*` set, the sub-components should be **surface-agnostic**: they read a shared `DialogContext` that **both** `Dialog` and `Drawer` provide. So `DialogHeader`/`DialogTitle`/`DialogBody`/`DialogFooter`/`DialogClose` work verbatim inside a `<Drawer>`.

- **Canonical names:** the `Dialog*` set (single source of truth).
- **`Drawer*` aliases** (`DrawerHeader = DialogHeader`, etc.) **optional**, for discoverability — DS-5K decides whether to export aliases or document reuse. Recommendation: **document reuse, skip aliases** (avoids doubling the public surface; consistent with how the DS already reuses components across families via `export { X as Y }`).
- **Sizing:** `Drawer` keeps width via `edge` + `className` (its current model); the app's `SideDrawer` `sm/md/lg` widths become `className` at the call site (Composition).

**Both systems share a common composition philosophy: yes — a single overlay-surface composition family.**

---

## Phase 5 — Confirm Pattern Architecture

**Evidence — all 22 `ConfirmDialog` usages are one pattern.** They are delete / archive / rollback confirmations. Shared across every site:
- **Layout:** small dialog · title (`"Delete style?"`) · optional description · right-aligned `Cancel` + `Confirm` footer.
- **API:** `title`, `description?`, `confirmLabel?`, `cancelLabel?`, `variant` (danger/default), `loading?`, `onConfirm`, `onClose`.
- **Buttons:** Cancel = secondary; Confirm = primary or destructive; `loading` disables both + shows a spinner (loading is also expressed via label, e.g. `"Archiving…"`).
- **a11y:** interrupts the user, requires a decision — semantically an **alert dialog**.

**Decision: the DS provides `ConfirmDialog`. Not `AlertDialog` (yet), not both.**
- `ConfirmDialog` = the **two-action** (confirm/cancel) pattern the app uses 22×. Ship it — it is a genuine universal convenience, exactly the class of thing the DS already ships for other families (`Toast`, `UnsavedChangesBanner`, `BulkActionConfirmation`).
- A single-action **`AlertDialog`** (acknowledge-only) has **zero** app usage; do **not** add it now (add later only if a real consumer appears). Avoid speculative surface.

**Canonical `ConfirmDialog` API:**
```ts
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;   // Cancel / dismiss
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;                    // default "Confirm"
  cancelLabel?: string;                     // default "Cancel"
  tone?: "default" | "destructive";         // NOT "warning" — see below
  loading?: boolean;
}
```
Built on `Dialog size="sm"` + the composition set + DS `Button`.

**Ownership:**
| Concern | Owner | Detail |
|---|---|---|
| `loading` | **DS** | disables both buttons, spinner on Confirm, blocks dismiss while pending |
| destructive styling | **DS** | `tone="destructive"` → DS `Button variant="destructive"` (shipped DS-5G) |
| button layout | **DS** | Cancel (secondary) + Confirm, right-aligned footer |
| default sizing | **DS** | `size="sm"` |
| keyboard | **DS** | Escape = cancel; `role="alertdialog"`; **initial focus on Cancel** for `destructive` (safe default), on Confirm otherwise |
| copy & intent | **Application** | title/description/labels, what confirm does |

> **Drop `warning`.** The app's `ConfirmDialog` defines a `warning` variant but real usage is `danger`/`default` only. Per the DS-5G Button decision (warning is a *status* tone, not an *action* tone), `ConfirmDialog` exposes `default | destructive` — a confirm action is never "warning-coloured."

---

## Phase 6 — Common Dialog Patterns Inventory

| Pattern | In the DS? | How |
|---|---|---|
| **Confirmation** | ✅ `ConfirmDialog` | tone=default |
| **Destructive confirmation** (delete) | ✅ `ConfirmDialog` | tone=destructive, `role=alertdialog`, focus Cancel |
| **Publish confirmation** | ⚠️ via `ConfirmDialog` | it *is* a confirmation; DS owns the shell, **app owns the "Publish" copy/intent** |
| **Delete confirmation** | ✅ `ConfirmDialog` | tone=destructive |
| **Unsaved changes** | ⚠️ via `ConfirmDialog` | discard/keep is a confirmation; app owns copy. (`UnsavedChangesBanner` already exists for the inline case.) |
| **Information** | ✅ `Dialog` + composition | no special component |
| **Blocking progress** | ✅ `Dialog dismissible={false}` + composition | app composes a progress indicator; not a new component |
| **Success** | ❌ (feedback family) | prefer `Toast`/`Alert`/`SuccessState` — a success *dialog* is rarely correct |
| **Error** | ❌ (feedback family) | prefer `Toast`/`Alert`/`ErrorState`; a blocking error dialog = `Dialog` + composition |

**Belongs in the DS:** the `Dialog` primitive, the `Dialog*` composition set, and **exactly one** convenience — `ConfirmDialog`. **Does not belong:** publish/delete/QA/unsaved *workflow* dialogs (these are `ConfirmDialog` **instances** with application copy — app-specific intent, DS-provided shell), and success/error dialogs (feedback family already covers these). The DS ships the shell and the one universal pattern; it does **not** ship application workflows.

---

## Phase 7 — Migration Matrix

| App capability | DS target | Class |
|---|---|---|
| `Modal` `open` | `Dialog open` | **Direct** |
| `Modal` `onClose()` | `Dialog onOpenChange(false)` | **Rename** |
| `Modal` `closeOnBackdrop` (incl. dynamic) | `dismissible` | **Rename** |
| `Modal` `size` sm/md (lg/xl unused) | `size` sm/md (or `full`) | **Rename** |
| `Modal` `lockScroll` (opt-out unused) | always body-locks | **Remove** |
| `Modal` `title` / `description` | `DialogTitle` / `DialogDescription` | **New DS Component** (Composition) |
| `Modal` `footer` | `DialogFooter` | **New DS Component** |
| `Modal` close ✕ button | `DialogClose` | **New DS Component** |
| `Modal` header layout | `DialogHeader` | **New DS Component** |
| `Modal` body scroll region | `DialogBody` | **New DS Component** |
| **`aria-labelledby`/`describedby` auto-wiring** | `DialogTitle`/`Description` auto-register | **New DS Component** (context) |
| `ConfirmDialog` (22×) | `ConfirmDialog` (DS) | **New DS Component** |
| `ConfirmDialog` `variant` danger/default | `tone` destructive/default | **Rename** |
| `ConfirmDialog` `variant="warning"` (unused) | — | **Remove** |
| `ConfirmDialog` `loading` | `ConfirmDialog loading` | **Direct** |
| `SideDrawer` shell | `Drawer` | **Rename** |
| `SideDrawer` header/title/footer/close | `Dialog*` set inside `Drawer` | **New DS Component** (Composition, shared) |
| `SideDrawer` size sm/md/lg | width via `className` | **Composition** |

**No residual "DS Architectural Gap" once DS-5K ships** — every capability lands as Direct, Rename, Composition, New DS Component, or Remove.

---

## Phase 8 — Recommendation

**Recommendation: (3) Add composition components plus `ConfirmDialog`** — and extend the same composition set to `Drawer`.

**Justification, from Design-System principles:**
1. **Composition over configuration** — the same principle DS-5H established for Badge (primitive + composition, not a batteries-included god-component). `Dialog` stays a clean primitive; structure is composed.
2. **Precedent exists** — the DS already ships composition families (`InspectorHeader`/`Footer`/`Panel`/`Section`), already coordinates sub-components via `createContext` (`Tabs`, `Table`, `Toast`), and already auto-wires aria ids via `useId` (every form input). DS-5K applies established patterns, not new ones.
3. **`ConfirmDialog` is a universal convenience, not an app workflow** — 22 semantically-identical usages, zero business logic in the pattern itself. The DS already ships peer conveniences (`Toast`, `UnsavedChangesBanner`, `BulkActionConfirmation`). Withholding `ConfirmDialog` is what forces the DS-6.4 wrapper/duplication dilemma.
4. **Accessibility must be owned by the DS** — per-consumer id plumbing is exactly the repetitive, error-prone work a design system exists to remove.

Options 1 (sufficient) and 2 (composition only) are rejected: option 1 is the status quo DS-6.4 already proved insufficient; option 2 leaves the 22 `ConfirmDialog` sites with no home (wrapper or duplication). Option 4 (different architecture) is unwarranted — the primitive is sound; only its composition layer is missing.

---

## Deliverables (summary)

- **Dialog philosophy** — §1 (primitive / composition / application tiers).
- **Composition hierarchy** — §2 (`Dialog` + Header/Title/Description/Body/Footer/Close, all DS-owned, context-coordinated).
- **Accessibility ownership** — §3 (`DialogTitle`/`Description` auto-register; consumers never plumb ids; primitive owns focus/escape/lock).
- **Drawer architecture** — §4 (mirrors Dialog; one shared surface-agnostic composition set; document reuse, no parallel `Drawer*` reimplementation).
- **ConfirmDialog decision** — §5 (**ship `ConfirmDialog`**, `default|destructive`, `role="alertdialog"`, DS owns loading/styling/layout/sizing/keyboard; **no `AlertDialog`**, **no `warning`**).
- **Dialog pattern inventory** — §6 (DS owns the shell + `ConfirmDialog`; workflows and success/error stay app / feedback family).
- **Migration matrix** — §7.
- **Implementation recommendation** — §8 (Option 3).

---

## Certification

**VERDICT: CERTIFIED WITH DEFERRED ITEMS.**

The canonical Dialog composition architecture is settled: `Dialog` (and `Drawer`) remain behavior+surface primitives; a single DS-owned, context-coordinated composition family (`DialogHeader`/`DialogTitle`/`DialogDescription`/`DialogBody`/`DialogFooter`/`DialogClose`) supplies structure and **auto-registers** the accessible name/description so consumers never wire ids; and a single convenience, `ConfirmDialog` (`default|destructive`, `role="alertdialog"`), absorbs the app's 22 confirmation sites. This resolves the DS-6.4 gap entirely, using patterns the DS already employs (composition families, context coordination, `useId` aria-wiring) — no new architecture required.

**Deferred implementation — follow-up work package `DS-5K` (blocks DS-6.4):**
1. Add `DialogContext`; ship `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter`, `DialogClose` with auto-registered `aria-labelledby`/`describedby`. Keep `Dialog`'s current props (`labelledBy`/`describedBy` become overrides) — fully backward compatible.
2. Make the composition set surface-agnostic so it also works inside `Drawer`; document Drawer reuse.
3. Ship `ConfirmDialog` (`Dialog size="sm"` + set + DS `Button`; `tone: default|destructive`; `loading`; `role="alertdialog"`; focus-Cancel for destructive).
4. Tests + docs/showcase; release (minor, e.g. `0.3.0`); bump the app consumer.

DS-6.4 resumes **only** after DS-5K ships and the consumer is bumped.

**No implementation. No code changes. Stopping after DS-5J.**
