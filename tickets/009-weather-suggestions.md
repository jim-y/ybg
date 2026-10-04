# 009 — Optional weather-assisted postponement

Status: planned
Phase: 5
Dependencies: 003

## Scope
Choose a weather provider after checking coverage, licensing, cost, and privacy.
Support manual garden location and optional location permission. Cache results
with timestamp/provider/location. Suggest a delay after relevant rain; require
the user to confirm it using the same postponement domain operation.

## Acceptance
- Rain never silently marks a plant watered or cancels a reminder.
- Stale/unavailable weather is labelled and does not block manual delay.
- Forecast versus observed rainfall is clearly distinguished.
- Covered gardens/containers and user soil observations can override suggestions.
- No mandatory location permission, background location tracking, or network.
- Provider secrets remain behind a backend when the provider requires secrets.

## Verification
Cache/staleness and provider-error checks, manual-location and permission-denial
device tests. Record the chosen provider's source/terms. Run pnpm check.
