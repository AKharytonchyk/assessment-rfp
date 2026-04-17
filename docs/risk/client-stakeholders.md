# Client Stakeholder Requirements

| Field            | Value                                  |
|------------------|----------------------------------------|
| **Unit**         | EDP-2026-01                               |
| **Project**      | Enterprise Data Platform               |
| **Assignee**     | Artsiom Kharytonchyk                   |
| **Last Updated** | 2026-04-15                             |

This document defines the client-side roles required for successful delivery of the Enterprise Data Platform engagement. Each role includes expected responsibilities, time commitment per phase, and the consequences of unavailability.

---

## Required Client Roles

### 1. Executive Sponsor

| Field                  | Value                                              |
|------------------------|----------------------------------------------------|
| **Role**               | Executive Sponsor                                  |
| **Count**              | 1                                                  |
| **Seniority**          | VP / SVP / C-level                                 |
| **Time Commitment**    | 1-2 hours/week                                     |
| **Peak Engagement**    | Phase 0 (Discovery), Phase 4 (Knowledge Transfer)  |

**Responsibilities:**
- Provide strategic direction and confirm domain prioritization decisions.
- Serve as the escalation point for unresolved decisions, access delays, or scope disputes.
- Approve budget for AWS infrastructure spend and any scope change requests.
- Attend phase gate reviews (4 reviews across 16 weeks, approximately 1 hour each).
- Champion the data platform initiative internally to ensure organizational buy-in.

**Impact of Unavailability:** Unresolved escalations block delivery. Budget approvals stall infrastructure provisioning. Competing organizational priorities may deprioritize the engagement without executive air cover.

---

### 2. Data Platform Lead

| Field                  | Value                                              |
|------------------------|----------------------------------------------------|
| **Role**               | Data Platform Lead                                 |
| **Count**              | 1                                                  |
| **Seniority**          | Senior Manager / Director                          |
| **Time Commitment**    | 4-6 hours/week                                     |
| **Peak Engagement**    | All phases (consistent throughout)                 |

**Responsibilities:**
- Serve as the primary day-to-day point of contact between the client and the EPAM team.
- Participate in daily standups (15 min/day) and weekly architecture review sessions (1 hour/week).
- Review and approve architecture decisions, ADRs, and pipeline designs.
- Coordinate internal stakeholders (domain owners, IT, security) on behalf of the project.
- Validate that delivered components meet the client's technical standards and governance requirements.
- Participate in sprint demos and provide feedback within the sprint cycle.

**Impact of Unavailability:** Architecture decisions are delayed. Internal coordination breaks down. EPAM team loses its primary communication channel, increasing the risk of misalignment.

---

### 3. Domain Data Owners

| Field                  | Value                                              |
|------------------------|----------------------------------------------------|
| **Role**               | Domain Data Owner                                  |
| **Count**              | 2 (one per in-scope domain)                        |
| **Seniority**          | Manager / Senior Individual Contributor            |
| **Time Commitment**    | 4 hours/week each                                  |
| **Peak Engagement**    | Phase 1 (Reference Pipeline), Phase 2 (Scale)      |

**Responsibilities:**
- Provide domain expertise including business rules, data definitions, entity relationships, and expected data behaviors.
- Validate source-to-target mapping documents and transformation logic.
- Define and approve data quality rules and thresholds for their domain.
- Participate in pipeline validation sessions to confirm output correctness.
- Identify known data issues, edge cases, and seasonal patterns that affect pipeline logic.
- Sign off on domain-specific pipeline deliverables.

**Impact of Unavailability:** Pipeline logic cannot be validated against business intent. Data quality rules default to generic patterns, missing domain-specific nuances. UAT defects increase due to unvalidated transformation logic.

---

### 4. IT / Security Lead

| Field                  | Value                                              |
|------------------------|----------------------------------------------------|
| **Role**               | IT / Security Lead                                 |
| **Count**              | 1                                                  |
| **Seniority**          | Senior Engineer / Manager                          |
| **Time Commitment**    | 2-4 hours/week                                     |
| **Peak Engagement**    | Phase 0 (Discovery), Phase 3 (Harden)              |

