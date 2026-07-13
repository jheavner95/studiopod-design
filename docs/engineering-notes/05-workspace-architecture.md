# Workspace Architecture

Source: `workspace-certification` (deleted, RM-5).

## The six-tier workspace blueprint

Every StudioPOD workspace shares one canonical anatomy — this is a structural rule, not a per-platform preference:

```
        ┌─────────────────────────┐
        │   Global Navigation      │   Tier 1 — no dedicated page;
        │                          │   documented under the component
        └────────────┬─────────────┘   inventory's workspace-structure section
                      │
        ┌─────────────────────────┐
        │   Workspace Header       │   Tier 2
        └────────────┬─────────────┘
                      │
        ┌─────────────────────────┐
        │   Workspace Toolbar      │   Tier 3 — reads Header's context,
        └────────────┬─────────────┘   never repeats it
                      │
   ┌──────────────────┴──────────────────┐
   │  ┌───────┐   ┌─────────┐  ┌────────┐│   Tier 4 — three PEERS, no
   │  │ Asset │   │ Primary │  │Inspector││  arrows between them: Asset
   │  │Workspc│───│ Workspc │──│ Workspce││  feeds a selection into
   │  └───────┘   └─────────┘  └────────┘│  Primary; Inspector shows/
   └──────────────────┬──────────────────┘  edits whatever Primary
                      │                     currently displays
        ┌─────────────────────────┐
        │  Operational Status      │   Tier 6 — Tier 5 is deliberately
        │  Workspace                │   unoccupied/reserved, not a gap
        └─────────────────────────┘
```

Two pages govern every tier without being tree nodes themselves: **Workspace Framework** (defines the shell every tier mounts inside) and **Workspace Layout** (defines the width/density/responsive rules that make every tier compose consistently).

## Eight architecture principles

1. **Every workspace shares one anatomy** — the six-tier blueprint isn't optional per platform; it's what makes a workspace recognizably StudioPOD.
2. **Business objects change. Architecture does not.** — products, orders, and artwork projects are all browsed through the same Asset Workspace anatomy; the object changes, the pattern doesn't.
3. **Context before interaction** — a user always knows what they're looking at before being offered something to do about it (Header exists before Toolbar can mean anything).
4. **Discovery before work** — browsing/selecting precedes editing; Asset Workspace feeds Primary Workspace, never the reverse.
5. **Inspection before editing** — the Inspector shows what something is before letting a user change it; confirmation precedes commitment.
6. **Operational awareness remains passive** — background work, notifications, and health report continuously without ever taking focus from the user's actual task.
7. **Accessibility is foundational** — every workspace page documents its own accessibility guidance as a first-class section, not an appendix.
8. **Consistency scales better than customization** — a platform-specific layout tweak saves one team time; a shared anatomy saves every future team from relearning the system.

## Governance: how the architecture itself is allowed to change

1. **Propose** — a platform team states purpose and maps against the canonical blueprint before any implementation.
2. **Identify reusable patterns** — anything an existing workspace already has (a region, a variant, a responsive mode) is reused, not reinvented.
3. **Review exceptions** — where a proposal genuinely can't fit, the exception is reviewed explicitly and the reason recorded, not silently diverged.
4. **Generalize** — an exception recurring across more than one platform gets promoted into the shared anatomy rather than staying duplicated.
5. **New architecture** — reserved only for genuinely novel operational needs no existing tier covers, never for taste-based layout preference.
6. **Generalize extensions** — a "Future Extensions" proposal on one workspace page graduates to shared architecture once more than one platform needs it.

## Maturity ladder (reusable 5-stage model, gated by scorecard percentage)

| Stage | Threshold | Gate |
|---|---|---|
| Draft | 0% | Named workspace + stated purpose; no review required |
| Prototype | 25% | Anatomy mapped to blueprint, working non-production build; informal checklist walkthrough |
| Production Ready | 50% | All required regions implemented, responsive behavior documented; full Design Review Checklist pass |
| Certified | 80% | Every scorecard category passes its own criteria, accessibility verified not just documented |
| Enterprise Certified | 95% | Certified + near-perfect score, zero open accessibility/responsive exceptions |

## Quality scorecard (reusable 110-point / 9-category weighted framework)

| Category | Weight | Passing criteria (condensed) |
|---|---|---|
| Workspace Shell | 15 | All required shell regions present, in canonical order |
| Workspace Header | 10 | Stays contextual — no Toolbar-style interaction leaked in |
| Workspace Layout | 10 | Width/density/scroll match documented rules at every breakpoint |
| Workspace Toolbar | 10 | Only actions/interaction — no identity/status duplicated from Header |
| Asset Workspace | 15 | Selection model, card anatomy, empty states match spec |
| Primary Workspace | 15 | Active mode matches a documented mode; no competing primary task visible |
| Inspector Workspace | 15 | Every region traces to current selection; never drives navigation itself |
| Operational Status | 10 | No surface steals focus uninvited; severity/priority tiering matches rules |
| Accessibility | 10 | Keyboard access, live regions, reduced motion, focus — verified, not assumed |

Percent score = weight / 110 × 100 (note the total is 110, not 100 — this is a genuinely reusable weighted-checklist shape, independent of any one-time score it was used to produce).
