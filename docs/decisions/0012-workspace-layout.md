# ADR 0012 — `apps/` and `tooling/` as the workspace layout

- **Status:** Accepted
- **Date:** 2026-08-07
- **Work package:** DH-2
- **Scope:** Repository
- **Supersedes:** —
- **Superseded by:** —

> **Amends [repository-structure.md](../architecture/repository-structure.md)
> § 1**, which specified `documentation/` and `tools/`. The directories are
> `apps/docs/` and `tooling/`. Nothing else in that document's reasoning
> changes.

## Context

[repository-structure.md](../architecture/repository-structure.md), written in
DH-1, specified a four-directory top level: `packages/`, `documentation/`,
`docs/`, `tools/`. It argued specifically against `apps/docs` on the grounds
that `apps/` is a technical grouping — it names the deployment shape rather
than the purpose — and that the documentation site is half of what this
repository produces, so it should be named for what it is.

That argument is not wrong. It is, on implementation, outweighed by two things
DH-1 could not see from the outside.

**`documentation/` and `docs/` are one word apart.** DH-1 anticipated this and
handled it with a rule (Article VII § 3: one explains the design language to
the ecosystem, the other explains the repository to its maintainers). Writing
the migration made clear how much work that rule has to do. Every path in every
script, workflow, tsconfig and test now discriminates between two directories
whose names differ by three characters and whose contents are both, in plain
English, documentation. A rule that must be consulted to parse a file path is a
rule that will be got wrong.

**The workspace has a shape, and `apps/` states it.** After DH-2 the repository
is an npm workspace with two members that differ in kind: one is published, one
is deployed. `packages/` and `apps/` is the convention every reader already
knows for exactly that distinction, and it is the convention npm's own
`workspaces` globs assume. `documentation/` as a top-level sibling of
`packages/` says nothing about which of those two things it is.

`tools/` versus `tooling/` is a smaller matter. `tooling/` is used because the
repository already bans a set of vague directory names, `tools` sits close to
that family, and the extra syllable costs nothing.

## Decision

**The top level is `packages/`, `apps/`, `docs/`, `tooling/`.**

```
studiopod-design/
├── packages/design/     @studiopod/design — the published library
├── apps/docs/           the documentation product — a consumer
├── docs/                repository documentation — architecture, ADRs, reports
└── tooling/             checks, generators, the verification runner
```

The **distinction** DH-1 drew is kept in full, and is the thing that mattered:
`apps/docs/` is the documentation *product*, built for the ecosystem;
`docs/` is repository documentation, built for the people who work here. Only
the directory names change.

Article VII § 3 of the constitution is unaffected — it describes the two
audiences, not the two paths.

## Alternatives considered

### Alternative A — Keep `documentation/` and `tools/` as DH-1 specified

Plausible, and the default: DH-1 is the governing architecture and DH-2 is not
supposed to relitigate it.

Rejected because the reason is implementation evidence rather than preference.
`documentation/` and `docs/` collide in every path expression in the
repository, and the collision is permanent. DH-1's own instruction was to
challenge it where implementation proves an assumption wrong; this is that
case, and the alternative was to work around it silently in a hundred file
paths.

### Alternative B — Keep `documentation/` but rename `docs/`

Fix the collision from the other side: `documentation/` for the product,
`repository-docs/` or `meta/` for the rest.

Rejected. `docs/` is where every engineer looks for a repository's
documentation, and where the ADR log, the constitution's links, and both other
StudioPOD repositories already point. Renaming it to solve a collision the
other name introduced is the wrong end.

### Alternative C — `apps/documentation/`

Splits the difference: the `apps/` grouping, the fuller name.

Rejected as the worst of both. It keeps the near-collision with `docs/` in
prose and conversation while adding nesting, and `apps/docs` is what everyone
will type and say regardless.

## Consequences

### What this makes easier

- Path expressions are unambiguous — `apps/docs` and `docs` are not confusable
- The published/deployed distinction is visible in `ls`
- npm's `workspaces: ["packages/*", "apps/*"]` matches the tree exactly
- A second application, if one ever appears, has an obvious home

### What this makes harder

- **`apps/` does name a deployment shape rather than a purpose**, which is a
  real cost against the Product First principle and was DH-1's actual argument.
  It is accepted because `docs` inside it carries the purpose, and because the
  collision it removes is worse.
- **DH-1's repository-structure.md is now partly inaccurate** until amended in
  the same commit as this ADR, which it is.

### What this commits us to

- Keeping the two-audience distinction stated and enforced by review, since the
  directory names alone no longer teach it as loudly as `documentation/` would
  have
- Not accumulating a third top-level directory without an ADR

## Enforcement

Convention and review only. There is no mechanical check that the top level has
exactly these four directories, and adding one would be more ceremony than the
rule is worth.

## References

- [../architecture/repository-structure.md](../architecture/repository-structure.md)
- [CONSTITUTION.md Article VII § 3](../../CONSTITUTION.md#article-vii--documentation)
- [ADR 0003 — The library owns its source](0003-library-owns-its-source.md)
