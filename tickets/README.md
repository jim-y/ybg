# YBG implementation roadmap

Each file is a scoped implementation ticket with dependencies and acceptance
criteria. Status values: planned, in-progress, blocked (with reason), complete.
Update status and validation evidence in the same change as implementation.

| Phase | Ticket | Status | Depends on |
| --- | --- | --- | --- |
| 0 | [000 Bootstrap](000-bootstrap.md) | complete | — |
| 1 | [001 Local catalogue and persistence](001-local-catalogue.md) | planned | 000 |
| 1 | [002 Plant photos](002-plant-photos.md) | planned | 001 |
| 2 | [003 Watering history and postponement](003-watering-and-postponement.md) | planned | 001 |
| 2 | [004 Local reminders](004-local-reminders.md) | planned | 003 |
| 3 | [005 Backup and restore](005-backup-and-restore.md) | planned | 002, 003 |
| 3 | [006 Offline release readiness](006-offline-release.md) | planned | 001–005 |
| 4 | [007 ChatGPT/provider feasibility spike](007-ai-integration-spike.md) | planned | 000; optional research alongside MVP |
| 4 | [008 Optional plant identification](008-plant-identification.md) | planned | 002, 007 |
| 5 | [009 Optional weather suggestions](009-weather-suggestions.md) | planned | 003 |
| 5 | [010 Optional backend and sync](010-backend-and-sync.md) | planned | 005, 006; product need confirmed |

The first useful offline MVP is tickets 001–004. Backup and device validation
are required before a public release. AI, weather, and sync are enhancements.
Recommended next ticket: 001. Neither AI eligibility nor a backend blocks it.

Assumptions: Android/iOS first, one local garden and garden time zone initially,
manual care input, no mandatory login, best-effort daily checks. Revisit these
when a ticket demonstrates a concrete need. See
[feasibility assessment](../docs/feasibility.md) for sources and proposed semantics.
