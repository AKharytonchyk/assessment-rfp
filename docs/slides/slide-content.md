# EDP RFP Response — Slide Deck Content

## Slide 1: Title

**Enterprise Data Platform (EDP)**
Request for Proposal Response

Prepared for: [Firm]
Prepared by: [Vendor Name] | EPAM Systems
Date: [Month Year]

> Speaker Notes: Welcome, thank everyone for the opportunity. Brief intro of who's in the room. This presentation covers our proposed solution, delivery approach, team, timeline, and commercial terms.

---

## Slide 2: Agenda

1. About Us & Relevant Experience
2. Understanding of Requirements
3. Solution Architecture
4. Data Architecture & Governance
5. Data Quality Framework
6. Monitoring & Observability
7. AI Acceleration Strategy
8. CI/CD & DevOps
9. Security & Access Control
10. Delivery Approach & Roadmap
11. Team Structure & Resource Plan
12. Risk Management
13. ROM Financial Proposal
14. Migration Strategy
15. Q&A

> Speaker Notes: Walk through the agenda. Note that we'll cover both the technical solution and the commercial proposal. Happy to take questions at the end or throughout.

---

## Slide 3: About Us

**[Vendor Name] / EPAM Systems**

- Global technology services company with 50,000+ engineers
- Deep AWS partnership: AWS Premier Consulting Partner
- Data & Analytics practice: 200+ data platform implementations
- Central Europe delivery: Poland, Hungary, Czech Republic, Romania, Bulgaria
- Key differentiators:
  - Domain-centric data platform expertise
  - AI-augmented delivery (Claude Code + automated agents)
  - Proven Medallion Architecture implementations on AWS
  - EPAM's engineering culture: quality-first, IaC-driven

**Relevant Experience:**
- [Reference Project 1]: Enterprise data lake for [Industry] — AWS Glue, Step Functions, 50+ pipelines, 6 domains
- [Reference Project 2]: Data platform migration for [Industry] — on-prem to AWS, Medallion architecture, 100+ sources
- [Reference Project 3]: Real-time data platform for [Industry] — EventBridge, Kinesis, Lambda, sub-second latency

> Speaker Notes: Highlight our AWS expertise and data platform track record. Mention that we bring a ready-made AI agent platform that accelerates delivery by 30-50%. Reference projects can be discussed in more detail if needed.

---

## Slide 3b: Cloud Stack Alignment — AWS vs. RFP §10.3a

**RFP §4** ("Technology Stack") is explicitly cloud-agnostic: AWS, Azure, or GCP, cloud-native where possible.

**RFP §10.3a** asks for reference projects on "Microsoft data technologies." We want to address this directly:

1. **Our proposal is AWS-native** — chosen in ADR-001 based on:
   - Breadth of data services (Glue, Lake Formation, Athena, Redshift Serverless, DataZone, Bedrock, Macie)
   - Native AI acceleration via Amazon Bedrock (Claude in-region)
   - EPAM CE delivery bench's depth on the AWS data-platform stack
   - To be confirmed in Phase 0 against [Firm]'s existing cloud footprint

2. **Microsoft Fabric / Azure Synapse variant** of this proposal is available on request. Architecture translates cleanly:
   - Medallion model unchanged (Bronze/Silver/Gold on ADLS Gen2)
   - Table format: Apache Iceberg (Fabric) or Delta Lake (Synapse/Databricks) — ADR-002 amendable
   - DataZone replaced by Microsoft Purview / Unity Catalog
   - Delta ROM provided within 1 week of the Azure variant request

3. **EPAM reference projects on Microsoft technologies** are attached in **Appendix B**:
   - Project A: Data platform migration on Microsoft Fabric
   - Project B: Synapse + Databricks lakehouse for [industry]
   - Project C: Purview governance + Power BI adoption

> Speaker Notes: The RFP has a minor inconsistency — §4 is cloud-agnostic but §10.3a asks for Microsoft references. We read §4 as governing. If the committee reveals a strong Microsoft preference post-defense, the Azure variant is a 1-week delta. The three Azure reference projects in Appendix B demonstrate EPAM's Microsoft-stack delivery capability regardless.

---

## Slide 4: Understanding of Requirements (1/2)

**[Firm]'s Challenge:**
- Disparate data landscape: CRM, ERPs, HRIS, CSV, Excel across the business
- No unified platform for analytics and insights
- Business leaders lack data-driven decisioning capability

**[Firm]'s Goal:**
- Consolidate all data sources into one **domain-centric Enterprise Data Platform**
- Transform, normalize, and validate data for analytics consumption
- Enable **insights-driven decisioning** for business leaders

**What We Heard:**
- Platform must be **reusable, flexible, scalable, standardized, compliant**
- Enable **accelerated development** for future domains and pipelines
- Cloud-native on a major provider (we propose **AWS**)
- 10 pipelines across 2 domains as initial scope
- Full handoff with documentation and training

> Speaker Notes: Restate the client's objectives to show we understand the problem. Emphasize "domain-centric" and "accelerated development" — these map directly to our Data Mesh approach and AI acceleration.

---

## Slide 4b: Business Outcomes & Success KPIs

**What does success look like for [Firm] — not for the project, but for the business?**

These targets are **illustrative** — calibrated with real baselines during Phase 0 discovery and signed off in the Project Charter.

