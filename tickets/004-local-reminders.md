# 004 — Reliable local watering check reminders

Status: planned
Phase: 2
Dependencies: 003

## Scope
Use expo-notifications with user-triggered permission requests and Android
channels. Project durable due dates into one-shot OS requests. Persist IDs,
retry failed side effects, and reconcile on resume. Tap opens the correct plant.
Measure OS pending limits and choose bounded/grouped coverage for large gardens.
Decide overdue repeat behavior; do not require exact background JS execution.

## Acceptance
- Scheduled local reminders work without network on physical Android/iOS builds.
- Denial/revocation leaves the in-app due list and garden features working.
- Watering, delay, care edits, undo, archive/delete cancel obsolete requests.
- Crash/retry reconciliation avoids duplicates and stale plant notifications.
- Foreground/closed app, reboot, focus modes, battery restrictions, and time-zone
  changes have verified/documented behavior; no exact-delivery guarantee.
- Large-garden queue limits and long-absence coverage are visible/documented.
- Notification failures do not roll back a successful watering event.
- Confirm Android trigger/alarm permission strategy against supported OS versions.

## Verification
Adapter reconciliation failure tests and a physical-device evidence matrix.
Use development/release builds; simulator/web alone is insufficient.
Run pnpm check and Expo diagnostics.
