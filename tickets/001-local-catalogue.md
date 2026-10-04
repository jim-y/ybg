# 001 — Local plant catalogue and persistence

Status: planned
Phase: 1
Dependencies: 000

## Outcome and scope
Users can add, edit, archive/delete, search, and inspect their plants offline.
Add Expo Router navigation, SQLite repositories, schema versioning and migrations.
Capture nickname, optional species, garden location, editable sunlight notes,
watering interval or manual mode, and an explicit initial due date when needed.
Use UUIDs and timestamps. Add accessible empty/error states and safe-area layouts.
Do not require an account or network. No camera, AI, or reminders in this ticket.

## Acceptance
- An unknown plant is a valid record; names and care data are user-editable.
- Validations reject invalid intervals and preserve entered form data on failure.
- Save/restart in airplane mode retains records; search/details work offline.
- Manual mode is available; creating a plant never records fictitious watering.
- Archive/delete behavior is explicit and keeps related data consistent.
- Versioned migrations and failure rollback preserve existing gardens.

## Verification
Meaningful repository/migration integration checks and physical-device
create/edit/restart/delete smoke checks. Run pnpm check and Expo diagnostics
after adding dependencies. Record schema and migration policy.
