# Classics Display: project instructions

## Start every task

- Read `CONTEXT.md`, `CODEX_HANDOVER.md`, `README.md`, `PUBLISHING.md` and the latest `CHANGELOG.md` entries before editing. Check `git status` and the current GitHub branch; preserve any existing work.
- The master repository is https://github.com/EBCClassics/classics-display. Production is https://ebcclassics.github.io/classics-display/. The publishing branch is `main`.
- The permanent local checkout is `/Users/philipcanning/Documents/Codex/Projects/ClassicsDisplay`. Earlier generated chat folders, ZIP files and the owner-private Sites preview are historical copies, not alternative masters.

## Product and content

- Preserve the silent, full-screen, 1920 × 1080-first five-screen rotation and Planet eStream compatibility. No visitor interaction should be required.
- Use Philip's personal neon branding: pink `#FF2DAA`, ink `#101522`, yellow accents and Nimbus typography. Do not add the personal P or C symbols or substitute College house style unless Philip requests it.
- Use British English and `pupil`. Apply Philip's writing-voice skill proportionately when drafting substantive prose on his behalf; do not invent institutional facts, quotations or opinions.
- Keep new news claims sourced and dated. Philip authorised a daily source check on 2 November 2026. Preserve the dated, bounded AIA feed notices, 30-day freshness rule, explicit archive fallback and failure handling. Do not present source extracts as original reporting or add unattended generated writing.
- Gulliver's observations are fictional; keep historical explanations separate. Retain image, font and source credits. Do not put credentials, pupil records or private account data in this public repository.

## Changes and verification

- Edit `dist/content.json`, then run `node scripts/prepare.cjs` to regenerate `dist/seed.js` and the offline asset list. Do not edit the seed independently.
- For source/content changes, run `node --test tests/*.test.cjs`. Check any changed screen in a browser at TV proportions; a length check alone does not prove good layout.
- When changing sources or photographs, update the credits and run `python3 scripts/credits.py`, then preparation again.
- For application/asset releases, keep the offline cache version consistent between `scripts/prepare.cjs` and `dist/app.js`. Content-only changes do not need an arbitrary version bump.
- Distinguish development checks, successful deployment, live-page verification and user-reported player testing. Philip reported on 2 November 2026 that he tested Planet eStream and everything seemed to work fine. Do not repeat the outdated blanket claim that eStream is untested, or turn that general report into evidence of specific unreported tests.

## Keep the records current: required for every material change

- Update `CHANGELOG.md` with the date, actual change and verification result.
- Update `CODEX_HANDOVER.md` with the current state, relevant checks, unresolved issues and next action. Replace obsolete next steps.
- Update `CONTEXT.md` whenever scope, decisions, architecture, branding, master location or acceptance status changes.
- Update `README.md`, `PUBLISHING.md` and `TESTING.md` wherever behaviour, operation, deployment or test evidence changes. Do not leave contradictory status statements in another active document.
- Put the corresponding documentation changes in the same commit as the source/content change wherever practical. Routine no-change inspections do not require artificial changelog entries.
- Refresh a downloadable snapshot only when supplying one, and identify it as a snapshot. Do not maintain competing editable masters or silently replace the public site with the old private preview.

## Publishing

- When Philip asks for a change intended for the live display, complete the change and relevant checks, update the records above, then save the authorised change to `main` and verify the `Publish Classics display` workflow succeeds. Keep the existing host and URL.
- Never report an update as published merely because local files changed or a commit was created. Confirm the deployment result; verify the live page when the change affects its behaviour or appearance.
- The connector could read this repository but its write calls returned 403 during initial setup. Creation, upload and Pages configuration were completed in Philip's signed-in Chrome session. Use an available authorised publishing route; do not infer that local Git has write credentials, expose tokens, or expand account access without authorisation.
- No new hosting service, access change, recurring automation or live-news service is required for ordinary updates. Ask only when genuinely missing information or authorisation is needed.
