# Non-Functional Requirements & SLO Matrix

| Field | Value |
|---|---|
| **Last Updated** | 2026-04-17 |
| **Owner** | Solution Architect |
| **Applies to** | Enterprise Data Platform (EDP) — initial engagement scope |

All NFRs below are measurable. Each has a target, a measurement method, an owner, and a review cadence. Targets flagged *illustrative* are calibrated during Phase 0 once workload volumes and client expectations are confirmed.

---

## 1. Performance & Scalability

| Metric | Target | Measurement | Owner | Review |
|---|---|---|---|---|
| Ingestion throughput (per pipeline, Bronze write) | ≥ 50 MB/s sustained for bulk loads | CloudWatch custom metric `records_processed_total`, Glue job duration | Data Eng Lead | Sprint demo |
| Silver transform throughput | ≥ 30 MB/s | As above | Data Eng Lead | Sprint demo |
| Gold publish throughput | ≥ 20 MB/s | As above | Data Eng Lead | Sprint demo |
| Athena p95 query latency (simple Gold query, <10 GB scanned) | ≤ 10 s | Athena query history + CloudWatch | Platform Eng | Bi-weekly |
| Athena p99 query latency (simple Gold query) | ≤ 30 s | As above | Platform Eng | Bi-weekly |
| Redshift Serverless BI query p95 | ≤ 5 s | Redshift `SVL_QUERY_METRICS_SUMMARY` | Platform Eng | Bi-weekly |
| Monitoring API p99 latency | ≤ 500 ms | API Gateway metrics | Full-Stack | Weekly |
| Max concurrent Glue DPUs (per domain) | 60 (soft cap); 100 (hard cap) | Glue service quota + CloudWatch | Platform Eng | Monthly |

## 2. Freshness (data SLOs at consumer level)

Freshness applies to the **dataset on its Gold table** (what the consumer sees), not the upstream job.

| Dataset tier | Default freshness SLO | Owner |
|---|---|---|
| Bronze | ≤ 15 min after source write (DMS CDC) | Data Eng |
| Silver | ≤ 30 min after Bronze arrival | Data Eng |
| Gold (standard) | ≤ 60 min after Silver arrival | Data Eng + Domain Owner |
| Gold (daily business) | Available by 06:00 UTC each business day | Domain Owner |
| Gold (spatial reference) | ≤ 24 h (low-frequency) | Domain Owner |

Per-dataset SLOs may be tighter or looser; recorded in the DataZone data-product metadata and checked by the timeliness DQ suite.

## 3. Availability

| Component | Target (monthly) | Error budget (monthly) | Measurement |
|---|---|---|---|
| Gold S3 read | 99.9% | 43 min | S3 availability (AWS SLA baseline) |
| Monitoring React UI | 99.5% | 3h 40min | CloudFront 5xx + synthetic canary |
| Monitoring REST API | 99.5% | 3h 40min | API GW 5xx rate |
| Glue Catalog availability | 99.9% | — | AWS SLA inherited |
| Redshift Serverless query availability | 99.5% | 3h 40min | AWS SLA + Redshift metrics |

## 4. Recoverability (RPO / RTO, from ADR-005)

| Tier | RPO | RTO | Mechanism |
|---|---|---|---|
| Gold | 1 hour | 4 hours | S3 CRR + Redshift snapshots + Iceberg snapshots |
| Silver | 4 hours | 8 hours | Rebuildable from Bronze |
| Bronze | 24 hours | 24 hours | Replayable from source / DMS |
| Catalog metadata | 1 hour | 1 hour | DynamoDB global tables + IaC |

## 5. Security & Compliance

| Metric | Target | Measurement |
|---|---|---|
| Critical vulnerabilities in shipped code | **0** at deploy | Dependabot, pip-audit, npm audit, Trivy |
| S3 buckets public | **0** | AWS Config rule + Macie |
| Unencrypted at rest | **0** | AWS Config rule |
| TLS < 1.2 endpoints | **0** | AWS Config / Security Hub |
| Failed CloudTrail log deliveries | **0** | CloudTrail status |
| Time to PII classification post-ingest | ≤ 15 min | SEC-005a pipeline timing |

## 6. Quality (data)

| Metric | Target | Measurement |
|---|---|---|
| Gold completeness | ≥ 99% | GX suites |
| Silver completeness | ≥ 95% | GX suites |
| Gold timeliness | ≥ 95% runs inside SLO | GX + monitoring |
| DQ coverage (% Gold tables with full suite) | 100% by Phase 3 exit | Backlog audit |
| Anomaly-alert actioned rate | ≥ 80% within 24h | Incident management logs (ADR-013) |

## 7. Cost

| Metric | Target | Measurement |
|---|---|---|
| Cost per GB processed (Gold output, all tiers) | ≤ $0.05 | CloudWatch cost metrics + CUR |
| Monthly AWS spend (steady state) | ≤ $18,000 (4 domains, 10 pipelines) | Cost Explorer tags |
| Glue DPU utilization | 50-70% target (not underused, not at cap) | Glue job metrics |
| Bedrock tokens per AI agent run | Tracked & budgeted per agent | Custom metric |

## 8. Developer Experience (engineering SLOs)

| Metric | Target | Measurement |
|---|---|---|
| PR cycle time (open → merge) | p50 ≤ 1 day, p95 ≤ 3 days | GitHub metrics |
| CI pipeline duration (Python) | p95 ≤ 10 min | GitHub Actions |
| Time to provision a new domain (Terraform apply) | ≤ 1 hour | IaC timer |
| Pipeline scaffolding time (with agent) | ≤ 30 min | Agent execution log |

---

## Review Cadence

- **Sprint demo** — freshness, throughput, DQ coverage.
- **Bi-weekly SteerCo** — availability, RPO/RTO rehearsal status, cost trend.
- **Phase gate** — full NFR matrix reviewed; deviations flagged for Sponsor decision.
- **Post-handoff quarterly** — benefits-realization plan references this matrix for sustained KPIs.

## Linked documents

- `adr/ADR-005-dr-strategy.md` (RPO/RTO)
- `adr/ADR-006-dq-engine.md` (DQ metrics)
- `adr/ADR-013-data-observability.md` (anomaly alerting)
- `docs/governance/quality-management-plan.md` (defect SLAs)
- `docs/governance/benefits-realization-plan.md` (post-handoff tracking)
