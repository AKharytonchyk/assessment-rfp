# Architecture Decision Records (ADRs)

Each ADR uses the **MADR** format (Context / Decision / Alternatives / Consequences). Every significant architectural choice made during this engagement lands here.

## Index

| # | Title | Status | Primary driver |
|---|-------|--------|----------------|
| [001](ADR-001-cloud-provider.md) | Cloud provider: AWS | Proposed | RFP §4, client footprint |
| [002](ADR-002-open-table-format.md) | Open table format: Apache Iceberg | Proposed | Lakehouse ACID, time-travel, schema evolution |
| [003](ADR-003-cdc-pattern.md) | CDC pattern: AWS DMS + file drop + Kinesis | Proposed | R4 (ERP volumes), ingestion scalability |
| [004](ADR-004-schema-registry-contracts.md) | Schema registry + data contracts: Glue Catalog + JSON Schema, CI-enforced SemVer | Proposed | VP Data contract gate, consumer stability |
| [005](ADR-005-dr-strategy.md) | DR strategy: Multi-AZ + CRR, RPO 1h / RTO 4h | Proposed | SA concern #3, BCP |
| [006](ADR-006-dq-engine.md) | DQ engine: Great Expectations primary, Glue DQ fallback | Proposed | R5 mitigation |
| [007](ADR-007-orchestration.md) | Orchestration: AWS Step Functions | Proposed | Cloud-native bias, serverless |
| [008](ADR-008-lineage.md) | Lineage: OpenLineage + Marquez + Spark agent | Proposed | VP Data concern #3 |
| [009](ADR-009-data-catalog-marketplace.md) | Data catalog/marketplace: AWS DataZone | Proposed | Data-mesh discovery UX |
| [010](ADR-010-geospatial-handling.md) | Geospatial: GeoParquet + H3 + spatial ER | Proposed | Client is geo-data specialist |
| [011](ADR-011-access-control-boundary.md) | Access control: Lake Formation authoritative for data, IAM for service boundary | Proposed | SA concern #7 |
| [012](ADR-012-mdm-entity-resolution.md) | MDM / entity resolution: shared Gold dimensions via deterministic + probabilistic match | Proposed | Cross-domain linkage (RFP §3.1) |
| [013](ADR-013-data-observability.md) | Data observability: CloudWatch Anomaly Detection + Soda Core | Proposed | VP Data concern #13 |
| [014](ADR-014-retention-by-classification.md) | Retention by classification tier | Proposed | RFP docs ask; VP Data concern #14 |

## Conventions

- Each ADR has a stable filename (`ADR-NNN-kebab-title.md`) — never renamed after publication.
- Status transitions: Proposed → Accepted → Superseded-by-NNN.
- Supersession is a new ADR that links back — never edit an accepted ADR.
- Each ADR names deciders, date, and linked RFP requirement or risk.
