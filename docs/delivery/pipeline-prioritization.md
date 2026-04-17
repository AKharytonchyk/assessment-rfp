# Pipeline Prioritization Framework

| Field | Value |
|---|---|
| **Purpose** | Select and order the initial 10 pipelines across 2 domains by business value — not by delivery convenience. |
| **Owner** | Data Platform Lead (client) + Delivery Manager |
| **Applied** | Phase 0, Wk 1–2, during domain selection workshop |

## Scoring model

Each candidate pipeline is scored 1–5 on four weighted criteria. Composite score = weighted sum.

| Criterion | Weight | 1 (low) | 5 (high) |
|-----------|:------:|---------|----------|
| **Business value** | 40% | Nice-to-have, internal use | Directly supports exec decision or client-facing product |
| **Data readiness** | 20% | Source not accessible; schema unclear | Source accessible, schema stable, volumes known |
| **Complexity (inverse)** | 20% | High complexity (SCD2, multi-source merge, 100M+ rows/day) | Low (single source, direct extract + light transform) |
| **Stakeholder alignment** | 20% | No clear owner, contested | Named owner, signed off, committed |

**Composite score** = 0.4·Value + 0.2·Readiness + 0.2·(6 − Complexity) + 0.2·Alignment

Score range: 1.0 (lowest) to 5.0 (highest). Ties broken by dependency chain (pipelines feeding other pipelines first).

## Complexity t-shirt sizing (per `assumptions.md` SC-03)

| Size | Definition | Effort estimate (PD, engineering only) | Expected count |
|------|-----------|---------------------------------------:|---------------:|
| **Low** | Direct extract + load; minimal transformation | 3 | ~3 of 10 |
| **Medium** | Transformations, joins, deduplication, moderate DQ | 5 | ~5 of 10 |
| **High** | Multi-source merge, SCD Type 2, complex business rules, spatial ER | 8 | ~2 of 10 |

## Prioritization worksheet (to be completed in Phase 0)

| Pipeline | Domain | Value (1-5) | Readiness (1-5) | Complexity (1-5) | Alignment (1-5) | **Composite** | Size | Wave |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| (example) Customer 360 | Sales | 5 | 4 | 3 | 5 | **4.2** | M | W1 |
| (example) HR headcount | HR | 3 | 5 | 2 | 4 | **3.6** | L | W2 |
| Pipeline 3 | — | | | | | | | |
| Pipeline 4 | — | | | | | | | |
| Pipeline 5 | — | | | | | | | |
| Pipeline 6 | — | | | | | | | |
| Pipeline 7 | — | | | | | | | |
| Pipeline 8 | — | | | | | | | |
| Pipeline 9 | — | | | | | | | |
| Pipeline 10 | — | | | | | | | |

Waves (W1 = reference pipeline + early Domain-1 work; W2 = rest of Domain-1 + Domain-2 start; W3 = Domain-2 completion + cross-domain linkages).

## Decision workshop protocol (Phase 0, day 3–5)

1. Candidate list prepared by client Data Platform Lead (target: 15–20 candidates).
2. EPAM + client jointly score each candidate against the rubric.
3. Disagreement > 1.5 points on any criterion triggers a structured clarification (not a debate).
4. Cut to top-10 by composite score, enforcing 5 per domain.
5. Executive Sponsor signs the prioritized list (binding).
6. Unselected candidates move to the migration plan backlog (DOC-008).

## Reprioritization rules

- **Within sprint:** no change — team finishes what it started.
- **Between sprints:** Platform Lead + DM can swap within the 10 (same total count).
- **Adding beyond 10:** formal Change Request (see `docs/governance/change-request-template.md`).

## Why this framework matters

- Converts "10 pipelines" from a count into a *portfolio* — each selected on explicit business merit.
- Gives the Exec Sponsor a defensible, repeatable method.
- Feeds the migration plan with a ready-made scoring record for the remaining backlog.
