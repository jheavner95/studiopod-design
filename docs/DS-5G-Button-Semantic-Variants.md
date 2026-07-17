# DS-5G — Button Semantic Variant Review

**Verdict:** ✅ **CERTIFIED (implementation approved & shipped to source; release pending owner trigger).**

Architectural review of the Design System's semantic action vocabulary, triggered by DS-6.2. **Outcome: add a `destructive` variant to `Button`; do NOT add `success`.** Implemented, verified end-to-end (`verify:full` — 7/7 green), committed. Release is the one owner step (§6).

---

## 0. A correction that reframes the whole review

DS-6.2 reported the app contained **"25 destructive buttons and 12 success/confirm buttons."** **Both numbers were wrong** — a measurement error in that report, which I own. The counts matched `variant="danger"` / `variant="success"` across **every** component (Badge, Chip, Inspector, status pills), not `<Button>` elements.

Corrected, `<Button>`-scoped evidence:

| variant on `<Button>` | DS-6.2 claimed | actual |
|---|---|---|
| `danger` (destructive) | 25 | **4** |
| `success` | 12 | **0** |

The "12 success" were all `Badge`/status `variant="success"` (health scores, "Ready"/"Approved" state pills). There is **not a single success-toned button** in the application. This correction is decisive for the decision below — and finding it is exactly what Phase 2 ("determine whether the application incorrectly modeled those actions") exists to do.

Destructive intent is nonetheless real and broader than 4: beyond the 4 direct `<Button variant="danger">`, a family of app-local delete-action wrappers (`RowAction`, `HoverBtn`, `CardAction`, `ActionBtn`) carry destructive styling across card/row/table "Delete" actions. So destructive-on-a-button is a genuine, widespread need; success-on-a-button is nonexistent.

---

## 1. Semantic Audit — DS action components

| Component | Destructive vocabulary | Success vocabulary | Mechanism | Tokens |
|---|---|---|---|---|
| **Button** | *(none — before DS-5G)* | none | `variant` enum (cva) | `--accent-*` for primary |
| **MenuItem** | `destructive?: boolean` → `text-error` + `bg-error-soft` | none | boolean prop | `--color-error` / `-soft` |
| **BulkActionButton** | `destructive?: boolean` → `border-error/40 text-error hover:bg-error-soft` | none | boolean prop, **rendered as `<Button variant="secondary">` + className** | `--color-error` / `-soft` |
| DropdownItem / ContextMenu / AlertDialog / ConfirmationDialog / SplitButton | *do not exist as DS exports* | — | — | — |
| Inputs (TextInput/Select/Textarea), FormField, StatCard, validation panels | — | `text-success` (status/feedback text) | tone class | `--color-success` |

**Three findings that drive the decision:**

1. **`destructive` is already a canonical DS action semantic** — consistently on MenuItem and BulkActionButton, always using `--color-error`/`--color-error-soft`, always named **`destructive`** (never `danger`).
2. **BulkActionButton already composes destructive *over a Button*** internally (`<Button variant="secondary">` + error className). The DS already accepts destructive-on-a-button conceptually; it just hadn't exposed it as a Button variant.
3. **`success` is exclusively a status/feedback tone** — inputs, trends, validation, badges. It is never an interactive action. No DS component has a success *action*.

---

## 2. Product Evidence — did the app model these correctly?

