# Delivery Approach

## Methodology

We follow an **Agile (Scrum)** methodology with **phase-gated milestones** — combining iterative delivery within phases with clear quality gates between them. This hybrid approach gives [Firm] the predictability of phased delivery with the adaptability of Agile sprints.

## Sprint Cadence

| Ceremony | Frequency | Duration | Participants |
|----------|-----------|----------|-------------|
| Sprint Planning | Every 2 weeks (Monday) | 1 hour | Full delivery team + [Firm] Data Platform Lead |
| Daily Standup | Daily | 15 min | Full delivery team + [Firm] Data Platform Lead |
| Sprint Review / Demo | Every 2 weeks (Friday) | 1 hour | Full team + [Firm] stakeholders (Domain Owners, Platform Lead) |
| Sprint Retrospective | Every 2 weeks (Friday) | 30 min | Delivery team only |
| Backlog Refinement | Weekly (Wednesday) | 30 min | DM, Architect, Data Eng leads |

**Sprint Length:** 2 weeks (8 sprints across 16-week engagement)

## Governance Model

### Reporting Cadence

| Report | Frequency | From → To | Content |
|--------|-----------|-----------|---------|
| Weekly Status Report | Weekly (email) | DM → Platform Lead, Sponsor | Progress vs. plan, risks, blockers, next week priorities |
| Sprint Demo | Bi-weekly | Full team → [Firm] stakeholders | Working software demonstration, feedback collection |
| Steering Committee | Bi-weekly (30 min) | DM + Architect → Sponsor + Platform Lead | Status, risk escalation, budget tracking, strategic decisions |
| Risk Review | Monthly | DM → Steering Committee | Risk register update, new risks, mitigation effectiveness |

### Decision-Making Framework

| Decision Type | Decision Maker | SLA | Examples |
|--------------|---------------|-----|---------|
| Technical implementation | Architect / Lead Engineer | Same day | Library choice, schema design, API pattern |
| Scope within sprint | DM + [Firm] Platform Lead | 48 hours | Story priority, acceptance criteria clarification |
| Scope change (new work) | [Firm] Sponsor + DM | 1 week | Additional pipelines, new domain, timeline change |
| Architecture change | Architect + [Firm] Platform Lead | 48 hours | Service substitution, pattern change |
| Production deployment | [Firm] Sponsor | 48 hours | Go/no-go for PRD promotion |

### Escalation Path

```
Level 1: DM <-> [Firm] Data Platform Lead          (48h SLA)
Level 2: DM <-> [Firm] Executive Sponsor            (24h SLA)
Level 3: EPAM Account Manager <-> [Firm] CTO/CDO    (as needed)
```

## Phased Delivery with Quality Gates

### Phase 0: Discovery & Alignment (Weeks 1-2)

**Objective:** Establish shared understanding, select domains, validate technology choices.

**Activities:**
- Stakeholder interviews with data owners per domain
- Source system inventory: connectivity, schemas, volumes, SLAs
- Technology confirmation workshop (Redshift vs. Athena, GX vs. Glue DQ)
- Medallion architecture design and naming convention standards
- Data ownership matrix and governance RACI
- Repository setup, branching strategy, AWS account access

**Quality Gate — Phase 0 Exit Criteria:**
- [ ] Two domains selected and signed off by [Firm]
- [ ] 10 pipelines documented with source details
- [ ] Architecture Decision Records (ADRs) for key choices
- [ ] Git repository initialized with branching strategy
- [ ] AWS DEV environment accessible to all team members
- [ ] Named [Firm] stakeholders with confirmed time commitment

---

### Phase 1: Platform Foundation (Weeks 3-6)

**Objective:** Build the reusable infrastructure, CI/CD, and developer experience.

