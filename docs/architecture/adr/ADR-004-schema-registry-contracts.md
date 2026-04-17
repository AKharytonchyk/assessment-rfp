# ADR-004 — Schema Registry + Data Contracts

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Data Eng Lead |
| **Linked RFP need** | Reusability, standardization (§3.1); data quality (§3.2); VP Data defender concern |

## Context

"Data contract" is the explicit, versioned agreement between a producer (a pipeline) and its consumers (analysts, other pipelines, ML) about a dataset's schema, semantics, freshness, and quality. Without a mechanism to define, version, and **enforce** contracts at PR time, breaking changes escape to production and consumers find out via broken dashboards.

The RFP calls for reusable templates and standardized processes (§3.1) and data quality (§3.2). VP-Data persona flagged the absence of a CI-enforced contract gate as a blocker.

## Decision

- **Contract definition format:** JSON Schema files co-located with the pipeline code under `contracts/{domain}/{entity}/v{N}.json`. Each contract declares columns, types, nullability, regex/enum constraints, business-key columns, freshness SLO, and PII classification per column.
- **Versioning:** Strict **SemVer**. Additive columns = MINOR. Breaking changes (rename, type narrow, nullability tighten, column drop) = MAJOR and require a migration plan note and consumer sign-off.
- **Registry:** Glue Data Catalog is the runtime registry. Contracts are the *source of truth* in Git; a CI step syncs the accepted contract to Glue Catalog comments/parameters + a DynamoDB contract-registry table keyed by `(domain, entity, version)`.
- **CI gate:** GitHub Actions workflow runs `scripts/validate-contract.py` on every PR touching `contracts/` or pipeline code. On breaking change detection (diff against `main`), the PR is blocked unless (a) MAJOR bump is applied **and** (b) a `consumers.yaml` sign-off file lists acknowledgements from every registered consumer.
- **Runtime enforcement:** the Silver transform step validates output against the contract before writing; mismatches route to the quarantine path and alert.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **JSON Schema in repo + Glue Catalog (selected)** | Tooling-neutral; Git-first; cheap; integrates with CI naturally | No central UI for browsing | **Selected** — DataZone (ADR-009) gives the browsing UX |
| **Confluent Schema Registry** | Industry standard, great Avro/Protobuf story | Overkill without Kafka; extra managed service | Rejected |
| **AWS Glue Schema Registry** | AWS-native | Avro/Protobuf focused; weaker for JSON-first pipelines; less contract-semantic | Rejected |
| **Apicurio** | Open source, Avro + JSON | Requires self-hosting | Rejected |
| **Nothing formal (tribal knowledge)** | Zero build cost | Fails the VP-Data defender test | **Rejected** |

## Consequences

**Positive**
- Consumer stability: breaking changes cannot ship silently.
- Contract-as-code is reviewable, auditable, and blameable via Git history.
- SemVer discipline forces intentional thinking about impact before merge.

**Negative / costs**
- Every pipeline now requires a contract file — small effort per pipeline, mandatory pattern in the reference pipeline (`PIPE-003`).
- Consumer sign-off process can slow down legitimate breaking changes; mitigated with a 7-day SLA and silence-is-consent clause on inactive consumers.

**Follow-up**
- See `docs/architecture/data-contract-ci-gate.md` for a worked example of a JSON Schema, a failing CI output, and the consumer sign-off file format.