- **Destructive: correctly modeled.** Delete/discard/remove are genuinely destructive and warrant a warning affordance. The app used `variant="danger"` for exactly this. Correct intent; the only issue was the *name* (`danger` vs the DS's `destructive`) and the fact the DS Button couldn't express it.
- **Success: incorrectly modeled — but only in DS-6.2's report, not in the app.** The app has **zero** success buttons. There is nothing to migrate and nothing to support. A `success` button variant would be inventing a semantic no product uses.

---

## 3. Vocabulary Decision (on DS consistency, not app history)

**Canonical Button vocabulary: `primary · secondary · outline · ghost · destructive` (5).**

- **Add `destructive`** — it *extends an existing, consistent DS vocabulary* rather than inventing one. Named `destructive` (not the app's `danger`), aligning the word with MenuItem/BulkActionButton and the mechanism (`variant` enum) with Button's own API. This is Option A/B refined: the *concept* of Option A/B (a destructive variant) with the DS's own naming.
- **Reject `success`** — no action precedent anywhere in the DS, zero product usage, and green is a *status* tone in this system, not an *action* colour. Confirm/approve/save actions are `primary`. Adding `success` would create a new, inconsistent semantic. This rejects both Option A and Option B's `success`.
- **Reject "retain four + destructive-elsewhere" (Option C)** — the evidence (destructive is widespread on buttons; BulkActionButton already composes it over Button) shows destructive-on-Button is the consistent, not exceptional, case.

**Weight:** solid `bg-error text-white`, mirroring how `primary` is solid `bg-accent-500 text-white`. Destructive-*primary* (a prominent Delete confirm) parallels primary; MenuItem/BulkActionButton keep their subtle destructive weight, appropriate to a list row — the same way `primary` is solid on Button but menu items are never "solid primary." Different weights per component context = consistent, not contradictory.

---

## 4. Implementation

`studiopod-design`, files changed:

| File | Change |
|---|---|
| `src/components/ui/Button.tsx` | `destructive` added to the `buttonStyles` cva: `bg-error text-white hover:bg-error/90 active:bg-error/95`. Doc comment updated. |
| `src/components/ui/Button.test.tsx` | `destructive` added to the variant `it.each`; new test asserting the `bg-error` (DS `--color-error`) class. |
| `src/app/core-components/_sections/ComponentGallerySection.tsx` | showcase: `<Button variant="destructive">Delete</Button>` added to the variants row. |
| `packages/design-system/CHANGELOG.md` | Unreleased → Added entry. |

**Constraints honoured:** composes the existing `--color-error` token; **no new token**; **no application colour copied**; cva + types updated (the `VariantProps` union derives `destructive` automatically); documentation + showcase updated. The public **export surface is unchanged** (a variant-union widening is a type-shape change, not a new export) — so `api-baseline` correctly did not move.

---

## 5. Verification

`npm run verify:full` — **all 7 steps green (38.7s):**

| Step | Result |
|---|---|
| TypeScript — app | ✅ |
| TypeScript — tests | ✅ |
| ESLint | ✅ |
| Unit & component tests | ✅ (Button: **20/20**, incl. new destructive cases) |
| Next.js build | ✅ |
| Package verify (build · typecheck · api-check · css-check · use-client-check · exports-check) | ✅ 591 exports match baseline; `@theme` intact; `"use client"` intact; 9/9 export targets |
| Package pack | ✅ |

Confirmed in the built bundle: `destructive` compiles into `dist/index.js` (`bg-error text-white`), and `ButtonProps`' variant union in `dist/index.d.ts` now includes `"destructive"`. Accessibility: the new variant is a colour-only change on the existing `<button>`/axe-clean base; the Button test's axe checks pass.

---

## 6. Release Impact

- **Bump: MINOR — `0.1.1 → 0.2.0`.** Additive (new variant), non-breaking; the four existing variants render identically. This release also carries the parallel-WP `Workspace`/`SplitView` families already in Unreleased.
- **Release step (owner):** Actions → **Release @studiopod/design-system** → Run workflow → `release_type: minor`, `dry_run` unchecked. I cannot trigger it (no credential handling). The certified pipeline runs `prepublishOnly` (full verify) inside publish, tags `design-system-v0.2.0`, and publishes to GitHub Packages.
- **Downstream:** once `0.2.0` is published, the DS-6.2 Button migration is unblocked — the app Button maps 1:1 onto the DS Button, with `variant="danger"` → `variant="destructive"`, `variant="success"` → `variant="primary"` (the 0 real success buttons make this trivial), and `leftIcon`/`rightIcon` → `leadingIcon`/`trailingIcon`. That is DS-6.2's follow-up, not this WP.

---

## 7. Certification

**VERDICT: CERTIFIED.**

The review reached a decision on Design-System consistency, not application history, and the decision is backed by corrected evidence. `destructive` was added to `Button` because it extends a vocabulary the Design System already uses consistently (MenuItem, BulkActionButton) and already composes over a Button internally — named the DS's way (`destructive`, not the app's `danger`), composed from the DS's own `--color-error` token, with no new token and no application colour. `success` was rejected because the honest, `<Button>`-scoped evidence is that the application has zero success buttons and the system treats green as a status tone, never an action — a `success` variant would have invented an inconsistent semantic to serve a need that does not exist.

The most important output is the correction: DS-6.2's "25 destructive + 12 success" was a miscount across all components, not buttons. The real figures — 4 direct destructive buttons plus a family of destructive action-wrappers, and **zero** success buttons — are what an architectural decision should rest on, and getting that right changed the answer (success would otherwise have been added on false evidence).

Implementation is verified by the full pipeline (7/7, Button 20/20) and committed. The single remaining step is the owner-triggered `0.2.0` release.

**Stopping after DS-5G. DS-6 not resumed.**
