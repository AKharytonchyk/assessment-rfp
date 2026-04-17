# Enterprise Data Platform (EDP) -- Work Breakdown Structure

## Summary

| # | Epic ID | Epic Name | Items | Total Effort (PD) |
|---|---------|-----------|------:|-------------------:|
| 1 | EDP-GOV | Data Architecture & Governance | 7 | 25 |
| 2 | EDP-INFRA | Platform Foundation & Infrastructure | 9 | 33 |
| 3 | EDP-CICD | CI/CD & Developer Experience | 11 | 36 |
| 4 | EDP-PIPELINES | Data Pipeline Development | 7 | 74 |
| 5 | EDP-DQ | Data Quality Framework | 6 | 18 |
| 6 | EDP-MON | Monitoring, Dashboards & Alerting | 7 | 37 |
| 7 | EDP-OBS | Observability & Metrics | 12 | 33 |
| 8 | EDP-DOCS | Documentation, Training & Handoff | 8 | 27 |
| 9 | EDP-SEC | Security, Compliance & Governance | 6 | 12 |
| | | **TOTALS** | **73** | **295** |

---

## Epic 1: EDP-GOV -- Data Architecture & Governance

Establishes the foundational data architecture standards, governance processes, and organizational structures required before platform build-out begins and sustained through steady-state operations.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| GOV-001 | Medallion Architecture Design & ADR | Define the Bronze / Silver / Gold medallion layer architecture. Produce an Architecture Decision Record (ADR) covering layer boundaries, naming, and promotion criteria. | Architect | Phase 0 | 3 |
| GOV-002 | Naming Convention Standard | Author and publish a naming convention standard covering S3 prefixes, Glue databases/tables, Redshift schemas, IAM roles, Step Functions, and CloudFormation stacks. | Architect | Phase 0 | 2 |
| GOV-003 | Data Contract Framework | Design the data contract framework including JSON Schema definitions, semantic versioning policy, and a breaking-change process with consumer notification workflow. | Architect + Data Eng | Phase 2 | 5 |
| GOV-004 | Data Catalog Population | Populate the AWS Glue Data Catalog with table/column descriptions, business-domain tags, PII classification flags, and data-owner metadata for all onboarded datasets. | Data Eng | Phase 2-3 | 8 |
| GOV-005 | Data Ownership Matrix & Governance RACI | Create a cross-functional data ownership matrix mapping each dataset to a business owner, technical steward, and support contact. Define a RACI for governance decisions. | DM + Architect | Phase 0 | 2 |
| GOV-006 | Operating Model Guidance | Document the target-state operating model including recommended org structure, role definitions, escalation paths, and meeting cadence for steady-state platform operations. | DM + Architect | Phase 4 | 3 |
| GOV-007 | Data Retention & Archival Policies | Define retention periods per data classification tier, implement S3 lifecycle rules for archival to Glacier/Deep Archive, and document the purge-request process. | Architect + Platform Eng | Phase 4 | 2 |

**Epic Total: 25 PD**

---

## Epic 2: EDP-INFRA -- Platform Foundation & Infrastructure

