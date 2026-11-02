# Display testing record

Updated on 2 November 2026. This records development checks, successful publication and Philip's reported Planet eStream test separately.

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
