# ADR-011 — Access Control Boundary: Lake Formation vs. IAM

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, IT/Security Lead, Data Platform Lead |
| **Linked RFP need** | §3.1 security protocols; §3.3 role-based access; SA defender concern #7 |

## Context

The platform uses **both** IAM and Lake Formation for access control. This is correct — they serve different layers — but the boundary and conflict-resolution rules are not written down. Without clarity, access bugs and "denied even though I have the role" situations are inevitable.

## Decision

- **Lake Formation is authoritative for *data* access at table/column/row-filter grain.** Every Gold/Silver/Bronze S3 read or Glue Catalog read that touches registered S3 locations goes through Lake Formation's permission model.
- **IAM is authoritative for *service and API* boundaries:** who can invoke a Lambda, start a Step Functions execution, write to a specific S3 prefix (non-data-lake), call Bedrock, deploy via GitHub OIDC.
- **Overlap:** S3 data-lake access is jointly governed — IAM must permit the S3 action *and* Lake Formation must permit the table/column grant. Both must allow. Either denies → denied. **Lake Formation deny wins** when LF is configured in strict-mode; IAM-only grants on registered S3 locations are explicitly disabled.
- **Grant issuance via IaC only** — no ClickOps. All Lake Formation grants live in Terraform (`lf_grants.tf` per domain); CODEOWNERS enforces review by Architect + IT/Security on every change.
- **Roles defined in the domain template** (5 per domain): `DomainAdmin`, `DataEngineer`, `DataAnalyst`, `PipelineExecution`, `MonitoringReadOnly`. Each role is IAM-anchored; LF permissions are attached to the IAM role principal.

### Decision matrix

| Scenario | IAM effect | LF effect | Net |
|---|---|---|---|
| Analyst queries Gold table via Athena | Allow (`athena:*`, `glue:GetTable`) | Allow (table SELECT, PII columns masked) | Allowed with masking |
| Analyst tries Silver table | Allow (role has Athena) | Deny (no LF grant) | Denied |
| Engineer writes to Bronze via Glue job | Allow (`s3:PutObject` on domain bucket) | Allow (LF permission on data location) | Allowed |
| Rogue role forged IAM grant on S3 Gold | IAM Allow | LF Deny | **Denied** (LF strict mode) |

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **LF authoritative for data, IAM for services (selected)** | Clear separation; LF is purpose-built for column-level/row-level; IaC-reviewable | LF has a learning curve | **Selected** |
| **IAM-only** | Simpler | No column-level masking; policy-sprawl unmanageable at scale | Rejected |
| **LF for everything** | Consistency | LF doesn't govern non-data services | Not possible |

## Consequences

**Positive**
- Column-level PII masking is native to LF and free.
- Cross-account / cross-domain grants are a first-class LF concept.
- Audit trail: LF logs every grant/revoke to CloudTrail.

**Negative / costs**
- Engineers debugging access issues must check both layers; mitigated by a `diagnose-access.py` helper in `edp_common` that reports IAM, LF, and effective permission.

## Follow-up

- LF strict mode enabled at Phase 1 account setup.
- Access troubleshooting guide in runbook (DOC-002).
