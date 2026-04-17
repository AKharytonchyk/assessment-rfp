# ROM Financial Proposal -- Enterprise Data Platform

> **Estimate type:** Rough Order of Magnitude (ROM), -25% / +50%
> **Contract model:** Time & Materials (T&M)
> **Duration:** 16 weeks (4 months)
> **Delivery location:** Central Europe (offshore)

---

## 1. Rate Card Source

All labor rates are sourced from the **EPAM & CAPG Central Europe blended rate card**. Rates are fully loaded and include all employer taxes, benefits, and overhead. No additional margin or administrative fees apply.

### Role Mapping Table

| Proposal Role | Rate Card Role | Seniority | Hourly Rate (CE) | Daily Rate (8 hr) |
|---------------|----------------|-----------|-------------------|--------------------|
| Delivery Manager | Project Manager (DM) | Senior | $100/hr | $800/day |
| Solution Architect | Solution Architect | Lead | $110/hr | $880/day |
| Platform/DevOps Eng | DevSecOps Engineer | Senior | $75/hr | $600/day |
| Data Engineer 1 | Software Engineer | Senior | $75/hr | $600/day |
| Data Engineer 2 | Software Engineer | Mid | $67/hr | $536/day |
| Full-Stack Developer | Software Engineer | Senior | $75/hr | $600/day |
| QA Engineer | Test Automation Engineer | Senior | $67/hr | $536/day |
| Technical Writer | Technical Writer | Mid | $60/hr | $480/day |

---

## 2. Labor Cost Summary

| # | Role | Daily Rate | Person-Days | Cost |
|---|------|-----------|-------------|------|
| 1 | Delivery Manager | $800 | 80 | $64,000 |
| 2 | Solution Architect | $880 | 70 | $61,600 |
| 3 | Platform/DevOps Engineer | $600 | 80 | $48,000 |
| 4 | Data Engineer 1 | $600 | 80 | $48,000 |
| 5 | Data Engineer 2 | $536 | 50 | $26,800 |
| 6 | Full-Stack Developer | $600 | 60 | $36,000 |
| 7 | QA Engineer | $536 | 60 | $32,160 |
| 8 | Technical Writer | $480 | 20 | $9,600 |
| | **Total Labor** | | **500** | **$326,160** |

---

## 3. Cost by Phase Breakdown

Phases below map to the 5-phase delivery approach (Phase 0 Discovery is merged into Phase 1 Foundation for this cost view; see `delivery-approach.md` for the 5-phase gate definition). Two PD columns are provided so earned-value management can compute against either baseline:

- **Estimable PD** — bottom-up WBS work (sums to 293, see `wbs.md`).
- **Priced PD** — billable T&M capacity (sums to 500; uplift ≈1.71× covers ceremonies, standups, governance, ramp, PTO, rework — full math in `wbs.md` §"WBS Estimable PD vs. Priced PD").

| Phase | Weeks | Key Activities | Estimable PD | Priced PD | Labor Cost |
|-------|-------|----------------|-------------:|----------:|------------|
| **Phase 1: Foundation** (incl. Phase 0 Discovery) | Wk 1 -- 4 | Architecture, IaC, CI/CD, domain selection | ~59 | 100 | $63,960 |
| **Phase 2: Build** | Wk 5 -- 12 | Pipeline development, UI, data quality, AI agents | ~164 | 280 | $181,440 |
| **Phase 3: Harden & Test** | Wk 13 -- 14 | Security hardening, UAT, performance testing, docs | ~41 | 70 | $44,960 |
| **Phase 4: Transition** | Wk 15 -- 16 | Training, operating model handover, go-live | ~29 | 50 | $36,160* |
| | | **Total** | **293** | **500** | **$326,160** |

> *Phase 4 includes final documentation, knowledge transfer sessions, and production deployment support. Note that phases represent primary focus areas; some activities span multiple phases.

---

## 4. Weekly Burn Rate

| Week | Headcount | Weekly Burn |
|------|-----------|-------------|
| 1 | 4 | $14,400 |
| 2 | 4 | $14,400 |
| 3 | 5 | $17,080 |
| 4 | 5 | $17,080 |
| 5 | 7 | $22,760 |
| 6 | 7 | $22,760 |
| 7 | 7 | $22,760 |
| 8 | 7 | $22,760 |
| 9 | 7 | $22,760 |
| 10 | 7 | $22,760 |
| 11 | 7 | $22,760 |
| 12 | 7 | $22,760 |
| 13 | 7 | $22,480 |
| 14 | 7 | $22,480 |
| 15 | 6 | $18,080 |
| 16 | 6 | $18,080 |
| **Total** | | **$326,160** |

---

## 5. Non-Labor Costs

| Category | Description | Low Estimate | High Estimate |
|----------|-------------|--------------|---------------|
| AWS Infrastructure | EKS/ECS, S3, Glue, Redshift Serverless, CloudWatch, VPC, NAT GW, data transfer (4 months) | $32,000 | $60,000 |
| AI Acceleration | Amazon Bedrock (Claude Sonnet/Haiku), CodeBuild GPU instances, Claude Code licenses (4 months) | $7,440 | $8,440 |
| Tooling & Licenses | Terraform Cloud, Datadog/Grafana Cloud, GitHub Enterprise seats, Great Expectations Cloud (as needed) | $0 | $12,000 |
| Travel | On-site workshops, kickoff, and go-live support (Central Europe to client site) | $5,000 | $10,000 |
| Contingency | 10% of labor to cover scope uncertainty and discovery items | $32,616 | $32,616 |

---

## 6. ROM Summary

