# The documentation product

**Owns:** the information architecture of the documentation site, and what makes
it a product rather than a demo.

---

## 1. What it is

The documentation site is the **canonical ecosystem reference for how StudioPOD
applications look and behave.** It is the artefact a designer, an engineer, and a
product person all read, and the place ecosystem questions are settled.

That is deliberately broader than a component gallery. A Storybook answers "what
props does this take." This product answers:

- What is our visual language, and why is it this?
- Which component do I reach for, and when do I not?
- What is the accessible way to build this interaction?
- What changed, what broke, and how do I move?
- What am I allowed to depend on?

**It is a consumer of the package**, installed the same way Cloud and Web install
it. That is not an implementation detail — it is what makes the documentation an
integration test of the published contract rather than a privileged view of the
source.

---

## 2. Information architecture

Eight sections. The order is the reading order for someone new.

```
1. Foundations      What the language is made of
2. Components       What you can use
3. Patterns         How to compose it
4. Accessibility    How to not exclude people
5. Playground       Try it
6. API              What you may depend on
7. Migration        How to move
8. Releases         What changed
```

### 1. Foundations

The design values, as they apply to interfaces — colour and its semantic roles,
type scale, spacing rhythm, elevation, radius, motion, iconography, density,
theming.

**Foundations documents meaning, not values.** The values are Foundation's, and
this section says what they are *for*: which surface uses which semantic role,
what "elevation 2" communicates, when density changes. A page here that reads
like a table of hex codes has drifted into Foundation's territory.

### 2. Components

One page per component family. Every page carries the same required sections,
and the requirement is checked:

| Section              | Contains                                                        |
| -------------------- | --------------------------------------------------------------- |
| What it is           | One paragraph. What problem it solves.                          |
| When to use          | And, more usefully, **when not to** — with the alternative named |
| Anatomy              | The parts, labelled                                             |
| Examples             | Live, editable, copyable — every variant that exists            |
| Props                | Generated from source. Never hand-written.                      |
| Accessibility        | Keyboard map, roles, focus behaviour, known limitations         |
| Stability            | Tier, and version introduced                                    |
| Related              | The neighbours, and why you might want one instead              |

"When not to use" is the section most often skipped and most often needed. A
design system that only says yes produces consumers who reach for the wrong
component confidently.

### 3. Patterns

Compositions that solve a recurring interface problem: workspace layout,
inspector panels, data tables with selection, multi-step workflows, empty and
error states, form layout, navigation structure.

A pattern page is allowed to be opinionated. It should say what the StudioPOD
answer is, not enumerate options.

### 4. Accessibility

A first-class section, not a per-component footnote:

- The standard we hold ourselves to, and where we currently fall short
- Keyboard interaction conventions across the system
- Focus management rules
- Colour and contrast, including which token pairs are guaranteed
- Motion and reduced-motion behaviour
- Screen-reader expectations and how we test them
- **Known gaps**, named — the honest list is what makes the rest credible

### 5. Playground

Interactive composition against the real package. Theme switching, density
switching, viewport switching, motion toggling, and shareable state.

Its job is to answer questions the static pages cannot: how do these three
components look together, at this density, in dark mode, at this width.

### 6. API

The published contract, rendered — entry points, exports with tiers, peer and
runtime dependencies, the CSS contract, portability caveats.

Generated from `API.md` and the source, never maintained separately. Two sources
of truth about the API is precisely the failure this section exists to prevent.

### 7. Migration

One page per breaking change, permanent and never pruned. Each contains: what
changed, why, before/after code, the codemod if one exists, and the version
range affected.

Old migration guides are not clutter. A consumer upgrading across four versions
reads all four.

### 8. Releases

The changelog, rendered and browsable, with breaking changes visually distinct
and each entry linking to its migration guide.

---

## 3. What the current site gets wrong

Recorded plainly, because DH-2 needs the list.

| Problem                                                                                  | Why it matters                                                                        |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Two top-level route groups named `docs/` and `documentation/`                             | Two names for one concept — the reader cannot know which is authoritative               |
| `application-components/` holds 46 routes, including `foundation-*` pages                 | Foundations documented under "application components" is an IA inversion                |
| `core-components`, `application-components`, `marketing-components` as top-level groupings| Organised by where a component came from, not by what a reader is looking for           |
| `capabilities/`, `platforms/`, `production/`, `workflows/` as top-level route groups       | These are **Cloud's** domain concepts. Design documenting them asserts ownership it does not have |
| No Accessibility section                                                                  | The system's accessibility story is scattered across per-component notes                |
| No Migration section                                                                      | Breaking changes exist; the guidance for them does not                                  |
| Examples import `@/components/...` directly                                               | The site cannot detect a broken public API, because it never uses one                   |

The fourth row is the most serious. Route groups named for Cloud's platforms mean
Design has been documenting an application's domain model. That is the ownership
inversion [boundaries.md](boundaries.md) exists to prevent, and it shows up in
the IA before it shows up in the code.

---

## 4. Rules the documentation product follows

**§1. Every Stable export has a page.** Coverage is checked mechanically; the
existing `docs:coverage` script is the seed of this and is preserved.

**§2. Every example renders the real package.** No example imports library
internals. An example that cannot be written against the public API has found an
API gap, and the gap is the finding.

**§3. Props are generated.** Hand-written prop tables go stale within two
releases, and a stale prop table is worse than none because it is trusted.

**§4. Documentation lands with the change.** A component change whose
documentation lands later has shipped a lie for the interval.

**§5. Nothing is documented twice.** A rule stated in Foundations is referenced
from Components, not restated. The second copy is always the one that goes stale.

**§6. Say what does not work.** Known gaps, limitations, and accessibility
shortfalls are documented. A design system whose documentation only describes
success teaches consumers to distrust it the first time they hit an edge.

---

## 5. Success criteria

The documentation product is working when:

- A new engineer can build a correct StudioPOD interface without asking anyone
- A designer can find the semantic name for what they drew
- A consumer can decide whether to take an upgrade without reading a diff
- The answer to "which component do I use" is found in under a minute
- Ecosystem questions get settled by linking to a page, not by a conversation

Measurement: [../product/success-metrics.md](../product/success-metrics.md).

---

## 6. References

- [ADR 0009 — Documentation is a product deliverable](../decisions/0009-documentation-is-a-product-deliverable.md)
- [repository-structure.md](repository-structure.md) § 3
- [boundaries.md](boundaries.md)
