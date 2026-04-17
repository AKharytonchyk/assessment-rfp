# EDP RFP Response · Project `EDP-2026-01`

Enterprise Data Platform — RFP response package. Domain-centric lakehouse on AWS, AI-accelerated delivery, 16-week engagement.

**Primary artifact:** 📺 [**Presentation (live)**](./index.html) — reveal.js + EPAM dark palette

Locally: `open index.html`. Hosted: [GitHub Pages URL once deployed].

Navigation — arrow keys; `Esc`/`O` overview; `F` fullscreen; `.` pause screen.

---

## Repository map

| Area | Content |
|---|---|
| [`index.html`](./index.html) | Reveal.js presentation — 26 slides + Appendix B |
| [`docs/slides/slide-content.md`](./docs/slides/slide-content.md) | Slide-by-slide narrative with speaker notes (source of truth for deck) |
| [`docs/architecture/`](./docs/architecture/) | Architecture — diagrams, NFR/SLO matrix, C4 L3, data-contract CI gate, domain health score |
| [`docs/architecture/adr/`](./docs/architecture/adr/) | **14 ADRs** in MADR format — cloud, Iceberg, CDC, schema contracts, DR, DQ, orchestration, lineage, catalog, geospatial, access control, MDM, data observability, retention |
| [`docs/delivery/`](./docs/delivery/) | WBS · ROM · resource plan · delivery approach · RACI · pipeline prioritization · adoption plan |
| [`docs/risk/`](./docs/risk/) | Risk register · assumptions log · client stakeholders |
| [`docs/governance/`](./docs/governance/) | Project charter · CR template · comms plan · QMP · stakeholder register · benefits realization · lessons learned |

---

## Quick links — by committee persona

### 🏛️ Solution Architect
- [14 ADRs index](./docs/architecture/adr/README.md)
- [NFR / SLO matrix](./docs/architecture/nfr-slo-matrix.md)
- [C4 L3 reference pipeline](./docs/architecture/c4-component-reference-pipeline.mmd)
- [Architecture diagrams (Mermaid)](./docs/architecture/)

### 🎯 Product Manager
- [Pipeline prioritization framework](./docs/delivery/pipeline-prioritization.md)
- [Adoption plan · 30/60/90 KPIs](./docs/delivery/adoption-plan.md)
- [Benefits realization plan](./docs/governance/benefits-realization-plan.md)

### 📋 Director PM (PSM / PMBOK)
- [Project Charter](./docs/governance/project-charter.md)
- [Change Request template + register](./docs/governance/change-request-template.md)
- [Communications plan](./docs/governance/communications-plan.md)
- [Quality Management Plan](./docs/governance/quality-management-plan.md)
- [Stakeholder Register](./docs/governance/stakeholder-register.md)
- [Risk Register (RDM format)](./docs/risk/risk-register.md)
- [Assumptions Log](./docs/risk/assumptions.md)
- [WBS with PD reconciliation](./docs/delivery/wbs.md)
- [ROM financial proposal](./docs/delivery/rom.md)
- [Resource plan (T&M, 100% allocation)](./docs/delivery/resource-plan.md)
- [Delivery approach + critical path](./docs/delivery/delivery-approach.md)

### 📊 VP of Data
- [ADR-002 — Apache Iceberg](./docs/architecture/adr/ADR-002-open-table-format.md)
- [ADR-004 — Data contracts + schema registry](./docs/architecture/adr/ADR-004-schema-registry-contracts.md)
- [Data Contract CI Gate walkthrough](./docs/architecture/data-contract-ci-gate.md)
- [ADR-008 — OpenLineage + Marquez](./docs/architecture/adr/ADR-008-lineage.md)
- [ADR-009 — AWS DataZone](./docs/architecture/adr/ADR-009-data-catalog-marketplace.md)
- [ADR-010 — Geospatial handling](./docs/architecture/adr/ADR-010-geospatial-handling.md)
- [ADR-012 — MDM & entity resolution](./docs/architecture/adr/ADR-012-mdm-entity-resolution.md)
- [ADR-013 — Data observability](./docs/architecture/adr/ADR-013-data-observability.md)
- [Domain health score formula](./docs/architecture/domain-health-score.md)

---

## Scope summary

- **Client:** [Firm] — geo-data specialist
- **Stack:** AWS cloud-native (Azure Fabric variant available with delta ROM)
- **Deliverables:** 10 pipelines across 2 domains · reusable templates · CI/CD · DQ framework · monitoring hub · training · migration plan
- **Duration:** 16 weeks
- **Team:** Central Europe, 4 → 7 → 6 FTE ramp
- **ROM:** $403K – $449K (T&M)

---

## How to deploy as GitHub Pages

1. **Create a public GitHub repo** (e.g. `assessment-rfp`).
2. **Commit and push** this folder:
   ```bash
   cd /Users/Artsiom_Kharytonchyk/Git/GitHub/assessment-rfp
   git init
   git add .
   git commit -m "Initial EDP RFP response package"
   git branch -M main
   git remote add origin https://github.com/<your-username>/assessment-rfp.git
   git push -u origin main
   ```
3. **Enable Pages:** Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save.
4. **Tag the submission** (immutable snapshot for committee review):
   ```bash
   git tag -a v1.0-assessment -m "Assessment submission snapshot"
   git push origin v1.0-assessment
   ```
5. **Share** the Pages URL + repo URL in the submission email.

### Pre-submission checklist

- [ ] Public repo, no secrets, no internal identifiers (verified — only `EDP-2026-01`)
- [ ] `index.html` renders — open locally first, check all 26 slides advance
- [ ] All links in slide deck and README resolve
- [ ] Tagged `v1.0-assessment` so committee reviews a pinned commit
- [ ] Pages build green in repo Settings → Pages
- [ ] Submission email includes:
  - Pages URL (primary)
  - Repo URL (evidence)
  - Tag/commit SHA
  - 2-sentence TL;DR
  - Optional: PDF print of `index.html` as offline fallback

---

## Local preview

```bash
# Simple
open index.html

# Or a local server (better for reveal.js hash navigation)
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Attribution

- Reveal.js 5.x — MIT
- Mermaid 11.x — MIT
- EPAM dark palette — template from `../reveal-epam-template/`
