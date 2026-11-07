# Classics Display: current context

Updated: 7 November 2026.

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

Artwork motion now has a per-display Automatic/On/Off setting in the hidden controls. Automatic honours the device’s reduced-motion preference; On is an explicit opt-in for signage that should animate regardless of that preference. `?motion=on` selects and remembers On in that browser; it can also be included in the eStream panel URL. Pause and background suspension still stop animation. The setting and public content are the only local browser preferences/data stored. The current application/cache version for this update is v4, with versioned script/style requests and fresh fetches during cache installation. The approved artwork and pace remain as reviewed. Philip reports the previous published animation works on his laptop but appears static in school Edge; that device’s exact cause is not confirmed. Local override and persistence checks passed; publication verification is pending.

Five screens loop in 90 seconds: welcome 8, tour 20, people 24, careers 18, news 20. Landmarks, two-person graduate profiles, careers and discoveries change on successive loops within the same day. UK school dates vary the starting offset; weekends hold Friday’s offset, while loop rotation continues. Explicit opening-landmark fixtures cover 2–6 November 2026. The loop counter starts from the current time on page load; a `cycle` query parameter fixes it for tests.

The bank contains 15 landmarks, 10 verified university Classics graduates and 14 career routes. Two graduates appear per people screen. Course connections are explicit and sourced; the category means successful people who studied Classics at university, not only professional classicists. The complete Parthenon is visible in a replacement wide photograph; landmark pictures use `contain`, with Gulliver’s speech below. The welcome frame no longer crosses its sticker, and the “working draft” badge is removed.

Philip authorised an automatic daily discovery-source check on 2 November 2026. The existing GitHub workflow checks AIA, TheCollector’s News & Discoveries and Greek Reporter’s archaeology coverage at 05:17 UTC daily, using bounded, attributed source extracts rather than generated reporting. Greek/Roman relevance, source host, report date and size are checked. Current reports are at most 30 days old; retained notices are merged with manually checked official Pompeii reports. When no current report remains, labelled archive material is used. Feed notices use an original labelled illustration; location photographs are identified. Scheduled source failures preserve valid stories and produce a workflow warning. The Mac can be off; the player needs connectivity for updates. GitHub scheduling can be delayed.

Changed notices are saved to `main` with generated files and a brief changelog/handover record after both test suites pass. The same workflow deploys them; token-originated commits do not need a second workflow trigger. No extra host, paid service, account integration or AI-writing service is required.

`content.json` is checked at startup and every 15 minutes. Invalid or unavailable data keeps the last valid content; the bundled seed is another fallback. Local image failure produces an identified illustration. Offline reload is supported after a successful cache installation where the player permits persistent service workers; first-ever offline loading is not possible.

Testing controls are hidden by default. `?controls=1` exposes screen/date/speed/full-screen controls; keyboard controls include Space, arrows, 1–5, C and F. Production eStream uses the base URL without test parameters. Design/script changes require the panel to reload; the content refresh does not by itself replace running JavaScript.

## Verification and acceptance

- Initial GitHub deployment succeeded on 2 November 2026, from commit `8e2f3d0d3c4d47a7bf5a9d21539785f4b9b49394`: https://github.com/EBCClassics/classics-display/actions/runs/41533040254.
- The initial 12 source/content checks passed in GitHub and locally. Desktop browser checks included the first week's 25 layouts at 1080p, 720p/portrait scaling, automatic advancement, controls, broken JSON, a missing picture and a warm-cache reload with the local host stopped.
- The public GitHub Pages site loaded without sign-in; its fonts, site photograph and Gulliver loaded and its rotation advanced.
- Philip reported on 2 November 2026: “I have tested on Planet eStream and everything seems to work fine.” Record basic eStream operation as a user-reported pass. The particular player engine, individual acceptance steps, viewing-distance assessment, long unattended run and offline restart were not separately reported.