Provisions the core AWS infrastructure, reusable IaC domain templates, security guardrails, and shared monitoring services that all downstream workloads depend on.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| INFRA-001 | AWS Account & Organization Structure | Set up AWS Organizations with OUs for Dev, Staging, and Prod. Configure AWS SSO with identity provider integration and baseline SCPs. | Platform Eng | Phase 0 | 3 |
| INFRA-002 | Networking Foundation | Provision VPCs, public/private subnets across AZs, NAT gateways, and VPC endpoints for S3, Glue, Secrets Manager, and CloudWatch to keep traffic off the public internet. | Platform Eng | Phase 1 | 5 |
| INFRA-003 | Reusable Domain Template -- S3 Data Lake | Build a Terraform module for domain-scoped S3 buckets (raw/curated/published layers) with KMS encryption, versioning, access logging, and lifecycle policies. | Platform Eng | Phase 1 | 5 |
| INFRA-004 | Reusable Domain Template -- Glue Catalog & Databases | Build a Terraform module that provisions Glue Catalog databases, crawlers, and connection objects per data domain, integrated with Lake Formation permissions. | Platform Eng | Phase 1 | 3 |
| INFRA-005 | Reusable Domain Template -- Redshift Serverless / Athena Workgroup | Build a Terraform module for Redshift Serverless namespace/workgroup or Athena workgroup per domain, with cost controls and query result encryption. | Platform Eng | Phase 1 | 3 |
| INFRA-006 | Reusable Domain Template -- Step Functions Skeleton | Build a Terraform module for a parameterized Step Functions state machine skeleton with error handling, retry policies, and CloudWatch logging. | Platform Eng + Architect | Phase 1 | 3 |
| INFRA-007 | KMS Key Strategy & Lake Formation Setup | Design the KMS key hierarchy (per-domain vs. shared keys), configure Lake Formation data-lake admin, register S3 locations, and set default permission models. | Architect + Platform Eng | Phase 1 | 3 |
| INFRA-008 | RBAC & Access Strategy | Define and implement five standard IAM roles (Admin, DataEngineer, Analyst, ServiceExecution, ReadOnly) with least-privilege policies, permission boundaries, and Lake Formation grants. | Architect | Phase 1 | 5 |
| INFRA-009 | Shared Monitoring Infrastructure | Deploy shared CloudWatch dashboards, SNS topics for alerting, EventBridge rules for cross-service events, and a Grafana workspace with data-source configuration. | Platform Eng | Phase 1 | 3 |

**Epic Total: 33 PD**

---

## Epic 3: EDP-CICD -- CI/CD & Developer Experience

Establishes the CI/CD pipelines, repository structure, AI-assisted development tooling, and developer workflows that accelerate delivery and enforce quality gates.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| CICD-001 | GitHub Repo Structure & Branching Strategy | Define the mono-repo vs. multi-repo layout, establish the branching model (trunk-based with short-lived feature branches), and configure branch protection rules. | Platform Eng | Phase 0 | 2 |
| CICD-002 | Terraform CI/CD Workflow | Build a GitHub Actions workflow for Terraform that runs fmt, validate, plan on PR, and apply on merge to main. Include drift detection and cost estimation steps. | Platform Eng | Phase 1 | 5 |
| CICD-003 | Python ETL CI/CD Workflow | Build a GitHub Actions workflow for the Python ETL codebase with linting (ruff), unit tests (pytest), packaging, and deployment to the target Glue/Lambda runtime. | Platform Eng | Phase 1 | 3 |
| CICD-004 | React Monitoring App CI/CD | Build a GitHub Actions workflow for the React monitoring application covering lint, test, build, and deploy to S3 + CloudFront with cache invalidation. | Platform Eng + Full-Stack | Phase 1 | 3 |
| CICD-005 | Secrets Management | Configure GitHub OIDC federation with AWS, set up Secrets Manager for application secrets, and establish a secrets rotation policy. | Platform Eng | Phase 1 | 2 |
| CICD-006 | Environment Promotion Strategy | Define the promotion path from Dev to Staging to Prod, gate criteria (test pass rate, approval), and rollback procedures for each artifact type. | Platform Eng + DM | Phase 1 | 2 |
| CICD-007 | AI Agent Foundation Stack (CDK) | Build a CDK construct library that provisions the shared infrastructure for AI agents: Lambda functions, API Gateway, DynamoDB tables, and IAM roles. | Platform Eng | Phase 1 | 5 |
| CICD-008 | Agent Registry & Prompts (7 agents) | Design and implement a registry of seven AI agents (code review, test generation, documentation, schema validation, cost estimation, security scan, data profiling) with versioned prompt templates stored in S3. | Architect + Platform Eng | Phase 2 | 5 |
| CICD-009 | PR Reviewer Agent Integration | Integrate the AI PR reviewer agent into the GitHub Actions workflow so that every pull request receives automated code-review comments before human review. | Platform Eng | Phase 2 | 3 |
| CICD-010 | Agent Orchestrator (DynamoDB saga) | Build an agent orchestration layer using DynamoDB for saga state management, enabling multi-agent workflows with compensation logic on failure. | Platform Eng | Phase 2 | 5 |
| CICD-011 | Claude Code Onboarding | Prepare Claude Code configuration, workspace settings, and a quickstart guide so all team members can use AI-assisted coding from day one. | DM + Platform Eng | Phase 1 | 1 |

