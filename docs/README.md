# Documentation

Every document in this repository is reachable from here. A document nobody can
find is a document nobody maintains.

Documentation in this repository is production code:
[Constitution, Article VII](../CONSTITUTION.md#article-vii--documentation).

**This directory documents the repository, for the people who build it.** The
documentation *product* — the site that explains the design language to the
ecosystem — is a different thing with a different audience, and lives in the
documentation application. See
[architecture/documentation.md](architecture/documentation.md).

---

## Start here

| Document                                          | Read it when                                        |
| ------------------------------------------------- | ---------------------------------------------------- |
| [Constitution](../CONSTITUTION.md)                | Before your first commit. It is binding.            |
| [MILESTONE-001](../MILESTONE-001.md)              | You want the current architectural baseline in one page |
| [Architecture overview](architecture/overview.md) | You want to know how the repository is shaped, and why |
| [Boundaries](architecture/boundaries.md)          | You are asking "does this belong in Design?"        |
| [Public API strategy](architecture/public-api.md) | You are about to change anything consumers can see  |

## Architecture

| Document                                                     | Owns                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [Overview](architecture/overview.md)                         | The shape of the repository and the reasoning behind it     |
| [Boundaries](architecture/boundaries.md)                     | Foundation vs Design vs application ownership, and the hard cases |
| [Packages](architecture/packages.md)                         | What is published, entry-point scopes, the second-package test |
| [Repository structure](architecture/repository-structure.md) | The tree — where everything lives                           |
| [Public API](architecture/public-api.md)                     | Stability tiers, SemVer, deprecation, the API contract      |
| [Documentation product](architecture/documentation.md)       | The documentation site's information architecture           |

## Engineering

| Document                                          | Owns                                                    |
| ------------------------------------------------- | -------------------------------------------------------- |
| [Publishing](engineering/publishing.md)           | Registry, cadence, the release process, compatibility    |
| [Quality gates](engineering/quality-gates.md)     | The verification chain and what each gate proves         |
| [Verification](VERIFICATION.md)                   | The runner, the tiers, and what to do when a step fails  |
| [Testing](TESTING.md)                             | The test suite — what to test, how to run and debug it   |

## Consuming

| Document                                | Owns                                                        |
| --------------------------------------- | ------------------------------------------------------------ |
| [Consuming Design](consuming/README.md) | How applications install, use, and upgrade the package       |
| [Distribution](DISTRIBUTION.md)         | Registry access and the package rename history               |

## Contributing

| Document                                    | Owns                                                       |
| ------------------------------------------- | ----------------------------------------------------------- |
| [Governance](contributing/governance.md)    | Who decides, who reviews, release approval, promotion       |
| [Component certification](CERTIFICATION.md) | How a component earns Certified status                      |
| [Documentation infrastructure](DOCUMENTATION.md) | Page contracts, registries, and what is validated      |

## Product

| Document                                      | Owns                                    |
| --------------------------------------------- | ---------------------------------------- |
| [Success metrics](product/success-metrics.md) | How Design's success is measured        |

## Decisions

| Document                              | Owns                                          |
| ------------------------------------- | --------------------------------------------- |
| [ADR process](decisions/README.md)    | When an ADR is required, numbering, lifecycle |
| [ADR template](decisions/TEMPLATE.md) | The structure every ADR follows               |

The decision log itself is [decisions/](decisions/README.md#4-the-log).

## Milestones

| Milestone                                | Marks                                                    |
| ---------------------------------------- | --------------------------------------------------------- |
| [MILESTONE-001](../MILESTONE-001.md)     | Design becomes a platform — the DH-2 architectural baseline |

## Certification reports

| Report                          | Package                                        |
| ------------------------------- | ---------------------------------------------- |
| [DH-1](certification/DH-1.md)   | Design Architecture Foundation                 |
| [DH-2](certification/DH-2.md)   | Foundation Integration & Repository Separation |
| [DH-3](certification/DH-3.md)   | Framework Independence                         |
| [DH-5](certification/DH-5.md)   | Design API Surface                             |

---

## Design system reference

These predate DH-1 and remain authoritative for their subject. Where one
conflicts with an ADR or an architecture document, the ADR wins and the conflict
is a defect to fix.

| Document              | Owns                                                              |
| --------------------- | ------------------------------------------------------------------ |
| [Tokens](TOKENS.md)   | Token architecture, naming, ownership, and how consumers get them  |
| [Tone](TONE.md)       | The semantic tone system and its accessibility expectations        |

## Historical records

**Work-package reports are not architecture**
([Article VII § 4](../CONSTITUTION.md#article-vii--documentation)). The `DS-*.md`
files in this directory record what happened in individual work packages. They
are kept as history. Where one contains a live architectural decision, that
decision is promoted to an ADR or to the document that owns the concern — the
report is never the canonical source.

- `DS-*.md` — work-package reports, DS-5G through DS-7.4
- [engineering-notes/](engineering-notes/README.md) — 23 notes preserving the
  architectural conclusions and measurable findings from the pre-DH-1
  certification exercise. Substantially more durable than the reports, and worth
  reading before proposing a change in an area one of them covers.
