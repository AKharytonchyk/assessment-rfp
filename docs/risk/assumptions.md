# Assumptions Log

| Field            | Value                                  |
|------------------|----------------------------------------|
| **Unit**         | EDP-2026-01                               |
| **Project**      | Enterprise Data Platform               |
| **Assignee**     | Artsiom Kharytonchyk                   |
| **Last Updated** | 2026-04-15                             |

All assumptions listed below are conditions accepted as true for planning purposes. If any assumption is invalidated during delivery, the associated risks must be reassessed and the project plan adjusted accordingly.

---

## Client Environment

| ID    | Assumption | Validation Date | Associated Risk |
|-------|-----------|-----------------|-----------------|
| CE-01 | The client will provide a dedicated AWS account (or isolated OU) for the data platform with sufficient service quotas for Glue, Step Functions, Lambda, S3, Redshift Serverless, Lake Formation, and Bedrock. | End Wk 1 | R3 |
| CE-02 | SSO/federated access to the AWS account will be provisioned for all EPAM team members before the end of Wk 1, with IAM roles granting permissions necessary for infrastructure provisioning and data engineering work. | End Wk 1 | R1 |
| CE-03 | Network connectivity (VPN or Direct Connect) between the client's on-premises source systems and the AWS VPC will be established and functional before pipeline development begins. | End Wk 2 | R1 |
| CE-04 | Source systems (CRM, ERP, HRIS, and file-based sources) will be accessible via documented APIs, JDBC/ODBC connections, or file drops to S3, with credentials and access provided by end of Wk 2. | End Wk 2 | R1 |
| CE-05 | The client AWS account does not have SCPs that block the core services identified in the architecture (Glue, Step Functions, Lake Formation, Redshift Serverless, Lambda, Bedrock, CloudWatch, EventBridge, SNS, Secrets Manager). If restrictions exist, the client will work with EPAM to obtain exceptions within 5 business days of identification. | End Wk 1 | R3 |
| CE-06 | A non-production environment (dev/staging) will be available for the EPAM team to deploy and test infrastructure and pipelines without a formal change advisory board (CAB) process. Production deployments may require CAB approval. | End Wk 1 | -- |

---

## Scope

| ID    | Assumption | Validation Date | Associated Risk |
|-------|-----------|-----------------|-----------------|
| SC-01 | The engagement scope covers 10 data pipelines across 2 business domains, as defined during the discovery phase. Additional pipelines or domains constitute a scope change and require a formal change request. | End Wk 2 | R7 |
| SC-02 | Source data volumes for in-scope systems do not exceed 500 GB per source for initial full loads and 50 GB per day for incremental loads. Volumes beyond these thresholds require re-estimation of Glue job configurations and cost projections. | End Wk 2 | R4 |
| SC-03 | Pipeline complexity is classified as Low (direct extract and load), Medium (transformations, joins, deduplication), or High (multi-source merge, SCD Type 2, complex business rules). The 10 pipelines are assumed to be distributed as approximately 3 Low, 5 Medium, and 2 High complexity. | End Wk 2 | R7 |
| SC-04 | Data quality rules will be defined collaboratively with domain data owners during Phase 1 and Phase 2. The EPAM team will propose default rules based on profiling, but the client is responsible for validating business-specific thresholds. | End Wk 4 | R2 |
| SC-05 | The platform delivers a curated data layer (Silver/Gold) suitable for BI and analytics consumption. Building dashboards, reports, or ML models on top of the curated layer is out of scope unless explicitly added via change request. | End Wk 2 | R7 |
| SC-06 | The engagement delivers a documented migration plan for remaining domains and pipelines, but execution of that migration is a separate engagement. | End Wk 16 | R7 |

---

## Team & Resources

| ID    | Assumption | Validation Date | Associated Risk |
|-------|-----------|-----------------|-----------------|
| TR-01 | The EPAM delivery team will consist of Central European (CE) based resources operating in CET/CEST timezone with a minimum 4-hour daily overlap with the client's core business hours. | Pre-engagement | R8 |
| TR-02 | Team members will be available full-time (40 hrs/week) for the duration of the engagement, with no planned rotations or competing project assignments. | Pre-engagement | R6 |
| TR-03 | The engagement operates under a Time & Materials (T&M) contract model. EPAM will provide monthly timesheets and the client will be invoiced based on actual hours at the agreed rate card. | Pre-engagement | -- |
| TR-04 | EPAM will procure and manage Claude Code (Anthropic) licenses for the delivery team. License costs are included in the project budget and will not be billed separately to the client. | Pre-engagement | R9, R10 |
| TR-05 | The client will provide access to collaboration tools (Slack or Teams, Jira or equivalent, Confluence or equivalent) for the EPAM team within the first week. | End Wk 1 | R8 |
| TR-06 | EPAM bench resources with relevant AWS and data engineering skills are available for rapid onboarding (within 2 weeks) in the event of unplanned team member departure. | Ongoing | R6 |

