# Classics Display: current context

Updated: 2 November 2026.

## Purpose and working arrangement

A silent, TV-readable Classics Department display for Eastbourne College, embedded as a website panel in Planet eStream. Philip asks Codex for changes; Codex updates the project files and records, and a save to GitHub's `main` branch automatically runs checks and publishes the site at the same address. Philip should not need to edit JSON, re-upload a website or change the eStream URL for each content update.

- Master repository: https://github.com/EBCClassics/classics-display
- Public production display: https://ebcclassics.github.io/classics-display/
- Permanent local checkout: `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`
- Publishing workflow: `.github/workflows/pages.yml`, named **Publish Classics display**.
- This is a public static website. The earlier sign-in-protected Sites preview is separate and is not the eStream production address.

## Confirmed preferences and decisions

- Use Philip's personal neon branding, without the P or C symbols. His explicit instruction supersedes applying school house style to this project.
- Pink `#FF2DAA`, ink `#101522`, a yellow accent, serif headlines and sans-serif explanations. Nimbus fonts are bundled with their licence.
- Large text, strong contrast and uncluttered full-screen features. The 1920 × 1080 stage scales as a whole and letterboxes on other aspect ratios.
- Retain a welcoming Classics Department opening, famous classicists, careers, Gulliver on Tour and a Classical news feature.
- Gulliver adapts the original native SVG gull from Philip's personal dashboard, adding travel accessories. No dashboard data, accounts or pet-care logic are connected to the public display.
- All photographs, fonts and scripts are bundled locally. Preserve accurate sources, dates, licensing and fallback labels.

## Current behaviour

Five screens loop in 90 seconds: welcome 8, tour 20, people 24, careers 18, news 20. Landmarks, two-person graduate profiles, careers and discoveries change on successive loops within the same day. UK school dates vary the starting offset; weekends hold Friday’s offset, while loop rotation continues. Explicit opening-landmark fixtures cover 2–6 November 2026. The loop counter starts from the current time on page load; a `cycle` query parameter fixes it for tests.

The bank contains 15 landmarks, 10 verified university Classics graduates and 14 career routes. Two graduates appear per people screen. Course connections are explicit and sourced; the category means successful people who studied Classics at university, not only professional classicists. The complete Parthenon is visible in a replacement wide photograph; landmark pictures use `contain`, with Gulliver’s speech below. The welcome frame no longer crosses its sticker, and the “working draft” badge is removed.

Philip authorised an automatic daily discovery-source check on 2 November 2026. The existing GitHub workflow checks Archaeology magazine’s AIA RSS feed at 05:17 UTC daily, using bounded, attributed source extracts rather than generated reporting. Greek/Roman relevance, source host, report date and size are checked. Current reports are at most 30 days old; retained notices are merged with manually checked official Pompeii reports. When no current report remains, labelled archive material is used. Feed notices use an original labelled illustration; location photographs are identified. Scheduled source failures preserve valid stories and produce a workflow warning. The Mac can be off; the player needs connectivity for updates. GitHub scheduling can be delayed.

Changed notices are saved to `main` with generated files and a brief changelog/handover record after both test suites pass. The same workflow deploys them; token-originated commits do not need a second workflow trigger. No extra host, paid service, account integration or AI-writing service is required.

`content.json` is checked at startup and every 15 minutes. Invalid or unavailable data keeps the last valid content; the bundled seed is another fallback. Local image failure produces an identified illustration. Offline reload is supported after a successful cache installation where the player permits persistent service workers; first-ever offline loading is not possible.

Testing controls are hidden by default. `?controls=1` exposes screen/date/speed/full-screen controls; keyboard controls include Space, arrows, 1–5, C and F. Production eStream uses the base URL without test parameters. Design/script changes require the panel to reload; the content refresh does not by itself replace running JavaScript.

## Verification and acceptance

- Initial GitHub deployment succeeded on 2 November 2026, from commit `8e2f3d0d3c4d47a7bf5a9d21539785f4b9b49394`: https://github.com/EBCClassics/classics-display/actions/runs/41533040254.
- The initial 12 source/content checks passed in GitHub and locally. Desktop browser checks included the first week's 25 layouts at 1080p, 720p/portrait scaling, automatic advancement, controls, broken JSON, a missing picture and a warm-cache reload with the local host stopped.
- The public GitHub Pages site loaded without sign-in; its fonts, site photograph and Gulliver loaded and its rotation advanced.
- Philip reported on 2 November 2026: “I have tested on Planet eStream and everything seems to work fine.” Record basic eStream operation as a user-reported pass. The particular player engine, individual acceptance steps, viewing-distance assessment, long unattended run and offline restart were not separately reported.

The expanded release passes 16 application checks and five feed-safety checks locally. Its deployment and live verification are recorded with the completed release; do not infer those from local checks.

## Continuity

Durable context belongs in these checked-in files, rather than only in a chat transcript. `AGENTS.md` requires future material changes to update the handover, changelog and affected operation/test documents. `CODEX_HANDOVER.md` gives the next agent the practical starting point. `CODEX_SETUP.md` explains how to attach the permanent folder as a local Codex project. ZIP files and previous output folders are exports, not masters.
