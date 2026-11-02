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

Five screens loop in 80 seconds: welcome 10, tour 18, people 16, careers 16, news 20. Content is chosen by UK date. Weekends hold Friday's selection by default; school holidays are not modelled. Explicit schedules cover 2–6 November 2026; a deterministic content-bank rotation continues afterwards.

The five seeded destinations are Athens, Pompeii, Delphi, Rome and Ephesus. Profiles cover Mary Beard and Natalie Haynes. Careers cover law, journalism, museums and heritage, publishing and technology, described as possible routes with transferable skills and additional entry/training requirements.

News currently uses two sourced archive examples: the Pompeii blue-room report of 3 June 2024 and the flatbread-fresco discussion in the September/October 2023 issue of Archaeology. The screen labels them as archive examples, not live news. Location photographs are identified as such. There is no connected news feed, daily research job or automatic content-writing service. Date-based selection and automatic publication are separate from creating new content.

`content.json` is checked at startup and every 15 minutes. Invalid or unavailable data keeps the last valid content; the bundled seed is another fallback. Local image failure produces an identified illustration. Offline reload is supported after a successful cache installation where the player permits persistent service workers; first-ever offline loading is not possible.

Testing controls are hidden by default. `?controls=1` exposes screen/date/speed/full-screen controls; keyboard controls include Space, arrows, 1–5, C and F. Production eStream uses the base URL without test parameters. Design/script changes require the panel to reload; the content refresh does not by itself replace running JavaScript.

## Verification and acceptance

- Initial GitHub deployment succeeded on 2 November 2026, from commit `8e2f3d0d3c4d47a7bf5a9d21539785f4b9b49394`: https://github.com/EBCClassics/classics-display/actions/runs/41533040254.
- All 12 source/content checks passed in GitHub and locally. Desktop browser checks included the first week's 25 layouts at 1080p, 720p/portrait scaling, automatic advancement, controls, broken JSON, a missing picture and a warm-cache reload with the local host stopped.
- The public GitHub Pages site loaded without sign-in; its fonts, site photograph and Gulliver loaded and its rotation advanced.
- Philip reported on 2 November 2026: “I have tested on Planet eStream and everything seems to work fine.” Record basic eStream operation as a user-reported pass. The particular player engine, individual acceptance steps, viewing-distance assessment, long unattended run and offline restart were not separately reported.

## Continuity

Durable context belongs in these checked-in files, rather than only in a chat transcript. `AGENTS.md` requires future material changes to update the handover, changelog and affected operation/test documents. `CODEX_HANDOVER.md` gives the next agent the practical starting point. `CODEX_SETUP.md` explains how to attach the permanent folder as a local Codex project. ZIP files and previous output folders are exports, not masters.
