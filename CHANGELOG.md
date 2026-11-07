# Changelog

## 7 November 2026 per-display artwork motion

- Philip confirmed the poppies animate on his laptop but appear static on the school desktop in Edge. Comparison of live captures confirmed the published animation runs in the tested browser; the school device’s precise cause is not yet confirmed.
- Added Automatic, On for this display and Off options to the hidden controls. Automatic honours reduced-motion preferences. An explicit On choice enables decorative motion for this display without changing Windows settings. `?motion=on` selects and remembers that browser’s choice; the same parameter can remain in an eStream panel URL. Pause and background suspension continue to apply.
- Added motion diagnostics distinguishing playing, reduced-motion preference, explicit Off, pause and static fallback. The approved artwork, pace and geometry are unchanged.
- Updated application/cache version consistently to v4, versioned script/style URLs and requested fresh assets during cache installation. Query-versioned script requests retain their canonical offline fallback.
- Verification: 31 Node checks and seven Python checks pass. Browser checks cover explicit Off/On, accurate diagnostics and persistence after reopening the base page. School Edge and eStream confirmation remains a user check. Published successfully from `2695e8219b62ed4c2964a72102ba10d8559b827c` in [workflow 42375679647](https://github.com/EBCClassics/classics-display/actions/runs/42375679647). The live motion-on link reported Playing, loaded the versioned v4 scripts and retained On when the base page was reopened.

## 7 November 2026 ancient names and authorised seasonal release

- Philip approved the screenshot review and authorised publication after adding ancient festival names within their graphics. Added colour-matched serif names to all eleven ancient treatments, with space left in the surrounding artwork. The brief explanations remain above the main content.
- Generated matching named SVG fallbacks/calendar previews and added optional validated `designName` content. Names update without recreating the canvas when two events share a treatment. Modern designs keep their caption-free artwork.
- Included the queued TheCollector and Greek Reporter sources in the existing daily check. TheCollector URLs must belong to its News & Discoveries listing; Greek Reporter items require archaeology categorisation and exclude evergreen stories. Existing dates, bounded extracts, archive fallback, retention and failure protections remain. Preserved the newer AIA story already added by the daily workflow.
- Verification passed locally with 30 Node checks and seven Python checks. A source check read all three publishers and retained five dated notices. All eleven named designs were captured and checked at 1920 × 1080. Published successfully from `b2187cfad7dbf47e0283de48270394e94f500f11` through [workflow 42373132244](https://github.com/EBCClassics/classics-display/actions/runs/42373132244). The live base URL, Floralia/Saturnalia names and Greek Reporter news fixture were verified. The eStream panel needs one reload for this version; player regression remains separate.

## 7 November 2026 complete seasonal review draft

- Adapted the remaining seasonal graphics to flat, stylised moving features, retaining the selected speed 1.6 and 20 per cent artwork area. The eighteen treatments include awareness ribbons, books/pages, laurel and olive branches, stars, fireworks, festive ornaments, hearts, infinity loops, globes, waves, flames and theatre masks. Easter now has its own eggs-and-blossoms treatment, separate from Floralia.
- Shared the drawing definitions between the motion player and generated static SVG fallbacks, so calendar previews and unavailable-canvas fallbacks match the artwork. All treatments honour pause, hidden-page and reduced-motion settings, capped at 30fps. Pause also removes the entrance transition for reliable still review.
- Captured 30 labelled 1920 × 1080 screenshots, one per event, and prepared a 30-page PDF, an overview of the eighteen designs and a ZIP of the individual screenshots with a local gallery. These are review snapshots; the project checkout remains the master.
- Verification: 29 Node checks and five feed checks pass. Browser checks verified all 30 event selections, rendered canvases, text clearance and loaded images. All 30 calendar previews loaded. Smaller-screen scaling and host-unavailable loading of Earth Day and the calendar passed. The PDF was reopened and rendered for visual inspection. Publication remains on hold for Philip’s screenshot review.

## 7 November 2026 selected flowing motion

- Philip selected the flowing-strands study at movement speed 1.6 and artwork height 18–20 per cent. Implemented the starting height at 20 per cent (216px on the 1080px stage).
- Pride/LGBT+ History now use six separate flowing colour strands. Remembrance uses flat stylised poppies with swaying stems. Matching generated SVGs provide static fallbacks and calendar previews. The previous painted PNG is retained but no longer selected.
- Removed the modern event captions, footer counters and progress bar from the artwork area. Roman festivals and Saturnalia retain an unboxed note above the main content. Other fifteen treatments remain provisional for adaptation/review against the chosen direction.
- Added motion capped at 30fps, preserving the canvas across screen changes and stopping it when paused, hidden or reduced motion is requested. Calendar dates, five-screen rotation and durations remain unchanged.
- Verification: 28 Node checks and five feed checks pass. Browser checks at 1920 × 1080 cover Pride on all five screens, Remembrance/news, the Roman/December notes and the no-event footer. Smaller-screen scaling passed at 1280 × 720 and 768 × 1024. With the preview server stopped after cache installation, both new animated treatments and the 30-entry calendar loaded without broken images. Held locally; no publication.

## 7 November 2026 larger seasonal artwork

- Increased the seasonal artwork area after Philip found the refined treatments too subtle. Remembrance uses the larger painted poppy composition across the lower edge and corners. Pride has a deeper, saturated spectrum fold. Wellbeing foliage and the other SVG treatments use richer colour and stronger detail.
- Inset the main screen content to 90 per cent during active seasonal periods, reserving roughly the lower fifth of the stage for artwork. Centred the event caption and added a dark backing for captions/counters where they cross the artwork. The usual full-size layout returns between events.
- Selected `poppy-bold.png` from the initial image generation, updated the prompt record and removed the superseded reduced-size PNG from this local draft. The generated credits/calendar and offline list have been refreshed.
- Verification passed with 26 Node checks and five feed checks. All 30 event layouts passed browser checks at 1920 × 1080, including content/caption bounds and loaded artwork. Smaller-screen scaling and cached loading of the larger poppies with the preview server stopped also passed. Saved locally for the next release.

## 7 November 2026 refined seasonal artwork

- Revised all seventeen treatments after Philip found the repeated graphic motifs dated. Remembrance now uses a transparent painted botanical meadow created with the built-in image tool. Pride uses a single shaded spectrum fold. Wellbeing uses translucent leaves gathered to one side. The other SVG compositions use sparse line work, muted washes and cropped botanical forms.
- Reduced the seasonal labels to small spaced capitals, removed the full-width footer rule and softened the classical explanation text. Added PNG/WebP support for the decorative image field while retaining local-path validation.
- Retained the generated poppy PNG in the project, recorded both generation prompts and updated the source credits. The existing helper regenerates sixteen SVG treatments and preserves the PNG. Removed the superseded repeated poppy SVG from the local draft.
- Verification passed with 26 Node checks and five feed checks. All 30 event treatments passed browser layout and explanation checks at 1920 × 1080. Smaller-screen scaling and cached loading of the painted PNG and full calendar with the preview server stopped also passed. Saved locally for the next release.

## 7 November 2026 integrated seasonal borders and wider modern calendar

- Replaced the small seasonal icon and explanatory strip with 17 continuous decorative borders. Remembrance has a poppy meadow along the full bottom edge, Pride flowing rainbow ribbons, and wellbeing events green ribbons and leaves. Other designs cover books, flowers, fireworks, festive greenery and classical ornament.
- Modern observances now show their name and artwork. Roman festivals retain a short explanation. Borders occupy the reserved footer and outside margins. Gentle decorative motion honours reduced-motion preferences, Remembrance is static, and the same artwork persists across screen changes.
- Expanded to 30 calendar entries with Children’s Mental Health Week, Mental Health Awareness Week, World Mental Health Day, LGBT+ History Month, World Book Day, World Poetry Day, happiness, autism awareness, Earth Day, peace, kindness, Anti-Bullying Week and disability inclusion.
- Added calendar-month scheduling for leap years and confirmed year-specific campaign ranges. The stored 2027 weeks and World Book Day use organiser-confirmed dates. Anti-Bullying Week uses the confirmed 2026 dates, extended through that weekend. Later dates require checking when announced.
- Added deterministic artwork generation through the existing credits helper and refreshed the calendar, source credits and offline list. Local cache version remains v3 within this unpublished iteration.
- Verification passed with 26 Node checks and five feed checks. All 30 event treatments passed browser layout and explanation checks at an explicitly set 1920 × 1080. Smaller-screen scaling, the no-event footer and cached loading of the poppy/wellbeing borders and full calendar with the preview server stopped also passed. Saved locally for the next release.

## 7 November 2026 seasonal calendar for the next version

- Added 17 annually recurring seasonal entries, including all seven requested modern observances and selected Roman festivals throughout the year, with sourced explanations, separate observance dates and extended display windows.
- Added 14 original SVG illustrations and automatic seasonal selection in the existing footer. UK calendar dates control the changeover. Western Easter is calculated each year. Remembrance uses 6 November through the Sunday of the week containing 11 November, with priority over other entries. Equal-priority overlaps alternate across screens and loops.
- Generated an annual calendar page and updated source credits, offline assets and continuity/operation records. Local application/cache version is consistently v3. Older saved content can use the bundled event calendar.
- Corrected cached navigation so the calendar and credits use their own pages when the host is unavailable.
- Verification passed locally, with 25 Node checks, five Python checks and browser checks for all 17 seasonal entries plus an inactive date at 1920 × 1080. Representative graphics were visually inspected on all five screen types. Smaller-screen scaling, automatic overlapping-event advancement, date controls and warm-cache navigation with the preview server stopped also passed. This next-version work is held locally under Philip’s earlier release instruction.

## 6 November 2026: daily discovery source check

- Refreshed the source-attributed discovery bank (4 retained feed notices; latest report 2026-11-05). No generated reporting or remote photographs.
- Content/scheduling checks and feed-safety checks passed before this save. Deployment outcome: [publishing workflow](https://github.com/EBCClassics/classics-display/actions/runs/42221421540); a saved commit alone does not establish successful deployment.


## 6 November 2026: news sources for the next iteration

- Recorded TheCollector and Greek Reporter as additional sources for the weekly Classics news scan in the next iteration. Checked both source listings and saved the plan in the local context and handover. This entry records planning only.

## 2 November 2026: daily discovery source check

- Refreshed the source-attributed discovery bank (3 retained feed notices; latest report 2026-10-30). No generated reporting or remote photographs.
- Content/scheduling checks and feed-safety checks passed before this save. The manual daily-source run completed successfully, including source retrieval, both test suites, automated save `19e040f` and deployment: [verified workflow](https://github.com/EBCClassics/classics-display/actions/runs/41540632869).

## 2 November 2026: wider rotation, clearer landmarks and recent discoveries

- Fixed the welcome sticker/frame overlap, removed the public “working draft” badge and replaced the close Parthenon photograph with a wide view. Landmark photos are shown in full, with Gulliver’s speech beneath.
- Expanded to 15 landmarks, 10 verified university Classics graduates (two per screen), and 14 career routes. Content advances each 90-second loop within the day; time-seeded starts vary short player visits. Retained five silent screens, neon branding and 1080p-first scaling.
- Added two October 2026 official Pompeii reports and short AIA discovery-feed notices. Philip selected an automatic daily source check: the existing GitHub workflow now checks at 05:17 UTC, validates dates/hosts, retains notices for 30 days, records changed content and deploys. No generated reporting; images and extracts are labelled. Failed source checks preserve valid content.
- Updated image credits, generated seed/offline assets, publishing/testing instructions and continuity records. Cache version is consistently v2.
- Verification: 16 application checks and five feed-safety checks pass locally. Browser checks cover all 15 landmark, five graduate-pair, 14 career and five recent-news layouts at 1920 × 1080; images load and sampled text bounds fit. Release deployment succeeded from `7d88359`: [workflow](https://github.com/EBCClassics/classics-display/actions/runs/41540376372). Live welcome/frame, complete Parthenon, paired graduates, an additional career route and the newly fetched discovery notice were verified without sign-in. Automatic live advancement was also checked. The updated eStream panel still needs its own regression check.

## 2 November 2026: eStream test and project continuity

- Philip reported that he tested the display in Planet eStream and everything seemed to work fine. Updated acceptance wording to a user-reported basic-operation pass, without inventing a detailed player, unattended-run or offline-restart test record.
- Made the GitHub repository and public GitHub Pages URL explicit in the README, publishing guide, context and handover.
- Moved the active GitHub checkout to the permanent `Documents/Codex/Projects/ClassicsDisplay` folder. Earlier chat folders and downloads are historical snapshots.
- Added `AGENTS.md`, `CONTEXT.md`, `CODEX_HANDOVER.md` and `CODEX_SETUP.md`. Future material changes must update the changelog, handover and affected operating/context/test documentation in the same change.
- Documentation only: no change to the website's application code, branding, rotation or seeded stories. Publication is verified by the existing GitHub Actions workflow; deployment outcome is reported with the completed task rather than asserted in advance here.

## 2 November 2026: public repository and automatic publishing

- Created the public `EBCClassics/classics-display` repository and uploaded the draft, bundled photographs/fonts, source credits, content preparation helpers and checks.
- Configured GitHub Pages to use **Publish Classics display** on saves to `main`; the workflow prepares content, runs all 12 checks and publishes `dist/`.
- First deployment succeeded: [run 41533040254](https://github.com/EBCClassics/classics-display/actions/runs/41533040254), source commit `8e2f3d0d3c4d47a7bf5a9d21539785f4b9b49394`.
- Verified the public page without sign-in, loaded photographs/fonts/Gulliver and observed automatic screen advancement. All uploaded files matched the prepared project, apart from an added final newline in the credits JSON.

## 2 November 2026: first working display

- Built the five-screen 1080p-first rotation: welcome, Gulliver on Tour, famous classicists, careers and Classical news.
- Applied Philip's requested personal neon palette and typography, without P or C symbols, and adapted his existing code-drawn Eastbourne gull.
- Added UK date-based selection, explicit schedules, weekend holding, editable JSON, hidden testing controls, content/image fallbacks and offline caching.
- Included clearly labelled, sourced archive stories rather than claiming a live-news feed.
- Passed 12 checks and desktop browser verification, including 25 first-week layouts, scaling, date selection, auto-advance, failure fixtures and warm-cache host-unavailable reload.
- Published an earlier owner-private Sites preview. That preview remains separate from the later public GitHub Pages production site.
