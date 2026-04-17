# ADR-012 — Master Data & Entity Resolution

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Domain Data Owners |
| **Linked RFP need** | §3.1 cross-domain data linkages; SA defender concern #10; VP Data defender concern #6 |

## Context

RFP §3.1 asks for "linkages for cross-domain data." The initial plan treated this as Gold-layer joins (WBS PIPE-014, 5 PD), which is a query-time workaround, not a strategy. Real cross-domain value requires that the *same entity* (a customer, an asset, a location, a geo-structure) reconcile to a single key across CRM/ERP/HRIS/survey systems.

For a geo-data firm, spatial entities dominate — the same well, survey point, or structure appears under different IDs across datasets, sometimes with only a fuzzy name and a coordinate pair as the match signal.

## Decision

- **Pattern:** Shared Gold dimension tables, built once per business entity, referenced by fact tables across all domains.
  - `dim_customer` — from CRM + ERP + HRIS (where applicable)
  - `dim_asset` — from ERP + survey / geo datasets
  - `dim_location` — geographic hierarchy, tied to `dim_spatial_entity` (ADR-010)
  - `dim_spatial_entity` — geo-data specialization: reconciles wells/structures/survey points across datasets
- **Match approach (two-phase):**
  1. **Deterministic match** — exact match on any strong key (tax ID, asset ID, well API number, DUNS number). Fastest; produces highest-confidence links.
  2. **Probabilistic match** — for rows unresolved in phase 1, use a combination of:
     - Fuzzy name match (Jaro-Winkler, threshold configurable per entity)
     - Address normalization + match
     - For spatial entities: **H3-12 proximity** (within same or adjacent hex) + bounding-box containment
     - Configurable threshold; anything below threshold → `mdm_quarantine` table for manual review
- **Tooling:**
  - **AWS Entity Resolution** as the primary managed service (handles ML-based matching with bring-your-own or packaged ML models).
  - **Zingg** (open source, Apache 2.0) available as a fallback/complement for complex probabilistic cases AWS ER doesn't cover cleanly.
- **Survivorship rules:** defined per attribute per entity in `mdm_rules/{entity}.yaml` (e.g. "newest non-null wins" for email, "source-ranked" for address with CRM > ERP).
- **Versioning:** each resolved entity has `mdm_cluster_id` (stable across runs) and `mdm_version` (bumps when cluster membership changes); fact tables use `mdm_cluster_id` as the join key.
- **Ownership:** Domain Data Owners define strong keys, thresholds, and survivorship rules. Platform team implements the pipeline. MDM rules are code-reviewed.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Gold-layer joins only** | Zero build | No stable identity; joins break when source IDs change; unusable for cross-domain analytics | **Rejected** |
| **AWS Entity Resolution + Zingg (selected)** | Balances managed service + OSS flexibility; handles deterministic and probabilistic | Requires ML-config maintenance | **Selected** |
| **Commercial MDM (Reltio, Tamr)** | Enterprise-grade | License cost + out-of-scope for 16 weeks | Deferred to migration plan |
| **Dedicated graph DB (Neo4j) for ER** | Good for relationship-heavy | Heavy ops; learning curve | Rejected |

## Consequences

**Positive**
- Cross-domain queries become meaningful — "all activity for customer X across CRM and ERP" actually returns a stable result.
- For geo-data, spatial entity reconciliation is the core value proposition, now delivered.
- Survivorship and quarantine create an auditable data-quality story for the executive.

**Negative / costs**
- MDM pipeline is its own thing; adds 1 pipeline to the "10 pipelines" scope footprint — mitigated by counting it as a **platform capability**, not a business pipeline, with incremental budget captured in the contingency.
- Domain Owner time commitment increases slightly for rule definition.

**Risks**
- Probabilistic match can produce false positives that mis-merge; quarantine + manual review workflow mitigates, plus a `mdm_split` action if discovered post-merge.

## Follow-up

- Phase 1 deliverable: `dim_spatial_entity` skeleton + deterministic match.
- Phase 2 deliverable: probabilistic match for `dim_customer` using CRM+ERP.
- Phase 3 deliverable: `dim_asset` cross-domain resolution.
