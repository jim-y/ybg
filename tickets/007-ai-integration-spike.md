# 007 — Validate ChatGPT plan and AI provider integration

Status: planned
Phase: 4 (optional research)
Dependencies: 000

## Scope
Recheck official Sign in with ChatGPT eligibility for YBG's intended distribution.
The published direct open-source flow uses HTTP loopback callbacks; determine
whether an approved mobile flow works in Expo development/release builds.
Compare that route with a standard separately billed backend API and a manual
share-to-ChatGPT handoff. Produce an architecture decision before feature work.

## Acceptance
- Distinguish identity, plan-usage entitlement, and ordinary API billing.
- Confirm distribution/open-source eligibility and supported native callback
  route; do not substitute a custom scheme for documented loopback registration.
- Prove permitted login, consent, token validation/secure storage, refresh,
  revocation/logout, and an image request on Android/iOS, or record a no-go.
- Verify preview request restrictions, account-specific models, quota failures,
  interrupted streams, and image payload format without Files upload API.
- Define upload consent, retention, expected costs/limits, and accuracy evaluation.
- No-go yields a documented alternative while preserving the offline MVP.
- Never reuse ChatGPT cookies or Codex credentials.

## Verification
Sourced decision record and a small isolated spike; use approved user-owned test
credentials only. Do not implement production AI UI until this gate is resolved.
