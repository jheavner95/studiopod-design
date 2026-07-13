# Production Workspace Retrospective

`src/app/application-components/business-features/production-workspace/` was deleted in RM-5. This document preserves why it existed, what it demonstrated, and why it was removed.

## Composition hierarchy

The Production Workspace was built as a Business-Feature-tier composition sitting entirely on top of already-certified, generic design-system primitives — it introduced no new reusable component of its own. Its nine feature components composed a small, named set of Platform-tier primitives from `@/components/platform/production`, each of which the components' own doc comments identified as a thin re-export of a lower, generic Workflow- or Operational-tier component:

- `ProductionWorkspace` — a re-export of Workflow's generic `Workflow` shell
- `ProductionHeader` — a re-export of Workflow's `WorkflowHeader`
- `ProductionInspector` — a re-export of Workflow's generic `StateInspector`
- `ProductionValidationPanel` — a re-export of Workflow's generic `PipelineGate`
- `ProductionMetrics` — a re-export of Workflow's generic `PipelineMetrics`
- `ProductionActions` — a re-export of Operational's generic `InspectorActions`
- `ProductionStagePanel` — stood in for Workflow's generic `PipelineStage`

In other words, "Production Platform" was not a bespoke production-domain UI kit — it was a domain-flavored naming layer over generic workspace/inspector/pipeline/metrics primitives that already existed for any workflow-shaped feature. The feature's own nine files (`ProductionFeatureWorkspace`, `Header`, `Navigation`, `Canvas`, `Inspector`, `Validation`, `Metrics`, `Actions`, `Dialogs`) did nothing but wire real artwork data and real commands into those generic shells, plus compose a handful of Workflow/Operational/Foundation components directly where no Platform-tier re-export existed (`WorkflowStep`, `WorkflowFooter`, `InspectorSection`, `PropertyToggle`, `Queue`, `Dialog`, `Button`, `Badge`, `SwitchField`, `Alert`, `InlineMessage`, `Tabs`/`TabsList`/`Tab`) — every one of those a pre-existing, generic, non-domain-specific building block.

## Controlled state ownership

All feature state lived in exactly one place: the `useProductionWorkspace` hook. It owned:

- the artwork collection itself (from static seed data)
- the current selection (`selectedId`/`selectedArtwork`)
- the active view (`pipeline` | `queue` | `dashboard`)
- all dialog state — a single `dialog: ProductionDialogState | null` (just a `type` and an `artworkId`), from which all five dialogs (Validation, Delete, Publish, Export, Confirmation) were derived
- a full undo/redo history as two stacks of prior artwork snapshots (`past`/`future`, capped at 20 entries), built around one `commit` function every mutating command funneled through

Every visual component downstream — header, navigation tabs, canvas/pipeline view, inspector, validation panel, actions bar, dialogs — received this state and a small set of callback props and rendered purely from them; none held state of its own beyond incidental local UI state owned by shared components (e.g. `Dialog`'s internal open/close animation). Derived values (which artworks needed attention, published counts, the five dashboard KPI figures, artworks grouped by pipeline stage) were computed inside the hook via `useMemo`, never recomputed independently by whichever component happened to render them. A clean, textbook single-source-of-truth pattern: one orchestration point, many dumb children.

## Accessibility strategy

Live-region announcements and focus handling were centralized rather than scattered. The hook called a single `useAnnounce()` from the shared `LiveRegionProvider` mounted at the app root, and every state-changing command announced its own outcome from that one place — selecting an artwork, advancing a pipeline stage, advancing validation, completing a publish/export/delete. The reasoning: the hook is the one place that already knows what changed and why, so wiring the announcement there once is more reliable than re-deriving it independently inside every presentation-only component that happens to trigger a change.

One subtle, real accessibility bug and its fix, worth keeping independent of the mock domain: deleting the currently-selected artwork removed it from state in the same commit that cleared `selectedId`, which unmounted the Inspector's action buttons *before* the shared `Dialog`'s focus-trap cleanup could restore focus to the (now-detached) triggering button — silently dropping focus to `<body>`. The fix: `ProductionFeatureInspector` tracked whether a selection existed on the previous render, and on the specific had-a-selection-then-lost-it transition (not on first mount), moved focus itself to the Inspector's own empty-state message. **Lesson: deleting the source of a focus target while a focus-trap's cleanup is queued can silently drop focus; claim focus explicitly on that specific state transition rather than trusting the trap's own restoration.**

## Why it diverged from the real application

The mock modeled an invented print-shop production domain — "artworks" moving through a four-stage pipeline (Composition → Generation → Validation → Publishing), each carrying a mock `assignee` and `priority`, a kanban-style stage board, and a separate five-step validation flow (Draft → Ready → Validating → Validated → Complete) mapped onto generic Workflow vocabulary for rendering. None of this corresponds to StudioPOD's actual production feature, which is a versioned, backend-persisted, layer-based composition editor centered on an Asset Inspector and a health-scoring system — an entirely different domain model, different terminology (layers and assets and health scores, not artworks and assignees and kanban stages), and a different interaction pattern (a persistent, versioned editing surface, not a status board with dialogs and undo/redo over in-memory mock state). The naming choice — calling this pilot "Production Workspace" — was the root of the confusion: it read as if it were modeling, or previewing, the real production feature, when it was in fact an unrelated invented domain used purely to exercise the Business-Feature composition tier.

## Why it was intentionally removed

The feature was explicitly self-labeled throughout its own source as a "pilot" — its purpose was to prove that the certified Foundation → Operational → Workflow → Platform stack could be composed into one real, interactive Business Feature, not to model any real product surface. It succeeded at that narrow goal: it demonstrated centralized state ownership, controlled child composition, undo/redo, dialog orchestration, and accessible live-region announcements, all built from generic, already-certified primitives with zero new reusable UI invented. But its "Production Workspace" name created a false impression of parity with — or even a preview of — the real, already-shipped production feature, which is a fundamentally different, backend-persisted, layer-and-asset system. Because everything this pilot composed (a workspace shell, header, sidebar, inspector, validation panel, metrics, actions, dialogs, tabs) was already available and documented as generic Workflow/Operational/Platform primitives elsewhere in the design system, the pilot itself added no unique reusable value once its composition lesson had been learned and written down — only a name that risked being mistaken for the real thing. Removing it eliminates that naming collision without losing any actual capability, since nothing it composed was unique to it.
