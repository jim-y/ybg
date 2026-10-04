# 010 — Optional backend, account, and multi-device sync

Status: planned
Phase: 5
Dependencies: 005, 006; product need for sync confirmed

## Scope
Add backend/ as a real pnpm package only when needed. Choose persistence/auth/
hosting after a concrete requirements decision. Implement optional accounts,
idempotent event synchronization, photo transfer, retry/outbox, tombstones, and
explicit conflicts. Extract shared schemas/domain rules only where genuinely used.
Keep the mobile SQLite database available offline.

## Acceptance
- Local writes never await the network; reconnect retries cannot duplicate events.
- Conflicting care edits, deletes, watering, and postponements have a documented
  policy; device clock order alone cannot decide every conflict.
- Sign-out/account switching cannot mix gardens or leak photos.
- Sync retry, migration, photo failures, and revoked auth preserve local data.
- Define reminder ownership per device to avoid unexpected duplicate alerts.
- Export/delete and server authorization are verified.
- If serving API-backed AI, provider keys stay server-side with rate/spend limits.

## Verification
Multi-device offline/reconnect/conflict tests, authorization integration checks,
backup round trips, and failure recovery. No cloud deployment until an owned
environment and operational requirements are established.
