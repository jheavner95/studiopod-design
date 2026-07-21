"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";

/**
 * The canonical buffered edit-session status (DS-7.1 §2).
 *
 * `editing` and `disabled` are deliberately absent. Editing is inline and
 * continuous — there is no edit-mode toggle in this system, so "editing" is an
 * act that produces `dirty`, not a state. `disabled` is derived
 * (`isSaving || isReadOnly || loading`), never stored.
 *
 * `readOnly` and `noSelection` are orthogonal modes rather than members of this
 * union: `readOnly` gates every transition without being one (see
 * `isReadOnly`), and "no selection" means there is no session to describe — the
 * caller simply doesn't mount one.
 */
export type EditSessionStatus =
  | "loading"
  | "pristine"
  | "dirty"
  | "saving"
  | "saved"
  | "savedWithWarnings"
  | "error";

/**
 * What the caller's own `commit` reports back.
 *
 * A non-empty `warnings` array resolves the save to `savedWithWarnings`
 * instead of `saved` — the commit succeeded, but imperfectly. The **content**
 * of those warnings stays with the caller (it produced them); the session only
 * needs to know whether there were any, so it does not re-expose them.
 */
export interface EditSessionCommitResult {
  warnings?: readonly string[];
}

/** The five canonical session actions (DS-7.1 §4). There are deliberately no others. */
export interface EditSessionActions<TDraft> {
  /**
   * Apply an edit to the draft. Accepts a value or an updater, like `setState`.
   * Refused while the draft is frozen (`isSaving || isReadOnly || loading`).
   * Clears a lingering `saved`/`savedWithWarnings`/`error` status so the
   * session returns to `dirty`/`pristine`.
   */
  update: (next: TDraft | ((previous: TDraft) => TDraft)) => void;
  /**
   * Gate → no-op guard → commit → advance baseline. Never rejects: a failed
   * commit resolves the session to `error` rather than throwing at the caller.
   */
  save: () => Promise<void>;
  /** Whole-draft discard — `draft := baseline`. Refused while the draft is frozen. */
  discard: () => void;
  /**
   * Revert against the immutable `original` baseline. With no argument the whole
   * draft reverts; pass `select` to revert part of it (the session is generic and
   * cannot know your fields). **A no-op when no `original` was supplied.**
   */
  reset: (select?: (original: TDraft, draft: TDraft) => TDraft) => void;
  /** Clear a persisted `error` status. Errors never auto-clear (DS-7.1 §2.3). */
  dismissError: () => void;
}

export interface UseEditSessionOptions<TDraft> {
  /**
   * The last-committed snapshot. Dirtiness is measured against it, and the
   * session advances its own copy on every successful commit.
   *
   * **Must be referentially stable.** A new object identity is read as "the
   * caller loaded different data", which re-seeds the session (draft, baseline
   * and status all reset). Passing a freshly-built object every render would
   * discard edits continuously.
   */
  baseline: TDraft;
  /**
   * The immutable as-loaded snapshot. Supplying it is what makes `reset`
   * meaningful — without it `reset` is a documented no-op. Only
   * `TemplateEditorPage` of the three DS-7.1 reference owners kept one, so it
   * is optional by evidence.
   */
  original?: TDraft;
  /** The caller's pre-session data fetch is still in flight. Forces `status: "loading"`. */
  loading?: boolean;
  /** Orthogonal mode — freezes every mutating action and forces `canSave: false`. */
  readOnly?: boolean;
  /**
   * Change-detection strategy. Defaults to a structural deep comparison, which
   * is what `TemplateEditorPage` approximated with `JSON.stringify` equality —
   * without that approach's ordering and `undefined` hazards. Supply your own
   * for large drafts where a cheaper identity or field-subset check is enough.
   */
  isEqual?: (a: TDraft, b: TDraft) => boolean;
  /**
   * Domain save-blockers, evaluated before any commit. Return a non-empty list
   * to block: the first entry becomes `error`, and no commit is attempted.
   * Distinct from soft validation, which only displays and never blocks.
   */
  gate?: (draft: TDraft) => readonly string[] | null | undefined;
  /**
   * Persist the draft. **The session never networks, retries, or resolves
   * conflicts** — this callback is the entire persistence boundary, and it
   * belongs to the caller.
   */
  commit: (draft: TDraft) => Promise<EditSessionCommitResult | void>;
  /**
   * How long `saved`/`savedWithWarnings` linger before returning to `pristine`.
   * DS-7.1 §8-Q5: the reference implementations disagreed (3000 vs 4000 ms);
   * 3000 is the canonical default.
   */
  successResetMs?: number;
}

export interface EditSessionResult<TDraft> {
  /** The live working copy. */
  draft: TDraft;
  /** The session's own last-committed snapshot — advances on every successful save. */
  baseline: TDraft;
  status: EditSessionStatus;
  /** The failure or blocker message while `status` is `"error"`, else `null`. */
  error: string | null;
  actions: EditSessionActions<TDraft>;
  /** Derived: the draft differs from the baseline. */
  isDirty: boolean;
  /** Derived: `status === "saving"`. There is no second in-flight boolean. */
  isSaving: boolean;
  /** Derived: dirty, not saving, not read-only, not loading, and the gate passes. */
  canSave: boolean;
  /** Derived from the `readOnly` option. */
  isReadOnly: boolean;
  /** Derived: `status === "error"`. */
  hasError: boolean;
}

