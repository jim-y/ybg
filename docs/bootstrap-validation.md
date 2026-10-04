# Bootstrap validation

Date: 2026-10-04
Environment: Ubuntu WSL, Node 24.13.0, pnpm 12.9.1, Expo SDK 57.0.26.
Repository branch during setup: main. No commit or publication was performed.

| Check | Result |
| --- | --- |
| pnpm install --frozen-lockfile | Passed; workspace lockfile matches manifests |
| pnpm check | Passed; Expo ESLint and strict TypeScript |
| pnpm --filter @ybg/mobile exec expo install --check | Passed; dependencies up to date |
| pnpm --dir mobile dlx expo-doctor | Passed; 21/21 checks |
| pnpm --filter @ybg/mobile exec expo export --platform all | Passed; Android/iOS Hermes and web bundles produced |
| pnpm peers check | Passed; no peer dependency issues |
| git diff --check | Passed after normalizing appended ignore-file line endings |

The export output is mobile/dist/ and is ignored. ESLint major 9 matches the
installed React/import lint plugins; major 10 currently fails their peer ranges.
The optional unrs-resolver fallback installer is explicitly skipped; lint passed
with the prebuilt resolver binding.

No Android/iOS native binary was built or installed, and no physical-device
or browser interaction was verified. This bootstrap contains only a welcome
screen. Persistence, camera, watering rules, notifications, AI, and their native
acceptance checks belong to follow-up tickets. In particular, bundle compilation
does not establish release cold-start behavior in airplane mode.

Reproduction commands are in ../README.md. Physical-device offline and
notification acceptance gates are in tickets 004 and 006.
