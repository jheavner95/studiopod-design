# Governance

**Owns:** who decides what, who reviews what, and what "approved" means.

A design system with unclear governance does not become permissive — it becomes
slow, because nobody knows whether they are allowed to proceed.

---

## 1. Who owns what

| Decision                                    | Owner                     | Instrument            |
| ------------------------------------------- | ------------------------- | --------------------- |
| The ecosystem boundary                      | Ecosystem, jointly        | ADR agreed across repos |
| This repository's architecture              | Design architecture owner | ADR                   |
| The public API surface                      | Design architecture owner | ADR + API review      |
| A component's design                        | Design                    | Design review         |
| A component's implementation                | Engineering               | Code review           |
| Accessibility contracts                     | Design architecture owner | ADR + a11y review     |
| Release approval                            | Release approver          | § 4                   |
| Whether something belongs here at all       | Design architecture owner | [boundaries.md](../architecture/boundaries.md) |

**Architecture ownership is a named role, not a committee.** One person is
accountable for the coherence of the public surface, and that accountability is
what stops a design system from becoming the union of everything anyone
contributed.

The role's job is mostly to say no, and to explain why in a way that survives
being written down. An architecture owner who never rejects anything is not
performing the role.

---

## 2. The contribution model

**Anyone in the ecosystem may contribute. Not everyone may decide.**

| Change                              | Path                                                |
| ----------------------------------- | ---------------------------------------------------- |
| Defect fix, no API change           | Pull request → code review                          |
| New optional prop                   | Pull request → code review + API review             |
| New component                       | Proposal → ADR if it opens a family → implementation |
| New pattern                         | Proposal → design review → implementation           |
| Breaking change                     | ADR → implementation → batched release              |
| New entry point or package          | ADR, clearing [packages.md](../architecture/packages.md) § 4 |
| New runtime dependency              | ADR                                                 |
| Anything touching the ecosystem boundary | Cross-repository ADR                           |

### The proposal

Before building a new component or pattern, a proposal states:

1. **The problem**, from a consumer's perspective
2. **Who else needs it** — named consumers, not hypothetical ones
3. **Why an existing component does not fit**, having actually tried
4. **The rough API**
5. **The accessibility contract**

Question 3 is the one that saves the most work. "Improve the abstraction that
nearly fits" beats "add a competing one" nearly every time, and the proposal is
where that gets caught — before the code exists and starts arguing for itself.

---

## 3. Review expectations

Every pull request is reviewed against the constitution, not only against itself.

**Every reviewer checks:**

- Does this belong in Design at all?
- Does it change the public surface? Is the tier declared and the version class
  right?
- Does it break anything in [public-api.md](../architecture/public-api.md) § 1,
  including the parts types do not catch?
- Is it accessible, and is the accessibility tested rather than asserted?
- Does documentation land in this commit?
- Does it use Foundation values through the bridge, with no hand-edited tokens?
- Could this be additive instead?

**API changes additionally require** the architecture owner's review. Not as a
formality — as the point at which someone whose job is the whole surface looks at
one change in the context of all of it.

**Component changes additionally require** design review of the visual baseline
diff, by someone accountable for the design. A baseline updated reflexively is a
visual regression suite with no signal.

### What a reviewer is accountable for

Not "I read it." A reviewer is accountable for the claim that **this change is
consistent with the system**. If it ships and it was not, that is a review
failure, not only an author failure.

---

## 4. Release approval

A release requires a **release approver** who is not the sole author of the
changes.

The approver confirms:

1. `verify:full` passes on a clean checkout
2. The version class matches the change class
3. The changelog is complete — silence about an export change is a blocker
4. Every break has a migration guide, and a codemod where scale warrants
5. The API baseline is updated and accounted for
6. The Preview graduation review has happened (§ 5)
7. Affected consumers have been told what to expect

**Breaking releases require the architecture owner's approval**, in addition.

A release approver who cannot answer "what changed for consumers" in one
paragraph has not reviewed the release.

---

## 5. Preview graduation

At every release, every Preview export is reviewed:

- **Promote** to Stable if the shape has settled and it has a real consumer
- **Keep** in Preview if it has been fewer than three minors and is genuinely
  still moving
- **Remove** it

**An export at Preview across three consecutive minors is promoted or removed.
There is no fourth option.** Without a forced exit, Preview becomes a way to
avoid deciding, and consumers end up depending on "temporary" APIs for years —
at which point removing them breaks people who were told not to rely on them, and
promoting them freezes a shape nobody defended.

---

## 6. Promotion from an application

When an application has a component that belongs here:

1. **The application proposes it**, with the working implementation as evidence
2. **Design reviews it as a public API**, not as a port. It will change — an
   application component is shaped by one caller, and a Design export must serve
   callers who do not exist yet
3. **Design implements, documents, tests, and releases it**
4. **The application deletes its copy and consumes the published one** — in the
   same cycle

Step 4 is the whole point. A promotion that leaves the original in place has
created a second implementation, which is worse than the copy it was meant to
replace: now there are two, and one claims to be canonical.

---

## 7. Quality gates as governance

The gates in [../engineering/quality-gates.md](../engineering/quality-gates.md)
are governance made mechanical. A rule enforced by a check does not depend on a
reviewer's memory, their attention on a Friday, or their willingness to have the
same argument again.

**A check may not be weakened to make a build green.** If a check is wrong, it is
fixed in its own commit with the false positive stated. This is
[Article VI § 7](../../CONSTITUTION.md#article-vi--engineering-standards) and it
has no exceptions — including for releases, including under deadline.

---

## 8. Certification

A work package is complete when it is certified, not when it works.

The report states what was built, how it was verified, what was deliberately not
done, and what a future engineer should know. It states a verdict, and the
verdict may be negative.

**Certification is honest before it is favourable.** A named gap is a managed
risk. The same gap unnamed is a trap — and the report is worthless, because a
reader cannot tell the two cases apart.

---

## 9. Disagreement

1. **Disagree in the pull request**, with reasons
2. **If unresolved, the architecture owner decides**
3. **If the decision is expensive to reverse, it becomes an ADR** — including the
   rejected reasoning, which is the part that stops the same debate recurring in
   three years
4. **A decision that turns out wrong is amended, not worked around**

Working around a decision is the failure mode this governance exists to prevent.
It produces a repository whose documented architecture and actual architecture
diverge, and no reader can tell which is which.

---

## 10. References

- [../../CONSTITUTION.md](../../CONSTITUTION.md)
- [../architecture/boundaries.md](../architecture/boundaries.md)
- [../architecture/public-api.md](../architecture/public-api.md)
- [../engineering/quality-gates.md](../engineering/quality-gates.md)
- [../decisions/README.md](../decisions/README.md)
