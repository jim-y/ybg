# Your Beautiful Garden (YBG)

## Product and scope
YBG is an Android/iOS React Native application built with Expo and TypeScript.
It helps people catalogue their garden plants, save photos and watering/sunlight
needs, log watering, and postpone reminders when rain or soil conditions make
watering unnecessary. Read README.md, docs/feasibility.md, and tickets/README.md
before changing architecture. Implement the requested ticket; do not silently
build later phases.

## Repository and tools
- mobile/ is the Expo application; its package name is @ybg/mobile.
- The root is a private pnpm workspace. backend/ and packages/* are reserved
  workspace locations; create them only when a feature needs them.
- Use Node from .nvmrc and the packageManager version in package.json.
- Install from the root with pnpm install; commit pnpm-lock.yaml.
- Use pnpm start, pnpm android, pnpm ios, pnpm web, and pnpm check.
- Add SDK modules with pnpm --filter @ybg/mobile exec expo install <package>.
  Verify APIs against docs matching the installed Expo major version.
- Keep React, React Native, and Expo native dependencies compatible and unique.
  Use Expo's automatic monorepo support; avoid speculative Metro overrides.
- Keep generated native directories out of Git; use app config/config plugins.
- Preserve the existing license and Expo template attribution.

## Architecture decisions
- Core gardening workflows must work without internet, an account, or AI.
- Planned durable store: expo-sqlite with versioned transactional migrations.
  Keep UI separate from repositories and pure watering calculations.
- Copy photos into application document storage; store relative paths/metadata
  in SQLite. Do not rely on picker cache URIs, remote URLs, or base64 DB blobs.
- Persist user changes first; schedule notifications as retryable side effects.
  Reconcile notification IDs against stored schedules after failures/app resume.
- Log watering and postponement as distinct events. A delay must never invent
  a watering event. Use the semantics in docs/feasibility.md and ticket 003.
- Use calendar-day arithmetic in the garden's time zone, not fixed 24-hour
  additions. Handle DST, travel, clock changes, and overdue reminders explicitly.
- Local scheduled notifications are the MVP. Do not require push tokens or a
  server for them, or rely on background JS executing at exact times.
- AI, weather, and synchronization are optional online enhancements. Never
  block or overwrite local garden data when a network request fails.
- Add shared packages only after there is a real second consumer.

## Quality and privacy
Use strict TypeScript, small functional components, accessible labels, scalable
text, safe areas, and useful loading/empty/error states. Ask for camera or
notification permission only when the related action is requested. A denial must
leave manual plant entry and the in-app watering list usable.

Never ship provider API keys/client secrets in the mobile bundle or EXPO_PUBLIC
variables. Approved public-client OAuth uses user-scoped tokens with PKCE and
secure storage; it is not permission to scrape ChatGPT, copy session cookies, or
reuse Codex credentials. Revalidate current integration eligibility in ticket 007.
Ask explicit consent before uploading garden photos. AI identification/care
advice is a suggestion requiring user confirmation; keep provenance and overrides.

## Validation and ticket workflow
Run pnpm check for code/config changes. After dependency/config changes run
pnpm --filter @ybg/mobile exec expo install --check and pnpm --dir mobile dlx expo-doctor.
For native-facing work export both native JS bundles and test physical Android
and iOS development/release builds as appropriate; document unavailable checks.
Expo Go and web previews do not prove notification/reboot/offline behavior.

Add meaningful tests when introducing watering rules, migrations, persistence,
or synchronization. Include restart and airplane-mode acceptance checks. Do not
add tests that only mirror static UI. Update ticket status and attach validation
evidence; mark complete only when all acceptance criteria have been verified.