/** DS-7.1 §8-Q5 — one canonical duration, replacing the reference owners' 3000/4000 split. */
const DEFAULT_SUCCESS_RESET_MS = 3000;

/**
 * The stored half of the state machine. Everything else — `dirty`, `pristine`,
 * `loading` — is derived, so no fact is represented twice.
 */
type CommitPhase = "idle" | "saving" | "saved" | "savedWithWarnings" | "error";

interface SessionState<TDraft> {
  /** The `options.baseline` this session was seeded from, for change detection. */
  seededFrom: TDraft;
  baseline: TDraft;
  draft: TDraft;
  phase: CommitPhase;
  error: string | null;
  /** Bumped on every re-seed so an in-flight commit can detect it is stale. */
  generation: number;
}

/**
 * Structural equality — the default change-detection strategy.
 *
 * Handles plain objects, arrays, `Date`, and primitives (including `NaN`, via
 * `Object.is`). Deliberately not a general-purpose deep-equal: it does not walk
 * `Map`/`Set`/class instances, because a draft is expected to be serialisable
 * state. Supply `isEqual` for anything richer.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;

  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
  }

  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b)) return false;
  if (aIsArray) {
    const arrayA = a as unknown[];
    const arrayB = b as unknown[];
    if (arrayA.length !== arrayB.length) return false;
    return arrayA.every((item, index) => deepEqual(item, arrayB[index]));
  }

  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(b, key) &&
      deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
  );
}

function messageOf(cause: unknown): string {
  if (cause instanceof Error) return cause.message;
  if (typeof cause === "string") return cause;
  return "Save failed.";
}

/**
 * The canonical buffered edit session (DS-7.0 / DS-7.1).
 *
 * Holds a draft against a baseline, derives dirtiness, and runs the save
 * lifecycle — nothing else. It is **headless orchestration**: no markup, no
 * persistence, no networking, no domain knowledge. Presentation is already
 * owned by this system (`InspectorProperty`'s edit slot, the Foundation Forms
 * fields, `InspectorValidation`, `UnsavedChangesBanner`, `ConfirmDialog`), and
 * the DS-7.1 audit found the genuine gap to be the *state machine* and its
 * vocabulary — three application owners had each invented a different one.
 *
 * **Buffered sessions only.** Edits accumulate in a draft and commit together.
 * Surfaces where each control persists on its own action (a row added, a row
 * deleted) are not sessions and should stay as discrete `InspectorActions` with
 * their own pending/error state — forcing them through a draft/baseline pair
 * would be a mis-fit, not a migration.
 *
 * @example
 * ```tsx
 * const session = useEditSession({
 *   baseline: savedLayers,          // referentially stable, caller-owned
 *   original: initialLayers,        // optional — enables reset()
 *   gate: (draft) => getSaveBlockers(draft),
 *   commit: async (draft) => {
 *     const result = await saveGeometry(templateId, draft);
 *     return { warnings: result.warnings };
 *   },
 * });
 *
 * <InspectorProperty>
 *   <InputField
 *     label="Name"
 *     value={session.draft.name}
 *     onChange={(e) => session.actions.update((d) => ({ ...d, name: e.target.value }))}
 *   />
 * </InspectorProperty>
 *
 * <Button onClick={session.actions.save} disabled={!session.canSave}>
 *   {session.isSaving ? "Saving…" : "Save"}
 * </Button>
 * ```
 *
 * @see docs/DS-7.2-Edit-Session-Hook.md for the state machine, the ownership
 * boundary, and the documented extension points (concurrency, context,
 * autosave, undo/redo, external updates) — none of which are implemented here.
 */