| Outcome | Baseline (today) | Target (90 days post-handoff) | How measured |
|---|---|---|---|
| **Time-to-insight** for an ad-hoc analytics question | 2 weeks (extract, clean, check, present) | **1 day** (analyst queries Gold directly) | Analyst self-report + query logs |
| **Reporting cycle** (recurring exec report) | Monthly, hand-assembled | **Weekly, automated** | Report generation time |
| **Decisions backed by governed data** (exec surveys) | X% today (baseline TBD) | **Y% target** (commit during Phase 0) | Quarterly survey |
| **New domain onboarding time** | Quarters (from-scratch infra) | **< 1 hour** (Terraform apply) | Clocked during Phase 3 validation |
| **Post-handoff pipeline velocity** (client team, 2 engineers) | 1-2 pipelines per 2-week sprint (without platform) | **5 pipelines per 2-week sprint** (with templates + AI agents) | Sprint delivery |
| **Data incidents caught before production** | Low (tribal catch) | **≥ 95%** (DQ + anomaly detection) | DQ suite + CW Anomaly |

**North Star:** [Firm]'s business leaders make more decisions, faster, backed by data they trust.

**Tracking:** `docs/governance/benefits-realization-plan.md` assigns owners, cadence, and review points for each KPI.

> Speaker Notes: This is the slide where we stop selling AWS services and start selling outcomes. Every target ties to a benefits-realization owner and a measurement date. For the Product persona on the panel — this is your slide. For the Sponsor — this is what their board asks for.

---

## Slide 4c: Pipeline Prioritization — Portfolio, Not Just a Count

**10 pipelines is not a number — it's a portfolio. Here's how we pick them.**

**Scoring model** (applied in Phase 0, Wk 1–2):

| Criterion | Weight |
|---|:--:|
| Business value (exec relevance, client-facing product dependence) | **40%** |
| Data readiness (source accessible, schema stable, volumes known) | **20%** |
| Complexity — inverse (simpler wins) | **20%** |
| Stakeholder alignment (named owner, signed off) | **20%** |

**Complexity distribution** (per SC-03): ~3 Low (3 PD ea), ~5 Medium (5 PD ea), ~2 High (8 PD ea).

**Workshop protocol:**
1. Client Data Platform Lead compiles 15–20 candidates.
2. Joint scoring workshop (EPAM + client) — structured, time-boxed to 5 business days.
3. Top-10 by composite score with 5-per-domain constraint.
4. Executive Sponsor signs the binding list.
5. Unselected candidates → migration plan backlog (DOC-008).

**Full worksheet:** `docs/delivery/pipeline-prioritization.md`

> Speaker Notes: This is how we turn the RFP's "10 pipelines across 2 domains" from a scope line into a value portfolio. The scoring model is transparent, defensible, and reusable for the remaining backlog. This is also what the Product persona wants to see — value-first selection, not "easy pipelines first."

---

## Slide 5: Understanding of Requirements (2/2)

**Scope Confirmation:**

| Area | Our Understanding |
|------|-------------------|
| Infrastructure | Reusable domain templates (IaC), 3 environments, cross-domain linkages |
| CI/CD | Automated deployment DEV → TST → PRD with security gates |
| Data Quality | Completeness, accuracy, timeliness metrics + alerts |
| Monitoring | Centralized hub across all domains and environments |
| Deliverables | 10 pipelines, templates, docs, training, migration plan |
| Timeline | ~16 weeks (proposed) |

**Additional Requirements from Vendor:**
- AWS account access with Glue, Step Functions, Lake Formation, Redshift Serverless enabled
- Source system credentials and connectivity by end of Week 1
- Named client stakeholders with defined time commitment
- Bedrock model access for AI-augmented delivery

> Speaker Notes: Walk through our scope understanding. Call out the additional requirements — these are things we need from [Firm] to start. The source system access is the #1 risk.

---

## Slide 5b: Architecture Decisions at a Glance

**14 Architecture Decision Records (MADR format) — `docs/architecture/adr/`**

| # | Decision | Core choice |
|---|----------|-------------|
| 001 | Cloud provider | **AWS** (Azure/Fabric variant on request) |
| 002 | Open table format | **Apache Iceberg** on S3 for Silver/Gold |
| 003 | CDC pattern | **DMS** for RDBMS, **S3 events** for files, **Kinesis** for streaming (future) |
| 004 | Schema registry + contracts | **JSON Schema in Git** + Glue Catalog + **CI-enforced SemVer** |
| 005 | DR strategy | Multi-AZ + **CRR to secondary region**; RPO 1h / RTO 4h for Gold |
| 006 | DQ engine | **Great Expectations** primary, Glue DQ fallback |
| 007 | Orchestration | **AWS Step Functions** (Standard workflows) |
| 008 | Lineage | **OpenLineage + Marquez** + Spark agent for column-level |
| 009 | Data catalog / marketplace | **AWS DataZone** (with DataHub as future alternative) |
| 010 | Geospatial | **GeoParquet + H3** + spatial entity resolution |
| 011 | Access control boundary | **Lake Formation** authoritative for data; IAM for services; LF deny wins |
| 012 | MDM / entity resolution | **AWS Entity Resolution + Zingg**; shared Gold dimensions |
| 013 | Data observability | **CloudWatch Anomaly Detection + Soda Core**; commercial deferred |
| 014 | Retention by classification | Public 30d · Internal 1y · Confidential 3y · Restricted 7y + legal hold |

**All ADRs are linked from `docs/architecture/adr/README.md` and are reviewed at phase gates.**

> Speaker Notes: This is our answer to "why did you pick X?" If the panel asks about any architectural choice, there's an ADR with Context / Decision / Alternatives / Consequences. Point to the README index. Iceberg (ADR-002) and GeoParquet (ADR-010) are the two that most matter for this audience. ADR-001 explicitly addresses the AWS-vs-Microsoft question from RFP §10.3a.

---

## Slide 6: Solution Architecture — C4 Context

**[Insert C4 Context Diagram: c4-context.mmd]**

