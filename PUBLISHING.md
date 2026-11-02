# Publishing this display

Master repository: https://github.com/EBCClassics/classics-display

Live public display address: https://ebcclassics.github.io/classics-display/

The first GitHub Pages deployment succeeded on 2 November 2026. Use this base address in the Planet eStream website panel; it stays the same after subsequent updates. Philip has tested it in Planet eStream and reports that everything seems to work fine.

## Changes through Codex

Ask for the required content or design changes in the Codex project. Its prepared local checkout is `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`. Codex updates this repository and the affected context, handover, changelog and operating/test records, validates the content, runs the 16 application checks and five feed-safety checks and saves the changes to `main`. The included GitHub Actions workflow then prepares and publishes `dist/` automatically. Wait for that workflow to succeed before calling an update published.

The webpage checks for content changes every 15 minutes. Design and script changes require the panel to reload. A changed offline-worker version can update its cached files; support still depends on the actual player.

## Repository layout

- `dist/`: the complete public website, photographs and fonts.
- `dist/content.json`: the editable source of content and schedules.
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

The same workflow runs at 05:17 UTC daily and can be run manually. It checks the Archaeology magazine RSS feed for recent Greek/Roman discoveries, retains dated source extracts for up to 30 days, rebuilds credits/fallbacks, and runs both test suites. If the discovery bank changed, it saves content and the corresponding changelog/handover record to `main`, then deploys in the same run. Its short-lived repository token has `contents: write` for that save; there are no stored personal tokens. Unchanged notices require no repository commit, but the deployed check date is refreshed.

Source-fetch failure preserves the last valid content and raises a warning. A later build or deployment failure leaves the last successful public deployment in place. GitHub scheduling can run late; it is a daily check, not a promise of a new story every morning. The Mac and Codex need not be open. The player checks published content every 15 minutes when online. Application changes still need one panel reload.

The browser publishing route stages uploads on `display-variety-news` before merging the complete release into `main`, because ordinary local Git has no usable write credentials in this session. A connector's previous 403 is not bypassed by adding tokens or broadening account access.
