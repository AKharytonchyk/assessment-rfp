# Change Request — Template & Register

| Field | Value |
|---|---|
| **Unit** | EDP-2026-01 |
| **Project** | Enterprise Data Platform |
| **Process owner** | Delivery Manager |

---

## Change Request Template

Copy this template for each CR. File as `CR-{NNN}-{short-title}.md` in `docs/governance/change-requests/`.

```
CR ID: CR-___
Title: ___
Date raised: YYYY-MM-DD
Requester: (name, role)
Source: (sprint retro | client request | risk trigger | scope gap)

1. Change Description
   What is being proposed to change?

2. Rationale
   Why this change? What problem does it solve or value does it add?

3. Impact Assessment
   a. Scope impact:        (add/remove/modify backlog items, with IDs)
   b. Schedule impact:     (days ±, critical-path effect yes/no)
   c. Cost impact:         ($ ±, budget line affected)
   d. Risk delta:          (new risks, mitigated risks, exposure change)
   e. Quality impact:      (test coverage, DQ, non-functional effects)

4. Alternatives Considered
   - Option A: ...
   - Option B: ...
   Why selected option is preferred.

5. Approval Tier Required
   [ ] < $5K and < 2 PD — DM approves
   [ ] $5K–25K or 2–10 PD — DM + Platform Lead approve
   [ ] > $25K or > 10 PD or > 5 days schedule — Exec Sponsor approves

6. Decision
   Approved / Rejected / Deferred / Superseded-by-CR-NNN
   Decided by: (name)
   Decision date: YYYY-MM-DD
   Notes: ...

7. Post-Decision Log Entry
   If approved, how is it tracked?
   - Backlog items added: ...
   - Risk register updated: ...
   - Baseline update: (WBS / schedule / cost — which)
   - Communication sent to: ...
```

## Approval Tiers

| Tier | Trigger | Approver(s) | SLA |
|---|---|---|---|
| **DM-only** | < $5,000 cost AND < 2 PD AND no schedule impact | Delivery Manager | 24h |
| **Joint** | $5K–$25K cost OR 2–10 PD OR no-CP schedule impact up to 3 days | DM + Data Platform Lead | 48h |
| **Sponsor** | > $25K cost OR > 10 PD OR any CP schedule impact OR > 3 days | Executive Sponsor + DM + Platform Lead | 5 business days |
| **Emergency** | Critical defect / security / compliance | DM can act, approval retroactive within 24h | Immediate |

## Register

All CRs logged here during the engagement. File path links to full CR document.

| ID | Title | Raised | Tier | Status | Decision date | Net impact |
|---|---|---|:---:|:---:|---|---|
| CR-001 | *(example)* Add 11th pipeline for financial reporting | 2026-06-01 | Sponsor | Approved | 2026-06-05 | +5 PD, +$4K, no CP impact |
| CR-002 | | | | | | |
| CR-003 | | | | | | |

## Rules

1. **No undocumented changes.** Any scope, schedule, or cost change to the baseline requires a CR. If it's too small for a CR, it's not a baseline change — put it in the sprint backlog under normal refinement.
2. **Critical path delays trigger Sponsor tier** regardless of cost.
3. **Contingency draw (10% of labor, `rom.md` §5)** requires a CR at minimum joint tier. Schedule reserve draw (2 weeks, `delivery-approach.md`) requires Sponsor tier.
4. **Superseded CRs** are never deleted; they're marked Superseded and linked to the replacing CR.
5. **Retroactive emergency approvals** must be documented and briefed at the next SteerCo.
