# Success metrics

**Owns:** how we know whether Design is working.

A design system that measures nothing is defended by assertion. A design system
that measures the wrong things optimises for them. This document picks metrics
that are hard to game and states plainly what each one can and cannot tell us.

---

## 1. The one question

**Is it cheaper and safer for a StudioPOD application to use Design than not to?**

Every metric below is a proxy for that. If a metric ever improves while that
question's answer worsens, the metric is wrong and gets replaced.

---

## 2. Consumer adoption

The primary metric, because it is the hardest to fake: consumers use the system
when it is better than the alternative, and route around it when it is not.

| Metric                                                             | Target                    |
| ------------------------------------------------------------------ | ------------------------- |
| Applications consuming `@studiopod/design`                         | Every StudioPOD front end |
| Applications on the current minor or one prior                     | 100%                      |
| Interface code in consumers built from Design exports              | Rising, measured per release |
| **Locally reimplemented components in consumers**                  | **Zero**                  |
| Deep imports past a public entry point                             | Zero                      |

The fourth row is the health check that matters most. A local reimplementation is
a consumer telling us, with their actions, that Design did not meet a need. Each
one is a finding to be investigated, not a violation to be scolded — the useful
response is "what was missing," not "you were not supposed to."

**What this cannot tell us:** adoption can be high because Design is good or
because it is mandatory. Read it alongside § 6.

---

## 3. API stability

| Metric                                                        | Target                               |
| ------------------------------------------------------------- | ------------------------------------ |
| Breaking releases per year                                    | ≤ 4, batched quarterly               |
| Breaking changes without a migration guide                    | Zero — non-negotiable                |
| Breaking changes without a codemod, where scale warranted      | Trending to zero                     |
| Unplanned breaks (a break we did not classify as one)         | **Zero**                             |
| Exports at Preview longer than three minors                   | Zero                                 |
| Mean consumer upgrade lag on a minor                          | Under two weeks                      |

**Unplanned breaks are the real measure.** A planned break is a decision; an
unplanned one is a failure of the API contract, and every occurrence should
produce a check that would have caught it.

**What this cannot tell us:** zero breaking changes is not automatically good. A
system that never breaks may be a system that never improves. Read alongside § 5.

---

## 4. Accessibility compliance

| Metric                                                       | Target                        |
| ------------------------------------------------------------ | ----------------------------- |
| Components passing automated accessibility checks            | 100%, enforced by the gate    |
| Interactive components with keyboard tests                   | 100%                          |
| Stable-tier components with a screen-reader pass             | 100%                          |
| Known accessibility gaps **documented**                      | 100%                          |
| Accessibility regressions reaching a release                 | Zero                          |
| Open accessibility defects older than one release cycle      | Zero                          |

The fourth row is deliberately about documentation rather than absence. We will
have gaps. The measurable commitment is that a consumer can **find out** about
them before they ship, rather than discovering them from a user.

**What this cannot tell us:** automated checks catch roughly half of what
matters. A 100% automated pass rate is a floor, not a result.

---

## 5. Documentation completeness

| Metric                                                    | Target                       |
| --------------------------------------------------------- | ---------------------------- |
| Stable exports with a documentation page                  | 100%, enforced               |
| Component pages with all required sections                | 100%, enforced               |
| Component pages with a **"when not to use"** section      | 100%                         |
| Examples that render the real published package           | 100%                         |
| Hand-written prop tables                                  | Zero — all generated         |
| Breaking changes with a permanent migration page          | 100%                         |
| Documentation landing later than the change it describes  | Zero                         |

**What this cannot tell us:** completeness is not usefulness. A page can exist
and answer nothing. The qualitative test is § 6.

---

## 6. Upgrade confidence and developer experience

The hardest to measure and the most important. These are asked directly, of real
consumers, each quarter:

- Can you take a minor upgrade without reading the diff?
- When you needed a component, could you find it in under a minute?
- When you needed to know if something was accessible, could you find out?
- How often did you build something locally because Design did not have it — and
  what was it?
- Would you rather Design moved faster or broke less?

The last question is the calibration. A consumer base that unanimously wants
fewer breaks is telling us we are churning; one that unanimously wants more speed
is telling us we are stagnant. Persistent unanimity in either direction means the
balance is wrong.

**These answers are recorded and published**, including the unflattering ones. A
survey whose bad results are private is a survey that stops being answered
honestly.

---

## 7. Component quality

| Metric                                                     | Target                    |
| ---------------------------------------------------------- | ------------------------- |
| Components at Stable tier                                  | Rising                    |
| Components with visual baselines in both themes            | 100%                      |
| Defect rate per component per release                      | Falling                   |
| Components with no consumer after two releases             | Investigated, then removed |
| Root-entry export count                                    | **Falling**, then stable  |

The last two are the anti-accumulation metrics, and they are the ones a
maturing design system most needs.

A component nobody uses is not free — it is documented, tested, versioned, and
maintained forever, and it makes the system harder to navigate for everything
that *is* used. **Delete before adding** applies to what is already here.

A falling export count is a healthy signal for this repository specifically:
the root entry is currently very large, and a share of it arrived through
`export *` rather than through a decision.

---

## 8. What is deliberately not measured

| Not measured               | Why                                                                              |
| -------------------------- | -------------------------------------------------------------------------------- |
| Component count            | Rewards accumulation. More components is not a better design system.              |
| Lines of code              | Rewards the wrong direction entirely.                                             |
| Release frequency alone    | Rewards churn. Frequency without adoption is noise.                               |
| Documentation page views   | Measures traffic, not comprehension. A page read twice may have failed the first time. |
| Test count                 | Rewards quantity over coverage of what actually breaks.                           |
| Time-to-merge              | Rewards fast approval, which is exactly what a design system should not optimise. |

Naming these matters as much as naming the real ones. Every one of them is a
metric a design system team could be tempted to report when the real numbers are
uncomfortable.

---

## 9. Reporting

Metrics are reviewed **at every release** (the mechanical ones) and **quarterly**
(the qualitative ones), and the results are published to the ecosystem including
the bad ones.

A metric that has been missed for two consecutive quarters gets one of two
responses: a plan with a date, or an honest downgrade of the target. Carrying a
target nobody intends to hit teaches everyone to ignore the whole set.

---

## 10. References

- [../architecture/documentation.md](../architecture/documentation.md)
- [../architecture/public-api.md](../architecture/public-api.md)
- [../engineering/quality-gates.md](../engineering/quality-gates.md)
- [../contributing/governance.md](../contributing/governance.md)
