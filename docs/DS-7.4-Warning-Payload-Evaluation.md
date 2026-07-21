# DS-7.4 — Warning Payload Evaluation

**Verdict: CERTIFIED — extension NOT justified. `useEditSession` is unchanged.**

DS-7.3 recorded a follow-up: `TemplateEditorPage` maintains a parallel `saveNote`
because the session reports *that* warnings occurred (`savedWithWarnings`) but
not *what* they were. This package asked whether warning payloads belong in the
canonical session contract.

**They do not.** The audit found the follow-up mis-diagnosed its own need: the
parallel field does not hold warnings at all. Adding `warnings` to the session
would not have removed it.

No code was written. No API changed. No application was modified.

---

## 1. Evidence review — every commit path

### 1.1 What the hook's commit contract can express

`commit(draft)` resolves to `EditSessionCommitResult | void`, or rejects:

| Outcome | How it is expressed | Resulting status |
|---|---|---|
| success | resolve, no warnings | `saved` |
| success + warnings | resolve, non-empty `warnings` | `savedWithWarnings` |
| failure | reject (throw) | `error` |

### 1.2 Real persistence paths in the consuming application

Every `save*`/`persist*`/`commit*` entry point was classified. The question is
narrow: **does a *successful* commit return warning content?**

| Path | Returns on success | Warnings on success? |
|---|---|---|
| **`saveTemplateGeometry`** (Template editor) | `{ status: "success"\|"warning", message, validationSummary }` | **Yes** — a *generated summary string* + structured `validationSummary` |
| **`saveEditorVersion`** (Composition editor) | `{ ok, composition, version }` | **No** — succeeds or throws |
| `saveBlueprint` | `BlueprintDocument` | No — validation is a separate `validateBlueprint` call |
| `saveGenerationProfile` | `GenerationProfile` | No — same separation |
| `saveProductDrafts` | `PersistedProductDraft[]` | No — warnings come from promotion *eligibility* |
| `saveDeviceTemplate`, `saveComposition`, `saveOverlayPreset`, `saveRatioTemplate`, `saveExportPreset`, `saveCustomStyle`, `saveArtworkProject`, `saveRuntimeAsset`, `persistCertification`, … | domain document / void | No |
| `saveImportedSvgOverlay` (SVG import) | `{ importStatus: "imported"\|"imported_with_warning", warnings: string[], … }` | **Yes** — a real `warnings: string[]` |

### 1.3 Which of those are *session* consumers

DS-7.1 scoped the session to **buffered** editing only. The application has
exactly **two** buffered sessions:

| Buffered session | Commit warnings? |
|---|---|
| `TemplateEditorPage` | Yes |
| `CompositionEditorPage` | **No** |

`saveImportedSvgOverlay` is the one other warning-carrying commit, and its
callers are `SvgImportWizard`, `SvgImportPanel`, `BatchImportWizard` and
`BatchImportPanel` — **one-shot import pipelines, not buffered edit sessions.**
DS-7.1 explicitly scoped non-buffered commits out of the session contract, so
they are corroborating evidence that "commits can warn" is a real pattern in this
domain, but they are **not** evidence of a second *session* consumer.

**Count of realistic session consumers producing commit warnings: one.**

## 2. The decisive finding — the parallel field is not a warnings payload

DS-7.3's follow-up assumed `saveNote` exists to hold warning content. It does not.

`saveTemplateGeometry` populates `message` on **every** non-error path:

```ts
status:  hasWarnings ? "warning" : "success",
message: hasWarnings
  ? `Saved with ${n} validation warning(s)`   // warning path
  : "Saved",                                   // clean-success path
// …and in the client-SDK fallback branch:
  ? `Saved locally with ${n} warning(s)`
  : "Saved (local fallback)",
```

And the pilot sets it unconditionally, rendering it for **both** statuses:

```ts
setSaveNote(result.message);                                    // success AND warning
session.status === "saved"             ? { message: saveNote }  // ← still needed
session.status === "savedWithWarnings" ? { message: saveNote }
```

**Therefore: adding `warnings: readonly string[]` to `EditSessionResult` would
not remove `saveNote`.** The page would still need it for the clean-success
message — which is not merely decorative: `"Saved"` vs `"Saved (local fallback)"`
tells the user whether the server or the local fallback accepted the write.

The proposed extension fails to solve the problem it was proposed to solve. That
alone is disqualifying.

## 3. Where warning *detail* actually lives

The structured warning detail is **already available caller-side, continuously**:

```ts
const validation      = useMemo(() => validateGeometry(layers, template), [layers, template]);
const savedValidation = useMemo(() => validateGeometry(savedLayers, template), [savedLayers, template]);
```

`validateGeometry` recomputes on every draft change and feeds
`TemplateValidationPanel`. A session-held `warnings` array would be a **stale
snapshot taken at commit time** of information the caller already has live — and
strictly worse than what it already renders.

## 4. Ownership decision

**Warning content is caller-owned domain data, not session state.**

The boundary is principled, not merely convenient:

- The session needs to know **whether** the commit was clean in order to pick
  between `saved` and `savedWithWarnings`. That is a *lifecycle* fact.
