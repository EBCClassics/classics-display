# Changelog

## 6 November 2026: daily discovery source check

- Refreshed the source-attributed discovery bank (4 retained feed notices; latest report 2026-11-05). No generated reporting or remote photographs.
- Content/scheduling checks and feed-safety checks passed before this save. Deployment outcome: [publishing workflow](https://github.com/EBCClassics/classics-display/actions/runs/42221421540); a saved commit alone does not establish successful deployment.

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
