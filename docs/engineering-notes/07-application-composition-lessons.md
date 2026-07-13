# Application Composition Lessons

Source: `docs/application-composition-certification` (deleted, RM-5). This tier documented how the one real Business Feature (the Production Workspace pilot) composed the Foundation → Operational → Workflow → Platform stack into a real, working screen.

## Two real bugs caught during promotion review

1. **DescriptionList column-collapse bug** (Business Feature Templates): a 2-column `CardGrid` wrapping `DescriptionList` squeezed the value column to 0px width, collapsing text to one character per line. Fixed by switching to a single-column list, matching the safe pattern the composition architecture's own equivalent section already used.
2. **Dashboard metrics overflow bug** (Production Workspace pilot): `ProductionFeatureMetrics` used `columns={4}` on Platform's `ProductionMetrics`, overflowing a metric value ("33%" clipped to 29px of a 130px-wide string) because it rendered inside the Workspace's narrower main-content column, not the full page width. Fixed by changing to `columns={2}`. **Generalizable pitfall**: `StatGroup`'s responsive grid reads the *viewport* breakpoint, not the *container's* actual width — a component nested inside a narrower-than-viewport column can silently overflow even though the same column count works fine at the page level. Any component whose responsive behavior is viewport-driven rather than container-driven needs this checked explicitly when it's reused inside a narrower parent.

## Layering lessons

- **No duplicated ownership**: the pilot's validation flow (`Draft → Ready → Validating → Validated → Complete`) was the one genuinely new piece of domain logic in the tier, and it did not reimplement Workflow's own `ApprovalStateValue` vocabulary — it mapped into it for rendering. **Reusable pattern: map new domain-specific state into a lower tier's existing vocabulary for rendering, rather than inventing a parallel one.**
- **Business Features own orchestration only**: `useProductionWorkspace` contained 100% of the pilot's logic (state, commands, undo/redo, dialog state, selection, repository calls), and every composed component was a controlled, presentation-only child with zero internal business state. This single-hook-orchestration pattern is the core architectural takeaway of the whole exercise (see the full [Production Workspace Retrospective](./08-production-workspace-retrospective.md)).
- **Tier-skipping is allowed, narrowly**: `WorkflowStep` and `WorkflowFooter` were composed directly from the Workflow tier rather than through a Platform-tier re-export — correct, specifically because *neither had a Platform-tier re-export available*. The rule this establishes: skipping a tier is allowed when no equivalent exists at the tier above, but only then.
- **Dialog state ownership**: a single `dialog: ProductionDialogState | null` field (carrying just a `type` and an `artworkId`) in the orchestrating hook drove all five of the pilot's dialogs; Foundation's `Dialog` component itself owned none of that state, only `open`/`onOpenChange`.

## Template design lesson

The framework's generic Feature Template explicitly lists 13 parts including "Dialogs," but the tailored Workspace Feature Template (a 7-part subset) doesn't repeat it — and in fact no per-category template repeats it, because it isn't domain-specific and was treated as always-implied rather than enumerated nine separate times. **Reusable lesson**: a per-category template can reasonably omit a cross-cutting concern by treating it as always-implied, but that omission should be stated explicitly rather than silently assumed — otherwise it reads as a compliance gap when a real feature (correctly) builds the omitted part anyway.

## Methodology note

One audit technique worth keeping independent of its (trivial) result here: grep the codebase for a feature's own directory/module name to prove nothing downstream depends on it — a cheap, repeatable check for one-way layering that generalizes to any "does anything import from this feature" question.
