# ADR-005 — Disaster Recovery Strategy

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, IT/Security Lead, Data Platform Lead |
| **Linked RFP need** | Compliance (§3); NFR (availability, recoverability); SA defender concern |

## Context

No DR/BCP posture is stated in the RFP, but "compliant" and "enterprise" carry implicit DR expectations. Single-region single-AZ deployments are unacceptable for Gold-tier data that executives make decisions against. Single-region multi-AZ is the baseline; cross-region secondary is the conservative choice.

RPO = allowable data loss on disaster. RTO = allowable downtime.

## Decision

- **Primary region:** `eu-west-1` (confirm in Phase 0 based on client residency).
- **Secondary region:** `eu-central-1` (cross-region but intra-EU for GDPR).
- **Availability targets:**
  - Gold S3 read availability: **99.9%** (NFR — see `nfr-slo-matrix.md`)
  - Monitoring UI: **99.5%**
- **RPO / RTO targets:**
  - Gold-tier data: **RPO 1 hour / RTO 4 hours**
  - Silver-tier data: RPO 4 hours / RTO 8 hours
  - Bronze-tier data: RPO 24 hours / RTO 24 hours (replayable from source)
- **Replication mechanisms:**
  - **S3 Cross-Region Replication (CRR)** on Gold bucket with same-key KMS replication; replica is read-only.
  - **Redshift Serverless snapshots** cross-region copy every 1 hour; restore tested quarterly.
  - **Glue Catalog**: IaC-defined, re-applicable in secondary region in minutes; metadata backup every 6 hours to S3.
  - **DynamoDB** (contract registry, DQ results, agent state): Global Tables in primary + secondary.
  - **Lake Formation grants**: reapplied from IaC in secondary on failover.
  - **Iceberg snapshots** serve as consistent recovery points — no torn writes during replication.
- **Failover runbook:** documented step-by-step in `docs/governance/dr-runbook.md` (produced in Phase 4 as part of DOC-002); includes DNS cut-over, IAM role assumption path, consumer notification.
- **DR drill cadence:** tabletop at handoff; first live game-day exercise at 90-day post-handoff milestone.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Multi-AZ single region only** | Cheaper, simpler | Cannot survive regional outage | Rejected for Gold |
| **Active-active multi-region** | Zero RTO | 2× infra cost; write conflict complexity; unnecessary for batch workload | Rejected |
| **Pilot light (selected)** — infra IaC in secondary, data replicated, no running compute | Balance of cost/RTO | 4h RTO vs. minutes for hot-standby | **Selected** |

## Consequences

**Positive**
- Gold tier survives regional failure within 4h; replayable Bronze means Silver can be rebuilt without source re-hit.
- CRR + Iceberg snapshots give a coherent recovery point, not a bag of loose files.

**Negative / costs**
- S3 CRR doubles Gold storage cost (~$0.02/GB/month added); offset by lifecycle rules.
- Redshift snapshot cross-region copy incurs data-transfer cost; capped by snapshot cadence policy.

**Risks**
- Regional service dependencies (e.g., Bedrock model availability) must be verified in secondary — fallback on Anthropic API if Bedrock secondary is unavailable (R9 mitigation).

## Follow-up

- NFR matrix references this ADR for RPO/RTO targets.
- DR runbook is a Phase 4 deliverable (DOC-002 addendum).