**Epic Total: 36 PD**

---

## Epic 4: EDP-PIPELINES -- Data Pipeline Development

Delivers the reusable ingestion framework and all data pipelines across two domains, moving data from source systems through Bronze, Silver, and Gold layers.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| PIPE-001 | Source System Inventory & Mapping | Catalog all source systems, document connection methods (API, JDBC, file drop), map source fields to target schema, and identify data volumes and refresh frequencies. | Data Eng + Architect | Phase 0 | 5 |
| PIPE-002 | Reusable Ingestion Framework | Develop the `edp_common` Python library providing standardized connectors, schema validation, error handling, logging, and metrics emission for all pipelines. | Data Eng | Phase 1 | 8 |
| PIPE-003 | Domain 1, Pipeline 1 -- Reference Implementation (E2E) | Build the first end-to-end pipeline as the reference implementation: ingestion, Bronze landing, Silver cleansing/dedup, Gold aggregation, with full DQ and monitoring integration. | Data Eng | Phase 2 | 8 |
| PIPE-004 to PIPE-008 | Domain 1, Pipelines 2-5 | Develop four additional pipelines for Domain 1, following the patterns established in the reference implementation. Each pipeline: 5 PD. | Data Eng x2 | Phase 2 | 20 |
| PIPE-009 to PIPE-013 | Domain 2, Pipelines 6-10 | Develop five pipelines for Domain 2, adapting the ingestion framework to Domain 2 source systems and business rules. Each pipeline: 5 PD. | Data Eng x2 | Phase 3 | 25 |
| PIPE-014 | Cross-Domain Data Linkages | Implement cross-domain joins and linkage logic in the Gold layer, enabling analytics that span Domain 1 and Domain 2 datasets. | Data Eng + Architect | Phase 3 | 5 |
| PIPE-015 | Pipeline Parameterization | Externalize pipeline configuration to SSM Parameter Store and DynamoDB so that source paths, schedules, thresholds, and feature flags can be changed without redeployment. | Data Eng | Phase 2 | 3 |

**Epic Total: 74 PD**

---

## Epic 5: EDP-DQ -- Data Quality Framework

Implements a comprehensive data quality framework using Great Expectations, integrated into every pipeline, with historical tracking and dashboard visibility.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| DQ-001 | DQ Framework Setup (Great Expectations) | Install and configure Great Expectations, create the DataContext, configure S3 stores for expectations, validations, and data docs, and integrate with the `edp_common` library. | Data Eng + Architect | Phase 2 | 3 |
| DQ-002 | Completeness Checks | Author expectation suites for completeness: not-null checks on required columns, row-count thresholds vs. source, and referential integrity validations. | Data Eng | Phase 2 | 3 |
| DQ-003 | Accuracy Checks | Author expectation suites for accuracy: regex pattern matching, value-range validations, cross-field consistency rules, and lookup-table validation against reference data. | Data Eng | Phase 2 | 3 |
| DQ-004 | Timeliness Checks | Author expectation suites for timeliness: freshness checks comparing max event timestamps to wall-clock time, SLA window validations, and late-arriving data detection. | Data Eng | Phase 2 | 3 |
| DQ-005 | DQ Results Store & Historical Tracking | Persist DQ validation results to a dedicated S3 location and DynamoDB table, enabling trend analysis, regression detection, and historical reporting. | Data Eng | Phase 2 | 3 |
| DQ-006 | DQ Pipeline Integration (Step Functions DQ step) | Add a dedicated DQ validation step to the Step Functions state machine template. On failure, route to a quarantine path and emit an SNS alert; on success, proceed to the next layer. | Data Eng | Phase 2 | 3 |

**Epic Total: 18 PD**

---

## Epic 6: EDP-MON -- Monitoring, Dashboards & Alerting

