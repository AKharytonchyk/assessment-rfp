# EDP RFP Response · Project `EDP-2026-01`

Enterprise Data Platform — RFP response package. Domain-centric lakehouse on AWS, AI-accelerated delivery, 16-week engagement.

## 📺 Primary artifact

**Live presentation** — [**akharytonchyk.github.io/assessment-rfp**](https://akharytonchyk.github.io/assessment-rfp/)

reveal.js · EPAM dark palette · **40 slides** (incl. Appendix B · ~20 min talk)

Navigation: arrow keys · `Esc`/`O` overview · `F` fullscreen · `.` pause. Click any C4 diagram to expand.

## 📎 Offline fallback (auto-generated)

PDF and PPTX exports are produced locally via `scripts/` — they live in `exports/` (gitignored, regenerate per content change):

```bash
cd scripts && npm install && npm run install-browser
npm run export   # → exports/EDP-RFP-Response.pdf + .pptx
```

See [`scripts/README.md`](./scripts/README.md) for details.

## 🏷️ Submission snapshot

Tag [`v1.0-assessment`](https://github.com/AKharytonchyk/assessment-rfp/tree/v1.0-assessment) points to the immutable commit committee reviewers see.

---

## Repository map

| Area | Content |
|---|---|
| [`index.html`](./index.html) | Reveal.js presentation source — 40 slides total (incl. Appendix B) |
| `exports/` | PDF + PPTX artifacts — gitignored, regenerated locally via [scripts](./scripts/README.md) |
| [`scripts/`](./scripts/) | Playwright + pptxgenjs export tooling (PDF + PPTX) |
| [`docs/slides/slide-content.md`](./docs/slides/slide-content.md) | Slide-by-slide narrative with speaker notes (source of truth) |
| [`docs/architecture/`](./docs/architecture/) | NFR/SLO matrix · data-contract CI gate · domain health score · Mermaid diagrams (c4-context, cicd-flow, medallion, observability, roadmap, etc.) |
| [`docs/architecture/adr/`](./docs/architecture/adr/) | **14 ADRs** in MADR format — cloud, Iceberg, CDC, schema contracts, DR, DQ, orchestration, lineage, catalog, geospatial, access control, MDM, data observability, retention |
| [`docs/architecture/c4/`](./docs/architecture/c4/) | C4 diagrams — PUML source + rendered PNG (context, container, component) |
| [`docs/delivery/`](./docs/delivery/) | WBS · ROM · resource plan · delivery approach · RACI · pipeline prioritization · adoption plan |
| [`docs/risk/`](./docs/risk/) | Risk register · assumptions log · client stakeholders |
| [`docs/governance/`](./docs/governance/) | Project charter · CR template · comms plan · QMP · stakeholder register · benefits realization · lessons learned |

---

## Quick links — by committee persona

### 🏛️ Solution Architect
- [14 ADRs index](./docs/architecture/adr/README.md)
- [NFR / SLO matrix](./docs/architecture/nfr-slo-matrix.md)
- [C4 diagrams (PUML + PNG)](./docs/architecture/c4/) · [Reference pipeline (C4 Component)](./docs/architecture/c4/c4-component-pipeline.puml)
- [Architecture overview (all diagrams + artifacts)](./docs/architecture/)

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
- **Duration:** 16 weeks · **Team:** Central Europe, 4 → 7 → 6 FTE ramp
- **ROM:** $403K – $449K (T&M)

---

## Local preview

Open [`index.html`](./index.html) directly in a browser, or run a static server (better for Reveal.js hash navigation):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Reproduce the deployment

If you need to redeploy (fork, new repo, etc.):

```bash
# Push to a public GH repo
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main

# Enable Pages
gh api --method POST /repos/<user>/<repo>/pages \
  -f "source[branch]=main" -f "source[path]=/"

# Tag submission snapshot
git tag -a v1.0-assessment -m "Assessment submission"
git push origin v1.0-assessment
```

---

## Pre-submission checklist

- [x] Public repo, no secrets, no internal identifiers (project code `EDP-2026-01`)
- [x] `index.html` renders — all 40 slides navigable via arrow keys + #/n hash
- [x] All deep-links in the deck resolve (14 ADRs · supporting docs · C4 PNGs)
- [x] Tag `v1.0-assessment` at current HEAD
- [x] GitHub Pages build green → https://akharytonchyk.github.io/assessment-rfp/
- [x] PDF + PPTX exports produced via `scripts/`
- [ ] Submission email sent to committee with:
  - Pages URL (primary)
  - Repo URL (evidence)
  - Tag `v1.0-assessment`
  - PDF attachment (offline fallback)
  - Optional: PPTX attachment

---

## Attribution

- **reveal.js** 5.x — MIT
- **C4-PlantUML** on PlantUML — GPL
- **Graphviz** — EPL
- **Playwright + pptxgenjs** (export tooling) — Apache-2.0 / MIT
- **Fraunces · Hanken Grotesk · JetBrains Mono** — SIL Open Font License
- EPAM dark palette — adapted from EPAM's internal reveal.js dark-mode template
