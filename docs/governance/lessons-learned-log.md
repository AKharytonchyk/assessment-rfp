# Lessons Learned Log

| Field | Value |
|---|---|
| **Unit** | EDP-2026-01 |
| **Project** | Enterprise Data Platform |
| **Owner** | Delivery Manager |
| **Purpose** | Capture transferable insights — what worked, what didn't, what we'd do differently. |

Logged continuously during the engagement. Formal review at each phase gate + final write-up at handoff. Each entry is concrete, actionable, and blameless.

---

## Template

```
### LL-NNN — {Short title}

- Phase: (0 | 1 | 2 | 3 | 4 | post-handoff)
- Date: YYYY-MM-DD
- Category: (process | technology | communication | scope | staffing | tooling | risk | other)
- Context:      One paragraph — what were we doing, what happened.
- Insight:      What we learned (positive or negative).
- Action:       What we did about it in-engagement (if anything).
- Recommendation: What the next team / phase / engagement should do differently.
- Contributors: Names (optional).
```

---

## Seed entries

*Populated from Phase 0 expectations — to be validated in-flight.*

### LL-001 — Access checklist pays off on Day 1

- Phase: 0
- Date: TBD (Wk 1)
- Category: process
- Context: R1 (source-system access delays) is the #1 risk. Mitigation was to distribute a Day-1 access checklist.
- Insight: _(fill in)_
- Action: _(fill in)_
- Recommendation: _(fill in)_

### LL-002 — Reference pipeline as the contract for the team

- Phase: 2
- Date: TBD
- Category: technology
- Context: Phase 2 reference pipeline is the single most important artifact — every later pipeline is built against it.
- Insight: _(fill in)_
- Action: _(fill in)_
- Recommendation: _(fill in)_

### LL-003 — AI agent guardrails vs. velocity

- Phase: 1–3
- Date: TBD
- Category: tooling
- Context: Multi-pass PR review, 3-retry cap, CODEOWNERS on AI output.
- Insight: _(fill in: were guardrails tight enough, too tight, about right)_
- Action: _(fill in)_
- Recommendation: _(fill in)_

### LL-004 — Domain-Owner engagement pattern

- Phase: 0–3
- Date: TBD
- Category: communication
- Context: Domain Owners are 4h/week each. Their availability shapes pipeline validation speed.
- Insight: _(fill in)_
- Action: _(fill in)_
- Recommendation: _(fill in)_

---

## Review cadence

- **End of each phase:** DM reviews all log entries from that phase with the team in retro; publishes a phase lessons-learned summary.
- **End of engagement:** DM produces a final lessons-learned report (~2 pages) for EPAM internal knowledge management + client if requested.
- **Post-handoff check-in at 90 days:** adoption-phase lessons added.

## Anti-patterns to avoid in this log

- **Blame.** Lessons are about systems, not individuals. If an entry names a person in a negative light, rewrite.
- **Vague platitudes.** "Communication could be better" is not a lesson. "Weekly decision meeting cut Sponsor response time from 5d to 2d" is.
- **Post-mortem only.** Positive lessons are as valuable as negative ones — record what worked so it's repeatable.