Builds the monitoring REST API, React-based dashboards, and alerting rules that give operators and stakeholders real-time visibility into pipeline health and data quality.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| MON-001 | Pipeline Execution Monitoring Backend | Instrument pipelines to write execution metadata (start, end, status, record counts, errors) to DynamoDB and emit CloudWatch custom metrics. | Data Eng | Phase 2 | 3 |
| MON-002 | Monitoring REST API (FastAPI) | Develop a FastAPI service exposing endpoints for pipeline runs, DQ results, and system health. Deploy on Lambda behind API Gateway with Cognito auth. | Full-Stack | Phase 2 | 5 |
| MON-003 | React Dashboard -- Pipeline Execution View | Build the React dashboard page showing pipeline run history, status indicators, duration trends, and drill-down to individual step execution details. | Full-Stack | Phase 2 | 8 |
| MON-004 | React Dashboard -- Data Quality View | Build the React dashboard page displaying DQ scores by dataset, failed expectations, trend charts, and links to Great Expectations data docs. | Full-Stack | Phase 3 | 5 |
| MON-005 | React Dashboard -- Cross-Domain Hub | Build the React dashboard page providing a unified cross-domain view with data lineage visualization, domain health scores, and inter-domain dependency mapping. | Full-Stack | Phase 3 | 8 |
| MON-006 | Alerting Rules & Notifications | Configure CloudWatch alarms and EventBridge rules for pipeline failures, DQ threshold breaches, and infrastructure anomalies. Route alerts to SNS topics (email, Slack, PagerDuty). | Platform Eng | Phase 3 | 3 |
| MON-007 | Operational Dashboards (Grafana) | Build Grafana dashboards for infrastructure metrics: Lambda concurrency, Glue job DPU usage, Redshift query performance, S3 storage growth, and cost trends. | Platform Eng | Phase 3 | 5 |

**Epic Total: 37 PD**

---

## Epic 7: EDP-OBS -- Observability & Metrics

Implements structured logging, distributed tracing, SLO/SLA frameworks, cost observability, and incident management to ensure the platform is operable at scale.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| OBS-001 | Structured Logging Standard | Define and implement a JSON structured logging standard with correlation IDs, log levels, and contextual fields. Integrate into the `edp_common` library. | Architect + Data Eng | Phase 1 | 3 |
| OBS-002 | AWS X-Ray Tracing | Enable X-Ray tracing on Lambda functions, Step Functions, and API Gateway. Configure sampling rules and service maps for end-to-end pipeline visibility. | Platform Eng | Phase 1 | 2 |
| OBS-003 | CloudWatch Log Insights Queries | Author and save a library of CloudWatch Log Insights queries for common troubleshooting scenarios: error aggregation, latency percentiles, and cross-service correlation. | Platform Eng | Phase 3 | 2 |
| OBS-004 | Custom CloudWatch Metrics (Business KPIs) | Emit custom CloudWatch metrics for business-level KPIs: records processed per domain, data freshness per dataset, and pipeline throughput rates. | Data Eng | Phase 2 | 3 |
| OBS-005 | SLO/SLA Framework | Define service-level objectives (freshness, completeness, availability) per dataset and pipeline. Implement error-budget tracking and SLA breach alerting. | Architect + DM | Phase 2 | 3 |
| OBS-006 | Cost Observability | Implement cost allocation tags, AWS Cost Explorer saved reports, and CloudWatch anomaly detection on daily spend per service and per domain. | Platform Eng | Phase 1 | 2 |
| OBS-007 | AI Agent Observability | Add observability to AI agent invocations: log prompt/completion token counts, latency, error rates, and cost per invocation. Expose metrics in Grafana. | Platform Eng | Phase 3 | 2 |
| OBS-008 | Health Check Endpoints | Implement /health and /ready endpoints on all deployed services, returning dependency status, version info, and uptime. Integrate with Route 53 health checks. | Full-Stack + Platform Eng | Phase 2 | 2 |
| OBS-009 | Centralized Log Aggregation | Configure CloudWatch cross-account log aggregation, set up subscription filters to stream logs to a central S3 bucket, and establish log retention policies. | Platform Eng | Phase 3 | 3 |
| OBS-010 | Runbook Automation | Develop automated runbook actions using Systems Manager for common operational tasks: restart stuck pipelines, clear DLQs, and rotate credentials. | Platform Eng + Data Eng | Phase 3 | 3 |
| OBS-011 | OpenLineage + Marquez Deployment (column-level lineage) | Deploy Marquez (ECS Fargate + RDS Postgres) as the OpenLineage backend per ADR-008. Attach OpenLineage-Spark agent to Glue PySpark jobs for automatic table + column-level lineage. Instrument Lambda/Step Functions via `edp_common.lineage`. Wire Marquez API into monitoring dashboard lineage DAG. | Architect + Data Eng | Phase 3 | 5 |
| OBS-012 | Incident Management Integration | Integrate alerting with the incident management platform (PagerDuty/ServiceNow). Define severity levels, escalation policies, and post-incident review templates. | DM + Platform Eng | Phase 3 | 3 |

