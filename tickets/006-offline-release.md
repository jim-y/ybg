# 006 — Offline MVP release readiness

Status: planned
Phase: 3
Dependencies: 001, 002, 003, 004, 005

## Scope
Set owned store identifiers, final icons/splash, app versions, signing/build
configuration, and target OS minimums. Add CI checks, developer build instructions,
accessibility checks, privacy disclosures, and a release acceptance matrix.
Choose final build/update settings and document offline cold-start behavior.
Publication is a separate explicit action.

## Acceptance
- Fresh installed production-like build cold-starts without Metro or internet.
- In airplane mode: create/photo/edit/search/water/delay, restart, and restore.
- Verify large text, screen reader navigation, contrast, and permission denials.
- Notifications pass ticket 004's device matrix; limitations are user-visible.
- Storage failure and migrations preserve data; backup instructions are clear.
- No bundled secrets or unapproved uploads/analytics.
- CI installs with frozen lockfile, checks types/lint/tests, and exports bundles.
- Record physical Android/iOS versions, build identifiers, and results.

## Verification
Document reproducible device checks, remaining defects, and release decision.
Store accounts and distribution actions require the project's actual ownership
details; do not invent package/bundle identifiers.
