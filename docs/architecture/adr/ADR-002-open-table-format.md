# ADR-002 — Open Table Format: Apache Iceberg

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Data Eng Lead |
| **Linked RFP need** | §3.1 standardized, §3.2 DQ/monitoring (implied time-travel), §3.3 validation |

## Context

Plain Apache Parquet on S3 has no ACID semantics, no time-travel, no schema-evolution guardrails, no hidden partitioning, and no safe concurrent writes. For a medallion lakehouse that will be written by multiple Glue jobs, read by Athena and Redshift Spectrum, and queried by BI tools, these gaps manifest as silent partial reads during writes, lost history for reproducibility, and expensive full-rewrite partition migrations.

The three production-grade open table formats in 2026 are **Apache Iceberg**, **Delta Lake**, and **Apache Hudi**. All three are AWS-supported to various degrees.

## Decision

**Apache Iceberg** for all Silver and Gold tables. Bronze remains plain Parquet / source-native (Iceberg overhead is wasted on an append-only immutable tier).

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Apache Iceberg** | First-class support in Athena, EMR, Glue, Redshift Spectrum; hidden partitioning; partition evolution without rewrite; branch/tag/rollback; broad engine support; vendor-neutral (Apache) | Slightly younger tooling than Delta | **Selected** |
| **Delta Lake** | Mature; good Spark ergonomics; widely used | Athena support lags Iceberg; partition evolution is weaker; tighter Databricks gravity | Not selected |
| **Apache Hudi** | Record-level upserts; good for CDC landing | Smaller AWS-native integration surface; ecosystem smaller | Not selected |
| **Plain Parquet** | Simple | No ACID, no time-travel, no safe concurrent writes | **Rejected** |

## Consequences

**Positive**
- Time-travel / snapshot isolation enables reproducible reports ("show me last quarter's numbers as they were at close") and safe rollback of bad upstream data.
- Schema evolution (add column, rename, drop, type widen) without rewriting history — huge for geo-data where survey schemas evolve.
- Hidden partitioning means queries stay fast without the client team memorizing partition columns.
- Branch/tag support enables WAP (write-audit-publish) patterns for high-stakes Gold tables.

**Negative / costs**
- Small metadata overhead per write (~0.5–2% of Parquet write cost).
- Compaction jobs must be scheduled (OPTIMIZE/VACUUM) — built into pipeline templates.
- Slight learning curve for engineers new to Iceberg; mitigated in training session 2.

**Risks**
- Iceberg table maintenance (expire snapshots, compact files) must run or table bloat creeps in — captured as a scheduled maintenance job in the platform template.

## Follow-up

- Iceberg maintenance job added to `domain-template` IaC module.
- Bronze → Silver Glue jobs use Iceberg MERGE INTO semantics for idempotent reprocessing.
- DR strategy (ADR-005) leverages Iceberg snapshots for cross-region replication checkpointing.
