# Infrastructure handoff — the Design repository after DH-5

**Owns:** the architectural assessment at the end of the infrastructure phase,
and the handoff into the product-quality phase.

**Written:** 2026-08-07, at `@studiopod/design@0.16.0`.

---

## 1. What architectural risks remain?

**The Stable tier is asserted, not re-derived.** 218 exports are marked Stable
by a script that applied three criteria once. Nothing re-checks them, so a test
deleted from a Stable component passes silently and the tier quietly becomes a
lie. This is the largest remaining risk because it degrades invisibly — the
manifest keeps saying `stable` while the evidence disappears underneath it.
(DH-5 gap N5; the check is buildable from the same rules the assignment used.)

**The explicit export lists are transcribed, not curated.** DH-5 replaced 371
aggregated exports with generated lists. That makes every *future* addition a
decision, but it froze today's surface exactly as it was — including whatever
should never have been public. 876 root exports are now reviewable, and none of
them has been reviewed. (Gap N7.)

**294 exports have no tests at all.** The brand compositions and all four
diagram engines are entirely Preview because nothing pins their behaviour. The
risk is not that they break; it is that nobody would know.

**One structural inconsistency persists.** `lib/` and `hooks/` remain inside the
package, and the library source is not organised into the tiers ADR 0004
depends on — which is also why tree-shaking is still unverified (gaps 6, 8, 16).
This is the one place where the architecture describes something the code has
not yet become.

**Two smaller ones, both named and unenforced:** nothing stops an application
importing `/internal` from Design's side (gap N3, though Cloud enforces it), and
nothing prevents `export *` returning to a public entry (gap N6, three lines).

---

## 2. What infrastructure work is still justified?

Very little, and it is all small:

| Work | Cost | Why it is justified |
| --- | --- | --- |
| Re-derive Stable from evidence in `check-api` | small | Otherwise the tier decays into a claim |
| Forbid `export *` on public entries | trivial | Closes the door DH-5 just shut |
| Reject `/internal` imports from Design's side | small | Cloud should not be the only guard |
| Bundle-composition check | medium | ADR 0004's one-package argument is still unmeasured |

Everything else on the gap list — the tier layout, the banned directory names,
the documentation IA — is **refactoring, not infrastructure**. It should happen
because it makes the code better, not because a boundary is missing.

**What is not justified:** more governance. Five layers are now enforced
mechanically. Adding a sixth would be building machinery for its own sake, which
is the failure the constitution's "delete before adding" principle names
directly.

---

## 3. Has the focus shifted from infrastructure to product quality?

**Yes, and the evidence is that the open questions changed shape.**

At DH-1 the questions were *where does code live*, *what do we publish*, *who
owns the visual language*. Every one is now answered and enforced.

The questions now are: should `Empty` be in `/marketing`? Should there be 28
tone vocabularies or four? Do all 125 workflow exports deserve to be public?
Should the diagram engines have tests? Not one is about repository structure.
All are about whether the components are good.

The clearest signal is DH-5's own result. Its most consequential finding was not
architectural — it was that **253 components declared a props interface and
never exported it**. Not a design flaw, not a boundary violation: a default
nobody had ever examined. That is what the remaining work looks like now.

---

## 4. Is the repository ready for a comprehensive component audit?

**Yes.** The audit needs four things, and DH-5 delivered the last of them.

1. **A complete inventory.** 876 root exports, each named in a list rather than
   implied by a directory. The audit has line items instead of a surface.
2. **A stability signal per export.** 218 Stable, 957 Preview — so "can this be
   changed?" has an answer before the conversation starts, and a rename's blast
   radius is measurable rather than guessed.
3. **A consumer to check answers against.** Cloud installs the package from the
   registry and uses ten components. "Is this used?" is now a question with
   evidence behind it.
4. **A safety net.** `check-api` fails on any unintended surface change, so an
   audit that removes 200 exports cannot do so by accident.

**One caveat worth stating plainly.** The audit will want to remove exports, and
removal is a breaking change under ADR 0006 — the first this package would ship.
It should be planned as one batched breaking release with a migration guide and
codemods, not as incremental deletions. The tier data makes that plannable: 665
Preview exports can move freely, and the 211 Stable ones are the set that needs
a deprecation window.

---

## Handoff

The infrastructure phase of StudioPOD Design 2.0 is complete. Repository
architecture, package boundaries, framework independence, consumer integration
and public API evolution are each governed by a check that fails the build.

**The next phase is about the components.** The machinery that publishes them
should be maintained and extended where a gap above is named, and otherwise left
alone.

## References

- [../certification/DH-5.md](../certification/DH-5.md) § API Governance Established
- Cloud DH-4 § Ecosystem Milestone — the first consumer integration, recorded
  in `studiopod-cloud/docs/certification/DH-4.md`
- [../../MILESTONE-001.md](../../MILESTONE-001.md)
- [public-api.md](public-api.md) · [packages.md](packages.md)
