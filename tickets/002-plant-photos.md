# 002 — Capture and retain plant photos

Status: planned
Phase: 1
Dependencies: 001

## Scope
Use Expo ImagePicker for camera/import, plus FileSystem document storage.
Add per-plant thumbnails and photo viewing/removal. Store relative paths and
metadata in SQLite. Define image dimensions/size limits, compression, and
orphan cleanup. Preserve original template attribution.

## Acceptance
- Capture/import/view work in airplane mode on Android and iOS.
- Cancelled picker or denied camera/library permission preserves the plant.
- Saved photos survive restart and picker-cache cleanup.
- Failed copy/database writes leave no broken references; interrupted work can
  be recovered or cleaned safely.
- Large images, missing files, low storage, and deleting photos are handled.
- No photo is uploaded; any future upload requires explicit consent.

## Verification
Device permission, rotation, memory/storage, restart, cancellation, and deletion
checks plus meaningful file/metadata failure-path tests. Document supported
formats and limits. Run pnpm check.
