# Classics Display: Codex handover

Last implementation review: 7 November 2026. The dated news status below is maintained by the daily workflow.

## Read first

Read `AGENTS.md` and `CONTEXT.md`, then `README.md`, `PUBLISHING.md`, `TESTING.md` and the latest `CHANGELOG.md` entry. The active local project is `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`; its Git remote is `https://github.com/EBCClassics/classics-display.git`.

The live display is https://ebcclassics.github.io/classics-display/. The user wants to request changes through Codex and have saved GitHub updates publish automatically. The initial publishing setup is complete; do not recreate the repository, add Netlify or switch back to the private preview.

## Current state and latest user request

**Current motion update:** Philip reports movement on his laptop but not the school desktop in Edge. The tested live browser did animate. The desktop’s cause is unconfirmed; reduced-motion preferences or a cached/static fallback are possible. Added a per-display Automatic/On/Off setting and explicit `?motion=on` link. The setting is saved locally; the URL parameter also works when browser storage is unavailable. Automatic remains the default. Hidden controls now report why artwork is stopped. Pause and background suspension apply even when On is selected. Current application/cache version is v4; versioned scripts/styles and reload requests during installation refresh cached assets. Local checks: 31 Node and seven Python tests pass, plus browser Off/On and persistence checks. Publication verification is pending for this update; school Edge/eStream still needs Philip’s check.

**Seasonal release published and verified on 7 November 2026.** Philip selected the “Flowing strands” study on 7 November, at speed 1.6 and artwork height 18–20 per cent. The actual display starts at 20 per cent: a 216px artwork area along the bottom. Pride/LGBT+ History use six separate moving colour strands. Remembrance uses flat stylised poppies with swaying curved stems. `dist/seasonal-drawing.js` defines all artwork; `dist/seasonal-motion.js` renders it at up to 30fps; matching generated SVGs provide static fallbacks and calendar previews. The remaining treatments are now adapted to the selected style. Eighteen designs cover the 30 events, including a separate Easter treatment. Philip approved the reviewed designs, requested ancient names integrated into the artwork and authorised publication. Eleven ancient treatments now include their names in matching colours; the motifs leave room for the text.

Modern observances have no visible caption over the artwork. The footer counter and progress bar are hidden during seasonal periods. Ancient festival names appear within their graphics, with an unboxed explanation above the main content. The main content keeps its 90 per cent inset; the five-screen timings are unchanged. `dist/calendar.html` holds the reference text and sources.

The next version selects artwork using the real UK date, including weekends and midnight changes. Remembrance is 6 November through the Sunday of the week containing 11 November, inclusive, and takes priority. Other overlaps alternate by screen and loop. Bonfire Night uses 1–5 November. Christmas/Saturnalia runs through December. Automatic follows reduced-motion preferences. All decorative motion also stops when paused or hidden. Its canvas persists across screen changes for the same treatment. The five screens retain their timings. During seasonal periods the main content is inset by ten per cent to reserve more room for the artwork. With no active event the main content returns to its full size.

New modern entries include mental health, kindness, anti-bullying, autism awareness, disability inclusion, LGBT+ history, happiness, reading, poetry, peace and Earth Day. Fixed and month rules recur annually. Easter uses the Gregorian calculation. `dated` ranges are only active for confirmed years. Check the organisers and extend Children’s Mental Health Week, Mental Health Awareness Week and UK World Book Day beyond their confirmed 2027 dates, and Anti-Bullying Week beyond its confirmed 2026 dates. The calendar reference page makes this limit explicit.

`events` remains optional for older saved content. With no calendar, the application uses the bundled one. Older event records use matching bundled artwork and explanation settings. An explicit empty array disables seasonal artwork. `scripts/seasonal-art.py` regenerates eighteen SVG treatments and five additional thumbnails through `scripts/credits.py`, using `scripts/seasonal-art.cjs` and the shared drawing definitions. Preserve the earlier `dist/assets/seasons/poppy-bold.png` and its prompt record as historical assets; the display now selects `poppy-flowing.svg` and its matching animation instead. Older saved drafts naming the PNG are redirected to the new treatment. Preparation bundles them into the current v4 offline asset list. The news check now includes AIA, TheCollector and Greek Reporter. Local checks currently pass with 30 Node checks and seven feed checks. See `TESTING.md` for browser evidence and release limits.

Offline navigation preserves each bundled HTML page’s own cached response. Current browser checks include all 30 events on the welcome screen, each rendered with a canvas treatment and no broken loaded images; the screenshots use paused motion. Earlier checks cover the five content screen types, the no-event footer and smaller-screen scaling. The new artwork has no text overlay; the main text stays above its 864px top edge. With the preview server stopped after cache installation, the new shared-drawing player loaded Earth Day and the 30-entry calendar without broken images. The earlier Pride/Remembrance host-unavailable checks also passed. See `TESTING.md` for the current check evidence. Actual-player acceptance follows publication.

### Screenshot review pack