---

## Technology

| ID    | Assumption | Validation Date | Associated Risk |
|-------|-----------|-----------------|-----------------|
| TC-01 | The solution architecture is AWS cloud-native. No on-premises infrastructure components will be deployed or maintained by the EPAM team. On-premises source systems are accessed remotely via secure connectivity. | Pre-engagement | R3 |
| TC-02 | AWS Glue (PySpark and Python Shell) and AWS Step Functions are approved and available for use as the primary ETL orchestration stack. | End Wk 1 | R3 |
| TC-03 | AWS Lake Formation is available and will be used as the data governance and access control layer for the data lake. | End Wk 1 | R3 |
| TC-04 | Amazon Bedrock with Claude model access is available in the client's AWS region. If not regionally available, a cross-region invocation or direct API fallback is acceptable. | End Wk 2 | R9 |
| TC-05 | Terraform (or OpenTofu) is the accepted Infrastructure-as-Code tool. The client does not mandate CloudFormation or CDK exclusively. | End Wk 1 | -- |
| TC-06 | The client permits the use of AI-assisted code generation tools (Claude Code) for pipeline development, subject to the quality controls defined in the risk register (R10). | Pre-engagement | R10 |
| TC-07 | Source system data is available in structured or semi-structured formats (relational tables, CSV, JSON, Parquet, XML). Unstructured data processing (PDFs, images, free-text) is out of scope. | End Wk 2 | SC-03 |

---

## Timeline

| ID    | Assumption | Validation Date | Associated Risk |
|-------|-----------|-----------------|-----------------|
| TL-01 | The total engagement duration is 16 weeks from kickoff to final deliverable handover, inclusive of knowledge transfer. | Pre-engagement | -- |
| TL-02 | Discovery and domain selection are complete by end of Wk 2. Any delays to discovery compress subsequent phases proportionally. | End Wk 2 | R2 |
| TL-03 | No client-imposed code freezes, change freezes, or infrastructure blackout windows occur during the 16-week engagement period. If a freeze is required, the timeline will be extended by the equivalent duration. | Pre-engagement | -- |
| TL-04 | No major public holidays (affecting either EPAM CE locations or the client) fall within the engagement period. If holidays are identified, they will be accounted for in sprint planning. | Pre-engagement | -- |
| TL-05 | UAT duration is 2 weeks (Wk 13-14). The client commits to providing dedicated UAT testers and completing test execution within this window. Delays to UAT sign-off delay final delivery. | End Wk 12 | R8 |
| TL-06 | Knowledge transfer and training sessions are scheduled in Wk 16. The client commits to making training attendees available for **three half-day sessions (~3.5h each)** per `delivery-approach.md` and `client-stakeholders.md`. | End Wk 14 | R8 |

---

## Commercial

| ID    | Assumption | Validation Date | Associated Risk |
|-------|-----------|-----------------|-----------------|
| CM-01 | The rate card provided in the proposal is valid for the full 16-week engagement duration and will not be renegotiated mid-engagement. | Pre-engagement | -- |
| CM-02 | Invoicing follows a monthly cycle with net-30 payment terms. Timesheets are submitted by the 5th business day of the following month. | Pre-engagement | -- |
| CM-03 | No penalty clauses, liquidated damages, or SLA-based financial penalties apply to this engagement. Delivery commitments are best-effort within the T&M model. | Pre-engagement | -- |
| CM-04 | Travel expenses, if required for on-site workshops or reviews, are billed at cost with prior client approval. The baseline plan assumes fully remote delivery. | Pre-engagement | -- |
| CM-05 | Third-party software licenses required for the platform (AWS service costs, monitoring tools) are borne by the client. EPAM is responsible only for tooling used by the delivery team (IDE licenses, Claude Code). | Pre-engagement | -- |

---

## Assumption Validation Tracker

| Phase       | Assumptions to Validate                          | Deadline  |
|-------------|--------------------------------------------------|-----------|
| Pre-engagement | TR-01, TR-02, TR-03, TC-01, TC-06, TL-01, TL-03, TL-04, CM-01 through CM-05 | Kickoff   |
| Wk 1        | CE-01, CE-02, CE-05, CE-06, TC-02, TC-03, TC-05, TR-05 | End Wk 1  |
| Wk 2        | CE-03, CE-04, SC-01, SC-02, SC-03, SC-05, TC-04, TC-07, TL-02 | End Wk 2  |
| Wk 4        | SC-04                                            | End Wk 4  |
| Wk 5        | R5-related GX compatibility (linked to TC-02)    | End Wk 5  |
| Wk 12       | TL-05                                            | End Wk 12 |
| Wk 14       | TL-06, SC-06                                     | End Wk 14 |

Any assumption that fails validation triggers a formal risk assessment update and, if necessary, a change request to adjust scope, timeline, or budget.
