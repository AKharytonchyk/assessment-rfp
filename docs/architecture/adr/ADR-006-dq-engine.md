# ADR-006 — Data Quality Engine

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, Data Eng Lead |
| **Linked RFP need** | §3.2 (DQ metrics: completeness, accuracy, timeliness); R5 mitigation |

## Context

RFP §3.2 explicitly asks for completeness, accuracy, and timeliness checks with logging, alerting, and dashboarding. R5 flags a potential Python version incompatibility between Great Expectations (GX) v1.x (Python ≥3.10) and AWS Glue Python Shell (3.9).

## Decision

- **Primary DQ engine:** **Great Expectations v1.x** for pipeline DQ suites. Expectation suites stored in S3; validation results stored in S3 + DynamoDB for historical trend analysis; Data Docs published to the monitoring React dashboard.
- **Secondary / fallback:** **AWS Glue Data Quality (DQDL)** available for DQ checks that must run inside the Glue Python Shell runtime or where GX compatibility blocks progress.
- **Runtime placement:** GX runs in a **Lambda (Python 3.12) step** invoked by Step Functions between pipeline stages. Glue jobs emit their output to S3 and signal the Lambda via Step Functions — this sidesteps R5.
- **DQ-as-code:** all expectation suites live in the repo under `dq_suites/{domain}/{entity}.json`; versioned; PR-reviewed; linked to the contract (ADR-004).
- **Dimensions mapped to RFP:**

  | RFP dimension | GX expectation families | Example |
  |---|---|---|
  | Completeness | `expect_column_values_to_not_be_null`, row-count vs. source | `customer_email` non-null |
  | Accuracy | `expect_column_values_to_match_regex`, FK lookup, value-range | phone matches E.164 |
  | Timeliness | `expect_column_max_to_be_between` on event timestamps | Gold table max event ts within 1h of wall clock |

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **GX primary + Glue DQ fallback (selected)** | Rich ecosystem, strong docs, flexible placement | Slight ops overhead | **Selected** |
| **Glue DQ (DQDL) only** | AWS-native, runs inside Glue job | Less expressive, DQDL tooling thinner, weaker historical tracking | Fallback only |
| **Soda Core (soda-cl)** | Simple DSL | Anomaly detection is stronger in Soda (see ADR-013 where Soda *is* chosen for anomaly detection, layered with GX for rules) | Used alongside, not instead |
| **dbt tests** | Great for SQL transforms | Not a fit for pre-transform validation or file-shape checks | Not selected as primary |

## Consequences

**Positive**
- R5 sidestepped by running GX in Lambda 3.12, not in Glue.
- DQ suites are code, reviewed like code, evolve like code.
- Historical DQ store enables trend dashboards and regression detection.

**Negative / costs**
- Lambda invocation adds a tiny per-pipeline-stage cost (~$0.000001 per validation).
- Team members new to GX need ramp; addressed in training session 2.

## Follow-up

- See ADR-013 for complementary data-observability (volume/distribution anomaly detection).
- WBS epic `EDP-DQ` (DQ-001..006) implements this pattern.
