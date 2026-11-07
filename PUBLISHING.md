# Publishing this display

Master repository: https://github.com/EBCClassics/classics-display

Live public display address: https://ebcclassics.github.io/classics-display/

The first GitHub Pages deployment succeeded on 2 November 2026. Use this base address in the Planet eStream website panel; it stays the same after subsequent updates. Philip has tested it in Planet eStream and reports that everything seems to work fine.

## Changes through Codex

Philip approved the 7 November seasonal artwork and 30-entry calendar for publication. All eighteen treatments now use the selected flowing/stylised direction at speed 1.6 and 20 per cent height. The screenshot review is approved, and eleven ancient festival names have been integrated into the artwork in matching colours. The original seasonal release used cache v3; the motion-setting update uses v4. The existing daily news check also includes the two queued publishers, TheCollector and Greek Reporter. The release was published successfully in [workflow 42373132244](https://github.com/EBCClassics/classics-display/actions/runs/42373132244) from `b2187cfad7dbf47e0283de48270394e94f500f11`. The live base URL, named ancient designs and added news source were checked. One eStream panel reload is needed for the new scripts; player regression is separate from these browser checks.

Ask for the required content or design changes in the Codex project. Its prepared local checkout is `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`. Codex updates this repository and the affected context, handover, changelog and operating/test records, validates the content, runs all current application checks and seven feed-safety checks and saves the changes to `main`. The included GitHub Actions workflow then prepares and publishes `dist/` automatically. Wait for that workflow to succeed before calling an update published.

The webpage checks for content changes every 15 minutes. Design and script changes require the panel to reload. A changed offline-worker version can update its cached files; support still depends on the actual player.

## Per-display motion setting

The current motion-setting update uses cache v4. The approved animation was observed working in the live test browser, while Philip reports it is static in school Edge. The device-specific cause is not confirmed. Automatic follows the operating system’s reduced-motion preference; `?motion=on` explicitly enables artwork motion for that display without changing Windows settings. The hidden controls expose Automatic/On/Off and diagnostic status. The browser remembers the choice where storage is available; use `?motion=on` in the eStream panel URL to make the choice explicit on restart. Pause and hidden-page suspension remain in effect. Versioned script/style URLs and fresh installation fetches refresh old assets. The update deployed successfully from `2695e8219b62ed4c2964a72102ba10d8559b827c` in [workflow 42375679647](https://github.com/EBCClassics/classics-display/actions/runs/42375679647). Live checks confirmed the On setting, active canvas, v4 script URLs and persistence on reopening the base page. The actual school desktop/player still needs Philip’s confirmation.

## Repository layout

- `dist/`: the complete public website, photographs and fonts.
- `dist/content.json`: the editable source of content and schedules.
- `dist/assets/seasons/` and `dist/calendar.html`: original seasonal borders/illustrations and the generated annual calendar in the local next version. The credits helper regenerates eighteen SVG treatments with `scripts/seasonal-art.py` and `scripts/seasonal-art.cjs`. They share `dist/seasonal-drawing.js` with the motion player, `dist/seasonal-motion.js`. The old painted poppy PNG is retained but no longer selected.
- `scripts/prepare.cjs`: validation plus generation of the bundled fallback and offline asset list.
- `tests/`: scheduling, content and fallback checks.
- `.github/workflows/pages.yml`: automatic publication when `main` changes.
- `README.md` and `TESTING.md`: current setup, test evidence and optional detailed player checks.
- `AGENTS.md`, `CONTEXT.md`, `CODEX_HANDOVER.md` and `CHANGELOG.md`: required working instructions, decisions, continuity and changes.
- `CODEX_SETUP.md`: attaching the permanent working folder as a local Codex project.

The earlier owner-private Sites preview is separate. The public repository does not need its `.openai` configuration.

## Completion and access

Confirm the workflow succeeds before reporting publication. The initial successful run is https://github.com/EBCClassics/classics-display/actions/runs/41533040254. Verify a changed screen or behaviour on the live page when appropriate. Documentation-only commits also run the existing deployment workflow.

The connected GitHub account could read the repository but its write requests returned 403 during setup. Browser-based upload through Philip's signed-in Chrome session worked and was used for the initial deployment. Do not assume user admin permission means the connector has write permission; use an available authorised route and retain the same master repository. No access tokens are included in the source.

## Daily discovery publication

The same workflow runs at 05:17 UTC daily and can be run manually. It checks AIA, TheCollector’s News & Discoveries and Greek Reporter’s archaeology feed for recent Greek/Roman discoveries, retains dated source extracts for up to 30 days, rebuilds credits/fallbacks, and runs both test suites. If the discovery bank changed, it saves content and the corresponding changelog/handover record to `main`, then deploys in the same run. Its short-lived repository token has `contents: write` for that save; there are no stored personal tokens. Unchanged notices require no repository commit, but the deployed check date is refreshed.

Source-fetch failure preserves the last valid content and raises a warning. A later build or deployment failure leaves the last successful public deployment in place. GitHub scheduling can run late; it is a daily check, not a promise of a new story every morning. The Mac and Codex need not be open. The player checks published content every 15 minutes when online. Application changes still need one panel reload.

The browser publishing route staged this release on `codex/seasonal-motion-release` before squash-merging PR #2 into `main`, because ordinary local Git has no usable write credentials in this session. A connector's previous 403 is not bypassed by adding tokens or broadening account access.

Verified on 2 November 2026: [release deployment](https://github.com/EBCClassics/classics-display/actions/runs/41540376372) and [manual daily-source run](https://github.com/EBCClassics/classics-display/actions/runs/41540632869) both succeeded. The manual run fetched three notices and made automated commit `19e040f` before deploying. This verifies the fetch/save/deploy path; the next unattended cron execution has not yet occurred.
