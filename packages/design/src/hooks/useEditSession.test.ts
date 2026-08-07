import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useEditSession, type UseEditSessionOptions } from "./useEditSession";

/**
 * Behavioral tests for the canonical buffered edit session (DS-7.2).
 *
 * Every assertion is behavioral — observable status, selectors, draft/baseline
 * values, and how many times the caller's `commit` actually ran. No snapshots.
 */

interface Draft {
  name: string;
  size: number;
  tags: string[];
}

const BASELINE: Draft = { name: "Original", size: 10, tags: ["a"] };

/** A fresh, structurally-equal-but-not-identical baseline, for equality tests. */
function equalBaseline(): Draft {
  return { name: "Original", size: 10, tags: ["a"] };
}

function setup(overrides: Partial<UseEditSessionOptions<Draft>> = {}) {
  const commit = vi.fn(async (_draft: Draft) => undefined);
  const options: UseEditSessionOptions<Draft> = { baseline: BASELINE, commit, ...overrides };
  const view = renderHook((props: UseEditSessionOptions<Draft>) => useEditSession(props), {
    initialProps: options,
  });
  return { ...view, commit, options };
}

describe("useEditSession — initial state", () => {
  it("starts pristine with draft and baseline both seeded from the baseline option", () => {
    const { result } = setup();
    expect(result.current.status).toBe("pristine");
    expect(result.current.draft).toEqual(BASELINE);
    expect(result.current.baseline).toEqual(BASELINE);
    expect(result.current.error).toBeNull();
  });

  it("reports loading while the caller's fetch is in flight, overriding everything else", () => {
    const { result } = setup({ loading: true });
    expect(result.current.status).toBe("loading");
    expect(result.current.canSave).toBe(false);
  });

  it("exposes exactly the five canonical actions", () => {
    const { result } = setup();
    expect(Object.keys(result.current.actions).sort()).toEqual(
      ["discard", "dismissError", "reset", "save", "update"].sort(),
    );
  });
});

describe("useEditSession — update and dirty", () => {
  it("update moves the session from pristine to dirty", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "Changed" }));
    expect(result.current.status).toBe("dirty");
    expect(result.current.isDirty).toBe(true);
    expect(result.current.draft.name).toBe("Changed");
  });

  it("accepts an updater function like setState", () => {
    const { result } = setup();
    act(() => result.current.actions.update((previous) => ({ ...previous, size: 42 })));
    expect(result.current.draft.size).toBe(42);
    expect(result.current.isDirty).toBe(true);
  });

  it("leaves the baseline untouched while the draft changes", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "Changed" }));
    expect(result.current.baseline).toEqual(BASELINE);
  });

  it("returns to pristine when an edit is reverted back to the baseline value", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "Changed" }));
    expect(result.current.status).toBe("dirty");
    act(() => result.current.actions.update({ ...BASELINE }));
    expect(result.current.status).toBe("pristine");
    expect(result.current.isDirty).toBe(false);
  });

  it("refuses updates while read-only", () => {
    const { result } = setup({ readOnly: true });
    act(() => result.current.actions.update({ ...BASELINE, name: "Blocked" }));
    expect(result.current.draft).toEqual(BASELINE);
    expect(result.current.isDirty).toBe(false);
  });
});

describe("useEditSession — no-op save guard", () => {
  it("does not call commit when the draft equals the baseline", async () => {
    const { result, commit } = setup();
    await act(async () => { await result.current.actions.save(); });
    expect(commit).not.toHaveBeenCalled();
    expect(result.current.status).toBe("pristine");
  });

  it("does not call commit when edits net back to the baseline", async () => {
    const { result, commit } = setup();
    act(() => result.current.actions.update({ ...BASELINE, size: 99 }));
    act(() => result.current.actions.update({ ...BASELINE }));
    await act(async () => { await result.current.actions.save(); });
    expect(commit).not.toHaveBeenCalled();
    expect(result.current.status).toBe("pristine");
  });
});

