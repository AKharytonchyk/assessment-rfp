# ADR-009 — Data Catalog & Marketplace: AWS DataZone

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Data Platform Lead |
| **Linked RFP need** | §3.1 domain-centric + self-serve; VP Data defender concern #5 |

## Context

Glue Data Catalog is a Hive metastore — a technical registry, not a consumer-facing product. Real data-mesh self-serve requires a **marketplace UX**: browse by domain, search by business term, request access, subscribe, rate, track producer and consumer. Without this layer, "domain ownership" is a slide, not an operating reality.

## Decision

**AWS DataZone** is the data catalog / marketplace layer.

- Producers publish Gold-tier datasets as *data products* with business descriptions, SLAs, contract version, quality score, and owner.
- Consumers discover via domain/search, request access via a workflow, and subscribe (receive breaking-change alerts).
- DataZone projects map 1:1 to business domains; DataZone environments map to DEV/TST/PRD.
- DataZone glossary populates with business terms defined in Phase 0 by Domain Data Owners.
- Glue Catalog remains the runtime metastore; DataZone syncs from Glue and layers governance on top.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **AWS DataZone (selected)** | AWS-native; integrates with Glue, Lake Formation, Redshift, Athena; subscription workflow built-in | Newer service; UX still maturing | **Selected** |
| **DataHub (LinkedIn OSS)** | Rich lineage + marketplace; open | Self-hosted; ops overhead | Strong alternative if DataZone gaps show |
| **Amundsen** | Clean search UX | Less marketplace, more browser | Rejected |
| **Collibra / Alation** | Enterprise governance suites | Licensing cost; overkill for 16-week initial build | Rejected for Phase 1 |

## Consequences

**Positive**
- Discovery becomes a self-serve activity — business users find data products without DMing engineers.
- Subscription model enables contract-change notification (ties to ADR-004).
- Native integration with Lake Formation (ADR-011) means access requests flow through policy as code.

**Negative / costs**
- DataZone pricing (per-user and per-request) — included in AWS infra ROM high-range.
- Requires Domain Data Owner effort to populate business descriptions; captured in the stakeholder time commitment.

## Follow-up

- DataZone setup added to the `domain-template` Terraform module (DataZone project + environment per domain).
- Training session 3 covers DataZone producer/consumer workflow.
