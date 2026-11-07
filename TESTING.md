# Display testing record

Updated on 7 November 2026. This records development checks, successful publication and Philip's reported Planet eStream test separately.

## Ancient festival names and release checks, 7 November 2026

- PASS: 30 Node checks and seven Python feed checks. New coverage includes all eleven names and named fallbacks, unchanged canvas reuse when a name changes, publisher-specific news-section/category filtering and preservation of valid stories after partial source failures.
- PASS: the local source check read all three publishers, retained five feed notices and preserved the newer AIA report already published by the daily workflow.
- PASS: all eleven ancient designs selected their expected events and rendered their named treatments with no broken content images at 1920 × 1080. The text is integrated in the lower artwork area; surrounding central motifs are removed or lowered where needed. Saved current screenshots in the `festival-names-release` folder beside the earlier review pack.
- PASS: [GitHub workflow 42373132244](https://github.com/EBCClassics/classics-display/actions/runs/42373132244) from release commit `b2187cfad7dbf47e0283de48270394e94f500f11`, including artwork generation, preparation, both test suites and Pages deployment.
- PASS on the live site: the base URL rendered the new Remembrance canvas, Floralia and Saturnalia rendered their names within the artwork, and the Greek Reporter news fixture retained its attribution and loaded image. The accelerated live rotation advanced unaided from Welcome to Careers while retaining a seasonal canvas, with no console errors/warnings. The live calendar loaded all 30 previews, including eleven named ancient designs, without broken images. This is desktop evidence; the new version’s eStream panel reload and regression check remain to be reported.

## Full seasonal screenshot review, 7 November 2026

- PASS locally: 29 Node checks and five feed checks. The new coverage draws every scheduled treatment at two phases, checks finite coordinates and confirms that each static SVG matches the shared drawing at phase zero. Existing content, date, motion lifecycle and news safety checks remain passing.
- PASS in the browser at 1920 × 1080: all 30 event fixtures selected the expected event and rendered a canvas treatment, without broken or pending content images. Main text ended at or above 824.4px on the common welcome fixture, clear of the artwork’s 864px top edge. All classical notes ended at about 164.6px, above the main content. Screenshots use paused motion, which now also suppresses the entrance fade.
- PASS: all 30 generated calendar border previews loaded, with no broken images. Normal running of the fireworks/news fixture produced no console warnings or errors. The new canvas treatments scale without overflow at 1280 × 720 and 768 × 1024. With the preview server stopped after cache installation, Earth Day reloaded with its canvas and no broken content images; all 30 calendar previews also loaded from cache.
- Prepared and checked 30 full-size 1920 × 1080 JPEG screenshots, a labelled 30-page PDF and a ZIP containing the screenshots and gallery. An overview of all eighteen distinct treatments was visually inspected. The PDF was reopened, its page count checked and an exported page visually inspected.
- This is a local review draft. Await Philip’s response to the screenshots before publishing. Earlier scaling, five-screen and player evidence below retain their original scope; still screenshots do not establish motion performance or readability on the actual TV.

## Earlier selected flowing motion checks, 7 November 2026

- PASS locally: 28 Node checks and five feed checks. The new motion lifecycle checks cover pause/resume, hidden-page suspension, reduced-motion changes, reuse across screen changes and unavailable canvas support. Existing date, source, content and offline routing coverage still passes.
- PASS in the browser at 1920 × 1080: Pride on all five screen types, with text bounds above the artwork area’s 864px top edge and no broken loaded images. Remembrance/news, Parilia/tour and the December note were also inspected. Modern captions and footer counters no longer interrupt the graphics. Classical notes end at about 165px, above the main content.
- PASS at 1280 × 720 and 768 × 1024: expected whole-stage scaling without document overflow. Artwork is 216px on the unscaled stage, with speed 1.6 matching the selected study. The main content retains the earlier 90 per cent inset.
- PASS with the preview server stopped after offline-cache installation: Pride and Remembrance loaded with their new canvas treatments; the calendar retained 30 entries and the new SVG previews, with no broken loaded images.
- The selected Pride/Remembrance direction is applied locally. The other fifteen treatments are provisional and require adaptation/review. Nothing was committed, pushed or published. Player readability, motion and performance remain checks for the eventual release.

## Earlier larger seasonal artwork checks, 7 November 2026

- PASS locally, 26 Node checks and five feed checks.
- PASS in the browser at an explicitly set 1920 × 1080. All 30 event layouts displayed their expected artwork and explanation treatment, with no overflowing captions or broken loaded images. The inset main area ended at 867.6px, alongside the footer’s start, leaving the lower area for the larger compositions.
- PASS at 1280 × 720 and 768 × 1024, with no document overflow after layout. The larger poppy artwork also loaded after the preview server was stopped following cache installation.
- This version is held locally. The content inset makes profile body text 27px on the 1080p stage, compared with its 30px base size. Actual player readability needs checking after release.

## Earlier refined seasonal artwork checks, 7 November 2026

- PASS locally, 26 Node checks and five feed checks. Bundled-asset validation includes the retained transparent poppy PNG.
- PASS in the browser at an explicitly set 1920 × 1080. All 30 events displayed the expected artwork and explanation treatment, with no overflowing labels or broken loaded images. Painted Remembrance, the spectrum fold for Pride and the translucent wellbeing leaves were visually inspected in the page.
- PASS at 1280 × 720 and 768 × 1024 after layout settled. The painted Remembrance/news layout fitted its stage without document overflow. After cache installation and stopping the preview server, the painted PNG and the 30-entry calendar loaded with no broken loaded images.
- This revision is saved locally for the next release. The latest published and player evidence is recorded below.

## Earlier seasonal border checks, 7 November 2026

- PASS locally, 26 Node checks and five Python feed checks. Seasonal coverage includes all 30 entries and border paths, older cached content, inclusive annual windows, Gregorian Easter, Remembrance, overlaps and priority, leap-day month rules, confirmed campaign years, malformed input and the offline HTML routing regression.
- PASS in the in-app browser at an explicitly set 1920 × 1080. All 30 events displayed the expected artwork and modern/classical explanation treatment, with no overflowing labels or broken loaded images. Representative poppy, Pride, wellbeing and fireworks layouts were visually inspected. Modern observances have no explanatory paragraph on the display.
- PASS at 1280 × 720 and 768 × 1024. The poppy/news layout scaled without document overflow. A date outside all windows restored the usual rotation footer and hid the artwork.
- PASS after stopping the preview server following installation of the 79-file offline cache. Remembrance, the new wellbeing border and the 30-entry calendar with all 30 border previews loaded from cache, with no broken loaded images in the calendar.
- The revised design is saved locally for the next release. Actual Planet eStream regression testing follows publication. Earlier player evidence below retains its original scope.

## Initial seasonal draft checks, 7 November 2026

- PASS locally, 25 Node checks. The nine new seasonal checks cover all 17 event records and bundled assets, older content, inclusive annual windows, weekend handling, Remembrance through the correct Sunday for 2000–2100, Gregorian Easter including exceptional and century years, overlaps, priority, cross-year ranges and malformed input.
- PASS locally, five Python feed checks. Their simulated feed failure preserves valid stories as before.
- PASS in the in-app desktop browser at 1920 × 1080. All 17 seasonal entries and a no-event date produced the expected footer. Measured seasonal children fitted within the footer, with no broken loaded images. Remembrance, Christmas, Pride and fireworks screenshots were inspected alongside welcome, tour, people, careers and news content.
- PASS at 1280 × 720 and 768 × 1024. The stage scaled to 1280 × 720 and a centred 768 × 432 respectively, with no document overflow. An accelerated loop advanced unaided from Welcome/Pride to Tour/Vestalia. The preview-date control changed the cached display to Easter on 28 March 2027.
- PASS with the preview server stopped after cache installation. The Christmas display, its illustration and the Easter date-controlled illustration loaded from cache. The annual calendar retained all 17 entries and its graphics, and the credits page also opened correctly. This check exposed and corrected the existing worker’s use of the main page as the fallback for every navigation. Known bundled HTML pages now use their own cached responses. The new routing regression check covers calendar, credits, main navigation and a seasonal SVG.
- The local seasonal version is held for the next release. The published v2 evidence below remains the latest verified deployment and player evidence.

## Expanded release checks: 2 November 2026

- PASS locally: 16 Node checks, including all landmarks/careers within one day, all ten graduates in five pairs, date restrictions, fresh-news priority, source validation, assets and seed parity.
- PASS locally: five Python checks for dated/bounded source extracts, future/stale/wrong-host exclusion, unrelated/unsafe feed input, deduplication/retention and failure without mutation.
- PASS in Chrome at 1920 × 1080: 15 landmark, five graduate-pair, 14 career and five recent-news layouts; referenced images load, checked text stays inside the content area, and graduate body/source bounds do not overlap. Representative screenshots were inspected.
- PASS: [release deployment](https://github.com/EBCClassics/classics-display/actions/runs/41540376372) from `7d88359`; both test suites passed in GitHub.
- PASS: [manual daily-source workflow](https://github.com/EBCClassics/classics-display/actions/runs/41540632869) retrieved the feed, retained three dated discovery notices, ran both test suites, saved `19e040f` as github-actions[bot] with content/credits/changelog/handover, and deployed successfully. This exercises the configured daily path; the next unattended cron run has not yet occurred.
- PASS on the public live page: welcome sticker above frame, no draft badge, complete Parthenon photograph, Tom Hiddleston/Chris Martin pair, Public policy career fixture, freshly imported Roman-coins notice dated 30 October with the source-check date and labelled illustration, and automatic advancement. The live page reported its offline cache ready; this is not a new player offline-restart test.
- The earlier user-reported eStream pass below applies to the earlier release. The new release needs a player regression check, including readability of the paired profiles.

## Earlier completed checks

| Check | Result | Evidence / limit |
| --- | --- | --- |
| Scheduling and content suite | PASS | 12 Node checks, including all asset paths, 400 dates, weekends, UK clock changes, date ranges, stale/future news, invalid content, fallback parity and text contrast |
| First week at 1920 × 1080 | PASS | All five screens checked across 2–6 November: 25 layouts, with no main text/source/caption bounds crossing the content area |
| Welcome, tour, profiles, careers and news | PASS | Rendered in the desktop browser; photos and Gulliver loaded |
| 720p and portrait scaling | PASS | 1280 × 720 filled its viewport; 768 × 1024 fitted a centred 768 × 432 canvas with no document overflow |
| Date selection | PASS | 3 November produced Pompeii and its correct description |
| Automatic advancement | PASS | Accelerated loop moved from Welcome to Careers without a screen-navigation action |
| Test controls | PASS | Date entry, screen choice and next-screen controls changed the displayed content; pause fixture remained paused |
| Offline cache installation | PASS | Browser reported the complete local cache ready |
| Host unavailable reload | PASS | Stopped the local web server; navigated afresh to the tour URL; cached page, photograph and Gulliver loaded, and Next reached Mary Beard |
| Broken JSON | PASS | Fresh local fixture origin served invalid JSON; screen retained the bundled welcome and reported the failure in controls |
| Missing photograph | PASS | Local fixture served an unavailable image path; illustrated fallback displayed and was identified in the image alternative text |
| Console on normal route | PASS | No error logs during the sampled normal-route check |
| Public GitHub Pages deployment | PASS | First workflow run 41533040254 succeeded; all 12 checks and deployment steps passed |
| Public live page | PASS | Loaded without sign-in in Chrome; fonts, photograph and Gulliver loaded; automatic rotation advanced |
| Planet eStream basic operation | USER-REPORTED PASS | Philip reported on 2 November 2026: “I have tested on Planet eStream and everything seems to work fine.” Individual steps, player engine and test duration were not specified |

The host-unavailable check verifies a warm desktop browser cache. It does not establish offline restart support in an embedded eStream player or after storage is cleared.

## User-reported eStream result

Philip's report supersedes the earlier blanket “eStream not yet tested” status. It establishes that he tested the display through Planet eStream and found no apparent problem. Do not infer the particular player/browser version, a complete checklist, overnight operation, measured viewing distance or offline restart from that general report.

## Optional detailed TV acceptance and regression procedure

Use this procedure for a fuller acceptance record or after a relevant change. The blank results below do not negate the successful general test Philip has already reported. Record the date, tester, player identity/browser version and public website URL. Stop if the screen is blank, a login page appears, the display freezes, text clips or the published source is wrong.

1. **Start unaided.** Use the base URL, without testing parameters. Restart the player. Expected: Welcome appears without a click or login. Result: ___
2. **Watch two complete loops.** Allow at least 180 seconds of continuous display. Expected: Welcome → Gulliver → two graduates → career → news → Welcome; the next loop changes the selections, with no stalls or repeated early reloads. Result: ___
3. **Read from the waiting area.** Expected: a pupil can read headings and the main explanation at the normal viewing distance. Source notes may be smaller. Check the TV's overscan and crop settings if anything is lost. Result: ___
4. **Check fixtures on a desktop.** Keep `cycle=0` in all date fixtures.  Use `?date=2026-11-03&cycle=0&pause=1&screen=tour` (Pompeii), then 6 November (Ephesus), 7 November (Ephesus opening offset held over the weekend), then 9 November (Bath). Expected: correct destination and date; clock remains the current UK time. Result: ___
5. **Check the news label.** Use `?date=2026-11-02&cycle=0&pause=1&screen=news`. Expected: a dated October 2026 Pompeii report, with a location-picture caption. Use 1 January 2027 to confirm older source material is labelled archive; actual daily updates may supply eligible news by that date. Result: ___
6. **Pause and resume.** On a desktop, use `?controls=1`, Pause, Next and Play. Expected: pause holds a screen, Next changes it, Play restores the timed loop. Remove these parameters for the TV. Result: ___
7. **Disconnect after caching.** First confirm Offline cache ready if the player exposes controls. Disconnect the test player's connection for two loops, then reload if the test setup permits. Expected: rotation continues; warm reload also works if that player allows persistent service-worker caching. Record the two results separately. Continuous rotation: ___ Offline reload: ___
8. **Reconnect and update.** Publish a small, identifiable test wording change. Expected: Reload content or the next 15-minute refresh picks up valid data; restore the final wording afterwards. Result: ___
9. **Leave unattended.** Run for a school day and check again, including the next morning. Expected: date changes, no memory-related freezing, stable layout and no prompt. Result: ___
10. **Confirm acceptance.** Record any remaining problems before replacing the original screen. Overall result: ___

## Repeatable local failure fixtures

Run `python3 tests/serve-fixtures.py` from this project. It binds only to `127.0.0.1:8766` and does not change the published data.

- `http://127.0.0.1:8766/invalid/?nosw=1&pause=1&controls=1`: invalid content; expect the seeded or last valid display and a content-error note.
- `http://127.0.0.1:8766/missing/?nosw=1&pause=1&controls=1`: unavailable image; expect an illustrated fallback.

Stop the fixture server when finished. These are test-only routes; they are not included in the deployable website.