**Key Points:**
- EDP sits at the center, connecting 4 source system types to analytics consumers
- Source systems feed data via API, JDBC, and file-based connectors
- Gold-tier data is consumed by BI tools, ML workloads, and custom dashboards
- Alerts flow to Slack/email for operational awareness
- Four user personas: Business Leader, Data Analyst, Data Engineer, Platform Admin

> Speaker Notes: This is the 30,000-foot view. The EDP is the hub. Sources on the left, consumers on the right. Every data journey goes through the same platform with consistent quality and governance.

---

## Slide 7: Solution Architecture — C4 Container (AWS)

**[Insert C4 Container Diagram: c4-container.mmd]**

**AWS Service Map:**

| Layer | Services |
|-------|----------|
| Ingestion | AWS Glue (PySpark/Python), Lambda, Step Functions |
| Storage | S3 (Bronze/Silver/Gold), Glue Data Catalog |
| Query | Athena (serverless), Redshift Serverless |
| Quality | Great Expectations on Glue/Lambda |
| Monitoring | React Dashboard, API Gateway + Lambda, CloudWatch, X-Ray, Grafana |
| Security | Lake Formation, IAM, KMS, CloudTrail, VPC |
| CI/CD | GitHub Actions, CodeBuild (AI Agents), Bedrock |

> Speaker Notes: Walk through each layer. Highlight that everything is serverless or managed — no EC2 instances to maintain. The monitoring dashboard is a custom React app that gives [Firm] full visibility.

---

## Slide 8: Domain Template Architecture

**[Insert Domain Template Diagram: domain-template.mmd]**

**One Terraform Module → One Complete Domain:**

Running `terraform apply -var domain_name=sales -var environment=dev` provisions:
- 3 S3 buckets (raw/curated/published) with KMS encryption
- 3 Glue Catalog databases + crawler
- Athena workgroup or Redshift Serverless namespace
- Step Functions pipeline skeleton
- 5 IAM roles (Admin, Engineer, Analyst, Pipeline, Monitoring)
- Lake Formation permissions
- CloudWatch namespace + SNS alert topic

**Why This Matters:**
- New domains onboard in **< 1 hour** (not weeks)
- Consistent naming, security, and monitoring from Day 1
- Self-serve for [Firm]'s teams after handoff

> Speaker Notes: This is the key to "accelerated development." The template is the product. Show that adding a 3rd, 4th, 5th domain is trivial after we build the template.

---

## Slide 9: Data Architecture — Medallion Tiers

**[Insert Data Flow Diagram: data-flow-medallion.mmd]**

| Tier | Purpose | Format | DQ Gate | Access |
|------|---------|--------|---------|--------|
| **Bronze (Raw)** | Faithful source copy, immutable | Source-native (JSON, CSV, Parquet) | Schema check only | Data Engineers |
| **Silver (Curated)** | Cleansed, typed, deduplicated, normalized | Parquet (columnar) | Completeness ≥ 95%, accuracy, schema | Data Engineers |
| **Gold (Published)** | Business-ready aggregates, enriched, cross-domain | Parquet (optimized) | Completeness ≥ 99%, timeliness SLA, business rules | Analysts + Business |

**Promotion Rules:**
- Data only moves to the next tier **after passing DQ gates**
- Failed records are quarantined to `rejected/` prefix for review
- Each tier has independent retention policies (90d / 1yr / 3yr)

> Speaker Notes: Explain the Medallion architecture. Bronze is "land it faithfully," Silver is "clean it up," Gold is "make it business-ready." DQ gates between tiers are non-negotiable — bad data doesn't propagate.

---

## Slide 9b: Geo-Data Specialization for [Firm]

**[Firm] is a geo-data specialist — spatial is the product, not a feature.**

**Our approach (ADR-010):**

| Concern | Decision |
|---|---|
| Storage format (Silver/Gold) | **GeoParquet 1.1** with explicit CRS metadata |
| Default storage CRS | EPSG:4326 (WGS84); local grids (BNG, UTM) preserved where required |
| Spatial indexing | **H3** at resolutions 7/9/12 pre-computed in Silver, partition-candidate on Gold |
| Cross-dataset spatial identity | `dim_spatial_entity` in Gold — deterministic (ID) + probabilistic (H3-12 proximity + fuzzy name), see ADR-012 |
| Raster (imagery/DEM) | Out of scope for initial 10 pipelines — COG + AWS Open Data pattern in migration plan |
| Consumer interfaces | Athena `ST_*` UDFs, Redshift Serverless `GEOMETRY`, future tile service |
| Spatial DQ checks | CRS conformance, topology validity, bounding-box sanity, H3 correctness |

**Why this matters to [Firm]:**

- Consumers don't re-project, re-index, or re-resolve identity on every query.
- Same well / asset / structure reconciled once across CRM, ERP, survey — the value proposition of an *enterprise* data platform for a geo-data firm.
- Silver/Gold spatial joins in Athena/Redshift are fast and correct by default.

**Cost delta:** Silver Glue jobs ~15–20% more CPU for re-projection + H3; storage ~8–12% larger. Embedded in ROM.

> Speaker Notes: The RFP is silent on spatial specifics but this is table stakes for a geo-data firm. Call out GeoParquet, H3 indexing, and the `dim_spatial_entity` dimension as our spatial-identity answer to "cross-domain linkages." Reference ADR-010 for the full decision; ADR-012 covers the MDM/ER pattern.

---

## Slide 10: Data Governance & Operating Model

**Domain-Centric Governance (Data Mesh Principles):**

