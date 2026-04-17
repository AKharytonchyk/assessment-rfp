# ADR-008 — Data Lineage: OpenLineage + Marquez

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Data Eng Lead |
| **Linked RFP need** | §3.2 monitoring + documentation; VP Data defender concern #3 |

## Context

The monitoring React dashboard shows a "data lineage DAG" (slide 12), but the **mechanism** for emitting, storing, and querying lineage is undefined. Column-level lineage across PySpark + Glue + Step Functions is non-trivial; a manual graph is not sustainable.

## Decision

- **Lineage specification:** **OpenLineage** (CNCF-incubating open standard). Every Glue job, Lambda, and Step Functions execution emits OpenLineage events to a centralized collector.
- **Backend store:** **Marquez** (open source OpenLineage reference implementation) deployed on ECS Fargate with RDS Postgres as the graph store. Hosted inside the client's VPC.
- **Spark instrumentation:** **OpenLineage-Spark agent** attached to Glue PySpark jobs (JAR config) for automatic table-level and column-level lineage.
- **Lambda/Step Functions instrumentation:** `openlineage-python` client called from the pipeline template; wrapper functions in `edp_common.lineage` standardize event emission.
- **Monitoring integration:** the React dashboard's lineage DAG is a Marquez API consumer (via the FastAPI monitoring service). Columns hyperlink to Glue Catalog entries.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **OpenLineage + Marquez (selected)** | Open standard; vendor-neutral; AWS-hostable; column-level with Spark agent | Requires Marquez ops (small) | **Selected** |
| **Spline** | Strong Spark story | Scala-heavy; narrower ecosystem vs. OpenLineage | Rejected |
| **AWS Glue DataBrew lineage** | Managed | Limited to DataBrew transforms | Rejected |
| **DataHub** (which speaks OpenLineage) | Marketplace + lineage in one | Heavier ops; DataZone (ADR-009) chosen instead for marketplace | Complementary, not replacement |
| **Manual lineage metadata in Glue Catalog** | Zero new infra | Rots immediately; no column-level | **Rejected** |

## Consequences

**Positive**
- Column-level lineage is auto-captured from PySpark plans; no manual maintenance.
- OpenLineage compatibility means future migration to DataHub or another catalog is straightforward.
- The React dashboard gets a live, accurate lineage DAG instead of a static diagram.

**Negative / costs**
- Marquez ECS task + Postgres ~ $80–150/month — included in AWS infra ROM.
- Adds a small JAR to Glue runtime (startup time +1-2s).

## Follow-up

- WBS OBS-011 renamed to "OpenLineage + Marquez deployment; OpenLineage-Spark agent on Glue."
- `edp_common.lineage` helper library added to Phase 1 deliverables.
