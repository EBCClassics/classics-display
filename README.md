# Classics Department display: working draft

A self-contained, silent display for a 16:9 television. The design uses Philip's personal neon pink and ink palette, yellow accents and Nimbus typography, without the P or C symbols. No account, database, API key, npm installation or visitor interaction is needed.

## Current live setup

- **Live display:** https://ebcclassics.github.io/classics-display/
- **Master repository:** https://github.com/EBCClassics/classics-display
- **Permanent local checkout:** `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`
- **Automatic publishing:** saves to `main` run preparation, all 12 checks and GitHub Pages deployment. The first deployment succeeded on 2 November 2026.
- **Planet eStream:** Philip reported on 2 November 2026 that he had tested it and everything seemed to work fine. Basic eStream operation is therefore recorded as a user-reported pass; unreported individual, full-day and offline-restart tests are not assumed.

Ask Codex for changes rather than editing or re-uploading the site yourself. Codex should update the source and the affected records, run the relevant checks, save the change to GitHub and confirm successful publication. The display address remains the same.

For continuity, read [CONTEXT.md](CONTEXT.md), [CODEX_HANDOVER.md](CODEX_HANDOVER.md) and [CHANGELOG.md](CHANGELOG.md). [AGENTS.md](AGENTS.md) requires future material changes to keep these and the affected operation/test documents current. [CODEX_SETUP.md](CODEX_SETUP.md) explains how to attach the prepared folder to a local Codex project.

## Local preview

For the quickest local look, open `dist/index.html`. The bundled fallback content works without a server. For proper offline caching and content-editing tests, use a local web server:

