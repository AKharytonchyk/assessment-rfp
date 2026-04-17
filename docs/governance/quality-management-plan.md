# Quality Management Plan

| Field | Value |
|---|---|
| **Unit** | EDP-2026-01 |
| **Project** | Enterprise Data Platform |
| **Owner** | Delivery Manager + QA Engineer |

Quality here means **code, data, and delivery quality** — not just test pass rates. This plan defines what "done" looks like and how deviations are managed.

---

## 1. Defect Severity Taxonomy

| Severity | Definition | Example | SLA to resolution |
|---|---|---|---|
| **Blocker** | Stops further work; production down or security breach | Production pipeline failing; credential leak | **≤ 4 hours** to patch/rollback |
| **Critical** | Major function broken; high user impact | Gold table has incorrect data silently; DQ gate bypass | **≤ 1 business day** |
| **Major** | Significant defect; workaround exists | Slow query (> SLO) on one dashboard view; occasional late arrival | **≤ 3 business days** |
| **Minor** | Cosmetic or edge-case; no functional impact | Typo in dashboard label; single-column formatting issue | **Next sprint** |

**Escalation:** any Blocker or Critical > 50% through SLA triggers Sponsor notification.

## 2. Test Pyramid

Coverage targets per layer:

| Layer | Tooling | Coverage target | Where it runs |
|---|---|---|---|
| **Unit** | `pytest`, `vitest` | ≥ 80% on `edp_common`; ≥ 60% on pipelines; ≥ 70% on React app | PR CI |
| **Integration** | `pytest` + `moto` / `localstack`, Cypress for UI | All cross-service interactions covered | PR CI (nightly for broader suite) |
| **E2E** | `pytest` orchestrated; synthetic data fixtures | Happy-path + 1 failure-path per pipeline | Nightly + pre-release |
| **DQ suites** | Great Expectations | 100% of Gold tables; ≥ 80% of Silver tables | Every pipeline run |
| **Contract** | JSON Schema validator | 100% of producer/consumer pairs | Pre-merge |
| **Security** | Dependabot, pip-audit, npm audit, Trivy, Checkov | Zero critical vulns at deploy | PR CI + weekly |

Target **split**: ~70% unit / ~20% integration / ~10% E2E — cheap-fast-many at the bottom, expensive-slow-few at the top.

## 3. Peer Review

| Artifact | Reviewers | Turnaround |
|---|---|---|
| Code PR | AI reviewer (automated) + 1 senior engineer (CODEOWNER required) | ≤ 24h |
| IaC PR | AI reviewer + Platform Eng + Architect (for new services) | ≤ 24h |
| ADR | Architect author + 1 other senior + DM | ≤ 3 business days |
| Doc PR (runbook, guide) | Tech Writer + subject matter owner | ≤ 2 business days |

**KPIs:**
- PR cycle time (open → merge): p50 ≤ 1 day, p95 ≤ 3 days.
- PR rejection rate: tracked — a healthy sign, not a negative metric.
- AI-reviewer-actioned rate: ≥ 70% of suggestions engaged with (accepted, rebutted, or logged).

## 4. Definition of Done (DoD)

A backlog item is Done when:

1. Code merged to `main` with passing CI (all layers of pyramid green).
2. Unit + integration tests cover new code (meets coverage floor).
3. Integration test executes in DEV successfully.
4. Documentation updated (if applicable — runbook, ADR, user guide).
5. Contract updated + CI gate passed (if touching data).
6. Peer review complete per matrix above.
7. Demonstrated in sprint review.
8. Accepted by Platform Lead (or delegate).

## 5. Quality Gates (phase-level)

Each phase's exit criteria in `docs/delivery/delivery-approach.md` are **hard gates** — no promotion without sign-off. This plan defines the reviewing parties:

| Phase | Gate reviewer |
|---|---|
| 0 → 1 | DM + Platform Lead + SA |
| 1 → 2 | Platform Lead + SA + IT/Security |
| 2 → 3 | Platform Lead + Domain Owner |
| 3 → 4 | Full stakeholder set (pre-UAT) |
| 4 → handoff | Exec Sponsor (formal) |

## 6. Quality Metrics (ongoing)

| Metric | Target | Cadence |
|---|---|---|
| PR cycle time | p95 ≤ 3 days | Weekly |
| Test coverage (repo-level) | ≥ floors above | Per PR |
| Open defects (by severity) | Blocker: 0 · Critical: ≤ 2 · Major: ≤ 10 | Daily standup |
| DQ suite pass rate (Gold) | ≥ 99% of runs | Daily |
| Security scan critical vulns | 0 at deploy | Per PR + nightly |
| Production incidents | 0 escalated to Sponsor | Monthly |

## 7. Escalation

- Defect backlog breaches severity thresholds → surfaced in weekly Exec brief.
- Coverage floor regressions → PR blocked until restored, or CR raised.
- Contract breaks in CI → producer PR blocked; consumer notification fires.

## 8. Review cadence

Plan reviewed at each phase gate. KPI deviations trigger retro item.