| Component | Low | High |
|-----------|-----|------|
| Labor (500 person-days) | $326,160 | $326,160 |
| AWS Infrastructure | $32,000 | $60,000 |
| AI Acceleration | $7,440 | $8,440 |
| Tooling & Licenses | $0 | $12,000 |
| Travel | $5,000 | $10,000 |
| Contingency (10% labor) | $32,616 | $32,616 |
| **Total ROM** | **$403,216** | **$449,216** |

---

## 7. AI ROI Justification

AI-assisted development tools (Amazon Bedrock, Claude Code) are included as a line item. The table below quantifies the expected return.

| Metric | Without AI | With AI | Improvement |
|--------|-----------|---------|-------------|
| Boilerplate code generation (Terraform, CloudFormation, IaC) | 80 person-days | 56 person-days | 30% reduction |
| Data pipeline scaffolding | 40 person-days | 28 person-days | 30% reduction |
| Test case generation & QA automation | 30 person-days | 21 person-days | 30% reduction |
| Documentation drafting | 20 person-days | 12 person-days | 40% reduction |
| Code review turnaround | 2 days avg | 0.5 days avg | 75% faster |
| **Total effort saved** | **170 person-days baseline** | **117 person-days** | **53 person-days saved** |
| **Cost of saved effort** (blended $652/day) | | | **~$34,556** |
| **AI tooling cost** (4 months) | | | **$7,440 -- $8,440** |
| **Net ROI** | | | **$26,116 -- $27,116** |
| **ROI multiple** | | | **~3.5x -- 4.6x** |

> The 53 person-days saved are reinvested into deeper testing, documentation quality, and additional pipeline coverage -- not removed from the team.

### Client-facing ROI (steady-state, post-handoff)

The ROI above reflects EPAM-side delivery efficiency. The client-facing ROI comes from the **platform itself** after handoff:

| Metric | Without platform (baseline) | With platform + templates + agents | Client impact |
|---|---|---|---|
| New pipeline from spec → production | 2-3 weeks (2-engineer) | 1-2 sprints (2-engineer) = 5 pipelines / 2 wk sprint | **2.5-5× velocity** |
| New domain onboarding | Weeks-to-months | < 1 hour (Terraform apply) | **orders-of-magnitude** |
| Time-to-insight for a new analytics question | Days-to-weeks | Same-day (analyst on Gold, documented contracts) | **Days → hours** |
| Risk of broken consumer on schema change | High (tribal knowledge) | Zero-tolerance (CI gate blocks) | **0 silent breakage** |
| Platform operability (on-call load) | Per-pipeline heroics | Centralized dashboards, auto-runbooks, anomaly alerts | **Reduces ops FTE demand** |

On a typical remaining-pipeline backlog of ~40 pipelines, the velocity gain alone saves **~20+ engineering weeks** vs. building greenfield without templates and agents.

---

## 8. ROM Assumptions

1. **T&M billing:** Actuals are invoiced monthly based on approved timesheets. Person-day counts in this ROM are estimates, not caps.
2. **Rate lock:** Central Europe rates are locked for the 16-week engagement period. Any extension beyond Week 16 will use the same rates unless a new rate card is mutually agreed.
3. **AWS account ownership:** The client provides and owns all AWS accounts. Infrastructure costs are billed directly to the client's AWS Organization.
4. **AI tooling:** Amazon Bedrock and Claude Code costs assume moderate usage (development and code-review workflows). Costs scale with usage and are passed through at cost.
5. **Tooling & licenses:** If the client already has enterprise licenses for Terraform Cloud, Datadog, or GitHub Enterprise, the $0 low end applies.
6. **Travel:** Assumes 1-2 trips for key team members (DM + SA) for kickoff and go-live. If fully remote, travel cost is $0.
7. **Contingency:** 10% of labor ($32,616) is reserved for scope uncertainty discovered during the engagement. Contingency is drawn only with client approval and tracked transparently.
8. **No hardware costs:** All infrastructure is cloud-native (AWS). No physical hardware procurement is required.
9. **Client dependencies:** The ROM assumes timely client responses (data access, environment approvals, UAT feedback) within agreed SLA windows. Delays caused by client dependencies may extend the timeline and increase labor costs.
10. **Scope:** This ROM covers **10 data pipelines across 2 business domains**, selected in the first two weeks of the engagement (per `assumptions.md` SC-01). Migration of remaining domains and pipelines beyond the initial 10 is covered by deliverable DOC-008 (migration plan) but not by this ROM.
11. **Working days:** 5 billable days per week, 8 hours per day. No public holiday adjustments are included; actual billing will reflect observed holidays.
12. **Currency:** All amounts are in USD.

---

## 9. Payment Terms

| Term | Detail |
|------|--------|
| Billing cycle | Monthly, in arrears |
| Invoice basis | Approved timesheets (actual hours worked x applicable rate) |
| Payment due | Net 30 days from invoice date |
| Currency | USD |
| Non-labor pass-through | AWS, AI tooling, and travel costs invoiced at cost with receipts |
| Contingency draw | Requires written client approval before hours are incurred |
| Rate escalation | None for the initial 16-week engagement |
| Early termination | 2-week written notice; client pays for all hours worked through the notice period |
| Schedule reserve | **2 weeks held by DM** inside the 16-week envelope to absorb CP delays from R1/R2/R8. Within-envelope draws billed T&M at normal rates. Beyond 2 weeks = formal re-baseline via CR process. |

> **Suggested cadence:** Monthly invoicing aligns with T&M best practice. For client budget visibility, we provide a weekly burn report and cumulative spend tracker updated every Friday.
