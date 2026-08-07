# Architectural decisions

**Owns:** when an ADR is required, how they are numbered, and the log itself.

An ADR exists for one reason: **so a future engineer discovers that their idea
was already considered, and why it lost.** That is the only part of the reasoning
that cannot be recovered by reading the code.

---

## 1. When an ADR is required

Any decision that is expensive to reverse:

- The public API surface, or an entry point
- A published package
- A runtime or peer dependency
- The ecosystem boundary — this repository's relationship to Foundation or to
  applications
- An accessibility contract
- A versioning, release, or compatibility policy
- A weakening of any standard in
  [Article VI](../../CONSTITUTION.md#article-vi--engineering-standards)
- The reversal or amendment of an earlier ADR
- An amendment to the constitution

**Write it before the work, not after.** An ADR written afterwards documents what
happened; an ADR written first is the decision. The difference shows up in the
Alternatives section, which is honest only when the alternatives were still live
when it was written.

## 2. When one is not required

Implementation choices inside an existing boundary. A component's internal
structure, a test approach, a refactor that changes no contract. If it can be
changed next month without telling anyone, it does not need an ADR.

---

## 3. Rules

1. **Numbered sequentially**, four digits, never renumbered, never reused.
2. **Never deleted.** A wrong decision is superseded, not erased.
3. **Superseded ADRs are kept and marked**, with a link forward. The rejected
   reasoning is the durable value.
4. **One decision per ADR.** An ADR that decides three things cannot be
   superseded in part.
5. **The metadata block is fixed in shape** — every field present, `—` for empty.
6. **Ecosystem-scoped ADRs are marked as such**, because they cannot be amended
   by this repository alone.

Copy [TEMPLATE.md](TEMPLATE.md) to `NNNN-kebab-case-title.md`.

---

## 4. The log

| ADR                                                    | Decision                                                      | Status   |
| ------------------------------------------------------ | ------------------------------------------------------------- | -------- |
| [0001](0001-design-is-a-product.md)                    | Design is a product, not an implementation detail             | Accepted |
| [0002](0002-ecosystem-architecture.md)                 | The ecosystem architecture, adopted and located               | Accepted |
| [0003](0003-library-owns-its-source.md)                | The library owns its source; documentation consumes it        | Accepted |
| [0004](0004-one-published-package.md)                  | One published package; entry points are the unit of scope     | Accepted |
| [0005](0005-public-api-tiers.md)                       | Stable, Preview, Internal — declared, never inferred          | Accepted |
| [0006](0006-versioning-and-compatibility.md)           | SemVer with pre-1.0 major discipline; the road to 1.0         | Accepted |
| [0007](0007-framework-neutrality.md)                   | No framework coupling in the package                          | Accepted |
| [0008](0008-foundation-is-a-build-time-input.md)       | Foundation is a build-time input via the token bridge         | Accepted |
| [0009](0009-documentation-is-a-product-deliverable.md) | The documentation site is a product, not a demo               | Accepted |
| [0010](0010-certification-and-release-approval.md)     | Certification is the definition of done                       | Accepted |
| [0011](0011-internal-entry-point.md)                   | An internal entry point for the documentation application     | Accepted |
| [0012](0012-workspace-layout.md)                       | `apps/` and `tooling/` as the workspace layout                | Accepted |
| [0013](0013-framework-capabilities-are-props.md)       | Framework capabilities are injected as props, not context     | Accepted |
| [0014](0014-preserve-modules-build.md)                 | The package emits one module per source file                  | Accepted |
| [0015](0015-stability-tiers.md)                        | Stability is declared in the API manifest, earned by evidence | Accepted |
| [0016](0016-intentional-exports.md)                    | The public API is constructed, not aggregated                 | Accepted |
| [0017](0017-typography-is-loaded-by-design.md)         | Foundation owns the typeface, Design loads it                 | Accepted |

---

## 5. Relationship to Cloud's decision log

`studiopod-cloud` maintains its own ADR log, numbered independently. The two
sequences are unrelated, and a reference across repositories always names the
repository: "Cloud ADR 0033," never "ADR 0033."

One cross-repository ADR is load-bearing for this one: **Cloud ADR 0033 —
StudioPOD ecosystem architecture**, which defines the Foundation → Design →
Applications boundary. It is recorded in Cloud for historical reasons — it
reversed two of Cloud's own decisions — but it binds all four repositories.

[ADR 0002](0002-ecosystem-architecture.md) adopts it here and argues that an
ecosystem-scoped decision should not live in a leaf repository. Until that moves,
Cloud ADR 0033 remains the canonical text and this repository's Article III
restates its consequences for Design.

---

## 6. References

- [TEMPLATE.md](TEMPLATE.md)
- [../../CONSTITUTION.md](../../CONSTITUTION.md) Article VIII
