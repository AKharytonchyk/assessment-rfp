# ADR-013 — Data Observability / Anomaly Detection

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Data Eng Lead |
| **Linked RFP need** | §3.2 monitoring + alerts; VP Data defender concern #13 |

## Context

Great Expectations (ADR-006) validates **rules we wrote**. Data observability validates **patterns we didn't write** — sudden volume drops, distribution shifts, cardinality explosions, late-arriving partitions, freshness drift. Monte Carlo, Metaplane, Bigeye are the commercial players; a 16-week engagement needs something deployable now without procurement.

## Decision

Two complementary mechanisms:

1. **CloudWatch Anomaly Detection** on key pipeline metrics (records_processed_total, pipeline_duration_seconds, dq_completeness_score per table). CW Anomaly Detection learns baselines and alerts on statistical deviation. Free tier covers the volume we emit.
2. **Soda Core** (open source, Apache 2.0) on Gold tables, run nightly, for:
   - Null-rate drift
   - Cardinality drift
   - Freshness monitoring (last update recency)
   - Distribution sketches (percentile drift)
3. **Commercial evaluation (deferred):** Monte Carlo / Metaplane evaluated in the migration plan for steady-state. Cost-benefit run at 90-day post-handoff.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **CW Anomaly + Soda Core (selected)** | Zero license cost; deployable in Phase 3; covers the defender ask | Not as full-featured as Monte Carlo | **Selected** |
| **Monte Carlo** | Best-in-class | License cost + procurement cycle incompatible with 16 weeks | Deferred |
| **DIY with pandas + alerts** | Free | Becomes a maintenance burden; reinvents the wheel | Rejected |
| **No data observability (rely on GX rules)** | Zero build | Silent drifts pass rule-based checks | **Rejected** |

## Consequences

**Positive**
- Catches "the pipeline ran fine but 30% fewer rows" — a whole category of silent failures GX misses.
- Free or near-free — fits within the ROM AWS infra range.

**Negative / costs**
- Soda Core runs nightly; ~$5-15/month in Glue DPU equivalent per domain.
- False-positive rate during the first 2-4 weeks of baseline learning; tuning window required.

## Follow-up

- WBS OBS-011 (lineage) and OBS-004 (custom CloudWatch metrics) already cover emission; ADR adds the anomaly consumers.
- Benefits-realization plan (governance) tracks anomaly alert actioned-rate as a KPI.
