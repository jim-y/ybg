# 003 — Watering history and delay by X days

Status: planned
Phase: 2
Dependencies: 001

## Scope
Implement pure calendar-day due-date rules, transactional event history,
“watered today”/backdated watering, undo, and positive-integer postponement with
optional reason. Build due/overdue lists and a garden time-zone/reminder-time
setting. Follow the proposed rules in ../docs/feasibility.md; define DST and
interval-edit behavior before implementation. No OS notifications yet.

## Acceptance
- Watering sets due from the watering date plus interval; records survive restart.
- Delaying changes due and leaves last-watered unchanged.
- Delay uses max(current due date, today's garden-local date) + X calendar days.
- Repeated delays accumulate; new watering supersedes that cycle's delays.
- Unknown last watering uses an explicit initial due date or paused mode.
- Backdated events, undo, interval edits, archive, and manual mode behave clearly.
- Rain can explain delay without being recorded as manual watering.

## Verification
Deterministic domain tests with injected clock: documented October examples,
DST transitions, travel, midnight, repeated delay, overdue delay, backdating,
and undo. Verify atomic writes/rollback and offline restart. Set a documented
delay maximum and DST ambiguity policy. Run pnpm check.