| Principle | Implementation |
|-----------|---------------|
| Domain Ownership | Each domain owns its data products end-to-end |
| Data as a Product | Gold-tier datasets: documented, versioned, SLA-bound |
| Self-Serve Platform | Terraform templates + edp_common library + CI/CD |
| Federated Governance | Central standards enforced by templates + automated agents |

**Naming Conventions:** Consistent patterns for all resources (S3, Glue, Lambda, IAM, etc.)

**Data Contracts:** JSON Schema per entity, SemVer versioning, breaking change notification

**Operating Model (Post-Handoff):**
- Recommended team: 1 Platform Engineer + 2 Data Engineers (steady-state)
- Responsibilities: pipeline onboarding, DQ threshold tuning, monitoring
- AI agents continue to accelerate development post-handoff

> Speaker Notes: This is what makes the platform sustainable after we leave. Domain ownership means [Firm]'s teams take responsibility. The templates and agents mean they can onboard new domains without us.

---

## Slide 11: Data Quality Framework

**Technology:** Great Expectations (GX) integrated into Step Functions pipeline

**Three Dimensions of Quality:**

| Dimension | Checks | Example |
|-----------|--------|---------|
| **Completeness** | Null rates, row counts, schema validation | "customer_email is never null" |
| **Accuracy** | FK validity, regex patterns, statistical distribution | "phone matches E.164 format" |
| **Timeliness** | SLA adherence, data freshness monitoring | "pipeline completes by 06:00 UTC" |

**Pipeline Integration:**
```
Ingest → [DQ Gate] → Transform → [DQ Gate] → Publish → [DQ Gate] → Notify
```

**On Failure:** Configurable per pipeline — halt pipeline, quarantine bad records, or continue with warning

**DQ Results:** Stored in S3 + DynamoDB for historical trend analysis. Visualized in React dashboard.

> Speaker Notes: DQ is not an afterthought — it's baked into every pipeline as Step Functions steps. Three dimensions match exactly what the RFP requested. Configurable failure behavior means [Firm] can tune aggressiveness per pipeline.

---

## Slide 12: Monitoring & Observability

**[Insert Observability Diagram: observability.mmd]**

**Four Pillars:**

| Pillar | Implementation |
|--------|---------------|
| **Logging** | JSON structured logs, correlation IDs, CloudWatch Log Insights |
| **Metrics** | 30+ custom CloudWatch metrics across 8 categories |
| **Tracing** | AWS X-Ray E2E traces (Lambda → Step Functions → API Gateway) |
| **Alerting** | CloudWatch Alarms → SNS → email/Slack/PagerDuty |

**Dashboards:**
- **React Monitoring Dashboard** — Pipeline status, DQ scores, cross-domain hub, data lineage DAG
- **Grafana Ops Dashboards** — Glue DPU, Lambda performance, S3 storage, Redshift queries, cost

**Centralized Cross-Environment Hub:**
- Single view across DEV / TST / PRD
- Environment selector, aggregate health scores
- Cross-domain data lineage visualization

> Speaker Notes: The RFP specifically asks for a centralized monitoring hub across all 3 environments. We deliver that as a React app (not just CloudWatch). Plus Grafana for ops. Four pillars ensure nothing is invisible.

---

## Slide 12b: Non-Functional Requirements & SLOs

**Every NFR is measurable. See `docs/architecture/nfr-slo-matrix.md` for the full table.**

| Category | Headline target |
|---|---|
| **Performance** | Athena p95 ≤ 10s; Redshift BI p95 ≤ 5s; ingestion ≥ 50 MB/s bulk |
| **Freshness (Gold)** | ≤ 60 min end-to-end (standard); daily SLO ≤ 06:00 UTC |
| **Availability** | Gold read **99.9%**; Monitoring UI/API **99.5%** |
| **RPO / RTO (Gold)** | **RPO 1h / RTO 4h** via CRR + Iceberg snapshots (ADR-005) |
| **Security** | 0 critical vulns at deploy; 0 public buckets; PII classified ≤ 15 min post-ingest |
| **Quality** | Gold completeness ≥ 99%; anomaly-alert actioned ≥ 80% within 24h |
| **Cost** | ≤ $0.05 per GB processed; monthly spend ≤ $18K steady-state |
| **Developer experience** | PR p95 ≤ 3 days; new domain provision ≤ 1 hour |

**Error budgets** are computed monthly; burn tracked in the monitoring hub. Breach = escalation to SteerCo.

> Speaker Notes: This is how we translate "scalable, flexible, compliant" (RFP §3.1) into numbers. Every cell has a measurement method and an owner. When the Director PM or VP Data asks "what's your SLO on X?", pull up the matrix.

---

## Slide 13: AI Acceleration Strategy

**[Insert AI Agent Platform Diagram: ai-agent-platform.mmd]**

**Two Layers of AI:**

1. **Claude Code** — Interactive AI pair-programming for all developers
2. **Automated Agents** — Run in isolated AWS CodeBuild via Bedrock

**7 Automated Agents:**

| Agent | Purpose | Trigger |
|-------|---------|---------|
| pipeline-generator | Generate Glue jobs, Step Functions, DQ suites from spec | Manual |
| pr-reviewer | Multi-pass PR review (security, quality, architecture, cost) | PR event |
| test-generator | pytest fixtures, moto mocks, synthetic data | Manual |
| doc-generator | Auto-generate pipeline docs & data dictionaries | Weekly |
| terraform-reviewer | IaC security + cost validation | PR with /infra/ |
| schema-validator | Validate schema changes vs. data dictionary | Pre-merge |
| dq-tuner | Analyze DQ history, suggest threshold adjustments | Weekly |

**ROI:** ~$8.4K AI cost → ~$38-51K labor savings = **4-6x return**

