# Your Beautiful Garden (YBG)

An offline-first garden companion for Android and iOS, built with React Native,
Expo, and TypeScript. Catalogue plants and their photos, remember care needs,
record watering, and postpone reminders when the garden does not need water.

This commit is the **bootstrap only**: a branded starter screen, pnpm workspace,
developer checks, research, and implementation tickets. Plant management,
persistence, notifications, and AI are planned, not implemented.

## Getting started

Use Node 24.13.0 (see .nvmrc) and pnpm 12.9.1 (pinned in package.json).
For an existing Node installation with Corepack:

```sh
nvm install
nvm use
corepack enable
pnpm install
pnpm start
```

If Corepack is unavailable, install pnpm using the
[official installation guide](https://pnpm.io/installation/).
Run commands in WSL for this checkout. Avoid sharing node_modules between
Windows and WSL. On a phone, use the Expo Go version matching SDK 57; move to a
development build for native feature validation. LAN access from WSL may require
network configuration; use `pnpm start --tunnel` when needed (internet required).

| Command from repository root | Purpose |
| --- | --- |
| pnpm start | Expo development server |
| pnpm android | Open Android target; requires connected device/emulator |
| pnpm ios | Open iOS simulator; requires macOS/Xcode |
| pnpm web | Browser preview |
| pnpm check | ESLint and TypeScript |
| pnpm --filter @ybg/mobile exec expo install --check | SDK dependency compatibility |
| pnpm --dir mobile dlx expo-doctor | Expo project diagnostics |
| pnpm --filter @ybg/mobile exec expo export --platform all | Compile Android, iOS, and web JS bundles |

Native iOS builds require macOS or a configured EAS cloud build. No Expo account,
provider key, backend, or cloud deployment is needed for this starter.

## Repository

- mobile/: official Expo blank TypeScript template, SDK 57, with a YBG welcome
  screen and safe-area support. Navigation arrives in ticket 001.
- AGENTS.md: product scope, architecture conventions, privacy, and validation.
- docs/feasibility.md: sourced capabilities, limits, and offline-first design.
- tickets/: dependencies, phased scope, and acceptance criteria.
- backend/ and packages/*: reserved pnpm workspace patterns, with no placeholder
  services or packages yet.
- pnpm-lock.yaml: one lockfile for the whole repository.

Expo handles Metro monorepo resolution automatically. We use its conservative
hoisted pnpm layout. ESLint stays on major 9 for the installed Expo React/import
plugins' peer ranges. unrs-resolver's optional fallback installer is disabled;
its native bindings are provided by platform-specific optional packages.

## Product direction

Core features will run on-device without login or internet: SQLite records,
document-storage photos, editable care settings, watering history, postponement,
and local reminders. AI identification, weather suggestions, and backup/sync are
separate enhancements. A watering reminder means “check this plant”, since a
fixed schedule cannot determine soil moisture.

[Research and architecture](docs/feasibility.md) ·
[Implementation roadmap](tickets/README.md)

Do not enter real provider secrets into app config or EXPO_PUBLIC variables.
App icons are the original Expo placeholders; final branding and store
identifiers are tracked in the release ticket.

## Validation

See docs/bootstrap-validation.md for the checks run during setup. Compiling a
bundle does not verify physical device behavior. Device acceptance, notifications,
and production offline cold starts remain release gates in the tickets.