**Epic Total: 33 PD**

---

## Epic 8: EDP-DOCS -- Documentation, Training & Handoff

Produces all documentation artifacts, delivers hands-on training sessions, and creates a migration plan to ensure the client team can independently operate and extend the platform.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| DOC-001 | Architecture Decision Records | Maintain a living set of ADRs covering all significant architectural decisions made during the engagement (architecture, technology choices, trade-offs). | Architect | Phase 0-1 | 5 |
| DOC-002 | Platform Operations Runbook | Author a comprehensive operations runbook covering deployment procedures, monitoring checks, incident response, scaling guidance, and disaster recovery steps. | Tech Writer + Platform Eng | Phase 4 | 5 |
| DOC-003 | Data Pipeline Developer Guide | Author a developer guide for building new pipelines: project setup, `edp_common` library usage, testing strategy, DQ integration, and deployment workflow. | Tech Writer + Data Eng | Phase 4 | 5 |
| DOC-004 | Monitoring Dashboard User Guide | Author a user guide for the React monitoring dashboard and Grafana dashboards: navigation, interpreting metrics, configuring alerts, and common troubleshooting. | Tech Writer + Full-Stack | Phase 4 | 3 |
| DOC-005 | Training Session 1 -- Platform & IaC (half-day ~3.5h) | Prepare and deliver a half-day hands-on training session covering AWS infrastructure, Terraform modules, CI/CD workflows, and environment promotion. | Tech Writer + Platform Eng | Phase 4 | 2 |
| DOC-006 | Training Session 2 -- Pipeline Development (half-day ~3.5h) | Prepare and deliver a half-day hands-on training session covering pipeline development with `edp_common`, data quality integration, and debugging techniques. | Tech Writer + Data Eng | Phase 4 | 2 |
| DOC-007 | Training Session 3 -- Monitoring & Ops (half-day ~3.5h) | Prepare and deliver a half-day hands-on training session covering monitoring dashboards, alerting configuration, incident response, and day-2 operations. | Tech Writer + Full-Stack | Phase 4 | 2 |
| DOC-008 | Migration Plan for Remaining Pipelines | Produce a detailed migration plan for pipelines beyond the initial 10, including effort estimates, prioritization framework, and a recommended sequencing roadmap. | Architect + DM | Phase 4 | 3 |

**Epic Total: 27 PD**

---

## Epic 9: EDP-SEC -- Security, Compliance & Governance

Hardens the platform with encryption, audit logging, network controls, vulnerability scanning, and data classification to meet enterprise security and compliance requirements.

| ID | Title | Description | Owner | Phase | Effort (PD) |
|----|-------|-------------|-------|-------|------------:|
| SEC-001 | Encryption at Rest & In Transit | Validate and enforce encryption at rest (KMS/SSE-S3) on all S3 buckets, Redshift, DynamoDB, and RDS. Enforce TLS 1.2+ on all endpoints and inter-service communication. | Platform Eng | Phase 4 | 2 |
| SEC-002 | CloudTrail & Audit Logging | Enable CloudTrail in all accounts with log file validation, configure S3 delivery with immutable storage, and set up CloudWatch alerts for sensitive API calls. | Platform Eng | Phase 4 | 2 |
| SEC-003 | Network Security | Review and harden security groups, NACLs, and VPC endpoint policies. Validate that no data-plane traffic traverses the public internet. Document the network security posture. | Platform Eng | Phase 4 | 2 |
| SEC-004 | Vulnerability Scanning | Integrate automated vulnerability scanning into CI/CD (Dependabot, Snyk, or Trivy for containers). Establish a remediation SLA per severity level and track findings in a central dashboard. | QA + Platform Eng | Phase 4 | 2 |
| SEC-005a | Data Classification Taxonomy + Macie Scan (Phase 1) | Define the 4-tier classification taxonomy (Public / Internal / Confidential / Restricted). Deploy Macie on Bronze buckets with custom classifiers for [Firm]-specific PII (e.g., well IDs, survey coordinates where PII). Apply classification tags at Bronze arrival. Block Silver promotion of unclassified records. | Architect + Platform Eng | Phase 1 | 3 |
| SEC-005b | Classification Validation & Attestation (Phase 4) | Audit applied classifications across all onboarded datasets; validate access controls, encryption, and retention policies align with each tier (per ADR-014). Exec Sponsor attestation record. | Architect | Phase 4 | 1 |

