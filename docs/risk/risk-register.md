# Risk Register

| Field            | Value                                  |
|------------------|----------------------------------------|
| **Unit**         | EDP-2026-01                               |
| **Project**      | Enterprise Data Platform               |
| **Format**       | EPAM RDM                               |
| **Assignee**     | Artsiom Kharytonchyk                   |
| **Last Updated** | 2026-04-15                             |

---

## Risk Register Table

| ID  | Risk Title                                  | Probability | Impact | Exposure | Dimension             | Treatment  | Checkpoint     |
|-----|---------------------------------------------|-------------|--------|----------|-----------------------|------------|----------------|
| R1  | Source System Access Delays                  | High        | High   | High     | Committed Delivery    | Mitigation | End Wk 1       |
| R2  | Domain Selection Exceeds Discovery Phase     | Medium      | High   | High     | Alignment with Client | Mitigation | End Wk 1       |
| R3  | Client AWS Account Restrictions (SCPs)       | Medium      | High   | High     | Quality               | Mitigation | End Wk 1       |
| R4  | Data Volumes Exceed Estimates                | Medium      | Medium | Medium   | Finances              | Mitigation | End Wk 2       |
| R5  | Great Expectations / Glue Python Incompatibility | Low     | Medium | Low      | Quality               | Mitigation | End Wk 5       |
| R6  | Key Team Member Departure                    | Low         | High   | Medium   | Staffing              | Mitigation | Bi-weekly      |
| R7  | Scope Creep                                  | High        | Medium | Medium   | Scope                 | Mitigation | End Wk 2       |
| R8  | Client Stakeholder Availability              | Medium      | High   | High     | Alignment with Client | Mitigation | End Wk 1       |
| R9  | Bedrock Model Access Delays                  | Medium      | Medium | Medium   | Committed Delivery    | Mitigation | End Wk 2       |
| R10 | AI-Generated Code Quality Risks              | Medium      | High   | High     | Quality               | Mitigation | Every sprint   |

---

## Detailed Risk Descriptions

### R1 -- Source System Access Delays

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R1                                     |
| **Probability**    | High                                   |
| **Impact**         | High                                   |
| **Exposure**       | High                                   |
| **Dimension**      | Committed Delivery                     |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 1                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Pipeline development depends on live connectivity to CRM, ERP, HRIS, and file-based source systems. Obtaining VPN access, API keys, service accounts, and credentials from client IT often takes weeks due to security review processes, approval chains, and provisioning backlogs. Without source system access, pipeline development cannot proceed beyond synthetic data testing.

**Mitigation Plan:**
- Distribute a Day-1 access requirements checklist to the client covering all systems, credentials, VPN profiles, and API endpoints.
- Deploy synthetic data generators using `faker` and `factory_boy` libraries that mirror source system schemas, enabling parallel development while access is pending.
- Escalate formally to the Executive Sponsor if access is not granted by end of Wk 2.
- Track each access request in a shared matrix with status, owner, and expected completion date.

---

### R2 -- Domain Selection Exceeds Discovery Phase

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R2                                     |
| **Probability**    | Medium                                 |
| **Impact**         | High                                   |
| **Exposure**       | High                                   |
| **Dimension**      | Alignment with Client                  |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 1                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Stakeholders may disagree on which business domains (e.g., Sales, Finance, HR, Operations) should be prioritized for Phase 1 pipeline delivery. Competing priorities and lack of consensus can delay domain selection beyond the allocated discovery phase, compressing downstream delivery timelines.

**Mitigation Plan:**
- Provide a pre-populated domain priority matrix scoring each candidate domain on business value, data readiness, complexity, and stakeholder alignment.
- Timebox domain selection to 5 business days maximum with a structured decision workshop.
- Escalate unresolved disagreements to the Executive Sponsor for a binding decision.
- Begin domain-agnostic infrastructure work (networking, IAM, Lake Formation baseline, CI/CD) in parallel so that platform delivery is not blocked by domain selection.

---

### R3 -- Client AWS Account Restrictions (SCPs)

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R3                                     |
| **Probability**    | Medium                                 |
| **Impact**         | High                                   |
| **Exposure**       | High                                   |
| **Dimension**      | Quality                                |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 1                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** AWS Service Control Policies (SCPs) enforced at the organizational unit level may block provisioning of core services such as AWS Glue, Step Functions, Lake Formation, Redshift Serverless, Lambda, or Bedrock. These restrictions are often undocumented or discovered only at deployment time, causing rework and architectural pivots.

