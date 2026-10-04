# 000 — Bootstrap the YBG workspace

Status: complete
Phase: 0
Dependencies: none

## Delivered
- Official Expo SDK 57 blank TypeScript application in mobile/.
- YBG welcome screen/name/slug/scheme with safe areas and a browser preview.
- Private pnpm workspace, pinned tools, one lockfile, root development/check scripts.
- Root/mobile AGENTS.md, sourced feasibility research, and phased tickets.

## Acceptance and evidence
- Root dependency install and frozen lockfile install pass.
- pnpm check passes; SDK dependency compatibility check passes.
- Expo Doctor passes 21/21 checks.
- Android/iOS/web bundles compile; see ../docs/bootstrap-validation.md.
- Future app features are explicitly described as planned.

## Exclusions
No plant CRUD, database, camera, notifications, OAuth, backend, account creation,
device builds, store publication, or final branded icons. Device smoke tests
remain ticket 006 acceptance gates.
