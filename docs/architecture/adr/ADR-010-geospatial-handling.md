# ADR-010 — Geospatial Data Handling

| Field | Value |
|---|---|
| **Status** | Proposed |
| **Date** | 2026-04-17 |
| **Deciders** | Solution Architect, VP Data (client), Data Platform Lead |
| **Linked RFP need** | Client is a geo-data specialist firm (mapping, modeling, monitoring Earth + structures). Core value of the platform is spatial. |

## Context

The client's business is fundamentally spatial — assets are geolocated, measurements are tied to coordinate reference systems (CRS), entities (wells, structures, survey points) are the same across CRM/ERP/survey datasets but recorded under different local grids and identifiers. A generic Parquet-over-S3 lakehouse without first-class spatial handling will force downstream consumers to re-project, re-index, and re-resolve spatial identity on every query — which is slow, expensive, and error-prone.

The RFP is silent on spatial specifics, but a committee defending the client's interests will assume spatial is table stakes, not a feature to be sold later.

## Decision

1. **Storage format** — **GeoParquet 1.1** for Silver and Gold tables containing spatial columns. Bronze stays source-native (GeoJSON, WKT CSV, Shapefile, KML) with a one-way conversion at the Silver transform step.
2. **CRS policy** — all Silver/Gold spatial columns must carry explicit CRS metadata (EPSG code) in the GeoParquet column metadata. Default storage CRS = **EPSG:4326 (WGS84)**. Source CRS is recorded in the Bronze metadata sidecar; re-projection to storage CRS happens in the Silver Glue job. Local grid CRSs (e.g. British National Grid EPSG:27700, UTM zones) are preserved as an additional column when business rules require.
3. **Spatial indexing** — **H3** hex-cell indexes at resolutions 7, 9, and 12 computed at Silver for every point geometry and centroid of polygon/line geometries. H3 index columns are partition-candidate keys on Gold tables.
4. **Spatial entity resolution** — shared Gold dimension `dim_spatial_entity` keyed by asset ID + H3-12 centroid + fuzzy name match. Deterministic resolution first (ID match), probabilistic second (spatial proximity + string similarity). See ADR-012 for MDM/ER pattern.
5. **Raster vs. vector** — vector data (points, lines, polygons) goes through the standard EDP medallion. Raster data (imagery, DEM, orthophotos) is **out of scope** for the initial 10 pipelines; handled via a companion raster pipeline using AWS Open Data Registry patterns + COG (Cloud-Optimized GeoTIFF) in a future phase.
6. **Consumer patterns**:
   - **Athena GEOMETRY UDFs** (ST_ functions) for ad-hoc spatial SQL on Gold.
   - **Redshift Serverless spatial** (GEOMETRY / GEOGRAPHY column types) for BI-grade spatial joins.
   - **Tile server (future)** — CDN-fronted vector tile service (Tippecanoe pre-bake) is noted in the migration plan, not in initial scope.
7. **DQ for spatial** — in addition to standard completeness/accuracy/timeliness checks, each spatial column gets:
   - CRS conformance (matches declared EPSG)
   - Topology validity (no self-intersection, no invalid polygons)
   - Bounding-box sanity (within expected country/region envelope)
   - H3 index presence + correctness at required resolutions

## Alternatives considered

- **Plain Parquet with WKT string columns** — rejected: no native spatial semantics, forces every consumer to reparse; query engines can't push predicates.
- **PostGIS on RDS as Silver/Gold store** — rejected: couples platform to a stateful DB, breaks the lakehouse storage-compute separation, doesn't scale to the ERP volumes flagged in R4.
- **ESRI File Geodatabase as interchange** — rejected: proprietary, poor interop with Glue/Athena/Spark.
- **Delta Lake + spatial extensions** — possible, but ADR-002 selects Iceberg for non-spatial reasons; GeoParquet works cleanly as an Iceberg data file format.
- **Uber H3 vs. Google S2** — both viable; H3 chosen for richer open-source tooling (`h3-py`, PySpark UDF, DuckDB support) and the client team's prior exposure (confirm in Phase 0).

## Consequences

**Positive**
- Spatial queries on Gold are fast and correct by default; consumers don't re-implement re-projection.
- Identity across CRM/ERP/survey datasets is resolved once (at Silver/Gold build time) rather than per-query.
- Standard Athena/Redshift BI tools get spatial capability without custom UDFs beyond the platform-provided library.

**Negative / costs**
- Silver Glue jobs are ~15-20% more expensive (CPU for re-projection + H3 indexing).
- Storage grows ~8-12% due to added H3 index columns at 3 resolutions.
- Introduces a dependency on `geopandas`, `shapely`, `h3`, `pyproj` in the `edp_common` library — adds supply-chain surface area.

**Risks**
- Source CRS metadata may be incomplete or incorrect in legacy files — mitigated by a fallback detection step in the ingestion connector with a quarantine path for ambiguous records.
- H3 resolutions 7/9/12 are opinionated; revisit after Phase 0 with actual data (ADR amendable).

## Follow-ups

- Add spatial DQ suite to Great Expectations configuration (EPIC `EDP-DQ`).
- Extend `edp_common` ingestion framework with `GeoConnector` and a `spatial_transform` helper (EPIC `EDP-PIPELINES`).
- Geo-specialization slide in `slide-content.md` references this ADR.
