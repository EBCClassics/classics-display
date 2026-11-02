# Publishing this display

Master repository: https://github.com/EBCClassics/classics-display

Intended public display address: https://ebcclassics.github.io/classics-display/

The public address becomes available after the first successful GitHub Pages deployment. Put that base address in the Planet eStream website panel. It stays the same after subsequent updates.

## Changes through Codex

Ask for the required content or design changes in the chat. Codex updates this repository, validates the content, runs the checks and saves the changes to `main`. The included GitHub Actions workflow then prepares and publishes `dist/` automatically. Wait for that workflow to succeed before calling an update published.

The webpage checks for content changes every 15 minutes. Design and script changes require the panel to reload. A changed offline-worker version can update its cached files; support still depends on the actual player.

## Repository layout

- `dist/`: the complete public website, photographs and fonts.
- `dist/content.json`: the editable source of content and schedules.
- `scripts/prepare.cjs`: validation plus generation of the bundled fallback and offline asset list.
- `tests/`: scheduling, content and fallback checks.
- `.github/workflows/pages.yml`: automatic publication when `main` changes.
- `README.md` and `TESTING.md`: setup instructions and the TV acceptance procedure.

The earlier owner-private Sites preview is separate. The public repository does not need its `.openai` configuration.