describe("useEditSession — successful save", () => {
  it("commits the draft, advances the baseline, and resolves to saved", async () => {
    const { result, commit } = setup();
    const next = { ...BASELINE, name: "Saved name" };
    act(() => result.current.actions.update(next));

    await act(async () => { await result.current.actions.save(); });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(next);
    expect(result.current.status).toBe("saved");
    expect(result.current.baseline).toEqual(next);
    expect(result.current.isDirty).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("passes through saving while the commit is in flight", async () => {
    let release: (() => void) | undefined;
    const commit = vi.fn(
      () => new Promise<void>((resolve) => { release = resolve; }),
    );
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    act(() => { void result.current.actions.save(); });

    expect(result.current.status).toBe("saving");
    expect(result.current.isSaving).toBe(true);
    expect(result.current.canSave).toBe(false);

    await act(async () => { release?.(); });
    expect(result.current.status).toBe("saved");
  });

  it("freezes the draft while saving — update, discard and reset are refused", async () => {
    let release: (() => void) | undefined;
    const commit = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    const edited = { ...BASELINE, name: "in flight" };
    const { result } = setup({ commit, original: BASELINE });

    act(() => result.current.actions.update(edited));
    act(() => { void result.current.actions.save(); });

    act(() => result.current.actions.update({ ...BASELINE, name: "ignored" }));
    act(() => result.current.actions.discard());
    act(() => result.current.actions.reset());
    expect(result.current.draft).toEqual(edited);

    await act(async () => { release?.(); });
  });

  it("does not start a second commit while one is in flight", async () => {
    let release: (() => void) | undefined;
    const commit = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    act(() => { void result.current.actions.save(); });
    act(() => { void result.current.actions.save(); });

    expect(commit).toHaveBeenCalledTimes(1);
    await act(async () => { release?.(); });
  });
});

describe("useEditSession — save with warnings", () => {
  it("resolves to savedWithWarnings when commit reports warnings", async () => {
    const commit = vi.fn(async () => ({ warnings: ["Bleed boundary missing"] }));
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "y" }));
    await act(async () => { await result.current.actions.save(); });

    expect(result.current.status).toBe("savedWithWarnings");
    expect(result.current.hasError).toBe(false);
    expect(result.current.isDirty).toBe(false);
  });

  it("treats an empty warnings array as a clean save", async () => {
    const commit = vi.fn(async () => ({ warnings: [] }));
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "y" }));
    await act(async () => { await result.current.actions.save(); });

    expect(result.current.status).toBe("saved");
  });
});

describe("useEditSession — save failure", () => {
  it("resolves to error with the thrown message and does not advance the baseline", async () => {
    const commit = vi.fn(async () => { throw new Error("Network unreachable"); });
    const { result } = setup({ commit });
    const edited = { ...BASELINE, name: "unsaved" };

    act(() => result.current.actions.update(edited));
    await act(async () => { await result.current.actions.save(); });

    expect(result.current.status).toBe("error");
    expect(result.current.hasError).toBe(true);
    expect(result.current.error).toBe("Network unreachable");
    expect(result.current.baseline).toEqual(BASELINE);
    expect(result.current.draft).toEqual(edited);
  });

  it("never rejects at the caller — a failing commit resolves the promise", async () => {
    const commit = vi.fn(async () => { throw new Error("boom"); });
    const { result } = setup({ commit });
    act(() => result.current.actions.update({ ...BASELINE, name: "z" }));
    await expect(act(async () => { await result.current.actions.save(); })).resolves.toBeUndefined();
  });

  it("can retry after a failure by invoking save again", async () => {
    const commit = vi
      .fn<(draft: Draft) => Promise<void>>()
      .mockRejectedValueOnce(new Error("transient"))
      .mockResolvedValueOnce(undefined);
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "retry" }));
    await act(async () => { await result.current.actions.save(); });
    expect(result.current.status).toBe("error");

    await act(async () => { await result.current.actions.save(); });
    expect(result.current.status).toBe("saved");
    expect(commit).toHaveBeenCalledTimes(2);
  });

  it("clears the error on the next edit", async () => {
    const commit = vi.fn(async () => { throw new Error("nope"); });
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "a" }));
    await act(async () => { await result.current.actions.save(); });
    expect(result.current.status).toBe("error");

    act(() => result.current.actions.update({ ...BASELINE, name: "b" }));
    expect(result.current.status).toBe("dirty");
    expect(result.current.error).toBeNull();
  });

  it("dismissError clears a persisted error", async () => {
    const commit = vi.fn(async () => { throw new Error("nope"); });
    const { result } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "a" }));
    await act(async () => { await result.current.actions.save(); });

    act(() => result.current.actions.dismissError());
    expect(result.current.status).toBe("dirty");
    expect(result.current.error).toBeNull();
  });
});

