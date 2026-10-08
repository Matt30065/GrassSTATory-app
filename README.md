# GrassSTATory v23.0.0

Premium grassroots football match tracking prototype.

This release integrates the approved premium visual proof into the original GrassSTATory application architecture. The existing local match engine, match history, squad state, timer, event logging, statistics and browser storage remain the functional foundation; the main changes are in first-use identity creation, player presentation, Home, live match interactions, celebrations and result presentation.

## What changed in v23.0.0

### Premium visual system
- Brighter layered navy/teal surfaces with restrained gold accents and higher contrast.
- High-resolution stadium/tunnel imagery on Home, Live Match, Goal/Moment and Full Time states.
- More deliberate sports-broadcast lighting and hierarchy.
- Larger original-style Player Stats cards rather than generic compact cards.

### First use and club identity
- Club setup remains part of the local prototype; no account/backend is required.
- Badge Studio retained with generated crest options and existing-badge upload support.
- Separate Home and Away kit designs.
- Kit Studio always keeps the garment preview visible while editing.
- Home/Away pattern, colour and collar settings remain independent.

### Kit presentation
- Replaced the previous flat procedural shirt appearance with high-resolution garment artwork and garment-lighting assets.
- Front / side / back views are supported through the existing Kit Studio controls.
- The approved default Home/Away designs render at the signed-off visual quality.
- User-selected colours/patterns use the same garment silhouette and lighting pipeline.

### Players and squad
- Anonymous realistic player bust treatment replaces Wii/Mii-style avatars.
- Male/female appearance selection remains available.
- Player identity is used through squad selection, starting lineup, live events, statistics and Moments.
- Player cards are closer to the proportions and presence of the original application.

### Live Match
- Original match/timer/event engine retained.
- Stronger stadium atmosphere and scoreboard presentation.
- Goal, Substitution and Opposition Goal remain the primary actions.
- Normal event confirmation feedback remains fast and unobtrusive.

### Goal entry
Goal entry is now sequential so each stage fits on a phone screen:

1. Select scorer.
2. Select one of the original goal types: **Normal / Penalty / Own Goal**.
3. Select assist or **No assist**.
4. Event records and returns to the match.

No additional goal types were introduced.

### Substitutions
- Select the player going off from on-pitch players.
- Then select the player coming on from available substitutes.
- Live-action tiles are deliberately smaller than browsing/statistics cards.

### Moments / celebrations / results
- Our goals use a stronger visual celebration state.
- Milestones can trigger a Moment Achieved treatment.
- Full Time uses the premium result/stadium treatment while retaining the underlying match data.

## Data and testing

GrassSTATory remains local-first for this prototype. Club, squad, matches and statistics are stored in the browser.

If an older club/squad appears after updating, use the app's reset/start-again option to test from first use, or clear the site's browser storage.

## GitHub Pages installation

The release deliberately keeps a flat repository structure.

1. Unzip the Git-ready package.
2. In the GitHub repository choose **Add file -> Upload files**.
3. Upload all files from the unzipped folder directly into the root of `main`.
4. Existing files with the same names can be overwritten; you do not need to delete them first.
5. Commit the change, for example: `GrassSTATory v23.0.0 premium integration`.
6. Allow GitHub Pages a few minutes to redeploy and then hard-refresh the site.

### Obsolete files to delete if they still exist from older releases

These are not required by v23.0.0:

- `patch.py`
- `service-worker.js`
- `premium-player-art.jpg`
- `player-avatar.svg`
- old `avatar-head-*`, `avatar-mask-*`, `avatar-neutral-*` or `avatar-premium-*` files
- `kit-base-front.png`
- `kit-base-side.png`
- `kit-base-back.png`

Do not delete the `avatar-clean-*`, `kit-*-reference.png`, `kit-*-lighting.png` or `bg-*.jpg` files included in this release.

## Visual QA completed

The running HTML implementation was exercised through the following states with no runtime/page errors in the QA browser:

- Home
- Home/Away Kit Studio
- Player creator / squad
- Live Match
- Goal scorer selection
- Goal type selection
- Assist / No assist selection
- Goal celebration
- Full Time result
- Player Stats

## Prototype boundary

The approved default kit artwork now meets the signed-off visual direction. The configurable colour/pattern mode applies user choices through a real garment silhouette/lighting pipeline, but it is still a prototype configurator rather than a manufacturer-grade Spized-style 3D garment system. The original match engine and customer journey remain the priority while that rendering layer is refined.