**Responsibilities:**
- Provision and manage AWS account access, IAM roles, SSO federation, and VPN/network connectivity for the EPAM team.
- Review and approve (or request exceptions for) SCP constraints that affect platform services.
- Conduct security reviews of the Terraform IaC, IAM policies, and data encryption configurations.
- Manage Secrets Manager entries for source system credentials.
- Participate in the security hardening activities in Phase 3 (encryption at rest/in transit, audit logging, least-privilege IAM).
- Approve production deployment security posture.

**Impact of Unavailability:** AWS access provisioning is delayed (R1). SCP issues are unresolved (R3). Security reviews become a bottleneck before production deployment.

---

### 5. QA / UAT Team

| Field                  | Value                                              |
|------------------------|----------------------------------------------------|
| **Role**               | QA / UAT Testers                                   |
| **Count**              | 2-3                                                |
| **Seniority**          | Analyst / Senior Analyst                           |
| **Time Commitment**    | 8 hours/week (Phase 3-4 only)                      |
| **Peak Engagement**    | Phase 3 (Harden), Phase 4 (Knowledge Transfer)     |

**Responsibilities:**
- Execute UAT test cases provided by the EPAM team against curated data outputs.
- Validate data accuracy by comparing platform outputs against source system reports or known-good datasets.
- Log defects with reproducible steps and expected vs. actual results.
- Participate in defect triage sessions to classify severity and agree on resolution priority.
- Provide formal UAT sign-off upon successful completion of acceptance criteria.
- Test role-based access controls by validating that Lake Formation permissions correctly restrict data visibility.

**Impact of Unavailability:** UAT window (Wk 13-14) is compressed or missed entirely. Production go-live cannot be approved without formal sign-off. Defects discovered post-delivery are more expensive to remediate.

---

### 6. Training Attendees

