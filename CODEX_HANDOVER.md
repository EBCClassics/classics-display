# Classics Display: Codex handover

Updated: 2 November 2026.

## Read first

Read `AGENTS.md` and `CONTEXT.md`, then `README.md`, `PUBLISHING.md`, `TESTING.md` and the latest `CHANGELOG.md` entry. The active local project is `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`; its Git remote is `https://github.com/EBCClassics/classics-display.git`.

The live display is https://ebcclassics.github.io/classics-display/. The user wants to request changes through Codex and have saved GitHub updates publish automatically. The initial publishing setup is complete; do not recreate the repository, add Netlify or switch back to the private preview.

## Current state and latest user report

The five-screen neon-branded draft is live on GitHub Pages. Philip has tested it in Planet eStream and reports that everything seems to work fine (2 November 2026). This supersedes the previous blanket “eStream not tested” status. It does not supply an item-by-item TV acceptance record or evidence of a full-day/offline-restart test.

The latest maintenance change updates the README and publishing/testing records, adds durable context and handover files, adds `AGENTS.md` requirements for keeping future records current, and prepares the permanent local project folder. It makes no change to the website application, content or visual design.

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
| `tests/scheduling.test.cjs` | The 12 content, scheduling, date, asset and contrast checks |
| `tests/serve-fixtures.py` | Local-only failure fixtures; not part of the public site |
| `.github/workflows/pages.yml` | Prepare, test and deploy `dist/` when `main` changes |

## Checks and publishing

For source/content changes, from the project root:

```sh
node scripts/prepare.cjs
node --test tests/*.test.cjs
```

If sources or image metadata changed, first run `python3 scripts/credits.py`. Inspect affected screens in a browser; `python3 -m http.server 8765 --directory dist --bind 127.0.0.1` provides a local preview. Stop a preview server you started when it is no longer needed.

Update the records required by `AGENTS.md` in the same change. Save the authorised update to `main`, wait for **Publish Classics display** to succeed, and check the live display when behaviour/appearance changed. Documentation-only commits also trigger the existing deployment workflow; no manual site upload is normally needed.

First successful deployment: https://github.com/EBCClassics/classics-display/actions/runs/41533040254, application baseline commit `8e2f3d0d3c4d47a7bf5a9d21539785f4b9b49394`. Later deployment evidence belongs in the task report or changelog; do not mistake the baseline SHA for the repository's current HEAD.

## Account and browser limits observed during setup

The connected GitHub account is EBCClassics. Repository reads worked, but connector writes (`create_tree` and `create_file`) returned 403 “Resource not accessible by integration”, despite repository metadata showing user push/admin permission. User permission and integration permission are different. Do not keep retrying the same rejected path without a relevant change.

Creation, file upload and Pages configuration were completed using Philip's signed-in Chrome session. Philip enabled the ChatGPT extension's “Allow access to file URLs” setting during setup. If that setting changes or a browser reconnects, inspect the current state rather than assuming the previous tab handle still works. Do not store browser sessions, tokens or private credentials in this public project.

The browser uploader accepted individual files, not a whole folder. Upload files into the matching repository directory; preserve paths and licence files. GitHub's editor can create nested paths. After a browser upload, wait for the processing page to finish and verify the saved commit. Use the connector/API for reads or writes where it is actually authorised; ordinary authenticated Git is another option only if usable credentials are present.

## Known limits and next work

- No automatic fresh-news gathering or daily writing service exists; do not label the archive bank as live news.
- Content refresh is every 15 minutes; changed application code needs a panel reload.
- Offline caching depends on the actual player's browser/storage policies. The user's general eStream success report does not establish offline restart.
- The permanent source folder is prepared, but it has not yet been added to a dedicated Codex sidebar project. See `CODEX_SETUP.md`; do not claim that adding a folder imports a ChatGPT/Work transcript.
- No further feature change has been requested in this handover task. Continue from the next specific request, retaining the current production URL and branding.