**Activities:**
- VPC, networking, VPC endpoints for all required services
- Reusable Terraform domain templates (S3, Glue, Redshift/Athena, Step Functions)
- RBAC and Lake Formation setup (5 IAM roles per domain)
- CI/CD workflows: Terraform, Python, React (with AI PR review)
- Secrets management (GitHub OIDC → AWS, no long-lived keys)
- Environment promotion strategy (DEV → TST → PRD)
- AI Agent Foundation Stack and Claude Code onboarding
- Structured logging standard and X-Ray tracing from Day 1
- `edp_common` Python library (ingestion connectors)

**Quality Gate — Phase 1 Exit Criteria:**
- [ ] `terraform apply` provisions a complete domain in DEV (S3, Glue, Athena, Step Functions, IAM)
- [ ] CI/CD workflows execute successfully on PR and merge
- [ ] RBAC roles tested: DataEngineer can access Silver, Analyst can only access Gold
- [ ] `edp_common` library installable and unit tests pass
- [ ] AI PR reviewer triggers automatically on pull requests
- [ ] All IaC templates peer-reviewed by Architect

---

### Phase 2: Core Pipelines — Domain 1 (Weeks 5-10)

**Objective:** Deliver 5 production-quality pipelines with data quality framework.

**Activities:**
- Reference pipeline (Pipeline 1): full E2E implementation as the pattern
- Great Expectations DQ framework: completeness, accuracy, timeliness checks
- Pipelines 2-5 following reference pattern (2 Data Engineers in parallel)
- DQ results store and historical tracking
- Pipeline parameterization (externalized config via SSM)
- Data contract framework and Glue Catalog population
- Monitoring REST API and pipeline execution dashboard (parallel track)
- SLO/SLA definitions per pipeline

**Quality Gate — Phase 2 Exit Criteria:**
- [ ] All 5 Domain 1 pipelines running on schedule in DEV
- [ ] DQ checks passing for all pipelines (completeness, accuracy, timeliness)
- [ ] Reference pipeline promoted to TST environment
- [ ] Monitoring API returns pipeline execution data
- [ ] Pipeline dashboard displays execution status and DQ scores
- [ ] Data contracts defined (JSON Schema) for all Domain 1 entities

---

### Phase 3: Domain 2, Cross-Domain & Monitoring Hub (Weeks 9-14)

**Objective:** Complete pipeline delivery, build monitoring hub, enable cross-domain analytics.

**Activities:**
- Domain 2 provisioning (reuse templates — validates template reusability)
- Pipelines 6-10 for Domain 2
- Cross-domain data linkages (shared dimensions, entity resolution)
- Monitoring dashboard: DQ view, cross-domain hub, data lineage DAG
- Alerting rules and Grafana operational dashboards
- Centralized log aggregation across DEV/TST/PRD
- Runbook automation for known failure patterns
- Incident management integration (PagerDuty/OpsGenie)

**Quality Gate — Phase 3 Exit Criteria:**
- [ ] All 10 pipelines running in TST across both domains
- [ ] Cross-domain queries return correct joined data
- [ ] Monitoring dashboard functional: pipeline view, DQ view, cross-domain hub
- [ ] Alerts fire correctly on pipeline failure and DQ threshold breach
- [ ] Data lineage DAG shows end-to-end flow for all 10 pipelines
- [ ] Domain 2 provisioned in < 1 hour using templates (validates reusability)

---

### Phase 4: Polish, Security, Training & Handoff (Weeks 13-16)

**Objective:** Production-ready deployment, knowledge transfer, formal handoff.

**Activities:**
- Security hardening: encryption audit, network review, vulnerability scan
- CloudTrail and audit logging finalization
- Production deployment and smoke testing
- All documentation completion (runbook, developer guide, user guide)
- Operating model guidance for steady-state
- Migration plan for remaining pipelines
- 3 training sessions with recordings (each **half-day ~3.5h**: lecture + hands-on lab + Q&A):
  - Session 1: Platform & IaC
  - Session 2: Data Pipeline Development
  - Session 3: Monitoring & Operations
- Formal handoff sign-off

