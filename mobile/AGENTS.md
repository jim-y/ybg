# YBG mobile application

Follow ../AGENTS.md. This is a single-screen Expo TypeScript bootstrap using
App.tsx and index.ts. No catalogue, storage, camera, AI, or reminders exist yet.

Before touching Expo/native APIs, read the installed Expo major version from
package.json and consult https://docs.expo.dev/versions/v57.0.0/ (update this link
when upgrading). Fetch https://docs.expo.dev/llms.txt for other Expo topics.

Run commands from the repository root:
- pnpm --filter @ybg/mobile exec expo install <package>
- pnpm check
- pnpm --filter @ybg/mobile exec expo install --check
- pnpm dlx expo-doctor (run in mobile/ via pnpm --dir mobile dlx expo-doctor)

Use Expo Router when ticket 001 adds multi-screen navigation. Keep routes in
src/app/ and non-route code outside it. Until then, App.tsx is the entry screen.
Configure native behavior in app.json/config plugins; do not edit generated
android/ or ios/ directories. Use development builds for native acceptance
testing; cloud EAS builds require the project's own account/signing setup.
