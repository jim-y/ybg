# 005 — Export and restore a local garden

Status: planned
Phase: 3
Dependencies: 002, 003

## Scope
Create a versioned export containing plant/care/event data and photos. Allow a
user-chosen destination/share flow and import with validation/preview. Decide
replace versus merge semantics explicitly. No cloud account required.

## Acceptance
- Export -> restore into a clean install preserves photos, care history, and IDs.
- Corrupt/unsupported backups or missing files leave the current garden intact.
- Import is atomic/recoverable, prevents unsafe archive paths, and handles space
  limits and migration versions.
- Explain that local-only data can be lost with uninstall/device loss.
- Do not export OAuth tokens, API keys, or OS notification identifiers.
- Rebuild reminder state from restored care data, respecting permission settings.

## Verification
Round-trip integration checks, malformed archives/schema tests, interrupted
import, and offline device restore. Document backup format and limits.
Run pnpm check.
