# YBG feasibility and offline-first architecture

Researched 2026-10-04. This is a planning assessment, not a prototype proving
camera, notifications, or OAuth on devices. Recheck sources before implementing
SDK integrations or selecting a provider.

## Recommendation

Build the garden catalogue and watering workflow as an offline-first native app.
No backend or account is required for the MVP. AI identification and weather
lookups are optional online services. Keep the local garden authoritative even
when those services fail.

| Requested capability | Offline? | Approach and practical limit |
| --- | --- | --- |
| Take/import plant photos | Yes | Device camera/picker; permissions needed; copy the selected file into durable app storage |
| Remember plants and care needs | Yes | SQLite, user-entered names, sunlight categories, watering settings, and notes |
| Catalogue/search existing plants | Yes | Local queries; a global species knowledge base is a separate data/licensing decision |
| Record watering | Yes | Persist dated watering events; calculate the next check locally |
| Delay by X days after rain | Yes | Persist a postponement, separately from actual watering |
| Remind when due | Yes, with OS limits | Local scheduled notifications and an authoritative in-app due list |
| Identify a species from a photo | Cloud option: no | Vision model/provider; user confirms suggestions; unknown plants remain valid records |
| Automatically know sunlight/soil needs | Partly | User-entered or bundled verified knowledge works offline; photo-only inference cannot establish garden conditions |
| Connect an existing ChatGPT plan | Online and conditional | Current Sign in with ChatGPT preview has eligibility and mobile callback questions; see ticket 007 |
| Know local rainfall/weather | Online for fresh data | Optional weather lookup, timestamped cache, and user confirmation |
| Restore after uninstall or use several devices | Requires exported backup or sync | Local persistence alone is not a backup |

## Offline implementation

