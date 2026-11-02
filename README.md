# Classics Department display

A self-contained, silent display for a 16:9 television. The design uses Philip's personal neon pink and ink palette, yellow accents and Nimbus typography, without the P or C symbols. No account, database, API key, npm installation or visitor interaction is needed.

## Current live setup

- **Live display:** https://ebcclassics.github.io/classics-display/
- **Master repository:** https://github.com/EBCClassics/classics-display
- **Permanent local checkout:** `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`
- **Automatic publishing:** saves to `main` run preparation, 16 application checks and five feed checks and GitHub Pages deployment. The first deployment succeeded on 2 November 2026.
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
| Welcome | 8 seconds | A welcome, ancient-site photograph and question |
| Gulliver on Tour | 20 seconds | One of 15 landmarks, a historical explanation and Gulliver’s fictional observation |
| They studied Classics | 24 seconds | Two of 10 successful university Classics graduates, with their actual course connection |
| Careers | 18 seconds | One of 14 career routes, transferable skills and a question |
| Classical news | 20 seconds | A dated recent discovery, original source and clearly identified image |

One loop takes 90 seconds. The landmark, graduate pair, career and news story advance on successive loops within the same day. The opening selection is varied by UK school date; weekends retain Friday’s starting offset, while within-day rotation continues. A restart seeds the loop counter from the current time, so repeatedly reopening a short outer signage loop does not always show the same content. `?cycle=0` fixes the starting bank offset for repeatable tests.

The tour covers Athens, Pompeii, Delphi, Rome, Ephesus, Bath, Hadrian’s Wall, Pont du Gard, Paestum, Olympia, Knossos, Jerash, Segovia, Orange and Leptis Magna. Landmark photographs are shown in full, with Gulliver’s speech below the picture. Welcome and portrait pictures may use a crop. The welcome sticker sits above its decorative frame, and the public page has no “working draft” badge.

The graduates are Tom Hiddleston, Chris Martin, Anthony Leggett, Madeline Miller, Oscar Wilde, C. S. Lewis, Charlotte Higgins, Edith Hall, Natalie Haynes and Mary Beard. Course descriptions distinguish Classics, Greek and Latin, and Classics and Modern Languages. Leggett’s subsequent physics training is explicit. Charlotte Higgins has an original name graphic; the other nine have credited photographs.

Career routes include law, journalism, heritage, publishing, technology, diplomacy, public policy, finance, consulting, teaching, film and theatre, marketing, archaeology and translation. These are possible routes; relevant experience, qualifications and professional training still apply.

The 1920 × 1080 stage scales as a whole, with letterboxing on other aspect ratios. Main explanations use approximately 30–38px type; paired profiles use 30px so both stories remain readable. No visitor interaction is needed.

## Daily discovery news

Philip requested an automatic daily source check on 2 November 2026. The existing GitHub publishing workflow now runs at **05:17 UTC daily** (05:17 GMT in winter, 06:17 BST in summer), as well as on changes to `main` and manual runs. GitHub may delay scheduled jobs. The Mac and Codex do not need to be running. The eStream player needs connectivity to receive published changes.

`scripts/update-news.py` checks the public Archaeology magazine RSS feed, published by the Archaeological Institute of America. It selects Greek/Roman-related discoveries and research, validates the source host and publication date, and imports a short, attributed headline/extract. It does not invent reporting or generate prose. The headline and extract together contain at most 24 source words per report. Automated notices use a labelled original illustration, without downloading unlicensed discovery photographs.

Current news is limited to reports from the last **30 days**. New notices join the rotation on the next successful publication; the number of discoveries depends on the source. Existing feed notices remain for up to 30 days even when they fall out of the RSS window. Manually checked reports from the official Pompeii excavation journal are also included. An unavailable source preserves valid stories, raises a workflow warning and leaves the previous successful check date visible. Older news is never presented as recent: the display falls back to explicitly labelled archive material when no eligible report remains.

On successful scheduled checks, changed discovery notices are committed with generated content, credits, changelog and handover records before deployment. A check with no changed notices deploys the fresh check time without an unnecessary repository commit. The daily workflow runs both test suites. A failed check/deployment remains visible in GitHub Actions; it is not evidence that the public page updated.

Sources and image licences are in `dist/credits.html` and `dist/assets/credits.json`. Gulliver adapts the original code-drawn gull from Philip's existing personal dashboard; his observations are fictional. Career screens describe possible uses of transferable skills, with entry/training qualifications, rather than guaranteed outcomes.

## Editing content

Edit **`dist/content.json`** in a plain text editor. Keep JSON punctuation and the existing field names. No HTML is needed or allowed in content.