**Quality Gate — Phase 4 Exit Criteria:**
- [ ] All 10 pipelines running in PRD
- [ ] Zero critical vulnerabilities (Dependabot, pip-audit, npm audit)
- [ ] Security review completed: no public S3, encryption verified, RBAC tested
- [ ] All documentation reviewed and accepted by [Firm]
- [ ] 3 training sessions delivered with recordings uploaded
- [ ] Migration plan approved by [Firm]
- [ ] Formal handoff document signed by Executive Sponsor

---

## Tooling

| Category | Tool | Purpose |
|----------|------|---------|
| Project Management | JIRA / Rally | Backlog, sprint tracking, burndown |
| Documentation | Confluence | Technical docs, ADRs, meeting notes |
| Communication | Slack / Teams | Daily async communication, 48h decision SLA |
| Source Control | GitHub | Code, IaC, CI/CD workflows |
| CI/CD | GitHub Actions | Automated build, test, deploy |
| AI Acceleration | Claude Code + CodeBuild Agents | Developer productivity, automated PR review |
| Diagrams | PlantUML (C4) + Mermaid | Architecture and flow diagrams |
| Monitoring | React Dashboard + Grafana | Business and operational monitoring |

## Definition of Done

A backlog item is "Done" when:

1. Code is written, reviewed (human + AI PR review), and merged to `develop`
2. Unit tests pass (pytest / vitest)
3. Integration tests pass in DEV environment
4. CI/CD pipeline deploys successfully
5. Documentation updated (if applicable)
6. Demonstrated in Sprint Review
7. Accepted by [Firm] Product Owner / Data Platform Lead

## Change Management

On a T&M contract, scope changes are managed as follows:

1. **Change Request Raised** — DM documents the requested change (scope, effort estimate, timeline impact)
2. **Impact Assessment** — Architect evaluates technical impact; DM evaluates schedule/cost impact
3. **Decision** — [Firm] Sponsor approves or defers (changes beyond 10 pipelines / 2 domains go to migration plan)
4. **Execution** — If approved, items added to backlog with appropriate priority
5. **Tracking** — All changes logged in change register with original vs. current scope comparison

## AI-Augmented Delivery

Our delivery approach integrates AI at two levels:

**Level 1: Developer Productivity (Claude Code)**
- Every team member uses Claude Code as an AI pair programmer
- Accelerates boilerplate code, test generation, documentation
- Estimated 30-50% productivity gain across roles

**Level 2: Automated Agents (CodeBuild + Bedrock)**
- 7 specialized agents run autonomously for repeatable tasks
- Multi-pass PR review catches issues before human review
- Pipeline scaffolding generates 80% of pipeline code from a spec
- All agent output requires human review before merge (guardrail)

This is not experimental — the agent platform architecture is production-proven and includes guardrails (max 3 retries, duplicate prevention, input validation, human escalation).

## Critical Path & Schedule Reserve

### Critical Path

```
Source-system access (wk 1-2)
    └─> edp_common Python library (wk 3-5)
        └─> Reference pipeline end-to-end (wk 6-7)
            └─> Domain 2 pipelines 6-10 (wk 9-12)
                └─> PRD deployment + smoke testing (wk 15)
```

This is a **zero-slack chain**. A delay on any node moves the end date day-for-day unless absorbed by the schedule reserve below. The Gantt (`docs/architecture/roadmap-gantt.mmd`) marks these tasks with `:crit,` so Mermaid renders them red.

### Schedule Reserve

- **Reserve held:** **2 weeks (12.5% of 16)**, held by the Delivery Manager.
- **Purpose:** covers the drag from High-exposure risks on the critical path — R1 (source access), R2 (domain selection), R8 (stakeholder availability).
- **Draw rule:** reserve is drawn only on written Executive Sponsor approval, through the change-request process. Draw decisions are logged.
- **Beyond 2 weeks:** any CP slip beyond the reserve triggers a formal re-baseline — scope, schedule, and cost — through the Change Control process (`docs/governance/change-request-template.md`).

### Calendar reality

- Target end-date (without reserve): **2026-08-21**.
- With full reserve drawn: **2026-09-04**.
- The ROM's 16-week envelope is firm; reserve does not require additional contingency funding within T&M.