> Speaker Notes: This is a key differentiator. We don't just use AI casually — we have a production-grade agent platform with guardrails (max 3 retries, duplicate prevention, human escalation). The pipeline-generator can scaffold a new pipeline in 15 minutes instead of 2 days.

---

## Slide 14: CI/CD & DevOps

**[Insert CI/CD Flow Diagram: cicd-flow.mmd]**

**GitHub Actions Workflows:**

| Workflow | Trigger | Checks |
|----------|---------|--------|
| Terraform CI | PR with /infra/ changes | fmt, validate, tflint, checkov, plan |
| Python CI | PR with /pipelines/ changes | ruff, mypy, pytest |
| React CI | PR with /monitoring-app/ changes | eslint, vitest, build |
| AI PR Review | Any PR | 5-pass automated review |

**Environment Promotion:**
```
feature branch → DEV (auto on merge) → TST (manual + QA sign-off) → PRD (manual + approval gate)
```

**Security:**
- GitHub OIDC → AWS (no long-lived access keys)
- Secrets in AWS Secrets Manager (not GitHub)
- Branch protection + CODEOWNERS enforcement

> Speaker Notes: No ClickOps — everything deployed via CI/CD. Highlight the OIDC authentication (no stored AWS keys). The AI PR reviewer runs automatically on every PR with 5 specialized passes.

---

## Slide 15: Security & Access Control

**[Insert Network/Security Diagram: network-security.mmd]**

**Security Architecture:**

| Area | Implementation |
|------|---------------|
| Network | VPC with private subnets, VPC endpoints (no public internet for data services) |
| Encryption | SSE-KMS at rest, TLS 1.2+ in transit |
| Access | Lake Formation (table/column-level), 5 IAM roles per domain |
| Audit | CloudTrail (all regions), S3 access logging, Object Lock archive |
| Scanning | Dependabot, pip-audit, npm audit — zero critical vulns at deploy |
| Data Classification | Resource tags (public/internal/confidential/restricted), PII column masking |

**RBAC Model:** DomainAdmin | DataEngineer | DataAnalyst | PipelineExecution | MonitoringReadOnly

> Speaker Notes: Security is baked in from Day 1, not bolted on. Lake Formation provides column-level PII masking — analysts see masked data, engineers see full data. No public S3 buckets, no 0.0.0.0/0 security groups.

---

## Slide 15a: End-to-End User Journey

**A Monday morning, 90 days post-handoff. Four personas, one platform, one connected story.**

```
┌─────────────────────────────────────────────────────────────────────────┐
│  08:00  BUSINESS LEADER opens exec dashboard                             │
│         ├─ Sees Q3 regional variance flagged RED                         │
│         └─ Clicks into domain health card                                │
│                                                                          │
│  08:15  DATA ANALYST receives Slack "investigate variance"               │
│         ├─ Queries Gold table in Athena — signed-off data contract       │
│         ├─ Follows DataZone link to dataset docs                         │
│         ├─ Spots anomaly alert on records_processed (-22%)               │
│         └─ Opens lineage DAG on monitoring dashboard                     │
│                                                                          │
│  08:40  DATA ENGINEER pulled in on lineage trace                         │
│         ├─ Lineage shows Silver transform upstream of the anomaly        │
│         ├─ Opens Step Functions execution history — DQ check passed      │
│         ├─ CloudWatch Anomaly Detection confirms distribution shift      │
│         └─ Files ticket, opens PR to add tighter DQ expectation          │
│                                                                          │
│  09:05  PLATFORM ADMIN triages ticket                                    │
│         ├─ Runbook in Git — known failure pattern on this pipeline       │
│         ├─ Auto-remediation Lambda restarts upstream source sync         │
│         ├─ Pipeline replays from Bronze (append-only + Iceberg snapshot) │
│         └─ Dashboard returns to GREEN by 09:30                           │
│                                                                          │
│  09:45  BUSINESS LEADER re-opens dashboard                               │
│         ├─ Variance now contextualized: upstream sync delay, recovered   │
│         ├─ Confidence restored — decision proceeds                       │
│         └─ Feedback loop: "add this as a recurring check"                │
│                                                                          │
│  (next sprint)  DATA ENGINEER ships the new check; back to Wk-14 loop   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Platform capabilities exercised in one 90-minute incident:**

| Capability | Slide reference |
|---|---|
| Gold dashboard + signed data contracts | 4b, 11, ADR-004 |
| DataZone discovery + docs | ADR-009 |
| Anomaly detection (data observability) | ADR-013 |
| Lineage DAG (column-level) | 12, ADR-008 |
| DQ framework extension via PR | 11, ADR-006 |
| Runbook + auto-remediation | 12, ADR-007 |
| Iceberg-backed replay | ADR-002 |

> Speaker Notes: This is what "enterprise data platform" looks like in production — not a bag of AWS services, but a connected story across four roles. Every capability in the story is covered by a concrete architecture decision or deliverable. Tell this story first when the Product or Sponsor persona asks "what do I get."

---

## Slide 15b: MVP / Thin-Slice Strategy

**One pipeline, end-to-end, on real [Firm] data, by Week 6. Everything after is repetition at scale.**

```
Wk 1-2:    Phase 0 — Discovery, domain selection, source inventory
Wk 3-5:    Phase 1 — Infrastructure + CI/CD + edp_common library
Wk 6:      === REFERENCE PIPELINE LIVE DEMO ===  ← MVP
           Real source → Bronze → DQ → Silver → DQ → Gold → dashboard
