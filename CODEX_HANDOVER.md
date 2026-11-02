# Classics Display: Codex handover

Updated: 2 November 2026.

## Read first

Read `AGENTS.md` and `CONTEXT.md`, then `README.md`, `PUBLISHING.md`, `TESTING.md` and the latest `CHANGELOG.md` entry. The active local project is `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`; its Git remote is `https://github.com/EBCClassics/classics-display.git`.

The live display is https://ebcclassics.github.io/classics-display/. The user wants to request changes through Codex and have saved GitHub updates publish automatically. The initial publishing setup is complete; do not recreate the repository, add Netlify or switch back to the private preview.

## Current state and latest user request

The expanded release contains 15 landmarks, 10 university Classics graduates shown two at a time, and 14 career routes. Selections change on successive 90-second loops, with a time-seeded starting counter and UK school-date offsets. The welcome sticker covers its decorative frame; the public “working draft” badge is gone. The Parthenon uses a wide photograph, landmark images are shown in full, and Gulliver’s speech is below them.

Philip requested recent discoveries and selected an automatic daily source check. The publishing workflow checks Archaeology magazine’s AIA feed at 05:17 UTC, validates and imports short dated source extracts, rebuilds credits/content, runs 16 Node and five Python checks and deploys. Changed notices are saved to `main` with generated files and brief changelog/handover records. No-change checks deploy the refreshed timestamp without a commit. Reports expire from the current pool after 30 days; an explicit archive fallback remains. The Mac can be off. GitHub scheduling may be delayed.

Philip’s 2 November 2026 report that Planet eStream seemed to work fine applies to the previous release. This expanded release needs its own player regression check after publication. Do not erase the earlier successful general test or claim unreported offline/full-day checks.

Local checks: all 16 application checks and five news-feed checks pass. TV browser verification and publication evidence are recorded in TESTING.md and CHANGELOG.md. Until a successful workflow and live check are recorded, do not describe the expanded release as published.

## Implementation map

| File | Purpose |
| --- | --- |
| `dist/index.html`, `styles.css`, `app.js` | Page shell, TV layouts, rotation, controls, data loading and fallback handling |
| `dist/core.js` | Content validation, UK date handling and daily/scheduled selection |
| `dist/content.json` | Editable content, display dates, explicit schedules and timings |
| `dist/seed.js`, `sw.js` | Generated content fallback and offline-worker asset list |
| `dist/assets/` | Local photographs, original SVG character/fallback, fonts and licence metadata |
| `dist/credits.html`, `credits.css` | Editorial sources and image/font credits |
| `scripts/prepare.cjs` | Validate content and regenerate fallback/worker |
| `scripts/credits.py` | Rebuild the credit page from content and asset metadata |
| `tests/scheduling.test.cjs`, `tests/news_test.py` | 16 application checks and five feed-safety checks |
| `scripts/update-news.py`, `scripts/record-news.cjs` | Daily source extracts, retention and checked-in update records |
| `tests/serve-fixtures.py` | Local-only failure fixtures; not part of the public site |
| `.github/workflows/pages.yml` | Prepare, test and deploy `dist/` when `main` changes |

## Checks and publishing

For source/content changes, from the project root:

```sh
node scripts/prepare.cjs
node --test tests/*.test.cjs
python3 -m unittest discover -s tests -p '*_test.py'
```

If sources or image metadata changed, first run `python3 scripts/credits.py`. Inspect affected screens in a browser; `python3 -m http.server 8765 --directory dist --bind 127.0.0.1` provides a local preview. Stop a preview server you started when it is no longer needed.

Update the records required by `AGENTS.md` in the same change. Save the authorised update to `main`, wait for **Publish Classics display** to succeed, and check the live display when behaviour/appearance changed. Documentation-only commits also trigger the existing deployment workflow; no manual site upload is normally needed.

First successful deployment: https://github.com/EBCClassics/classics-display/actions/runs/41533040254, application baseline commit `8e2f3d0d3c4d47a7bf5a9d21539785f4b9b49394`. Later deployment evidence belongs in the task report or changelog; do not mistake the baseline SHA for the repository's current HEAD.

## Account and browser limits observed during setup

The connected GitHub account is EBCClassics. Repository reads worked, but connector writes (`create_tree` and `create_file`) returned 403 “Resource not accessible by integration”, despite repository metadata showing user push/admin permission. User permission and integration permission are different. Do not keep retrying the same rejected path without a relevant change.

Creation, file upload and Pages configuration were completed using Philip's signed-in Chrome session. Philip enabled the ChatGPT extension's “Allow access to file URLs” setting during setup. If that setting changes or a browser reconnects, inspect the current state rather than assuming the previous tab handle still works. Do not store browser sessions, tokens or private credentials in this public project.

The browser uploader accepted individual files, not a whole folder. Upload files into the matching repository directory; preserve paths and licence files. GitHub's editor can create nested paths. After a browser upload, wait for the processing page to finish and verify the saved commit. Use the connector/API for reads or writes where it is actually authorised; ordinary authenticated Git is another option only if usable credentials are present.

## Known limits and next work

- Finish/verify this release’s GitHub publication, then check the live welcome, complete Parthenon view, paired profiles, career rotation and news. A manual workflow run exercises the daily source-fetch path immediately; a configured cron alone is not proof that it ran.
- The news feed is a selected source, not an exhaustive archaeology service. No new relevant report is guaranteed every day. The first refresh uses the public feed retrieved on 2 November 2026 and two checked official Pompeii excavation reports from October.
- `?cycle=0&date=2026-11-02&pause=1&screen=people` gives Tom Hiddleston and Chris Martin; cycles 1–4 show the remaining four pairs. `cycle=0…14` covers all landmarks on the anchor date.
- Application/asset cache is `classics-display-v2` consistently in preparation and application code. Reload the eStream panel once for this code release; subsequent valid content updates refresh within 15 minutes.
- Actual eStream viewing-distance, long unattended running and offline restart remain separate player checks. Desktop results do not establish them.

<!-- NEWS_STATUS_START -->
Initial daily-source implementation: public feed checked on 2 November 2026. Scheduled publication remains to be exercised and verified.
<!-- NEWS_STATUS_END -->
