# Adoption Plan — Post-Handoff

| Field | Value |
|---|---|
| **Purpose** | Turn the 16-week delivery into a platform the client actually *uses* and extends, not an artifact that sits unused. |
| **Owner** | Data Platform Lead (client) with DM support during ramp-down |
| **Active period** | Handoff (Wk 16) → 90 days post-handoff (plus ongoing steady-state activities) |

## Problem this solves

Training in Wk 16 is necessary but not sufficient. Without an adoption plan, the platform becomes "EPAM's thing" and usage collapses as soon as the team leaves. Adoption is a **product problem**, not a training problem.

## The adoption model

### 1. Champions (per domain)

- **1 named champion per in-scope domain** (Sales, HR, etc.). Selected during Phase 0; identified on the stakeholder register.
- Champion is an engineer or senior analyst who participates in sprint demos from Phase 1 onward.
- Champion co-builds at least one pipeline with the EPAM team (pair programming on Pipeline 3 or later).
- Post-handoff, champion is the go-to for their domain's platform questions.

### 2. Office hours

- **Weekly 1-hour "Ask-me-anything"** session — first 8 weeks post-handoff.
- **Bi-weekly** — weeks 9-16.
- **Monthly** — weeks 17-26.
- Hosted by EPAM via optional retainer (not in the 16-week ROM); alternative is client champion hosts, EPAM on Slack.

### 3. Slack / Teams channel

- `#edp-community` created at kickoff; champions and all attendees added during training week.
- Pinned resources: runbook, developer guide, ADR index, contact list.
- EPAM team remains in channel for 90 days post-handoff in read-only/help mode.

### 4. Documentation as a product

- Runbook, developer guide, user guide delivered in Wk 16 (DOC-002/003/004).
- All docs live in the same Git repo as the code — PRs welcome — so content stays current as the platform evolves.

### 5. Beta cohort strategy (during delivery)

- Wk 6–8: Domain-1 champion + 1-2 analysts form a beta cohort on the reference pipeline.
- Wk 9–12: cohort expands to Domain-2 champion + analysts.
- Wk 13–14: UAT team folded in.
- Wk 15–16: full training opens to all 6-10 attendees.

By Week 16, ~40% of training attendees have already seen the platform before the formal training starts.

## Adoption KPIs — 30 / 60 / 90 days post-handoff

| KPI | 30 days | 60 days | 90 days |
|---|---|---|---|
| Queries run against Gold (unique users) | ≥ 10 | ≥ 25 | ≥ 50 |
| New pipelines added by client team | 0 (baseline) | ≥ 2 | ≥ 5 |
| DQ alerts triaged within SLA | ≥ 70% | ≥ 80% | ≥ 90% |
| Platform tickets / issues closed | ≥ 80% within 5 days | ≥ 85% within 3 days | ≥ 90% within 3 days |
| Office hours attendance | ≥ 5 avg | ≥ 4 avg | ≥ 3 avg |
| Champion-authored docs / PRs | ≥ 1 | ≥ 3 | ≥ 5 |

Measured by the Data Platform Lead; reviewed in the quarterly benefits-realization check-in for 12 months.

## Support tapering

| Period | EPAM engagement |
|---|---|
| Wk 16 (handoff week) | Full team available |
| Wk 17-20 | Optional retainer: DM + Architect 20% each (if selected) |
| Wk 21-30 | Optional retainer: DM 10%, Slack best-effort |
| Wk 30+ | Community channel best-effort only; new work via SOW |

## Red flags (triggers for intervention)

- Fewer than 5 unique analysts running queries by day 60.
- Zero new pipelines by day 90.
- DQ alerts backlog > 10 unresolved.
- Champion attrition (anyone leaves during the 90-day window).

Any red flag → DM raises with Client Exec Sponsor; intervention options: extended retainer, extra training, platform coaching.

## Why this framework matters

Adoption is where a consulting engagement either becomes *their* platform or remains *our* demo. The KPIs above are how the Sponsor measures success — not in Week 16, but in Quarter 2.