Wk 7-12:   Phase 2 — Pipelines 2-5 (Domain 1) as pattern replication
Wk 9-14:   Phase 3 — Pipelines 6-10 (Domain 2) + cross-domain hub
Wk 13-16:  Phase 4 — Hardening, training, handoff
```

**Why this matters:**
- **Risk compression** — every major technical unknown (source connectivity, DQ wiring, monitoring, deployment) is resolved by Wk 6, not Wk 14.
- **Stakeholder confidence** — Exec Sponsor sees working software at the 40% mark, not in the last month.
- **Feedback loop** — patterns we learn on Pipeline 1 shape Pipelines 2-10.
- **Velocity proof** — post-MVP pipelines deliver in 5 PD each; the team's 80/20 is front-loaded.

**Phase 2 exit criteria** (`delivery-approach.md`) require the reference pipeline promoted to TST — a concrete, testable MVP milestone.

> Speaker Notes: This is the "thin-slice" narrative the Product persona wants. Everyone lands on Week 6 as the risk-retirement point. If the MVP is hard, we've learned everything early. If it's easy, we scale. Either way, no Week-14 surprises.

---

## Slide 16: Delivery Approach

**Methodology:** Agile (Scrum) with 2-week sprints

**Sprint Cadence:**
- Sprint Planning: Monday (1h)
- Daily Standup: 15 min
- Sprint Review/Demo: Friday of sprint end (1h)
- Sprint Retrospective: Friday of sprint end (30 min)

**Governance:**
- Weekly status report (DM → Client PM)
- Bi-weekly steering committee (DM + Architect → Client Sponsor)
- JIRA/Rally for backlog tracking
- Confluence for documentation
- Slack channel for daily communication

**Quality Gates:**
- Phase 0 exit: Domains selected, pipelines documented
- Phase 1 exit: Domain template deploys successfully, CI/CD works
- Phase 2 exit: 5 Domain 1 pipelines running with DQ checks
- Phase 3 exit: All 10 pipelines in TST, monitoring functional
- Phase 4 exit: PRD deployment, training delivered, handoff signed

> Speaker Notes: Agile with defined phase exits. Highlight the steering committee — that's where the Executive Sponsor is engaged. Quality gates ensure we don't rush ahead without validating each phase.

---

## Slide 17: Delivery Roadmap

**[Insert Gantt Chart: roadmap-gantt.mmd]**

**16 Weeks, 5 Phases:**

| Phase | Weeks | Focus | Key Deliverables |
|-------|-------|-------|-----------------|
| 0: Discovery | 1-2 | Align scope, select domains | Domain selection, source inventory, ADRs |
| 1: Foundation | 3-6 | Infrastructure + CI/CD | Terraform templates, CI/CD workflows, edp_common lib |
| 2: Domain 1 | 5-10 | First 5 pipelines + DQ | Reference pipeline, DQ framework, monitoring API |
| 3: Domain 2 | 9-14 | Next 5 pipelines + monitoring | Cross-domain hub, dashboards, alerting |
| 4: Handoff | 13-16 | Security, docs, training | PRD deployment, 3 training sessions, migration plan |

**Note:** Phases overlap intentionally for efficiency. Parallel tracks (infrastructure + pipelines + monitoring) maximize throughput.

> Speaker Notes: Walk through the Gantt. Call out that phases overlap — DE2 starts building edp_common while Platform Eng finishes templates. Full-Stack starts monitoring while DEs build pipelines. This is how we deliver in 16 weeks, not 24.

---

## Slide 18: Team Structure

**Team Composition (Central Europe, Offshore):**

| Role | Seniority | Responsibility |
|------|-----------|---------------|
| Delivery Manager | Senior | Governance, risk management, client comms |
| Solution Architect | Lead | Technical design, ADRs, data modeling |
| Platform/DevOps Engineer | Senior | Terraform, GitHub Actions, AWS infrastructure |
| Data Engineer 1 | Senior | Python pipelines, edp_common library, reference patterns |
| Data Engineer 2 | Mid | Pipeline development, DQ suite authoring |
| Full-Stack Developer | Senior | React dashboard, FastAPI, Cognito auth |
| QA Engineer | Senior | Test automation, E2E validation, UAT coordination |
| Technical Writer | Mid | Documentation, training materials, session facilitation |

**Peak Team Size:** 7 people (Weeks 5-12)
**AI Augmentation:** Each role paired with a Claude Code agent for 30-50% productivity boost

> Speaker Notes: 8 roles, but not all at the same time. Core team of 4 starts Week 1, ramps to 7 by Week 5, ramps down to 6 by Week 14. Technical Writer comes in late for the documentation sprint.

---

## Slide 19: Client Stakeholders & Time Commitment

**Required [Firm] Roles:**

| Role | Time Commitment | Key Activities |
|------|----------------|----------------|
| Executive Sponsor | 1-2 hrs/week | Steering committee, escalations, budget approval |
| Data Platform Lead | 4-6 hrs/week | Daily standups, architecture reviews, decision-making |
| Domain Data Owners (x2) | 4 hrs/week each | Domain knowledge, pipeline validation, DQ thresholds |
| IT/Security Lead | 2-4 hrs/week | AWS access, SCP management, security reviews |
| QA/UAT Team | 8 hrs/week (Phase 3-4) | UAT testing, sign-off |
| Training Attendees | Half-day × 3 sessions (~3.5h each) | Platform, pipelines, monitoring training |

**Total Client Commitment:** ~20-30 hrs/week across all roles

> Speaker Notes: This is Section 10.1c of the RFP — exactly what we need from [Firm]. The Data Platform Lead is the most critical. If that person is unavailable, decisions stall and the timeline slips.

---

## Slide 20: Resource Plan

**T&M Staffing Timeline (100% allocation when on project):**

```
Wk:  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16
DM:  [==============================================]  80 PD
SA:  [======================================]          70 PD
PE:  [==============================================]  80 PD
DE1: [==============================================]  80 PD
DE2:       [==========================]                 50 PD
FS:              [================================]     60 PD
QA:              [================================]     60 PD
TW:                                      [========]    20 PD
Size: 4  4  5  5  7  7  7  7  7  7  7  7  7  6  6  6
```

**Total:** 500 person-days | Peak: 7 people | Average: ~6 people

> Speaker Notes: On T&M, everyone is 100% when they're on. Clear ramp-up (DE2 Week 3, FS+QA Week 5) and ramp-down (Architect off Week 14, DE2 off Week 12). No idle bench time.

---

## Slide 20b: Key Personnel

**Delivery Manager — Artsiom Kharytonchyk**
- [Years] experience in delivery management
- AWS certified, Agile/Scrum practitioner
- Led data platform and cloud migration programs
- Domain: FinTech, Automotive, Data & Analytics

**Solution Architect — [Name TBD]**
- [Years] experience in data architecture
- AWS Solutions Architect Professional
- Expertise: Glue, Lake Formation, Redshift, Step Functions
- Previous: [Reference project]

**Lead Data Engineer — [Name TBD]**
- [Years] experience in Python/PySpark data engineering
- AWS Data Analytics Specialty
- Expertise: Glue, Great Expectations, ETL patterns
- Previous: [Reference project]

> Speaker Notes: Fill in names and CVs from actual team. Highlight certifications and relevant project experience. The committee specifically asked for this in Section 10.2b.

---

## Slide 21: Risk Management

**Top 10 Risks (EPAM RDM Format):**

| # | Risk | Impact | Probability | Exposure | Treatment |
|---|------|--------|-------------|----------|-----------|
| R1 | Source system access delays | High | High | **High** | Mitigation |
| R2 | Domain selection exceeds 2 weeks | High | Medium | **High** | Mitigation |
| R3 | AWS account SCP restrictions | High | Medium | **High** | Mitigation |
| R8 | Client stakeholder availability | High | Medium | **High** | Mitigation |
| R10 | AI-generated code quality | High | Medium | **High** | Mitigation |
| R4 | Data volumes exceed estimates | Medium | Medium | Medium | Mitigation |
| R6 | Key team member departure | High | Low | Medium | Mitigation |
| R7 | Scope creep | Medium | High | Medium | Mitigation |
| R9 | Bedrock model access delays | Medium | Medium | Medium | Mitigation |
| R5 | GX / Glue Python incompatibility | Medium | Low | Low | Mitigation |

**Summary:** 5 High, 4 Medium, 1 Low exposure. All mitigated. Details in supporting documents.

> Speaker Notes: Walk through the top 3. R1 (source access) is the #1 risk — we mitigate with Day-1 checklist and mock data fallback. R8 (stakeholder availability) is why we defined the client commitment slide. Full details with treatment plans are in the risk register document.

---

## Slide 22: ROM Financial Proposal

**Labor (Central Europe, T&M):**

| Component | Amount |
|-----------|--------|
| Labor (500 person-days) | $326,160 |
| AWS Infrastructure (4 months) | $32,000 - $60,000 |
| AI Acceleration (Bedrock + Claude Code) | $7,440 - $8,440 |
| Tooling & Licenses | $0 - $12,000 |
| Travel | $5,000 - $10,000 |
| Contingency (10%) | $32,616 |
| **Total ROM** | **$403K - $449K** |

**Weekly Burn Rate:** $14,400/wk (ramp) → $22,760/wk (peak) → $16,920/wk (handoff)

**Payment Terms:** Monthly T&M invoicing based on actual person-days delivered.

> Speaker Notes: All rates from the EPAM & CAPG Central Europe rate card. 100% T&M — [Firm] pays for actual work delivered. The contingency covers scope uncertainty. AI costs are minimal (~$8K) but save ~$38-51K in labor — 4-6x ROI.

---

## Slide 23: Assumptions & Dependencies

**Key Assumptions:**
- AWS accounts provisioned (or access granted) by end of Week 1
- Source system credentials available by end of Week 2
- [Firm] names stakeholders with defined time commitment before kickoff
- No more than 10 pipelines / 2 domains in scope
- No code freeze, holiday, or organizational change during 16 weeks
- Bedrock model access approved in [Firm]'s AWS account

**Dependencies:**
- Phase 1 depends on: AWS account access (client)
- Phase 2 depends on: Domain selection complete (client), Phase 1 infrastructure
- Phase 3 depends on: Domain 2 source access (client)
- Phase 4 depends on: Client UAT resources available

> Speaker Notes: Be transparent about dependencies. Every phase has a client dependency. If source access is delayed 2 weeks, the timeline shifts 2 weeks. The assumptions log in the supporting docs has 25+ detailed assumptions.

---

## Slide 24: Migration Strategy (Remaining Pipelines)

**Post-Engagement Migration Plan:**

The initial engagement delivers:
- Reusable templates + edp_common library
- 10 proven pipeline patterns across 2 domains
- Trained [Firm] team
- AI agents for accelerated development

**Migration Approach for Remaining Pipelines:**

| Step | Activity | Who | Timeline |
|------|----------|-----|----------|
| 1 | Inventory remaining pipelines (T-shirt sizing) | Delivered in DOC-008 | End of engagement |
| 2 | Prioritize into migration waves (5-10 pipelines each) | [Firm] Data Platform Lead | Month 1 post-handoff |
| 3 | Execute migration waves using templates + agents | [Firm] team (with optional vendor support) | 2-4 weeks per wave |
| 4 | Validate and promote to production | [Firm] QA team | Per wave |

**Estimated Velocity Post-Handoff:**
- With templates + AI agents: ~5 pipelines per 2-week sprint (2-person team)
- vs. from scratch: ~1-2 pipelines per sprint

> Speaker Notes: This is the "teach them to fish" slide. We don't create dependency — we build the platform, tools, and knowledge so [Firm] can continue independently. The AI agents are the force multiplier.

---

## Slide 24b: Adoption Plan — Making It Their Platform

**Training is necessary, not sufficient. Adoption is a 90-day product rollout.**

**The model:**

| Element | Detail |
|---|---|
| **Champions** | 1 per domain (named in Phase 0); participates in sprint demos; co-builds ≥ 1 pipeline |
| **Beta cohort** | Wk 6 onwards — champion + 1–2 analysts see the platform before formal training |
| **Office hours** | Weekly (first 8 wk) → bi-weekly (wk 9–16) → monthly (wk 17–26) post-handoff |
| **Slack community** | `#edp-community` from kickoff; EPAM stays read-only for 90 days post-handoff |
| **Docs in Git** | Runbook / dev guide / user guide as PR-able artifacts — content stays current |