describe("useEditSession — discard", () => {
  it("returns the draft to the baseline and the status to pristine", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "temp" }));
    act(() => result.current.actions.discard());
    expect(result.current.draft).toEqual(BASELINE);
    expect(result.current.status).toBe("pristine");
  });

  it("discards to the advanced baseline after a save, not the original load", async () => {
    const { result } = setup();
    const firstSave = { ...BASELINE, name: "first" };
    act(() => result.current.actions.update(firstSave));
    await act(async () => { await result.current.actions.save(); });

    act(() => result.current.actions.update({ ...BASELINE, name: "second" }));
    act(() => result.current.actions.discard());
    expect(result.current.draft).toEqual(firstSave);
  });

  it("is refused while read-only", () => {
    const { result, rerender, options } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "temp" }));
    rerender({ ...options, readOnly: true });
    act(() => result.current.actions.discard());
    expect(result.current.draft.name).toBe("temp");
  });
});

describe("useEditSession — reset and the optional original baseline", () => {
  it("reverts the whole draft to the original", async () => {
    const { result } = setup({ original: BASELINE });
    const saved = { ...BASELINE, name: "committed" };
    act(() => result.current.actions.update(saved));
    await act(async () => { await result.current.actions.save(); });

    act(() => result.current.actions.reset());
    expect(result.current.draft).toEqual(BASELINE);
    // The baseline advanced on save, so reverting to the original is a real change.
    expect(result.current.isDirty).toBe(true);
  });

  it("reverts a selected part of the draft via the select callback", () => {
    const { result } = setup({ original: BASELINE });
    act(() => result.current.actions.update({ name: "new", size: 99, tags: ["x"] }));

    act(() => result.current.actions.reset((original, draft) => ({ ...draft, size: original.size })));
    expect(result.current.draft).toEqual({ name: "new", size: 10, tags: ["x"] });
  });

  it("is a documented no-op when no original baseline was supplied", () => {
    const { result } = setup(); // no `original`
    const edited = { ...BASELINE, name: "edited" };
    act(() => result.current.actions.update(edited));

    act(() => result.current.actions.reset());
    expect(result.current.draft).toEqual(edited);
    expect(result.current.status).toBe("dirty");
  });

  it("is refused while read-only", () => {
    const { result } = setup({ original: BASELINE, readOnly: true });
    act(() => result.current.actions.reset());
    expect(result.current.draft).toEqual(BASELINE);
  });
});

describe("useEditSession — gate", () => {
  it("blocks the commit and surfaces the first blocker as the error", async () => {
    const gate = vi.fn(() => ["Safe zone is required", "Bleed is recommended"]);
    const { result, commit } = setup({ gate });

    act(() => result.current.actions.update({ ...BASELINE, name: "blocked" }));
    await act(async () => { await result.current.actions.save(); });

    expect(commit).not.toHaveBeenCalled();
    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe("Safe zone is required");
  });

  it("disables canSave while the gate reports blockers", () => {
    const { result } = setup({ gate: () => ["blocked"] });
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    expect(result.current.isDirty).toBe(true);
    expect(result.current.canSave).toBe(false);
  });

  it("allows the commit when the gate returns no blockers", async () => {
    const { result, commit } = setup({ gate: () => [] });
    act(() => result.current.actions.update({ ...BASELINE, name: "ok" }));
    expect(result.current.canSave).toBe(true);
    await act(async () => { await result.current.actions.save(); });
    expect(commit).toHaveBeenCalledTimes(1);
  });

  it("treats null and undefined from the gate as passing", async () => {
    const { result, commit } = setup({ gate: () => null });
    act(() => result.current.actions.update({ ...BASELINE, name: "ok" }));
    await act(async () => { await result.current.actions.save(); });
    expect(commit).toHaveBeenCalledTimes(1);
  });
});

