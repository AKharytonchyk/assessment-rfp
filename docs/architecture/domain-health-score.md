# Domain Health Score — Formula & Mechanics

| Field | Value |
|---|---|
| **Owner** | Solution Architect |
| **Consumers** | Monitoring React dashboard (cross-domain hub), Grafana SLO dashboard, Exec brief |
| **Cadence** | Computed every 15 minutes; dashboard refresh every 5 min |

The cross-domain monitoring hub (slide 12) shows a **health score per domain**. Without a published formula, this score is a vibe. Here it is, defensible.

---

## 1. Formula

```
health_score(domain) =
    0.40 · DQ_score
  + 0.30 · freshness_score
  + 0.20 · pipeline_success_rate
  + 0.10 · (1 − cost_anomaly_severity)
```

Range: 0.00 (worst) to 1.00 (best). Dashboard rendering:

| Score | Color | Interpretation |
|---|---|---|
| ≥ 0.95 | Green | Healthy |
| 0.80 – 0.94 | Yellow | Degraded — investigate |
| < 0.80 | Red | Breaching SLO — active incident |

## 2. Component definitions

### DQ_score (weight 0.40)

For the last 24 hours, across all Gold tables in the domain:

```
DQ_score = (passed_GX_expectations) / (total_GX_expectations)
```

Computed from the GX validation results store (DynamoDB).

### freshness_score (weight 0.30)

For each Gold dataset in the domain with a declared freshness SLO:

```
freshness_score(dataset) =
    1.0 if actual_lag ≤ SLO
    1 − min(1, (actual_lag − SLO) / SLO)  otherwise
```

Domain-level score = average across datasets, weighted by dataset business importance (column `business_weight` in DataZone metadata; default = 1).

### pipeline_success_rate (weight 0.20)

For the last 24 hours, across all pipelines in the domain:

```
pipeline_success_rate = successful_runs / total_runs
```

Computed from Step Functions execution history.

### cost_anomaly_severity (weight 0.10, inverted)

CloudWatch Anomaly Detection reports a severity score 0 (normal) to 1 (extreme anomaly) on `daily_spend_by_domain`. We invert it so low anomaly → high score.

```
cost_term = 1 − cost_anomaly_severity   # bounded [0, 1]
```

## 3. Weight rationale

| Component | Weight | Why this weight |
|---|:--:|---|
| DQ | 0.40 | Data correctness is the primary value proposition; weighted highest. |
| Freshness | 0.30 | Stale right data is often worse than late wrong data for exec decisions. |
| Pipeline success | 0.20 | Operational signal — pipelines failing shows up here but shouldn't dominate over data correctness. |
| Cost | 0.10 | Important, but cost anomalies alone shouldn't turn a domain "red" — they're a warning signal. |

## 4. Per-domain override

Domains with distinct profiles can override weights via DataZone metadata key `health_score_weights`. Example for an experimental / low-stakes domain:

```json
{
  "health_score_weights": {
    "dq": 0.25,
    "freshness": 0.15,
    "pipeline_success": 0.40,
    "cost": 0.20
  }
}
```

Constraints: weights must sum to 1.00, each weight ∈ [0.05, 0.60]. Override requires Data Platform Lead approval + entry in decision log.

## 5. Worked example

Scenario: Sales domain, 14:00 UTC today.

- GX expectations: 487 passed of 492 total → **DQ_score = 0.9898**
- Freshness (3 Gold datasets, equal weight):
  - `dim_customer`: actual lag 38 min vs SLO 60 min → 1.00
  - `fact_orders`: actual lag 85 min vs SLO 60 min → 1 − min(1, (85-60)/60) = 0.583
  - `dim_product`: actual lag 15 min vs SLO 60 min → 1.00
  - Average: **freshness_score = 0.861**
- Pipelines: 96 successful runs of 100 → **pipeline_success_rate = 0.96**
- Cost anomaly: CW reports severity 0.12 → **cost_term = 0.88**

Composite:
```
= 0.40 · 0.9898 + 0.30 · 0.861 + 0.20 · 0.96 + 0.10 · 0.88
= 0.3959 + 0.2583 + 0.192 + 0.088
= 0.9342
```

Display: **Yellow (0.93)** — degraded. Dashboard drill-down highlights `fact_orders` freshness as the biggest component contributor.

## 6. What triggers an alert

Yellow (< 0.95) for > 2 consecutive 15-min windows → Slack `#edp-delivery` info. Red (< 0.80) for any window → PagerDuty. Formula reassessed at each phase gate; re-tuned via CR process if needed.

## 7. Referenced from

- `docs/architecture/observability.mmd` — dashboard layer
- `docs/architecture/nfr-slo-matrix.md` — error budget computation
- `docs/governance/benefits-realization-plan.md` — KPI #6 (data incidents caught pre-prod) feeds into DQ_score