- It does not need to know **what** the warnings said. That is *domain* content
  the caller produced, and in this consumer it is either (a) already live
  caller-side or (b) presentation copy.
- Retaining it would make the session a courier for strings it cannot interpret,
  validate, or act on.

This is exactly what `EditSessionCommitResult`'s existing JSDoc already states —
DS-7.4 confirms it with evidence rather than changing it:

> *"The **content** of those warnings stays with the caller (it produced them);
> the session only needs to know whether there were any, so it does not re-expose
> them."*

## 5. API decision — measured against the six criteria

| Criterion | Result |
|---|---|
| Produced by more than one realistic consumer | ❌ **Fail** — one buffered-session consumer (§1.3) |
| Generic | ✅ `readonly string[]` would be generic |
| Not domain-specific | ⚠️ The array would be; the **actual need** (a success message) is domain copy |
| Does not require Inspector knowledge | ✅ |
| Does not expand ownership into persistence | ❌ **Fail** — the real need encodes *how* the write landed (`"Saved (local fallback)"`), which is persistence detail |
| Remains additive | ✅ would be |

**Two criteria fail, including the primary one. The existing API is retained
unchanged.**

## 6. Guidance for consumers

If your commit produces information you must display beyond the lifecycle state:

1. **Prefer live domain state over a commit snapshot.** If the same information
   is derivable from the draft (validation, health, counts), compute it — it stays
   correct as the user keeps editing, whereas a commit-time snapshot goes stale.
2. **If you must retain commit output, keep the whole outcome in one
   caller-owned value**, not several parallel fields:
   ```tsx
   const [lastCommit, setLastCommit] = useState<EditorSaveResult | null>(null);
   commit: async (draft) => {
     const result = await save(draft);
     if (result.status === "error") throw new Error(result.message);
     setLastCommit(result);
     return { warnings: result.status === "warning" ? [result.message] : [] };
   }
   ```
3. **Let `session.status` gate rendering.** The caller-owned value is only read
   when the session says there is something to show, so it cannot be displayed
   out of sync:
   ```tsx
   {session.status === "savedWithWarnings" && <InlineMessage tone="warning">{lastCommit?.message}</InlineMessage>}
   ```
4. **Clear it wherever you clear other per-session caller state** — discard and
   re-seed. (In the pilot this is two call sites.)
5. **Report failure by throwing.** A commit that *returns* an error status will
   otherwise be recorded as a success — the single most likely integration bug,
   already hit and handled in DS-7.3.

## 7. Validation

No source changed, so validation confirms the surface is intact rather than
proving a new behaviour:

| Check | Result |
|---|---|
| `typecheck` | ✅ clean |
| Edit-session behavioural tests | ✅ **52 passing**, unchanged and still valid |
| `package:api-check` | ✅ **616 exports match baseline** — surface unchanged |
| Published package | **0.12.0 remains correct and current**; no release required, because nothing shipped changed |
| Application | ✅ **not modified** — `TemplateEditorPage` untouched |
| `useEditSession` | ✅ **not redesigned, not extended** |

**No new tests were added**, correctly: the brief scopes behavioural tests to
"if implemented." The existing 52 remain valid because nothing changed.

## 8. Recommendation for the next consumer pilot

1. **Pilot `CompositionEditorPage` next.** It is the only other buffered session,
   and it is a genuinely different shape: its commit **cannot warn**, it has no
   `original` baseline (so `reset` should be omitted, exercising the optional
   path), it uses a manual dirty flag today, and it carries a per-save `notes`
   field. That combination tests parts of the contract the Template pilot did not.
2. **Watch for a second warning-producing session there — there won't be one.**
   If a *third* buffered session ever appears whose commit both warns *and* needs
   the warning text (rather than live validation), reopen this decision. The
   change would still be additive and cheap; the evidence simply is not there today.
3. **Do not migrate the SVG import wizards into sessions** to manufacture a second
   consumer. They are one-shot pipelines; DS-7.1 scoped them out deliberately.
4. **Carry forward the DS-7.3 open question instead:** `gate` went unused because
   this consumer's blockers live inside its commit. That is a real, unresolved
   contract question and a better use of the next package than warning payloads.

## 9. Final audit

| Deliverable | Result |
|---|---|
| 1. Evidence review | ✅ §1 — every persistence path classified |
| 2. Ownership decision | ✅ §4 — caller-owned domain data |
| 3. API decision | ✅ §5 — retained unchanged, criteria scored |
| 4. Implementation | ✅ **none** — not justified |
| 5. Behavioural tests | ✅ n/a; existing 52 remain valid |
| 6. Documentation | ✅ this document + DS-7.2 §8 updated |
| 7. Package validation | ✅ §7 |
| 8. Recommendation | ✅ §8 |
| Hook not redesigned / not broadened | ✅ |
| No application migration | ✅ |
| `ProductInspector` not migrated | ✅ |
| `TemplateEditorPage` not modified | ✅ |

**CERTIFIED.** The evaluation reached a definite, evidence-backed answer: warning
payloads remain caller-owned, and `useEditSession` ships unchanged at 0.12.0.

Stop after DS-7.4.
