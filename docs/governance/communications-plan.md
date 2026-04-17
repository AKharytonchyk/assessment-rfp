# Communications Management Plan

| Field | Value |
|---|---|
| **Unit** | EDP-2026-01 |
| **Project** | Enterprise Data Platform |
| **Owner** | Delivery Manager |

---

## 1. Principles

- **Cadence is contract.** If a meeting is weekly, it runs weekly. Cancellation requires written notice ≥ 24h ahead.
- **Async first for status, sync for decisions.** Status reports are written; decisions are meetings.
- **Written decisions win tied memories.** Slack > email > verbal; every decision gets a log entry.
- **Escalation is not a failure mode.** Use it early when blocked.

## 2. Comms Matrix

| Audience | Artifact | Cadence | Channel | Owner | SLA |
|---|---|---|---|---|---|
| Executive Sponsor | Exec async brief (≤ 250 words, traffic light) | Weekly (Fri) | Email | DM | Sent by 17:00 Fri |
| Executive Sponsor | SteerCo deck (5 slides) | Bi-weekly (Thu) | Email (24h prior) + Zoom | DM + SA | Meeting ≤ 30 min |
| Executive Sponsor | Phase-gate go/no-go brief | End of each phase | Meeting + written decision | DM | 1h meeting |
| Executive Sponsor | Risk escalation | As needed | Email + phone | DM | Within 24h of High-exposure trigger |
| Data Platform Lead | Daily standup | Daily (Mon-Fri) | Zoom + Slack | DM | 15 min, 09:00 client TZ |
| Data Platform Lead | Decision backlog review | Weekly (Wed) | Zoom | DM | 30 min |
| Data Platform Lead | Architecture review | Weekly (Tue) | Zoom | SA | 1h |
| Data Platform Lead | Sprint demo | Bi-weekly (Fri) | Zoom + recording | DM | 1h |
| Domain Data Owners | Sprint demo | Bi-weekly (Fri) | Zoom + recording | DM | 1h |
| Domain Data Owners | Domain office hours | Weekly (Thu) | Zoom | Data Eng Lead | 45 min, optional |
| IT / Security | Phase-gate security review | End of Phase 1, 3, 4 | Meeting | SA + IT/Sec Lead | 1h |
| IT / Security | Ad-hoc security questions | As needed | Slack | SA | 48h SLA |
| QA / UAT | UAT kickoff + status | Wk 12 + daily in Wk 13–14 | Zoom | QA Eng | 30 min daily |
| Training Attendees | Training schedule notice | Wk 14 (2 wk ahead) | Email + calendar | DM | At least 2 wk notice |
| Training Attendees | Training sessions | Wk 16 | In-person or Zoom | TW + relevant leads | Half-day × 3 |
| Full team (EPAM) | Daily standup | Daily | Zoom + Slack | DM | 15 min |
| Full team (EPAM) | Sprint planning | Bi-weekly (Mon) | Zoom | DM | 1h |
| Full team (EPAM) | Sprint retro | Bi-weekly (Fri) | Zoom | DM | 30 min |
| All (ongoing) | Slack channels — `#edp-delivery`, `#edp-decisions`, `#edp-community` | Ongoing | Slack | DM | 48h SLA on decision requests |
| All (ongoing) | Confluence / docs repo | Ongoing | Web | DM/TW | Updated same-day on major changes |

## 3. Steering Cadence Upgrade

**Change from draft:** the Director PM defender flagged bi-weekly SteerCo as under-scaled for a 16-week engagement with High-exposure risks. The upgraded model is:

- **Weekly async exec brief** (Friday, 5 min to read) — keeps Sponsor warm without a meeting.
- **Bi-weekly decision SteerCo** (Thursday, 30 min) — standing decision agenda, not a status readout.
- **Phase-gate formal go/no-go** — end of Phase 0, 1, 2, 3, 4. Cannot be skipped.

Total Sponsor time commitment stays 1–2 h/week with higher-signal content.

## 4. Status Report Template

Weekly brief contents (repeatable structure):

```
Subject: EDP — Week N exec brief (YYYY-MM-DD)

## Traffic light
Schedule: 🟢 / 🟡 / 🔴   Scope: 🟢 / 🟡 / 🔴   Cost: 🟢 / 🟡 / 🔴   Quality: 🟢 / 🟡 / 🔴

## This week
- Achievement 1 (tangible outcome)
- Achievement 2
- Achievement 3

## Next week
- Priority 1
- Priority 2

## Decisions needed from you
- Decision A (due Wed) — [link to context]
  (or: None this week)

## Risks / blockers
- R# update (or new risk R# raised)
```

Target: **≤ 250 words**. If it's longer, it's not exec communication.

## 5. Escalation Path

```
Day-to-day issue → Data Platform Lead (48h SLA)
   ↓ unresolved
Decision-level or cross-functional → Exec Sponsor (24h SLA)
   ↓ unresolved
Commercial/strategic → EPAM Account Manager ↔ [Firm] CTO/CDO
```

## 6. Communication Anti-Patterns (to avoid)

- Long-form status emails that bury the decision ask → use the template.
- Decisions made only in Slack without logging → decision log in `#edp-decisions` pinned to Confluence daily.
- "Circling back" — if something needs follow-up, it goes on an agenda or a ticket.
- Silent dependencies — if waiting on someone, name them publicly in the standup.

## 7. Review

This plan is reviewed at each phase gate and updated if channels, cadence, or stakeholders change.