**Adoption KPIs — 30 / 60 / 90 days post-handoff:**

| KPI | 30d | 60d | 90d |
|---|---|---|---|
| Unique analysts querying Gold | ≥ 10 | ≥ 25 | ≥ 50 |
| New pipelines built by client team | 0 | ≥ 2 | ≥ 5 |
| DQ alerts triaged within SLA | ≥ 70% | ≥ 80% | ≥ 90% |
| Champion-authored docs / PRs | ≥ 1 | ≥ 3 | ≥ 5 |

**Red flags → intervention:**
- < 5 analysts by day 60, 0 new pipelines by day 90, DQ backlog > 10, champion attrition.
- Action: DM raises with Sponsor; options include extended retainer or platform coaching.

**Full plan:** `docs/delivery/adoption-plan.md`

> Speaker Notes: This closes the Product persona's adoption-plan gap. Training alone failed at Project Atlas (pick your reference) — we measured adoption, found it, and intervened. The KPIs are the Sponsor's quarterly QBR content.

---

## Slide 25: Reference Projects

**Project 1: Enterprise Data Lake — [Industry Sector]**
- Scope: 50+ data pipelines, 6 business domains, AWS cloud-native
- Stack: S3, Glue, Step Functions, Athena, Lake Formation
- Duration: 20 weeks, team of 8
- Outcome: 70% reduction in data preparation time, unified analytics