Prepared on 7 November: `/Users/philipcanning/.codex/visualizations/2026/11/06/01a1b1b0-8a7b-7af0-ac0a-dfa4d31fefeb/seasonal-review`. The 30-page PDF is in `output/pdf/classics-seasonal-review.pdf`; the ZIP contains all 30 full-size JPEG screenshots and a labelled local gallery. `artwork-overview.jpg` compares the eighteen distinct treatments. Event names and windows are outside the screenshots. The pack uses the same welcome screen for comparison. Motion is paused in the stills; all designs run at speed 1.6 and 20 per cent height in normal playback. This is a review snapshot, not another editable master.

### Latest verified seasonal publication

Release commit `b2187cfad7dbf47e0283de48270394e94f500f11` (PR #2) deployed successfully through [workflow 42373132244](https://github.com/EBCClassics/classics-display/actions/runs/42373132244). Both test suites, preparation, artwork generation and the Pages deployment step succeeded. The live base URL rendered Remembrance with the new motion player; Floralia and Saturnalia showed their names within matching artwork. The live news fixture displayed the attributed Greek Reporter report, with no broken image. The accelerated live rotation advanced unaided and the calendar loaded all 30 previews, including eleven named designs. These are desktop checks, not new eStream acceptance evidence.

### Previous published release: 2 November 2026

The expanded release contains 15 landmarks, 10 university Classics graduates shown two at a time, and 14 career routes. Selections change on successive 90-second loops, with a time-seeded starting counter and UK school-date offsets. The welcome sticker covers its decorative frame; the public “working draft” badge is gone. The Parthenon uses a wide photograph, landmark images are shown in full, and Gulliver’s speech is below them.

Philip requested recent discoveries and selected an automatic daily source check. The publishing workflow checks Archaeology magazine’s AIA feed at 05:17 UTC, validates and imports short dated source extracts, rebuilds credits/content, runs the application and feed checks and deploys. Changed notices are saved to `main` with generated files and brief changelog/handover records. No-change checks deploy the refreshed timestamp without a commit. Reports expire from the current pool after 30 days; an explicit archive fallback remains. The Mac can be off. GitHub scheduling may be delayed.

Philip’s 2 November 2026 report that Planet eStream seemed to work fine applies to the previous release. This expanded release needs its own player regression check after publication. Do not erase the earlier successful general test or claim unreported offline/full-day checks.

Local checks: all 16 application checks and five news-feed checks pass. The expanded release is published: release run 41540376372 succeeded from `7d88359`; manual daily-source run 41540632869 fetched three notices, saved `19e040f` and deployed successfully. Live appearance, sources and automatic advancement were checked. TESTING.md and CHANGELOG.md hold the evidence.

## Implementation map

| File | Purpose |
| --- | --- |
| `dist/index.html`, `styles.css`, `app.js` | Page shell, TV layouts, rotation, controls, data loading and fallback handling |
| `dist/core.js` | Content validation, UK date handling and daily/scheduled selection |
| `dist/content.json` | Editable content, display dates, explicit schedules and timings |
| `dist/core.js`, `tests/seasonal.test.cjs` | Annual event validation, Easter, inclusive windows, overlap priority and regression checks |
| `dist/assets/seasons/`, `dist/calendar.html` | Original seasonal thumbnails/borders and generated sourced calendar |
| `scripts/seasonal-art.py`, `scripts/seasonal-art.cjs`, `dist/seasonal-drawing.js`, `dist/seasonal-motion.js` | Shared seasonal drawing definitions, static SVG generation and motion playback |
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

- The queued TheCollector/Greek Reporter source request is implemented in the existing daily check. Publisher hosts, source sections/categories, Greek/Roman relevance, dates and bounded extracts are checked. The local 7 November check read all three publishers and retained five feed notices. Individual failures warn and preserve valid notices.
- Current release is complete: the approved seasonal/news version is published and verified. The next action is to publish/verify the motion-setting update, then open `?motion=on` on the school desktop and use that parameter for the eStream panel if its device suppresses motion. A push to `main`, including documentation, would trigger publication.
- Next player check: reload the eStream website panel once to load v2, then check readability and two complete 90-second loops on the actual player.
- The news feed is a selected source, not an exhaustive archaeology service. No new relevant report is guaranteed every day. The verified first refresh contains three AIA feed notices reported on 30 October 2026, alongside two manually checked official Pompeii excavation reports.
- `?cycle=0&date=2026-11-02&pause=1&screen=people` gives Tom Hiddleston and Chris Martin; cycles 1–4 show the remaining four pairs. `cycle=0…14` covers all landmarks on the anchor date.
- The seasonal release used v3; the motion-setting update uses `classics-display-v4` consistently in preparation and application code. A release will require one panel reload. Subsequent valid content updates refresh within 15 minutes.
- Actual eStream viewing-distance, long unattended running and offline restart remain separate player checks. Desktop results do not establish them.

<!-- NEWS_STATUS_START -->
Daily source check: 2026-11-07T12:15:36Z. 5 feed notices retained; latest report 2026-11-07. Local source retrieval and both test suites passed. Deployment of the approved seasonal release succeeded: https://github.com/EBCClassics/classics-display/actions/runs/42373132244.
<!-- NEWS_STATUS_END -->
