# GrassSTATory v22.7.0

Premium paid-customer prototype built on the original working v21.1 match engine and local-storage model.

## What this release changes

- Four-stage first-use journey: Club → Badge → Home & Away Kits → Squad.
- Curated SVG badge studio with multiple crest shapes, symbols, colours and existing-badge upload.
- Separate Home and Away kit designs.
- Procedural WebGL football shirt renderer (`kit3d.js`) with drag rotation, pinch/wheel zoom, front/back view, patterns, colours and collar treatments.
- High-resolution vector fallback if WebGL is unavailable.
- Featureless, dimensional player silhouettes rather than synthetic/photorealistic faces. The saved Home kit, club badge and shirt number are applied to every player identity.
- Premium Home focused on Create Match, Upcoming Moments, Player Stats, Season Stats and Moments.
- Per-match format selection (5v5 / 7v7 / 9v9 / 11v11).
- Avatar-led squad and starting-lineup selection; non-starters automatically become substitutes.
- Compact opponent identity creator with badge and kit preview.
- Avatar-led goal/assist and substitution entry.
- Event confirmation feedback, goal celebration, Moment Achieved overlay and share actions.
- Player stats, season stats, Moments history and upcoming milestones all derive from recorded match data.
- Reset App / Start Again in Settings for fresh-user testing.
- Platinum is the default experience; no paywall is required to test the product.

## Preserved from the original app

The original match lifecycle, timer, event history, substitutions, localStorage persistence, reports and core statistics logic remain the functional foundation. The premium experience is layered onto that proven code rather than replacing it with a new framework.

## Repository files

Keep these files directly in the repository root:

- `index.html`
- `style.css`
- `app.js`
- `kit3d.js`
- `stadium-bg.svg`
- `manifest.json`
- `app-logo.svg`
- `grassstatory-app-icon.png`
- `grassstatory-wordmark.png`
- `icon-192.png`
- `icon-512.png`
- `README.md`

There are no required subdirectories and no service worker in this release.

## Updating an existing v22.6 repository

You can upload all v22.7 files directly over the files already in `main`. GitHub will replace matching filenames and add `kit3d.js` and `stadium-bg.svg`.

Delete these obsolete files if they are still present from older builds:

- `premium-player-art.jpg`
- `player-avatar.svg`
- `service-worker.js`
- `patch.py`
- `avatar-male-01.jpg` through `avatar-male-09.jpg`
- `avatar-female-01.jpg` through `avatar-female-06.jpg`

The v22.7 player system does not use those portrait images.

## GitHub Pages

Publish from `main` → `/(root)`. All runtime paths are relative, so there is no GitHub-specific URL in the application.

After committing an update, allow GitHub Pages a short time to redeploy before testing the live URL.

## Fresh-user testing

If the browser already contains data from an earlier GrassSTATory version, use:

Settings → Reset app / Start again

This clears only the prototype data stored by GrassSTATory in that browser and returns to first-time setup.

## QA completed for v22.7.0

- JavaScript syntax: passed (`app.js`, `kit3d.js`).
- HTML duplicate-ID check: passed.
- Flat asset/reference check: passed.
- Fresh onboarding through club, badge, separate Home/Away kits and 7-player squad: passed.
- Home destinations: passed.
- Create Match through opponent, match details, squad, starting lineup and live match: passed.
- Goal scorer/assist recording, goal celebration and first-goal Moment: passed.
- Opposition goal and substitution recording: passed.
- Half-time → second half → full-time → report: passed.
- Season stats and match deletion: passed.
- No Kewford placeholder text: passed.

The QA environment does not expose WebGL, so it validated the high-resolution vector fallback. The production browser path uses the procedural WebGL renderer when WebGL is available.