describe("useEditSession — derived selectors", () => {
  it("canSave requires dirtiness", () => {
    const { result } = setup();
    expect(result.current.canSave).toBe(false);
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    expect(result.current.canSave).toBe(true);
  });

  it("canSave is false while read-only, even when dirty", () => {
    const { result, rerender, options } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    rerender({ ...options, readOnly: true });
    expect(result.current.isDirty).toBe(true);
    expect(result.current.isReadOnly).toBe(true);
    expect(result.current.canSave).toBe(false);
  });

  it("canSave is false while loading", () => {
    const { result, rerender, options } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    rerender({ ...options, loading: true });
    expect(result.current.canSave).toBe(false);
  });

  it("isReadOnly mirrors the option and is orthogonal to status", () => {
    const { result } = setup({ readOnly: true });
    expect(result.current.isReadOnly).toBe(true);
    // readOnly is a mode, not a status value.
    expect(result.current.status).toBe("pristine");
  });

  it("isSaving and hasError derive from status rather than separate flags", async () => {
    const commit = vi.fn(async () => { throw new Error("x"); });
    const { result } = setup({ commit });
    expect(result.current.isSaving).toBe(false);
    expect(result.current.hasError).toBe(false);

    act(() => result.current.actions.update({ ...BASELINE, name: "a" }));
    await act(async () => { await result.current.actions.save(); });
    expect(result.current.hasError).toBe(true);
    expect(result.current.isSaving).toBe(false);
  });
});

describe("useEditSession — status transitions", () => {
  it("walks pristine → dirty → saving → saved", async () => {
    let release: (() => void) | undefined;
    const commit = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    const { result } = setup({ commit });
    const seen: string[] = [result.current.status];

    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    seen.push(result.current.status);
    act(() => { void result.current.actions.save(); });
    seen.push(result.current.status);
    await act(async () => { release?.(); });
    seen.push(result.current.status);

    expect(seen).toEqual(["pristine", "dirty", "saving", "saved"]);
  });

  it("never reports the non-canonical states", async () => {
    const { result } = setup();
    const canonical = [
      "loading", "pristine", "dirty", "saving", "saved", "savedWithWarnings", "error",
    ];
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    expect(canonical).toContain(result.current.status);
    await act(async () => { await result.current.actions.save(); });
    expect(canonical).toContain(result.current.status);
    expect(result.current.status).not.toBe("editing");
    expect(result.current.status).not.toBe("disabled");
  });

  it("re-seeds draft, baseline and status when the caller supplies a new baseline", () => {
    const { result, rerender, options } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "abandoned" }));
    expect(result.current.isDirty).toBe(true);

    const reloaded: Draft = { name: "Reloaded", size: 1, tags: [] };
    rerender({ ...options, baseline: reloaded });

    expect(result.current.draft).toEqual(reloaded);
    expect(result.current.baseline).toEqual(reloaded);
    expect(result.current.status).toBe("pristine");
  });

  it("ignores a commit that resolves after the session was re-seeded", async () => {
    let release: (() => void) | undefined;
    const commit = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    const { result, rerender, options } = setup({ commit });

    act(() => result.current.actions.update({ ...BASELINE, name: "stale" }));
    act(() => { void result.current.actions.save(); });

    const reloaded: Draft = { name: "Reloaded", size: 1, tags: [] };
    rerender({ ...options, baseline: reloaded });

    await act(async () => { release?.(); });

    // The stale commit must not advance the new session's baseline.
    expect(result.current.baseline).toEqual(reloaded);
    expect(result.current.status).toBe("pristine");
  });
});