**Project 2: Data Platform Migration — [Industry Sector]**
- Scope: On-premise DWH to AWS, 100+ source systems
- Stack: Redshift, Glue, S3 (Medallion architecture), CloudWatch
- Duration: 6 months, team of 12
- Outcome: 40% cost reduction, 3x query performance improvement

**Project 3: Real-Time Analytics Platform — [Industry Sector]**
- Scope: Event-driven architecture, sub-second latency
- Stack: EventBridge, Kinesis, Lambda, DynamoDB, QuickSight
- Duration: 14 weeks, team of 6
- Outcome: Real-time dashboards for executive decision-making

> Speaker Notes: Anonymized case studies. Fill in actual reference projects from EPAM's portfolio. The committee specifically asked for this in Section 10.3a. Note they mentioned "Microsoft data technologies" — clarify that our AWS proposal is based on the RFP's cloud-agnostic language.

---

## Appendix B: EPAM Reference Projects — Microsoft Data Technologies

*Included per RFP §10.3a. Anonymized; full case studies available on request under NDA.*

**Project A — Fabric Data Platform Migration ([Industry Sector])**
- Scope: Migration from on-prem SQL + SSIS to Microsoft Fabric Lakehouse; 80+ pipelines; 4 business domains
- Stack: Fabric (OneLake, Data Factory, Notebooks), Purview (governance), Power BI
- Duration: 24 weeks, team of 10
- Outcome: 60% reduction in nightly batch window, unified semantic model in Power BI

**Project B — Synapse + Databricks Lakehouse ([Industry Sector])**
- Scope: Greenfield analytics platform; 50+ pipelines; real-time + batch
- Stack: Azure Synapse (Serverless SQL + Dedicated), Databricks (Delta Lake), Event Hubs, ADF
- Duration: 18 weeks, team of 8
- Outcome: Sub-second BI queries on 10 TB Gold; cost optimization ~35%

**Project C — Purview Governance + Power BI Adoption ([Industry Sector])**
- Scope: Enterprise data governance rollout; catalog for 200+ datasets; lineage for 30+ pipelines
- Stack: Microsoft Purview (catalog + lineage + classification), Power BI (datasets + reports), Azure AD
- Duration: 12 weeks, team of 5
- Outcome: 70% reduction in "where's the data?" tickets; GDPR attestation readiness

> Speaker Notes: These three projects demonstrate that our Microsoft-stack delivery capability is real and deep, not theoretical. If the committee indicates a Microsoft preference during or after defense, these references convert into a scoped Azure delta proposal within 1 week.

---

## Slide 26: Q&A

**Thank You**

Contact: Artsiom Kharytonchyk
Email: [email]
Next Steps: [Proposed follow-up actions]

**Supporting Documents Provided:**
- Detailed WBS (70+ backlog items)
- Risk Register (10 risks, EPAM RDM format)
- Resource Plan (T&M staffing timeline)
- RACI Matrix
- ROM Financial Proposal
- Assumptions Log
- Client Stakeholder Requirements

> Speaker Notes: Thank the committee. Open for questions. Suggest next steps: clarification session if needed, team introductions, SOW drafting timeline. Remind them that all supporting docs have been shared 24h in advance.