**Mitigation Plan:**
- Conduct an SCP review on Day 1 with the client's Cloud/Security team to catalogue all active restrictions.
- Execute a service smoke test via a Terraform plan in Wk 1 that attempts to create minimal instances of every required service.
- Maintain a documented list of alternative services for each core dependency (e.g., EMR Serverless if Glue is blocked, ECS Fargate if Lambda is restricted).
- Engage the client's Cloud Engineering team early to request SCP exceptions where justified.

---

### R4 -- Data Volumes Exceed Estimates

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R4                                     |
| **Probability**    | Medium                                 |
| **Impact**         | Medium                                 |
| **Exposure**       | Medium                                 |
| **Dimension**      | Finances                               |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 2                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Glue jobs may timeout or exceed cost projections if actual data volumes significantly surpass initial estimates. ERP systems in particular can contain 100M+ row tables with complex hierarchical relationships. Uncontrolled costs from over-provisioned DPUs or unexpectedly large full loads can erode the project budget.

**Mitigation Plan:**
- Profile source system volumes and row counts during Phase 0 discovery to establish accurate baselines.
- Configure DPU limits and auto-scaling caps on all Glue jobs.
- Implement incremental/CDC load patterns from Day 1 rather than full-load approaches.
- Use Glue Flex execution class for non-time-critical jobs to reduce cost by up to 35%.
- Set up AWS Budgets alerts at 50%, 75%, and 90% of monthly forecast thresholds.

---

### R5 -- Great Expectations / Glue Python Incompatibility

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R5                                     |
| **Probability**    | Low                                    |
| **Impact**         | Medium                                 |
| **Exposure**       | Low                                    |
| **Dimension**      | Quality                                |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 5                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Great Expectations (GX) v1.x requires Python 3.10 or later, while AWS Glue Python Shell jobs currently run Python 3.9. This version mismatch may prevent GX from being used directly within Glue jobs for inline data quality validation, forcing an architectural change to the DQ layer.

**Mitigation Plan:**
- Execute a compatibility spike in Wk 5 to validate GX installation and execution within the Glue runtime.
- Pin GX to the latest version confirmed compatible with Python 3.9 if a working version exists.
- Prepare fallback options: run GX validations in a Lambda function (Python 3.12 runtime) triggered post-Glue-job, or replace GX with AWS Glue Data Quality (DQDL-based) for in-job validation.
- Document the decision in an ADR regardless of outcome.

---

### R6 -- Key Team Member Departure

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R6                                     |
| **Probability**    | Low                                    |
| **Impact**         | High                                   |
| **Exposure**       | Medium                                 |
| **Dimension**      | Staffing                               |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | Bi-weekly                              |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Losing the Solution Architect or a senior Data Engineer mid-engagement would cause significant knowledge loss and delivery disruption. Specialized knowledge of client source systems, agreed-upon design patterns, and platform configuration decisions concentrates in key individuals during the early phases.

**Mitigation Plan:**
- Mandate pair programming on the reference pipeline so at least two engineers understand every critical path.
- Produce Architecture Decision Records (ADRs) early and continuously to capture rationale, not just outcomes.
- Enforce Infrastructure-as-Code for all provisioning (no ClickOps) so that environment knowledge is codified.
- Maintain identified bench candidates from EPAM who can be onboarded within 1-2 weeks if needed.
- Conduct bi-weekly knowledge distribution reviews to identify single points of failure.

---

### R7 -- Scope Creep

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R7                                     |
| **Probability**    | High                                   |
| **Impact**         | Medium                                 |
| **Exposure**       | Medium                                 |
| **Dimension**      | Scope                                  |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 2                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** The client may request additional pipelines, domains, or integrations beyond the agreed scope during delivery. Each additional pipeline adds development, testing, and documentation effort that compounds across phases. Without a clear boundary, the team risks overcommitting and underdelivering.

**Mitigation Plan:**
- Define explicit scope boundaries in the SOW: 10 pipelines across 2 business domains.
- Implement a formal change request process requiring impact assessment (effort, cost, timeline) before approval.
- Log all out-of-scope requests in a backlog and include them in the migration/expansion plan delivered at project close.
- Review scope adherence at each sprint retrospective.

---

### R8 -- Client Stakeholder Availability

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R8                                     |
| **Probability**    | Medium                                 |
| **Impact**         | High                                   |
| **Exposure**       | High                                   |
| **Dimension**      | Alignment with Client                  |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 1                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Delayed decisions from client stakeholders cascade directly into delivery delays. Architecture approval, domain prioritization, access provisioning, and UAT sign-off all require timely client engagement. Stakeholders with competing priorities may be unresponsive or unavailable during critical decision windows.

