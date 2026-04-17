# ADR-007 — Orchestration: AWS Step Functions

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, Platform Eng |
| **Linked RFP need** | §3.1 automation; §3.2 pipeline health |

## Context

Pipelines are multi-step DAGs: ingest → DQ → transform → DQ → publish → notify. They need retry/backoff, per-step error handling, observable state transitions, parameterization, and the ability to invoke AWS services natively.

## Decision

**AWS Step Functions** (Standard workflow) is the orchestrator for all data pipelines.

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Step Functions (selected)** | Native AWS integration (Glue, Lambda, EventBridge, SNS); serverless; pay-per-transition; JSON/ASL is codifiable and diff-able; native error handling and retry | Visual editor is helpful but ASL editing is the durable path | **Selected** |
| **MWAA (Managed Airflow)** | Rich DAG ecosystem; Python-native | Managed instance overhead; overkill for our DAG shapes; cold-start delay | Rejected |
| **Dagster Cloud** | Modern asset-oriented model | Third-party SaaS; extra cost; not in scope for 16 weeks | Rejected |
| **Prefect / Flyte** | Python-native | Self-hosted complexity or third-party dependency | Rejected |

## Consequences

**Positive**
- Every pipeline run is an observable execution with an ARN — Step Functions history is first-class audit.
- Easy to express retry/backoff/error paths with JSON — not hidden in code.
- Parameterized state machines let one template serve N pipelines.

**Negative / costs**
- ASL JSON is verbose; mitigated by Terraform module generating the skeleton.
- Standard workflow transitions cost ~$0.025 per 1000 — at our volume, negligible.

## Follow-up

- `domain-template` Terraform module provisions a parameterized state-machine skeleton per pipeline.
- Monitoring dashboards read Step Functions execution history directly.
