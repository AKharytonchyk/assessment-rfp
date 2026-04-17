# ADR-001 — Cloud Provider: AWS

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, Data Platform Lead, IT/Security Lead |
| **Linked RFP need** | §4 — cloud-native on AWS / Azure / GCP |

## Context

RFP §4 is explicitly cloud-agnostic — AWS, Azure, or GCP are all acceptable. RFP §10.3a requests reference projects on "Microsoft data technologies," which in isolation could suggest an Azure preference. The client has not (pre-engagement) stated an existing cloud footprint, but Phase 0 discovery will confirm.

A cloud choice locks in hundreds of downstream decisions (IaC syntax, identity federation, data warehouse, serverless runtime, monitoring, AI/ML). It has to be made early and defended.

## Decision

**AWS.**

## Alternatives considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **AWS** | Breadth of data services (Glue, Lake Formation, Athena, Redshift Serverless, DataZone, Bedrock, Macie); strong Step Functions + IaC ecosystem; EPAM delivery-team depth; Bedrock Claude for AI acceleration | Some data services (Redshift cold start, Glue DPU pricing) need tuning | **Selected** |
| **Azure + Microsoft Fabric** | Matches RFP §10.3a "Microsoft data technologies" hint; Fabric offers unified lakehouse + Power BI; Purview for governance | Fabric is young; unified licensing model less predictable; EPAM CE bench is more AWS-weighted for data-platform roles | Offered as alternative with delta ROM on request |
| **GCP** | BigQuery is world-class; Dataplex governance; Looker | Lower RFP relevance; weaker AI/LLM story vs. Bedrock | Not pursued |
| **Multi-cloud** | Portability argument | Doubles complexity, cost, and delivery risk for a 16-week engagement | Rejected |

## Consequences

**Positive**
- All downstream ADRs (002, 003, 005, 007, 008, 009, 011, 014) cleanly target AWS services.
- T&M team is fully AWS-qualified; no ramp on primary stack.
- AI acceleration via Amazon Bedrock sits natively inside the client's own account boundary (data sovereignty).

**Negative / costs**
- If the client already operates a large Azure footprint, network/identity integration cost is higher (TR-01 address).
- Ties to AWS services create lock-in; mitigated by using open formats (Iceberg, GeoParquet, OpenLineage) wherever possible so data/metadata remain portable.

**Follow-up**
- Validate client's existing cloud investments in Phase 0.
- If Azure/Fabric is preferred post-discovery, this ADR is superseded by an ADR-001b and a delta ROM is prepared; core medallion/data-contract/DQ choices are substantially portable.

## Response to RFP §10.3a

RFP §4 governs tech stack (cloud-agnostic). §10.3a's "Microsoft data technologies" reference wording is interpreted as a request for proof of data-platform capability generally. EPAM reference projects on Azure Fabric, Databricks-on-Azure, and Synapse are available in Appendix B of the deck.