Use [expo-sqlite](https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/) for persistent
records and transactional schema migrations. This library persists the database
across app restarts. [Expo ImagePicker](https://docs.expo.dev/versions/v57.0.0/sdk/imagepicker/)
provides camera and library UI. Copy accepted photos into document storage using
[Expo FileSystem](https://docs.expo.dev/versions/v57.0.0/sdk/filesystem/); picker
cache paths are not durable ownership.

Proposed entities (not yet implemented):
- Plant: stable UUID, nickname, optional species/common name, garden location,
  sunlight category/notes, created/updated timestamps, optional archive timestamp.
- Care plan: plant ID, editable interval in calendar days or paused/manual mode,
  garden time zone, preferred reminder time, first due date when last watering
  is unknown, provenance and notes.
- Care event: UUID, plant ID, kind (watered/postponed), event and creation times,
  prior/new due date for postponements, optional reason, and undo/supersession data.
- Photo: UUID, plant ID, relative document path, capture time, dimensions.
- Reminder state: desired due/version and OS notification identifier/status;
  notifications are a projection of durable garden data.

Place repositories under mobile/src/data/, pure care rules under
mobile/src/domain/, platform services under mobile/src/services/, and screens
under mobile/src/app/ when routing is added. Extract shared domain packages only
when a backend or another real consumer exists. This keeps the bootstrap small.

Make writes durable before showing success. File and SQLite operations cannot
share a transaction: stage/copy photos, commit metadata, and compensate failed
writes; periodically clean orphans safely. On restart, migrations must preserve
existing gardens. Photos and SQLite consume finite storage; handle full disk,
large images, missing files, and export/import errors.

Offline means a **built application** starts and performs core workflows in
airplane mode. Expo Go/development Metro connectivity is a development constraint,
not the product's offline architecture. The optional web preview is not a promise
of feature parity, browser persistence, or web notifications.

## Watering and postponement semantics

These are proposed product rules to implement and test in ticket 003:
1. A confirmed watering records an actual event timestamp. The next due local
   date is that event's garden-local date plus the configured interval, at the
   preferred reminder time. A backdated watering can leave a plant overdue.
2. If last watering is unknown, ask for an initial due date or leave reminders
   paused. Creating a plant must not fabricate watering history.
3. “Delay X days” takes the later of the current due local date and today's
   garden-local date, then adds X calendar days at the preferred reminder time.
   Repeated delays use the already postponed due date. Require a positive integer
   and a documented UI maximum; allow an optional rain/soil-moisture reason.
4. A postponement changes next due, not last watered. Later confirmed watering
   supersedes postponements for that watering cycle.
5. Interval edits preview/recalculate due dates and explain whether a manual
   override is retained. Undo and archive/delete update pending reminders.
6. Keep the garden time zone stable when the user travels; offer an explicit
   setting change rather than silently moving the garden. Define DST handling
   for nonexistent/ambiguous local reminder times. Do not add fixed milliseconds
   to implement calendar days.

Example: watered October 4 with a three-day interval -> due October 7.
Delay by two days on October 7 -> due October 9; last watered remains October 4.
Water on October 8 -> due October 11. If the old due date was October 7 but today
is October 10, delaying two days -> October 12.

Watering needs vary with plant age, soil, containers, and weather; the
[RHS watering guide](https://www.rhs.org.uk/garden-jobs/watering) explicitly advises
against assuming every plant needs a fixed weekly routine. Store editable
sunlight/care notes and optional manual schedules. Rain does not prove the root
zone received enough water, particularly under shelter. Reminders should invite
a soil/plant check and allow delay.

## Notifications: feasible, best effort

[expo-notifications](https://docs.expo.dev/versions/v57.0.0/sdk/notifications/)
can schedule, inspect, and cancel local notifications. They do not need an Expo
push token, a server, or internet once scheduled. Delivery depends on permission
and platform behavior; a schedule does not guarantee a visible alert at an exact
instant. Keep the due list available when permissions are denied.

Proposed MVP: schedule the next one-shot check per active plant; persist the
notification identifier; cancel/reconcile after watering, postponement, editing,
archiving, or deletion. Reconcile on app launch/resume and track side-effect
failures so a committed watering update remains successful even if scheduling
fails. Long absences need a deliberate policy: a one-shot reminder does not
provide unlimited repeating overdue alerts.

Avoid unlimited per-plant queues. In ticket 004, measure pending-request limits
on supported OS versions, set a conservative bounded queue, and use grouped
daily reminders for large gardens with clearly documented coverage. Do not depend
on waking JavaScript to continually refill that queue while the app is closed.

[Expo BackgroundTask](https://docs.expo.dev/versions/v57.0.0/sdk/background-task/)
runs at the operating system's discretion, not at an exact user-selected time.
Android also distinguishes inexact alarms and restricted exact alarms:
[Android alarm guidance](https://developer.android.com/develop/background-work/services/alarms).
Watering checks rarely require exact-minute precision. Validate Expo's actual
trigger implementation and permission needs on target Android versions before
promising behavior or choosing an alarm strategy.

Physical-device acceptance must include notification denial/revocation, airplane
mode, app termination, reboot, battery restrictions, quiet/focus modes, due-date
changes, DST/time-zone changes, large gardens, and long periods without opening
the app. A development/release build is the acceptance target.

## Existing ChatGPT subscription: possible path, not an MVP promise

The official [Sign in with ChatGPT quickstart](https://developers.openai.com/siwc/quickstart)
now describes eligible Plus/Pro plan usage in participating applications.
Open-source partners and selected private clients can use this path; commercial
identity integrations are currently a limited trial. This is distinct from
ordinary API-key billing, which has its own
[API pricing](https://developers.openai.com/api/docs/pricing).
Do not assume every paid ChatGPT subscription is an API key or universally
authorizes requests from an arbitrary mobile application. Identity/consent does
not grant access to existing ChatGPT conversation history.

The published [open-source registration flow](https://developers.openai.com/siwc/token-sharing-open-source/sign-in)
uses PKCE and an HTTP loopback listener on 127.0.0.1, and issues client credentials
without a client secret. **Inference:** this is not a drop-in Expo AuthSession
custom-scheme flow. The docs reviewed do not establish approval or a supported
native mobile callback route for YBG. Ticket 007 must validate eligibility,
distribution requirements, and the supported callback approach before UI promises.

The [inference contract](https://developers.openai.com/siwc/token-sharing-open-source/models-and-inference)
uses the public Responses API, an account-specific model catalogue, streaming,
and disabled server response storage. The
[preview limitations](https://developers.openai.com/siwc/token-sharing-open-source/preview-limitations)
allow image input for compatible models but do not support every ordinary API
field/tool or the Files upload API. Test direct image input, entitlement errors,
token renewal/revocation, and stream completion for the selected route.

If YBG is eligible and mobile support is verified, use scoped OAuth tokens and
secure storage with explicit upload consent. If not, a separately funded backend
can proxy standard API-key requests with authentication, rate limits, and spending
controls. Never put the project's provider key or confidential client secret
in the app. An explicit share/open-in-ChatGPT handoff is a separate manual option,
not seamless inference inside YBG. Do not scrape sessions or reuse Codex tokens.

## Plant identification and knowledge

[OpenAI vision documentation](https://developers.openai.com/api/docs/guides/images-vision)
supports image understanding but describes limitations. A model/provider can
suggest species and care needs; validate accuracy on representative garden plants.
Store suggestions locally only after user confirmation, along with source,
confidence/uncertainty, and later overrides. Let users save “unknown plant”
and provide manual names/settings regardless of connectivity.

A photo cannot reliably measure daily sunshine exposure or root-zone moisture.
Sunlight preferences may come from species knowledge; actual exposure comes from
user observations or future measurements. A bundled plant reference catalogue
needs reviewed, licensed data and attribution; none is bundled yet. Cloud
identification and a full global catalogue are not part of the offline MVP.
On-device identification would need a separate model-size, license, native
integration, battery, and accuracy study.

## Later online features and decisions

Weather lookup can cache readings with provider/time/location metadata. Forecast
rain is only a suggestion; never automatically mark a plant watered. Let users
confirm delay and choose manual location without forcing GPS permission.

Backup export/import should precede optional accounts and multi-device sync.
Uninstall/device loss can remove local gardens. Later sync needs UUIDs,
idempotent event upload, tombstones, conflict policy, retry queues, and photo
transfer handling. Never let a network failure block local writes.

Before release decide target OS minimums, store identifiers, garden/locale
defaults, photo limits, reminder queue policy, licensed knowledge source,
and backup expectations. Before AI decide YBG distribution/eligibility, provider,
usage funding, privacy/retention settings, mobile callback support, and evaluation
criteria. These decisions do not block the local MVP.