**Mitigation Plan:**
- Establish a RACI matrix with named client stakeholders and agreed-upon decision authority before Wk 1 ends.
- Schedule a recurring weekly decision meeting with all key stakeholders.
- Define a 48-hour Slack/email SLA for decision requests, documented in the project charter.
- Escalate to the Executive Sponsor if the SLA is breached twice in any phase.
- Batch decisions into weekly cadence to minimize ad-hoc requests.

---

### R9 -- Bedrock Model Access Delays

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R9                                     |
| **Probability**    | Medium                                 |
| **Impact**         | Medium                                 |
| **Exposure**       | Medium                                 |
| **Dimension**      | Committed Delivery                     |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | End Wk 2                               |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** Amazon Bedrock model access requires quota approvals and inference profile provisioning that may be delayed by AWS account-level restrictions, regional availability, or client procurement processes. Without Bedrock access, AI-assisted pipeline generation and documentation workflows cannot be validated on the target platform.

**Mitigation Plan:**
- Submit Bedrock model access requests during Phase 0 for all required models (Claude, Titan Embeddings).
- Validate access with a test invocation by end of Wk 2.
- Maintain a fallback path using Claude Code CLI with direct Anthropic API keys for development if Bedrock provisioning is delayed.
- Document Bedrock-specific configuration separately so the switch from API to Bedrock is a configuration change, not a code change.

---

### R10 -- AI-Generated Code Quality Risks

| Field              | Value                                  |
|--------------------|----------------------------------------|
| **ID**             | R10                                    |
| **Probability**    | Medium                                 |
| **Impact**         | High                                   |
| **Exposure**       | High                                   |
| **Dimension**      | Quality                                |
| **Treatment**      | Mitigation                             |
| **Checkpoint**     | Every sprint                           |
| **Owner**          | Artsiom Kharytonchyk                   |

**Description:** AI-agent-generated pipeline code may pass automated tests but contain subtle logic errors such as incorrect join conditions, silent data truncation, wrong timezone handling, or flawed deduplication logic. These defects can propagate into production datasets and erode trust in the platform if not caught during review.

**Mitigation Plan:**
- Enforce multi-pass pull request reviews: automated linting, automated test suite, then mandatory human review.
- Configure CODEOWNERS to require at least one senior engineer approval on all generated code.
- Limit AI agents to a maximum of 3 fix attempts per PR before escalating to human rewrite.
- Build the reference pipeline entirely by human engineers to establish a verified baseline that AI-generated pipelines are compared against.
- Include data reconciliation checks (row counts, aggregates, sample comparisons) in every pipeline's test suite.

---

## Risk Exposure Summary

| Exposure Level | Count | Risk IDs                 |
|----------------|-------|--------------------------|
| **High**       | 5     | R1, R2, R3, R8, R10      |
| **Medium**     | 4     | R4, R6, R7, R9           |
| **Low**        | 1     | R5                       |

### Exposure by Dimension

| Dimension             | Risks       | Highest Exposure |
|-----------------------|-------------|------------------|
| Committed Delivery    | R1, R9      | High             |
| Alignment with Client | R2, R8      | High             |
| Quality               | R3, R5, R10 | High             |
| Finances              | R4          | Medium           |
| Staffing              | R6          | Medium           |
| Scope                 | R7          | Medium           |

---

## Risk Heatmap

```
                         I M P A C T
                   Low        Medium       High
              +------------+------------+------------+
              |            |            |            |
   High       |            |    R7      |    R1      |
              |            |            |            |
P             +------------+------------+------------+
R             |            |   R4, R9   | R2, R3,    |
O  Medium     |            |            | R8, R10    |
B             |            |            |            |
A             +------------+------------+------------+
B             |            |            |            |
I  Low        |            |    R5      |    R6      |
L             |            |            |            |
I             +------------+------------+------------+
T
Y

Legend:
  High Probability + High Impact    = High Exposure    (R1)
  High Probability + Medium Impact  = Medium Exposure  (R7)
  Medium Probability + High Impact  = High Exposure    (R2, R3, R8, R10)
  Medium Probability + Medium Impact = Medium Exposure (R4, R9)
  Low Probability + High Impact     = Medium Exposure  (R6)
  Low Probability + Medium Impact   = Low Exposure     (R5)
```

---

## Review Cadence

| Review Point      | Frequency     | Participants                        |
|-------------------|---------------|-------------------------------------|
| Risk Review       | Bi-weekly     | PM, Architect, Client Platform Lead |
| Escalation Review | As needed     | PM, Executive Sponsor               |
| Phase Gate Review | End of phase  | Full project team + client leads    |

All risks are reviewed at each bi-weekly checkpoint. Risks with exposure level High are reported to the Executive Sponsor at every review. Treatment effectiveness is evaluated and adjusted at each phase gate.
