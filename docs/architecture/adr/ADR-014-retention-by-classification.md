# ADR-014 — Retention By Classification Tier

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, IT/Security Lead, Domain Data Owners |
| **Linked RFP need** | RFP deliverable "detailed retention docs"; VP Data defender concern #14 |

## Context

The `domain-template` applied a single uniform retention policy (90d raw → Glacier; 1yr curated → Glacier; 3yr published → archive). Retention in a compliance context is **dataset-specific** and driven by classification tier (Public/Internal/Confidential/Restricted), regulatory regime (GDPR right-to-erasure, SOX), and business purpose.

## Decision

Retention is driven by **classification tier**, not by medallion layer alone. Medallion layer affects *format* and *tier transition cadence*; classification drives *overall lifespan*.

| Classification | Hot (S3 Standard) | Warm (S3 IA / Glacier Instant) | Cold (Glacier Deep Archive) | Final action |
|---|---|---|---|---|
| **Public** | 30 days | — | — | Delete |
| **Internal** | 90 days | 275 days (to 1 year) | — | Delete |
| **Confidential** | 90 days | 275 days (to 1 year) | 730 days (to 3 years) | Delete |
| **Restricted (regulated)** | 90 days | 275 days (to 1 year) | 2,190 days (to 7 years) | **Legal hold hook**, manual disposition |

- **GDPR right-to-erasure** — each Restricted dataset has a `subject_id` column; an `erase-subject` Lambda implements point-deletion across all tiers (including Glacier via restore → delete → re-archive). RTO for erasure request: 30 days from verified request.
- **Purge process** — quarterly automated purge run; every deletion logged to CloudTrail and a retention-audit table; data owner receives a pre-purge report 30 days ahead.
- **Legal hold** — a flag on a dataset or subject blocks all deletion transitions; released only by IT/Security + Exec Sponsor approval.
- **Per-dataset override** — the data owner can shorten retention in DataZone metadata; never extend past the classification tier's policy without compliance review.
- **Classification source** — Macie + custom classifiers at Bronze arrival (see Step 7 / SEC-005a) produce the initial classification; Domain Data Owner validates at Silver promotion.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Uniform retention** (original) | Simple | Non-compliant with GDPR for PII; over-retains Public data | **Rejected** |
| **Classification-driven (selected)** | Compliance-fit; cost-optimized | Small complexity in lifecycle rules | **Selected** |
| **Per-dataset manual policy** | Max flexibility | Un-auditable; policy sprawl | Rejected |

## Consequences

**Positive**
- GDPR-ready; compliance auditors see a documented, enforced policy.
- Storage cost optimized — Public data doesn't sit in Glacier for 3 years.
- Classification is a property of the data, not of the bucket — consistent across domains.

**Negative / costs**
- Slightly more complex S3 lifecycle configurations per domain (automatable from classification tag).
- Glacier restore cost for erasure requests on old Restricted data — factored into contingency.

## Follow-up

- `domain-template` Terraform module reads per-bucket-object classification tag and applies lifecycle accordingly.
- `docs/governance/dr-runbook.md` references this ADR for the legal-hold process.
- Benefits-realization plan tracks "% datasets with classification applied" as a KPI.
