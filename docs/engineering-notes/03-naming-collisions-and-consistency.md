# Naming Collisions & API Consistency

Source: `platform-certification`, `workflow-certification`, `enterprise-architecture-audit`, and `foundation-audit` (all deleted, RM-5).

## Confirmed real naming collisions

### Workflow tier (7 collisions across 8 systems / 92 components)

| Name | Collides with | Status |
|---|---|---|
| `WorkflowProgress` | `src/workflows/components/WorkflowProgress.tsx` (the plural Workflow Diagram Library) | Intentional, disclosed — different props |
| `WorkflowStep` (type) | `src/workflows/types/workflow.ts` and `src/compositions/WorkflowComposition.tsx` | **Unresolved** |
| `WorkflowTimeline` | `src/workflows/components/WorkflowTimeline.tsx` | Intentional, disclosed — confirmed genuinely different components, both actively used |
| `PipelineStep` | `src/components/illustration/PipelineStep.tsx` | Intentional, disclosed — structurally different |
| `PipelineStage` (component vs. interface) | `src/illustrations/types/diagram.ts`'s own `PipelineStage` data interface | **Unresolved** |
| `WorkflowMiniMap` | `src/workflows/components/WorkflowMiniMap.tsx` and `src/platforms/components/PlatformMiniMap.tsx` | Intentional, disclosed — structurally different |
| `WorkflowLegend` | `src/workflows/components/WorkflowLegend.tsx` | Intentional, disclosed — different underlying vocabulary |

Every collision above is import-path-distinct — none causes a compile-time conflict, only a discoverability cost.

### Platform tier (1 collision across 8 platforms / 96 components)

`ProductionPipeline` — a component in Production Platform (re-exporting Pipeline Components' `Pipeline`) shares its exact identifier with a pre-existing plain-data TypeScript interface of the same name in `src/production/types/production.ts`. No compile-time conflict (never imported together), but was undisclosed until found during audit.

### Cross-tier (enterprise-architecture-audit)

- **`"Field"` means two structurally opposite things**: `src/components/form/FormField.tsx` (label + description + editable control + message wrapper) vs. `src/components/metadata/MetadataField.tsx` (label + static value pair, never editable). Still open.
- **`CellAlign`** declared twice, independently, as an unexported local type in both `src/components/table/TableCell.tsx` and `TableHead.tsx` — identical definitions, no shared source.
- **`"Operations"` (a platform) vs. `"Operational"` (a tier name)** — coincidental, pre-disclosed before Operations Platform was built; the two coexist intentionally.
- Checked and confirmed clean: `LiveRegionProvider`/`useAnnounce` and `useBodyLock` — zero competing declarations anywhere in the repo.

## Cross-family API consistency findings (foundation-audit, from a direct prop-interface read of 68 files)

- **`className` support**: consistent across all 68 files checked.
- **Rest-prop spreading**: inconsistent — Layout/Table/Metadata use closed prop interfaces (never spread); Forms is split — 7 of its `*Field` wrappers spread onto their base `ui/` control, 16 other files enumerate props explicitly, with no documented rule for which case applies when.
- **Polymorphic `as` prop**: present on only 4 of 13 Layout primitives (Container, Inline, Stack, Surface); absent elsewhere.
- **Tone/severity vocabulary**: inconsistent — Table and Metadata share a 5-value `StatusTone` (neutral/accent/success/warning/error); Forms uses a narrower 2-value `FieldMessageTone` (error/warning), with no documented rationale for the divergence. May be a correct intentional difference (validation genuinely has fewer severities) but isn't stated as a decision anywhere.
- **Density scale**: only Table has one (`TableDensityContext`: comfortable/compact/dense) — no other family has this concept.
- **`required`/`error` prop naming**: consistent across all Forms fields.
- **Surface has no `role` prop** and doesn't spread rest props; two Forms components (`ValidationSummary`, `UnsavedChangesBanner`) both need `role="alert"`/`"status"` and both independently worked around it by wrapping Surface in a plain `<div role="...">` — a consistent workaround, but never formalized as a sanctioned pattern or added as real API support.

## Reusable methodology notes

- **When auditing for cross-tier naming collisions or near-duplicate implementations, distinguish "same name/concept" from "same rendering layer."** Two systems can model the same domain concept (a pipeline, a provider) at genuinely different layers (DOM composition vs. coordinate-positioned SVG diagram) without one being a redundant reimplementation of the other — this distinction correctly saved several apparent "duplicates" from being merged incorrectly.
- **Before writing new UI code, grep the existing prop surface/vocabulary for a near-miss, and require an articulable reason it doesn't fit** ("this value has no counterpart," "this model can't represent concurrent independent states") rather than assuming a near-identical component is close enough or too-different-to-reuse without checking. This discipline is what kept the Workflow tier's genuinely-new components (`WorkflowStage`, `StateNode`'s 8-value vocabulary, `DependencyNode`, `WorkflowNode`'s `Paused` status, `WorkflowControls`/`WorkflowToolbar`) honestly justified rather than assumed.