export function useEditSession<TDraft>(options: UseEditSessionOptions<TDraft>): EditSessionResult<TDraft> {
  const {
    baseline: incomingBaseline,
    original,
    loading = false,
    readOnly = false,
    isEqual = deepEqual as (a: TDraft, b: TDraft) => boolean,
    gate,
    commit,
    successResetMs = DEFAULT_SUCCESS_RESET_MS,
  } = options;

  const [stored, setStored] = useState<SessionState<TDraft>>(() => ({
    seededFrom: incomingBaseline,
    baseline: incomingBaseline,
    draft: incomingBaseline,
    phase: "idle",
    error: null,
    generation: 0,
  }));

  // Re-seed when the caller supplies different data (a reload, or a different
  // selected object). React's documented "adjust state during render" pattern:
  // it renders once with the corrected value rather than flashing the stale one.
  let session = stored;
  if (incomingBaseline !== stored.seededFrom) {
    session = {
      seededFrom: incomingBaseline,
      baseline: incomingBaseline,
      draft: incomingBaseline,
      phase: "idle",
      error: null,
      generation: stored.generation + 1,
    };
    setStored(session);
  }

  // Actions stay referentially stable by reading through refs rather than
  // closing over render-scoped values.
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const configRef = useRef({ gate, commit, readOnly, loading, original, isEqual });
  configRef.current = { gate, commit, readOnly, loading, original, isEqual };

  /** The draft is frozen mid-commit and under read-only — DS-7.1's derived `disabled`. */
  const canMutate = useCallback((): boolean => {
    const { readOnly: ro, loading: ld } = configRef.current;
    return !ro && !ld && sessionRef.current.phase !== "saving";
  }, []);

  const update = useCallback<EditSessionActions<TDraft>["update"]>((next) => {
    if (!canMutate()) return;
    setStored((current) => {
      const draft =
        typeof next === "function" ? (next as (previous: TDraft) => TDraft)(current.draft) : next;
      // Any edit clears a transient outcome so status falls back to dirty/pristine.
      return { ...current, draft, phase: "idle", error: null };
    });
  }, [canMutate]);

  const discard = useCallback(() => {
    if (!canMutate()) return;
    setStored((current) => ({ ...current, draft: current.baseline, phase: "idle", error: null }));
  }, [canMutate]);

  const reset = useCallback<EditSessionActions<TDraft>["reset"]>(
    (select) => {
      if (!canMutate()) return;
      const { original: source } = configRef.current;
      if (source === undefined) return; // documented no-op: no original baseline supplied
      setStored((current) => ({
        ...current,
        draft: select ? select(source, current.draft) : source,
        phase: "idle",
        error: null,
      }));
    },
    [canMutate],
  );

  const dismissError = useCallback(() => {
    setStored((current) => (current.phase === "error" ? { ...current, phase: "idle", error: null } : current));
  }, []);

  const save = useCallback(async (): Promise<void> => {
    const { readOnly: ro, loading: ld, gate: blockersOf, commit: persist, isEqual: equals } = configRef.current;
    const current = sessionRef.current;

    if (ro || ld || current.phase === "saving") return;

    // No-op guard (DS-7.1 §2.3): nothing actually changed, so clear any
    // transient status and skip the commit entirely — no network call.
    if (equals(current.draft, current.baseline)) {
      setStored((s) => (s.phase === "idle" ? s : { ...s, phase: "idle", error: null }));
      return;
    }

    const blockers = blockersOf?.(current.draft);
    if (blockers && blockers.length > 0) {
      setStored((s) => ({ ...s, phase: "error", error: blockers[0] }));
      return;
    }

    const snapshot = current.draft;
    const generation = current.generation;
    setStored((s) => ({ ...s, phase: "saving", error: null }));

    try {
      const result = await persist(snapshot);
      // The session was re-seeded while this commit was in flight — the result
      // belongs to a session that no longer exists.
      if (sessionRef.current.generation !== generation) return;
      const warned = (result?.warnings?.length ?? 0) > 0;
      setStored((s) => ({
        ...s,
        // Pessimistic: the baseline advances only to what was actually
        // committed, so edits made during the save stay dirty.
        baseline: snapshot,
        phase: warned ? "savedWithWarnings" : "saved",
        error: null,
      }));
    } catch (cause) {
      if (sessionRef.current.generation !== generation) return;
      setStored((s) => ({ ...s, phase: "error", error: messageOf(cause) }));
    }
  }, []);

  // Success is transient and self-clearing; failure persists until the next
  // edit, retry, or explicit dismissal (DS-7.1 §2.3, anti-pattern 6).
  const { phase } = session;
  useEffect(() => {
    if (phase !== "saved" && phase !== "savedWithWarnings") return;
    const timer = setTimeout(() => {
      setStored((current) =>
        current.phase === "saved" || current.phase === "savedWithWarnings"
          ? { ...current, phase: "idle" }
          : current,
      );
    }, successResetMs);
    return () => clearTimeout(timer);
  }, [phase, successResetMs]);

  const isDirty = useMemo(
    () => !isEqual(session.draft, session.baseline),
    [isEqual, session.draft, session.baseline],
  );

  const status: EditSessionStatus = loading
    ? "loading"
    : session.phase !== "idle"
      ? session.phase
      : isDirty
        ? "dirty"
        : "pristine";

  const isSaving = status === "saving";
  const hasError = status === "error";

  // The gate participates in enablement, not just in save() — a blocked draft
  // must not offer an enabled Save button. Only evaluated when it could matter.
  const gatePasses = useMemo(() => {
    if (!gate || !isDirty) return true;
    const blockers = gate(session.draft);
    return !blockers || blockers.length === 0;
  }, [gate, isDirty, session.draft]);

  const canSave = isDirty && !isSaving && !readOnly && !loading && gatePasses;

  const actions = useMemo<EditSessionActions<TDraft>>(
    () => ({ update, save, discard, reset, dismissError }),
    [update, save, discard, reset, dismissError],
  );

  return {
    draft: session.draft,
    baseline: session.baseline,
    status,
    error: session.error,
    actions,
    isDirty,
    isSaving,
    canSave,
    isReadOnly: readOnly,
    hasError,
  };
}