- `settings.durations`: seconds per screen, from 5 to 120; defaults total 90 seconds.
- `settings.schoolDaysOnly`: `true` holds the starting date offset over weekends; `false` advances every calendar day.
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
python3 -m unittest discover -s tests -p '*_test.py'
```

The preparation command validates the content and rebuilds `seed.js` and the offline asset list. **Do not edit `seed.js` separately.** Republish `dist/`. The GitHub workflow runs preparation automatically. Ordinary production updates use the existing GitHub Pages workflow.

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

## Planet eStream: setup and regression checks

These steps use the labels visible in the supplied Screen Designer screenshot. Names inside the website dialogue may differ in your installed version. Philip has now tested the display in Planet eStream and reports that it seems to work fine (2 November 2026). Retain these steps for reconfiguration and regression checks; see TESTING.md for the distinction between this report and the optional detailed test record.

1. **Copy** the existing Classics screen for testing. Keep the copy in 16:9. In the screenshot, **Set as 4:3** is offered; leave that alone for the widescreen display.
2. Under **Add Content**, choose the **WWW / website** icon (fourth row, first column in the screenshot). Add a website panel using the public HTTPS existing public GitHub Pages URL. Avoid a sign-in-protected preview URL.
3. Make the panel cover the entire canvas; use **Toggle Fill Screen** if appropriate. Keep padding, borders and corner rounding at zero, and remove overlapping panels from the test copy.
4. **Save**, then check **Preview: Inline** and the right-hand **Preview**. The page manages its own rotation. Allow at least 90 seconds to see all five screens.
5. For a continuous Classics-only screen, keep this screen active rather than having the outer eStream loop repeatedly unload it. If sharing the TV with other screens, allocate at least 100 seconds per visit; each fresh visit starts from Welcome. Avoid a short webpage refresh interval.
6. Use **Add to Loop** and **Schedule** to assign the copied test screen to the intended test player. Confirm the actual player, rather than relying only on the editor preview.
7. Observe at least two loops, then restart the player. Check that the display starts unaided, fills the TV, remains readable from the waiting area and has no scrollbars, login prompt or clipped text.
8. Check the player's clock/timezone and select tomorrow in a desktop test URL to confirm daily changes. Remove `controls`, `date`, `cycle`, `pause`, `speed` and `screen` parameters from the final panel URL.

If your dialogue accepts embedded HTML rather than a URL, the equivalent is:

```html
<iframe src="https://YOUR-HOST/" title="Classics Department display"
  style="position:absolute;inset:0;width:100%;height:100%;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Use the website panel where possible. If it is blank, open the exact URL in the player's own browser first. A login page needs an unauthenticated host; a “refused to connect” message suggests host framing restrictions; a frozen welcome suggests JavaScript/player compatibility or repeated outer-panel reloads. Use a maintained Chrome/Edge-based player. This display requires a maintained modern browser. The screenshot alone cannot establish the player's engine or policies.

## Test controls and useful addresses

Append these to the base URL (combine parameters with `&`):

| Address | Purpose |
| --- | --- |
| `?controls=1` | Show pause, previous/next, date, speed and full-screen controls |
| `?pause=1&screen=tour` | Hold Gulliver's screen for inspection |
| `?date=2026-11-03&cycle=0&pause=1&screen=tour` | Fixture: Pompeii |
| `?date=2026-11-06&cycle=0&pause=1&screen=tour` | Fixture: Ephesus |
| `?speed=10&controls=1` | Nine-second loop for a quick check |
| `?date=2026-11-02&cycle=0&pause=1&screen=people` | Fixture: Tom Hiddleston and Chris Martin |
| `?nosw=1` | Do not register the offline worker on this visit; does not remove an existing worker |

Keyboard controls: **Space** pauses/resumes, **← / →** change screen, **1–5** select a screen, **C** shows/hides controls, **F** requests full screen and **Esc** hides controls. They do not override normal typing inside a form field. A player may block full-screen requests; eStream should provide the full-screen display itself.

## Offline behaviour and limits

After one successful HTTPS visit, the service worker attempts to cache the complete display, including photographs and fonts. The controls show **Offline cache ready** after installation. A later connection loss should leave the display rotating, and an offline reload can use the cached page where the player permits service workers and persistent cache storage.

A first-ever visit without connectivity cannot download the site. Some embedded players restrict service workers or discard storage when a panel closes; in those cases the already-loaded page can keep rotating, but an offline restart is not assured. Private Sites authentication is also separate from this static cache. Verify the real player's behaviour using `TESTING.md`.

## Files and privacy

`dist/` is the deployable website; `scripts/` contains preparation helpers; `tests/` contains the scheduling/content checks. There are no analytics, cookies, remote fonts, live embeds or pupil records. Ordinary browser storage holds only the last valid public display content. External source links are optional and do not need to be opened by viewers.

The display is live and Philip has reported successful basic operation in Planet eStream. Persistent offline restart, a measured viewing-distance check and extended unattended operation have not been separately recorded. Do not turn the general success report into a claim that those specific checks passed.