| Field                  | Value                                              |
|------------------------|----------------------------------------------------|
| **Role**               | Training Attendees                                 |
| **Count**              | 6-10 (client's data/platform team)                 |
| **Seniority**          | Mixed (Engineers, Analysts, Leads)                 |
| **Time Commitment**    | Half-day per session (~3.5h each) × 3 sessions in Wk 16 |
| **Peak Engagement**    | Phase 4 (Knowledge Transfer) -- Wk 16 only        |

**Responsibilities:**
- Attend all three scheduled training sessions covering platform operations, pipeline development patterns, and data governance/monitoring.
- Complete hands-on exercises during training to validate understanding.
- Ask questions and raise concerns during sessions so that supplementary documentation can be created.
- Serve as the client's internal platform team post-engagement, responsible for ongoing operations and future pipeline development.

**Training Sessions:**
| Session | Topic | Duration | Attendees |
|---------|-------|----------|-----------|
| Session 1 | Platform Architecture & Operations (infra, monitoring, alerting, runbooks) | Half-day (~3.5h) | All attendees |
| Session 2 | Pipeline Development Patterns (Glue jobs, Step Functions, DQ, testing) | Half-day (~3.5h) | Engineers & Leads |
| Session 3 | Data Governance & Catalog (Lake Formation, catalog, lineage, access control) | Half-day (~3.5h) | All attendees |

**Impact of Unavailability:** Knowledge transfer is incomplete. The client team cannot independently operate, maintain, or extend the platform. Post-engagement support requests increase.

---

## Stakeholder Summary Table

| Role                   | Count | Hrs/Week | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|------------------------|-------|----------|---------|---------|---------|---------|---------|
| Executive Sponsor      | 1     | 1-2      | High    | Low     | Low     | Low     | High    |
| Data Platform Lead     | 1     | 4-6      | High    | High    | High    | High    | High    |
| Domain Data Owner (x2) | 2     | 4 each   | Medium  | High    | High    | Medium  | Low     |
| IT / Security Lead     | 1     | 2-4      | High    | Medium  | Low     | High    | Low     |
| QA / UAT Team          | 2-3   | 8        | --      | --      | --      | High    | Medium  |
| Training Attendees     | 6-10  | Half-day×3 | --    | --      | --      | --      | High    |

---

## Stakeholder Engagement Calendar

The calendar below maps each role's engagement intensity across the 16-week delivery timeline. Phases are approximate and may shift based on discovery outcomes.

```
Week          1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16
Phase        |-- Phase 0 --|-------- Phase 1 --------|-------- Phase 2 --------|-- P3 --|P4|
             | Discovery   | Reference Pipeline       | Scale & Expand         |Harden |KT|

Executive     ##   #    .    .    .    .    .    .    .    .    .    .    .    .    #   ##
Sponsor

Data          ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   ##  ##
Platform
Lead

Domain        #    ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   ##   #    #    .   .
Data Owners

IT /          ##   ##   #    #    .    .    .    .    .    .    .    #    ##   ##   #   .
Security
Lead

QA / UAT      .    .    .    .    .    .    .    .    .    .    .    .    ##   ##   ##  #
Team

Training      .    .    .    .    .    .    .    .    .    .    .    .    .    .    .   ##
Attendees

Legend:  ## = High engagement (critical)    # = Moderate engagement    . = Minimal / on-call
```

### Key Engagement Milestones

| Week | Milestone                              | Required Stakeholders                          |
|------|----------------------------------------|------------------------------------------------|
| 1    | Kickoff & Access Provisioning          | Executive Sponsor, Platform Lead, IT/Security  |
| 2    | Domain Selection Decision              | Executive Sponsor, Platform Lead, Domain Owners|
| 3    | Architecture Review & ADR Approval     | Platform Lead, IT/Security                     |
| 4    | Reference Pipeline Design Review       | Platform Lead, Domain Owners                   |
| 6    | Reference Pipeline Demo & Sign-off     | Platform Lead, Domain Owners                   |
| 8    | Mid-engagement Phase Gate              | Executive Sponsor, Platform Lead               |
| 10   | Scaled Pipeline Review                 | Platform Lead, Domain Owners                   |
| 12   | UAT Readiness Review                   | Platform Lead, QA/UAT Team, IT/Security        |
| 13   | UAT Execution Begins                   | QA/UAT Team, Domain Owners                     |
| 14   | UAT Sign-off                           | QA/UAT Team, Platform Lead, Executive Sponsor  |
| 15   | Production Deployment Approval         | Executive Sponsor, IT/Security, Platform Lead  |
| 16   | Knowledge Transfer Sessions (3 × half-day) | Training Attendees, Platform Lead              |
| 16   | Final Handover & Engagement Close      | Executive Sponsor, Platform Lead               |

---

## Communication Protocols

| Channel              | Purpose                            | Cadence         | Participants                    |
|----------------------|------------------------------------|-----------------|---------------------------------|
| Daily Standup        | Progress, blockers, priorities     | Daily (15 min)  | Platform Lead, EPAM team        |
| Weekly Decision Mtg  | Pending decisions, escalations     | Weekly (1 hr)   | All active stakeholders         |
| Sprint Demo          | Deliverable review                 | Bi-weekly (1 hr)| Platform Lead, Domain Owners    |
| Phase Gate Review    | Phase completion, next phase plan  | End of phase    | All stakeholders                |
| Slack / Teams        | Ad-hoc questions, async decisions  | Ongoing         | All, 48-hr SLA on decisions     |
| Escalation Path      | Unresolved blockers                | As needed       | Platform Lead -> Exec Sponsor   |

---

## Stakeholder Onboarding Checklist

The following items must be completed by the client before or during Wk 1:

- [ ] Executive Sponsor identified and confirmed.
- [ ] Data Platform Lead identified, calendar availability confirmed for daily standups.
- [ ] Domain Data Owners (x2) identified with confirmed domain assignments.
- [ ] IT/Security Lead identified with authority to provision AWS access and manage SCPs.
- [ ] QA/UAT team members identified (can be finalized by Wk 10).
- [ ] Training attendees identified (can be finalized by Wk 14).
- [ ] RACI matrix reviewed and signed off by all named stakeholders.
- [ ] Communication channels (Slack/Teams workspace, Jira/board access) provisioned for EPAM team.
- [ ] Weekly decision meeting scheduled on all stakeholder calendars for the full 16 weeks.
- [ ] Escalation protocol reviewed and acknowledged by Executive Sponsor.