```sh
python3 -m http.server 8765 --directory dist --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Add `?controls=1` to show the test controls. Opening the HTML file directly does not enable the service worker and may prevent the editable JSON file loading; the display then uses `seed.js`.

The completed display package is in `dist/`. All images, fonts and scripts are local. Publish the whole folder, including `assets/`, not just the HTML file.

## What rotates

| Screen | Default time | Content |
| --- | --- | --- |
| Welcome | 10 seconds | A welcome, ancient-site photograph and question |
| Gulliver on Tour | 18 seconds | Today's ancient site, fact and Gulliver's fictional observation |
| Famous classicists | 16 seconds | Mary Beard or Natalie Haynes, with a licensed photograph |
| Careers | 16 seconds | Law, journalism, museums and heritage, publishing or technology |
| Classical news | 20 seconds | A sourced story with date, image and short explanation |

One loop takes 80 seconds. Main text is approximately 35–41px and headings 103–119px on the 1920 × 1080 canvas. Smaller labels and source notes support the main content. The entire canvas scales to fit the panel, with letterboxing if its shape differs. On a small phone, this deliberately remains a miniature TV preview.

Gulliver visits Athens, Pompeii, Delphi, Rome and Ephesus. Content changes by UK date while the page stays open. By default weekends hold Friday's selection, then the sequence resumes on Monday. This does not account for school holidays. The first school week is explicitly scheduled for 2–6 November 2026; later days use the repeatable rotation.

## News: what this draft does

The supplied stories are **archive examples, not live news**: a blue room at Pompeii reported on 3 June 2024, and a Roman flatbread fresco discussed in the September/October 2023 issue of *Archaeology*. The screen says this explicitly. The photographs show Pompeii as a location, not the discoveries, and are captioned accordingly.

There is no automatic scraping or unattended news-writing service. A different seeded archive item is chosen each school day. To add a selected current story, provide a verified summary, original source, publication date and licensed local image in `content.json`, set its `mode` to `news`, and schedule it if needed. Current stories older than `newsMaxAgeDays` (14 by default), future publications and entries outside their display dates are excluded. When none qualifies, the display returns to archive examples. A future feed should use an editorial review and publishing step that writes this same data format.

Sources and image licences are in `dist/credits.html` and `dist/assets/credits.json`. Gulliver adapts the original code-drawn gull from Philip's existing personal dashboard; his observations are fictional. Career screens describe possible uses of transferable skills, with entry/training qualifications, rather than guaranteed outcomes.

## Editing content

Edit **`dist/content.json`** in a plain text editor. Keep JSON punctuation and the existing field names. No HTML is needed or allowed in content.

- `settings.durations`: seconds per screen, from 5 to 120.
- `settings.schoolDaysOnly`: `true` holds the rotation over weekends; `false` advances every calendar day.
- `settings.anchorDate`: start of the repeatable daily sequence. Timezone defaults to `Europe/London`.
- `welcomes`, `sites`, `people`, `careers`, `news`: add or change entries. Give each a unique lowercase `id` within its section.
- Optional `from` and `until` use inclusive `YYYY-MM-DD` display dates. Keep at least one undated fallback in every section, including an undated `archive` news story.
- `schedule`: choose IDs for a specific date. An example is below. Unspecified sections retain their daily selection. A scheduled entry still has to be within its display dates; news also has to pass the publication-date/age checks.
- Use images under `assets/`, give them an accurate `imageAlt` and caption, and retain licence information. Remote image addresses are intentionally rejected.

```json
{"date":"2026-11-10","site":"delphi","person":"natalie-haynes","career":"journalism","news":"flatbread"}
```

After editing, run these commands from this project folder (Node.js 22 or later recommended):

```sh
node scripts/prepare.cjs
node --test tests/*.test.cjs
```

The preparation command validates the content and rebuilds `seed.js` and the offline asset list. **Do not edit `seed.js` separately.** Republish `dist/`. The GitHub workflow and Netlify repository deployment run preparation automatically. If using manual drag-and-drop, prepare locally before uploading.

The screen checks `content.json` on startup and every 15 minutes. The controls include **Reload content**. Invalid/unavailable data leaves the last valid content in use. A successful content load is saved in browser storage, with the bundled seed as another fallback. New content must still be visually checked: validation catches missing fields, unsafe paths and excessive text length, but cannot guarantee a good layout for every wording.

When adding new sources/images, update the credits too. The helper `python3 scripts/credits.py` regenerates the credits page from `content.json` and `assets/credits.json`; then run preparation again. For a code or asset release, bump the cache version consistently in `scripts/prepare.cjs` and the cache check in `dist/app.js`, then prepare and redeploy. Existing cached content may remain until the player next connects and reloads successfully.

## GitHub Pages: current production host

This project is already configured at the master repository above. Pages uses **GitHub Actions** as its publishing source and the included `Publish Classics display` workflow. For ordinary updates, save the validated change to `main`, wait for the workflow to succeed and verify the live page when relevant. No new repository or manual upload is required. See [PUBLISHING.md](PUBLISHING.md).

The following steps are retained only for recreating the setup elsewhere:

1. Create a repository and upload this project, including `dist`, `scripts`, `tests` and the hidden `.github/workflows/pages.yml` file. Use `main` as the branch. The `.openai` folder is only for the optional private Sites preview and is not needed by GitHub Pages.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. In **Actions**, run **Publish Classics display**, or push a change to `main`. Wait for the deployment job to finish.
4. Open the URL shown in **Settings → Pages**. A project URL such as `https://YOUR-ACCOUNT.github.io/classics-display/` works because all application assets use relative paths.
5. Use that base URL in eStream, with no test parameters.

Alternatively, upload **the contents of `dist/`** to a repository root, including `.nojekyll`, and choose **Deploy from a branch → main → /(root)** in Pages settings. This simpler method needs you to prepare the files locally before uploading updates.

[GitHub Pages deployment guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Netlify

For a quick manual test, sign in to Netlify, choose its manual/drag-and-drop deployment option and upload **`dist/`**. The folder you upload must have `index.html` directly inside it. Netlify does not build files for a manual upload.

For updates from a repository, import this whole project. The included `netlify.toml` sets the build command to `node scripts/prepare.cjs` and the publish directory to `dist`. No dependency installation is required. Open the resulting HTTPS address and use it in eStream. The included `_headers` permits embedding; the page sends no `X-Frame-Options: DENY` or `SAMEORIGIN` header.

[Netlify deployment guidance](https://docs.netlify.com/deploy/create-deploys/)

## Planet eStream: setup and regression checks

These steps use the labels visible in the supplied Screen Designer screenshot. Names inside the website dialogue may differ in your installed version. Philip has now tested the display in Planet eStream and reports that it seems to work fine (2 November 2026). Retain these steps for reconfiguration and regression checks; see TESTING.md for the distinction between this report and the optional detailed test record.

1. **Copy** the existing Classics screen for testing. Keep the copy in 16:9. In the screenshot, **Set as 4:3** is offered; leave that alone for the widescreen draft.
2. Under **Add Content**, choose the **WWW / website** icon (fourth row, first column in the screenshot). Add a website panel using the public HTTPS base URL of the GitHub Pages or Netlify deployment. Avoid a sign-in-protected preview URL.
3. Make the panel cover the entire canvas; use **Toggle Fill Screen** if appropriate. Keep padding, borders and corner rounding at zero, and remove overlapping panels from the test copy.
4. **Save**, then check **Preview: Inline** and the right-hand **Preview**. The page manages its own rotation. Allow at least 80 seconds to see all five screens.
5. For a continuous Classics-only screen, keep this screen active rather than having the outer eStream loop repeatedly unload it. If sharing the TV with other screens, allocate at least 90 seconds per visit; each fresh visit starts from Welcome. Avoid a short webpage refresh interval.
6. Use **Add to Loop** and **Schedule** to assign the copied test screen to the intended test player. Confirm the actual player, rather than relying only on the editor preview.
7. Observe at least two loops, then restart the player. Check that the display starts unaided, fills the TV, remains readable from the waiting area and has no scrollbars, login prompt or clipped text.
8. Check the player's clock/timezone and select tomorrow in a desktop test URL to confirm daily changes. Remove `controls`, `date`, `pause`, `speed` and `screen` parameters from the final panel URL.

If your dialogue accepts embedded HTML rather than a URL, the equivalent is:

```html
<iframe src="https://YOUR-HOST/" title="Classics Department display"
  style="position:absolute;inset:0;width:100%;height:100%;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Use the website panel where possible. If it is blank, open the exact URL in the player's own browser first. A login page needs an unauthenticated host; a “refused to connect” message suggests host framing restrictions; a frozen welcome suggests JavaScript/player compatibility or repeated outer-panel reloads. Use a maintained Chrome/Edge-based player. This is a modern-browser draft, not an Internet Explorer implementation. The screenshot alone cannot establish the player's engine or policies.

## Test controls and useful addresses

Append these to the base URL (combine parameters with `&`):

| Address | Purpose |
| --- | --- |
| `?controls=1` | Show pause, previous/next, date, speed and full-screen controls |
| `?pause=1&screen=tour` | Hold Gulliver's screen for inspection |
| `?date=2026-11-03&pause=1&screen=tour` | Fixture: Pompeii |
| `?date=2026-11-06&pause=1&screen=tour` | Fixture: Ephesus |
| `?speed=10&controls=1` | Eight-second loop for a quick check |
| `?nosw=1` | Do not register the offline worker on this visit; does not remove an existing worker |

Keyboard controls: **Space** pauses/resumes, **← / →** change screen, **1–5** select a screen, **C** shows/hides controls, **F** requests full screen and **Esc** hides controls. They do not override normal typing inside a form field. A player may block full-screen requests; eStream should provide the full-screen display itself.

## Offline behaviour and limits

After one successful HTTPS visit, the service worker attempts to cache the complete display, including photographs and fonts. The controls show **Offline cache ready** after installation. A later connection loss should leave the display rotating, and an offline reload can use the cached page where the player permits service workers and persistent cache storage.

A first-ever visit without connectivity cannot download the site. Some embedded players restrict service workers or discard storage when a panel closes; in those cases the already-loaded page can keep rotating, but an offline restart is not assured. Private Sites authentication is also separate from this static cache. Verify the real player's behaviour using `TESTING.md`.

## Files and privacy

`dist/` is the deployable website; `scripts/` contains preparation helpers; `tests/` contains the scheduling/content checks. There are no analytics, cookies, remote fonts, live embeds or pupil records. Ordinary browser storage holds only the last valid public display content. External source links are optional and do not need to be opened by viewers.

The display is live and Philip has reported successful basic operation in Planet eStream. Persistent offline restart, a measured viewing-distance check and extended unattended operation have not been separately recorded. Do not turn the general success report into a claim that those specific checks passed.
