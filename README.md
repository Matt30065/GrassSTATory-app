# GrassSTATory v22.5.0

Incremental premium UX release built directly on the stable v22.4.0 / original v21.1 application architecture.

## What changed
- Premium Home rebuilt around **Create Match** as the primary action.
- Home now shows **Upcoming Moments**, last match (when available), and dedicated **Player Stats / Season Stats / Moments** destinations.
- First-use club setup now includes selectable badge shape and home-shirt style previews alongside club colours.
- Moments screen added; milestones are derived from the same locally stored match/player data.
- Splash version updated to v22.5.0.
- Paid/Platinum remains the assumed experience.

## What deliberately did NOT change
- Existing working match setup engine.
- Live match timer/event engine.
- Match storage and localStorage keys.
- Existing stats calculations.
- GitHub Pages deployment model.
- Flat repository structure.

## GitHub update
Upload the files in this folder directly over v22.4.0 in the root of `main`.

**Delete one legacy file if it is still in the repository:** `premium-player-art.jpg`. It is no longer used and contained an obsolete club reference.

No other v22.4.0 files need deleting. Existing filenames are intentionally retained so GitHub will mark them as modified/replaced.

After committing, allow GitHub Pages a minute or two to deploy, then hard-refresh the site.
