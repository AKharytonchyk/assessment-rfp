# Project Charter — Enterprise Data Platform (EDP)

| Field | Value |
|---|---|
| **Project name** | Enterprise Data Platform (EDP) |
| **Client** | [Firm] — geo-data specialist |
| **Vendor** | EPAM Systems (Central Europe delivery) |
| **Unit** | EDP-2026-01 |
| **Charter date** | 2026-04-17 (draft); signature on kickoff |
| **Duration** | 16 weeks (2026-05-04 → 2026-08-21 target; up to 2026-09-04 with schedule reserve) |
| **Contract model** | Time & Materials (T&M) |
| **Budget envelope** | USD $403,216 – $449,216 (ROM, see `docs/delivery/rom.md`) |

---

## 1. Purpose

Build a domain-centric Enterprise Data Platform that consolidates [Firm]'s CRM, ERP, HRIS, and file-based sources into a reusable, standardized, compliant AWS-native lakehouse, enabling insight-driven decisioning for business leaders and a sustainable operating model the [Firm] team can extend independently post-handoff.

## 2. Objectives

1. Deliver **10 production-ready data pipelines across 2 business domains**, with Bronze/Silver/Gold medallion tiers, data quality gates, and monitoring.
2. Deliver **reusable Terraform domain templates** that reduce new-domain onboarding from quarters to under 1 hour.
3. Deliver **centralized cross-domain monitoring** across DEV/TST/PRD (React dashboard + Grafana).
4. Deliver **full documentation suite + 3 training sessions** enabling [Firm]'s team to operate and extend the platform.
5. Deliver a **migration plan** for the remaining pipelines beyond the initial 10.
6. Establish a **sustainable operating model** with data contracts, RBAC, classification, lineage, and governance.

## 3. Scope — In

- 10 pipelines across 2 business domains (domain selection in Phase 0, Wk 1–2).
- 3 environments (DEV, TST, PRD) per domain.
- Reusable templates, CI/CD, AI-accelerated development.
- DQ (completeness, accuracy, timeliness) per RFP §3.2.
- Monitoring + anomaly detection + alerting.
- Data classification, retention policies, RBAC, Lake Formation grants.
- Cross-domain linkages via shared Gold dimensions (MDM / entity resolution).
- Training (3 sessions × half-day) with recordings + documentation.

## 4. Scope — Out

- Pipelines beyond the initial 10 (covered by migration plan DOC-008).
- Domains beyond the selected 2 (covered by migration plan).
- Raster-data handling (imagery/DEM) — out of initial scope; covered by companion architecture in migration plan.
- BI reports / dashboards / ML models built on top of Gold (platform is the deliverable; business analytics is separate).
- Execution of the post-handoff migration plan (separate engagement).
- On-premises infrastructure work (client retains ownership of source systems).

## 5. Success Criteria

Tied to `docs/delivery/adoption-plan.md` 90-day KPIs and `docs/governance/benefits-realization-plan.md`.

| Type | Criterion | Measurement |
|---|---|---|
| Delivery | All 10 pipelines running in PRD | Phase 4 gate |
| Delivery | Zero critical vulns at deploy | Security scans |
| Delivery | All NFR targets met (see `nfr-slo-matrix.md`) | SLO dashboard |
| Adoption | ≥ 50 unique Gold queries in first 90 days post-handoff | DataZone/query logs |
| Adoption | ≥ 5 new pipelines built by client team in first 90 days | Sprint logs |
| Business | Exec KPI baselines signed off in Phase 0, re-measured at 90 days | Benefits plan |

## 6. Stakeholders (summary — full register in `stakeholder-register.md`)

| Role | Party | Time commitment |
|---|---|---|
| Executive Sponsor | [Firm] | 1–2 h/week |
| Data Platform Lead | [Firm] | 4–6 h/week |
| Domain Data Owners ×2 | [Firm] | 4 h/week each |
| IT/Security Lead | [Firm] | 2–4 h/week |
| QA/UAT Team | [Firm] | 8 h/week Phase 3–4 |
| Training Attendees | [Firm] | 3 × half-day in Wk 16 |
| Delivery Manager | EPAM | FTE |
| Solution Architect | EPAM | FTE |
| Engineering team | EPAM | 5–7 FTE staggered |

## 7. Authority Levels

| Decision type | Authority | Escalation |
|---|---|---|
| Technical implementation within ADRs | Solution Architect | → Data Platform Lead |
| Scope within sprint | DM + Platform Lead | → Sponsor if contested |
| Scope change < $5K | DM | → Platform Lead |
| Scope change $5K–25K | DM + Platform Lead | → Sponsor |
| Scope change > $25K | Executive Sponsor | Binding |
| Schedule reserve draw | DM with Sponsor written approval | Formal CR |
| Phase gate go/no-go | Sponsor + Platform Lead + DM | N/A (highest) |

## 8. Risks (top 3 — full register in `docs/risk/risk-register.md`)

1. **R1 — Source system access delays** (High/High/High). Mitigation: Day-1 access checklist, synthetic-data fallback, Sponsor escalation.
2. **R10 — AI-generated code quality** (Medium/High/High). Mitigation: multi-pass PR review, CODEOWNERS, reference pipeline human-built.
3. **R8 — Client stakeholder availability** (Medium/High/High). Mitigation: RACI signed at Wk 0, weekly decision meeting, 48h SLA on decisions.

## 9. Governance Cadence

| Cadence | Activity | Participants |
|---|---|---|
| Daily | Standup (15 min) | DM + team + Platform Lead |
| Weekly | Exec async brief | Sponsor (distribution) |
| Weekly | Decision meeting (1h) | All active stakeholders |
| Bi-weekly | Sprint demo + SteerCo | Full team + stakeholders |
| End of phase | Phase gate review | All stakeholders |
| Quarterly (post-handoff, 12 months) | Benefits-realization check-in | Sponsor + Platform Lead |

## 10. Approvals

| Signatory | Role | Signature | Date |
|---|---|---|---|
| | [Firm] Executive Sponsor | __________ | ____ |
| | [Firm] Data Platform Lead | __________ | ____ |
| | EPAM Delivery Manager | __________ | ____ |
| | EPAM Account Manager | __________ | ____ |
