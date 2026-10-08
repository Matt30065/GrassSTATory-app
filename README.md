# GrassSTATory v22.8.0

Premium visual-quality pass built on the stable v22.7 match/state engine.

## What changed

- Brighter, layered premium colour system to reduce the dark-on-dark feel.
- New high-resolution stadium/pitch background assets for Home, Live Match, goal/Moment and Full Time screens.
- Kit Studio preview is now always visible. The high-quality front/back fallback remains visible even when WebGL is unavailable; WebGL enhances it when supported.
- Home and Away kits remain separate designs and can be previewed independently.
- Player identity system now uses anonymous, realistic bust/head artwork rather than Mii/Wii-style vector faces.
- The user-created home kit still renders from the shoulders down on each player identity.
- Player/squad selection cards have returned to stronger, larger proportions with better depth and lighting.
- Live Match has a dedicated stadium treatment, brighter scoreboard surfaces and stronger action controls.
- Goal celebration and Moment Achieved use dedicated atmospheric imagery and stronger lighting.
- Full Time uses its own result-day stadium background and a more broadcast-like score treatment.
- Badge and kit studio surfaces have improved lighting, depth and contrast.

## Functionality deliberately retained from v22.7

- Original GrassSTATory local-storage/state architecture.
- Match setup and match engine.
- Timer and half-time/full-time flow.
- Goal, assist, opposition goal, substitution and undo logic.
- Player/season statistics.
- Upcoming and achieved Moments.
- Paid/Premium assumed throughout.
- Flat GitHub Pages-compatible repository structure.

## Updating from v22.8.0

You can upload this release directly over v22.8.0. You do not need to delete the existing files first.

1. Unzip the release.
2. In GitHub choose **Add file -> Upload files**.
3. Drag every file in this folder into the root of `main`.
4. Commit with a message such as `GrassSTATory v22.8.0 visual quality pass`.
5. Wait for GitHub Pages to redeploy.
6. Hard refresh the site.

New assets in this release:

- `avatar-head-01.jpg` to `avatar-head-05.jpg`
- `bg-home.jpg`
- `bg-live.jpg`
- `bg-result.jpg`
- `bg-moment.jpg`

Do not put them in a subfolder; the build intentionally remains flat.

## Testing first use

If your browser still has an existing team, squad or match history, use **Settings -> Reset app / Start again** to return to first-time setup.

## QA notes

- JavaScript syntax checked with Node.
- First-use Club -> Badge -> Kit flow was rendered from the actual HTML build during QA.
- Kit fallback rendering was visually checked at mobile width and remains available if WebGL cannot initialise.
- No Kewford text exists in the release files.

The WebGL kit renderer remains procedural rather than a manufacturer-grade scanned garment model. The interaction and fallback now behave correctly; a future production asset pass can replace the procedural shirt mesh without changing the surrounding app flow.