describe("useEditSession — automatic success reset", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("returns saved to pristine after the default 3000ms", async () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    await act(async () => { await result.current.actions.save(); });
    expect(result.current.status).toBe("saved");

    act(() => { vi.advanceTimersByTime(2999); });
    expect(result.current.status).toBe("saved");

    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current.status).toBe("pristine");
  });

  it("returns savedWithWarnings to pristine as well", async () => {
    const commit = vi.fn(async () => ({ warnings: ["w"] }));
    const { result } = setup({ commit });
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    await act(async () => { await result.current.actions.save(); });
    expect(result.current.status).toBe("savedWithWarnings");

    act(() => { vi.advanceTimersByTime(3000); });
    expect(result.current.status).toBe("pristine");
  });

  it("honours a custom successResetMs", async () => {
    const { result } = setup({ successResetMs: 500 });
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    await act(async () => { await result.current.actions.save(); });

    act(() => { vi.advanceTimersByTime(500); });
    expect(result.current.status).toBe("pristine");
  });

  it("does NOT auto-clear an error", async () => {
    const commit = vi.fn(async () => { throw new Error("persistent"); });
    const { result } = setup({ commit });
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    await act(async () => { await result.current.actions.save(); });

    act(() => { vi.advanceTimersByTime(60_000); });
    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe("persistent");
  });
});

describe("useEditSession — equality strategy", () => {
  it("uses deep comparison by default, so a structurally equal draft is not dirty", () => {
    const { result } = setup();
    act(() => result.current.actions.update(equalBaseline()));
    expect(result.current.draft).not.toBe(result.current.baseline);
    expect(result.current.isDirty).toBe(false);
    expect(result.current.status).toBe("pristine");
  });

  it("deep comparison detects nested array changes", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, tags: ["a", "b"] }));
    expect(result.current.isDirty).toBe(true);
  });

  it("deep comparison distinguishes arrays of different length", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ ...BASELINE, tags: [] }));
    expect(result.current.isDirty).toBe(true);
  });

  it("deep comparison is order-sensitive for arrays but not for object keys", () => {
    const { result } = setup();
    act(() => result.current.actions.update({ tags: ["a"], size: 10, name: "Original" }));
    expect(result.current.isDirty).toBe(false);

    act(() => result.current.actions.update({ ...BASELINE, tags: ["a", "b"] }));
    expect(result.current.isDirty).toBe(true);
  });

  it("honours a custom equality strategy", () => {
    // Only the name matters to this caller; size changes are not "dirty".
    const isEqual = (a: Draft, b: Draft) => a.name === b.name;
    const { result } = setup({ isEqual });

    act(() => result.current.actions.update({ ...BASELINE, size: 9999 }));
    expect(result.current.isDirty).toBe(false);
    expect(result.current.status).toBe("pristine");

    act(() => result.current.actions.update({ ...BASELINE, name: "Different" }));
    expect(result.current.isDirty).toBe(true);
  });

  it("custom equality also drives the no-op save guard", async () => {
    const isEqual = (a: Draft, b: Draft) => a.name === b.name;
    const { result, commit } = setup({ isEqual });

    act(() => result.current.actions.update({ ...BASELINE, size: 9999 }));
    await act(async () => { await result.current.actions.save(); });
    expect(commit).not.toHaveBeenCalled();
  });
});

describe("useEditSession — action stability", () => {
  it("keeps the action identities stable across re-renders", async () => {
    const { result, rerender, options } = setup();
    const first = result.current.actions;
    act(() => result.current.actions.update({ ...BASELINE, name: "x" }));
    rerender({ ...options });
    await waitFor(() => expect(result.current.actions).toBe(first));
  });
});
