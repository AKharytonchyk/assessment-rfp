# ADR-003 — Change Data Capture (CDC) Pattern

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, Data Eng Lead |
| **Linked RFP need** | R4 mitigation (ERP data volumes); §3.1 cross-domain linkages; efficiency/cost |

## Context

Risk R4 flags ERP systems with 100M+ row tables. Full-load ingestion of such tables on every pipeline run is cost-prohibitive (Glue DPU hours) and slow (violates freshness SLOs). A CDC / incremental strategy is mandatory, not optional.

Source systems in scope fall in three shapes:
1. **Relational DBs** (CRM, ERP) accessible by JDBC with transaction logs/redo logs or audit columns (`updated_at`).
2. **File drops** (CSV, Excel, SFTP) — inherently batch; CDC is "what's new since last file."
3. **APIs** (HRIS, some CRM SaaS) — pagination + updated-since query parameter.

A fourth case — streaming event sources (rare today but future-possible) — is noted for completeness.

## Decision

Use a **pattern-per-source-shape** approach rather than one universal CDC mechanism:

| Source shape | CDC mechanism | Landing |
|---|---|---|
| **Relational DB (bulk + ongoing)** | **AWS DMS** full load + CDC replication into S3 Bronze Parquet | Append-only change log; MERGE INTO at Silver |
| **Relational DB (incremental only, small)** | **Glue JDBC with bookmark** on `updated_at` watermark | Bronze append |
| **File drop (CSV/Excel/SFTP)** | **S3 event-triggered** ingestion; Bronze `year=/month=/day=/` partitioning; manifest file tracks processed set | Bronze append |
| **API (SaaS CRM/HRIS)** | **Lambda + `updated_since` cursor** stored in DynamoDB | Bronze append |
| **Streaming (future)** | **Kinesis Data Streams → Kinesis Firehose → Iceberg** | Not in initial 10 pipelines |

All mechanisms land **append-only** in Bronze. Upserts/merges happen in the Silver Glue job using Iceberg `MERGE INTO` (ADR-002) for idempotency.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **AWS DMS (selected for relational)** | AWS-native; no third-party install; supports most RDBMS; good S3 Parquet target | Requires DMS instance (not serverless); some setup per source | **Selected** |
| **Debezium (self-hosted)** | Open source; rich connector catalog | Operational overhead (Kafka, Connect); out of 16-week scope | Rejected for Phase 1 |
| **Query-only with `updated_at`** | Simplest | Misses hard deletes; schema drift risk; no replay | Used only for small incremental relational |
| **Full-load always** | Simplest logic | R4 blows the budget | **Rejected** |

## Consequences

**Positive**
- R4 mitigation is concrete: DMS CDC keeps the ERP table sync under 10 minutes at steady state instead of ~hours per full load.
- Append-only Bronze is replayable — if Silver logic changes, we re-run transforms without re-hitting source systems.
- Pattern-per-shape avoids a "one-size-fits-all" universal tool that fits nothing well.

**Negative / costs**
- DMS instance cost (~$200–400/month per replication instance during engagement) — included in AWS infra ROM range.
- Requires DB admin grants on source systems for DMS replication user; captured in R1 access checklist.

**Risks**
- DMS CDC for some legacy DBs (Oracle pre-12c, niche DB2 versions) has known limitations; fallback = `updated_at` watermark with nightly full-load reconciliation.

## Follow-up

- `edp_common` library exposes `IngestConnector` base class with concrete subclasses per pattern.
- Phase 0 source-system inventory (PIPE-001) records the CDC mechanism chosen per source.
- Monitoring captures DMS task lag as a first-class metric on the cross-domain hub.