**Epic Total: 12 PD** *(was 10 PD — SEC-005 (2 PD) split into SEC-005a (3 PD, Phase 1) + SEC-005b (1 PD, Phase 4); net +2 PD for Phase 1 Macie deployment)*

---

## Total Effort Summary

| Phase | Description | Items | Total Effort (PD) |
|-------|-------------|------:|-------------------:|
| Phase 0 | Discovery, Architecture & Planning | 6 | 17 |
| Phase 0-1 | Cross-phase (DOC-001) | 1 | 5 |
| Phase 1 | Platform Foundation & Developer Experience | 19 | 66 |
| Phase 2 | Domain 1 Pipelines, DQ, Monitoring & Observability | 19 | 91 |
| Phase 2-3 | Cross-phase (GOV-004) | 1 | 8 |
| Phase 3 | Domain 2 Pipelines, Advanced Monitoring & Observability | 12 | 69 |
| Phase 4 | Hardening, Documentation, Training & Handoff | 14 | 37 |
| | **Grand Total** | **72** | **293** |

### Effort by Role

| Role | Estimated Effort (PD) |
|------|-----------------------:|
| Architect | ~48 |
| Platform Eng | ~95 |
| Data Eng | ~100 |
| Full-Stack | ~36 |
| DM (Delivery Manager) | ~10 |
| Tech Writer | ~14 |
| QA | ~2 |

> **Note:** Role effort figures are approximate and account for shared ownership. Items with multiple owners have effort split across roles. Totals may not sum precisely due to rounding on shared items.

---

## WBS Estimable PD vs. Priced PD — Reconciliation

The **~295 PD** above is the bottom-up, directly estimable work captured in the backlog (was 293 pre-adjustment; +2 PD for Phase-1 classification uplift per ADR-014 and SEC-005a). The ROM and Resource Plan price **500 PD** of team capacity because a T&M engagement pays for delivered *calendar days on project*, which includes non-backlog-but-mandatory activities. Uplift math (computed on the rounded 293 baseline — rounding absorbed in the reserve bucket):

| Overhead bucket | Rationale | Uplift |
|---|---|---:|
| Agile ceremonies (sprint planning, review, retro, refinement) | ~3.5 hours every 2 weeks per team member | **~8%** |
| Daily standup + async status | 15 min/day × 16 weeks | **~3%** |
| Governance (SteerCo prep, weekly report, phase gates) | DM + Architect facilitation | **~4%** |
| Context switching, ramp-up, onboarding | Especially for DE-2, FS, QA, TW joining mid-flight | **~10%** |
| PTO + public holiday buffer | Standard CE calendar assumption | **~6%** |
| Unplanned support, rework, reserve for discovery items | Covers R1/R2/R8 operational drag | **~15%** |
| Context-scoped reserve (e.g., triage, interviews, ad-hoc) | Shared across team | **~4%** |
| **Total uplift** | | **~50%** (293 × 1.71 ≈ 500) |

This reserve is **already baked into the fully-loaded T&M daily rate** — it is **not** invoiced as a separate line item. Client EVM may compute CPI/SPI against either baseline:

- **Scope baseline (WBS):** 295 PD of estimable work (293 + 2 for Phase-1 classification uplift), used for earned-value vs. WBS.
- **Cost baseline (priced PD):** 500 PD of billable capacity, used for burn-rate vs. forecast.

See `rom.md` §3 (phase cost table) for the parallel "Estimable PD / Priced PD" columns.
