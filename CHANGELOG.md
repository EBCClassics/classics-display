# Changelog

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