The expanded release passes 16 application checks and five feed-safety checks locally and in GitHub. Release run [41540376372](https://github.com/EBCClassics/classics-display/actions/runs/41540376372) and manual source-check run [41540632869](https://github.com/EBCClassics/classics-display/actions/runs/41540632869) succeeded. The latter fetched three notices, committed `19e040f` and deployed them. The live welcome, full Parthenon, graduate pair, an additional career, recent source notice and automatic advancement were verified. These desktop checks do not replace player regression testing of this version.

## Continuity

### Seasonal release approved on 7 November 2026

The authorised seasonal release contains 30 calendar entries and 18 seasonal treatments. Philip selected the “Flowing strands” direction on 7 November, at movement speed 1.6 and artwork height 18–20 per cent. The implemented starting height is 20 per cent (216px of the 1080px stage). Pride and LGBT+ History Month use six separate moving colour strands. Remembrance uses flat, stylised poppies with curved, swaying stems. These replace the spectrum fold and realistic painted flowers. All remaining treatments have now been adapted to flat, stylised moving motifs. Easter has a separate egg-and-blossom treatment, while Floralia retains flowers. Philip approved the reviewed designs on 7 November and requested colour-matched ancient festival names within the artwork, then publication. Eleven ancient designs now include their names, with clear space around the lettering.

Artwork has an uninterrupted area along the lower edge. Modern observances have no overlaid caption, footer counter or progress bar. Ancient festival names form part of the colour-matched artwork. Their short, unboxed explanations remain between the masthead and main content. During active seasonal periods the main content retains its 90 per cent inset. With no event it returns to full size with the usual footer. The five-screen rotation and 90-second timings continue. Reference notes, windows and sources are in `dist/calendar.html`.

Seasonal selection uses the actual Europe/London date, including weekends and midnight changes. Western Gregorian Easter is calculated annually. Remembrance uses 6 November through the Sunday of the week containing 11 November, with priority over other events. Bonfire Night uses 1–5 November and Christmas/Saturnalia December. Equal-priority overlaps alternate across screens and loops. All eighteen treatments animate at the selected pace, capped at 30 frames per second. Decorative animation stops when paused or hidden; Automatic also honours reduced-motion preferences. The same canvas persists across screen changes for the same treatment. Static SVG fallbacks cover unavailable canvas support, and provide the calendar previews.

The expanded modern calendar includes mental health and wellbeing, anti-bullying, kindness, autism awareness, disability inclusion, LGBT+ history, reading, poetry, peace and Earth Day. Organiser-set weeks and UK World Book Day use confirmed year-specific ranges. The calendar includes 2027 dates for Children’s Mental Health Week, Mental Health Awareness Week and World Book Day, and 2026 Anti-Bullying Week. Later years require a source check when announced. Fixed dates, month rules, Easter and Remembrance continue automatically. Eighteen SVG treatments regenerate through `scripts/seasonal-art.py` and its Node helper when the credits helper runs. `dist/seasonal-drawing.js` shares the drawing definitions between moving artwork and SVG fallbacks. `dist/seasonal-motion.js` manages playback. The earlier AI-generated `poppy-bold.png` and its prompt record remain as historical assets, but the display no longer selects that PNG.

Philip authorised publication of the reviewed seasonal release on 7 November, including ancient festival names within the artwork. Cache version v3 is consistent across the application and preparation helper. Release commit `b2187cfad7dbf47e0283de48270394e94f500f11` was published successfully in [workflow 42373132244](https://github.com/EBCClassics/classics-display/actions/runs/42373132244). The live Remembrance display, named Floralia and Saturnalia designs, and Greek Reporter news fixture were verified in the browser. Reload the eStream panel once for the new scripts; this version’s player regression remains to be reported. The original screenshot pack is a historical review snapshot, made before the ancient names were added.

TheCollector’s News & Discoveries and Greek Reporter’s archaeology coverage are now included in the existing daily source check, fulfilling the queued next-version request. Publisher host, news-section membership, Greek/Roman relevance, discovery keywords, date and extract length are checked. TheCollector URLs must be linked from its news listing. Greek Reporter entries require archaeology categorisation and exclude evergreen items. Individual source failures warn and preserve valid stories; complete failure leaves the content untouched. A verified local check on 7 November read all three publishers and retained five current feed notices. No new schedule or external service was created.

Durable context belongs in these checked-in files, rather than only in a chat transcript. `AGENTS.md` requires future material changes to update the handover, changelog and affected operation/test documents. `CODEX_HANDOVER.md` gives the next agent the practical starting point. `CODEX_SETUP.md` explains how to attach the permanent folder as a local Codex project. ZIP files and previous output folders are exports, not masters.
