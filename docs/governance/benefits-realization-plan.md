# Benefits Realization Plan

| Field | Value |
|---|---|
| **Unit** | EDP-2026-01 |
| **Project** | Enterprise Data Platform |
| **Owner** | Data Platform Lead (client) with DM support during transition |
| **Tracking horizon** | 12 months post-handoff |

Benefits realization converts delivery outputs into measurable business outcomes. Delivery ends in Week 16; **realization runs for 12 months**, reviewed quarterly.

---

## The benefits map

Every benefit below has a baseline date (Phase 0), a target date, a measurement mechanism, and an accountable owner.

### 1. Time-to-insight

- **KPI:** Days from analytics question → published answer for a typical exec query.
- **Baseline:** Phase 0, Wk 1–2. Target: ~2 weeks (self-reported by analyst cohort).
- **Target:** **1 business day** by 90 days post-handoff.
- **Measurement:** quarterly analyst survey (n=5+) + DataZone query logs.
- **Owner:** Head of Analytics / Data Platform Lead.

### 2. Reporting cycle compression

- **KPI:** Time to generate a recurring exec report.
- **Baseline:** Phase 0 — Monthly, ~3 business days hand-assembly.
- **Target:** **Weekly, auto-generated** within 90 days.
- **Measurement:** Report generation timestamp + QA sample.
- **Owner:** Head of Analytics.

### 3. Decisions backed by governed data

- **KPI:** % of exec/strategic decisions where the underlying data is from the platform (not ad-hoc extract).
- **Baseline:** Phase 0 exec interview survey.
- **Target:** **+30 percentage points vs. baseline** by 12 months.
- **Measurement:** Semi-annual exec interview.
- **Owner:** Executive Sponsor.

### 4. New-domain onboarding time

- **KPI:** Hours from "let's add domain X" to "domain X infrastructure live in DEV."
- **Baseline:** Phase 0 — typically weeks-to-quarters pre-platform.
- **Target:** **< 1 hour** (Terraform apply + smoke test).
- **Measurement:** Validated during Phase 3 Domain-2 provisioning; benchmark maintained at each new domain addition.
- **Owner:** Platform Eng / Platform Lead.

### 5. Post-handoff pipeline velocity

- **KPI:** Pipelines shipped per 2-week sprint by client 2-engineer team.
- **Baseline:** Phase 0 — historical velocity (likely 1–2 pipelines/sprint).
- **Target:** **5 pipelines/sprint** sustained by day 90, rising to 7/sprint with AI-agent fluency by 12 months.
- **Measurement:** Sprint delivery logs.
- **Owner:** Data Platform Lead.

### 6. Data incidents caught before production

- **KPI:** % of DQ issues caught by DQ suites + anomaly detection vs. caught by users in production.
- **Baseline:** Phase 0 — typically low (most caught by users).
- **Target:** **≥ 95% caught pre-prod** by 90 days.
- **Measurement:** Incident log + DQ suite results.
- **Owner:** QA / Platform Lead.

### 7. Platform adoption (from adoption plan)

- **KPIs (30/60/90):** unique Gold queriers, new pipelines added by client, DQ alerts triaged, champion-authored docs.
- See `docs/delivery/adoption-plan.md` for targets.
- **Owner:** Data Platform Lead.

### 8. Cost per GB processed (efficiency)

- **KPI:** AWS cost / GB of Gold output.
- **Baseline:** End of Phase 3.
- **Target:** **≤ $0.05 / GB** sustained; trending down as volumes grow.
- **Measurement:** Cost Explorer + CUR; tracked monthly.
- **Owner:** Platform Eng.

---

## Review cadence

| Cadence | Activity | Participants | Artifact |
|---|---|---|---|
| Wk 14 | Pre-handoff baseline confirmation | DM + Platform Lead | Updated baseline values |
| 30 days post-handoff | First check-in | Platform Lead + optional EPAM | Short update |
| 60 days post-handoff | Second check-in | Platform Lead | Short update |
| 90 days post-handoff | First quarterly review | Sponsor + Platform Lead + EPAM retainer (optional) | Full review against targets |
| Quarterly thereafter (4 total) | Review | Sponsor + Platform Lead | Quarterly report |
| 12 months post-handoff | Final benefits realization report | Sponsor + Platform Lead | Retrospective |

## Red flags (trigger intervention)

- Any KPI < 50% of target at its review point.
- KPI trending away from target for 2 consecutive reviews.
- Adoption red flags (see adoption-plan.md) — < 5 analysts by day 60, 0 new pipelines by day 90, DQ backlog > 10, champion attrition.

**Intervention options:** extended EPAM retainer, additional training, platform coaching, executive re-engagement.

## Reporting format

Each quarterly review produces a 2-page report:

- Page 1: KPI table (target / actual / delta / trend arrow / on-track?)
- Page 2: narrative — what's working, what's not, recommended actions.

## Link to Project Charter success criteria

Every success criterion in `docs/governance/project-charter.md` §5 maps to one KPI above. The charter is closed on the 12-month final report.
