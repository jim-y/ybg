# 008 — Optional online identification and care suggestions

Status: planned
Phase: 4
Dependencies: 002, 007 (approved provider/architecture decision)

## Scope
Offer explicit photo identification on existing/manual plant records. Use the
approved OAuth route or authenticated backend proxy. Present candidate species
and care suggestions with uncertainty and provenance; user confirms each change.
Persist confirmed results locally. A licensed knowledge source is a separate
decision; do not scrape a global plant catalogue.

## Acceptance
- Unknown/manual plants and all core garden workflows work without connectivity.
- Upload consent precedes every new photo upload; cancellation is available.
- Timeout, quota, auth, unsupported image, and no-match states preserve records.
- Results never silently overwrite species or the user's care settings.
- Validate structured results/ranges; save provider/model/time/source metadata.
- No claim that a photo measures soil moisture or daily sun exposure.
- Publish an accuracy evaluation on representative plants, including ambiguous
  photos, before enabling advice broadly.

## Verification
Provider-adapter failure tests and device offline/online checks; no secrets in
the bundle or logs. Run pnpm check.
