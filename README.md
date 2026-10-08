# GrassSTATory v22.3.1

Premium paid-user prototype. No backend or account flow is included yet.

## GitHub Pages
Upload **all contents of this folder** to the root of your repository. In Settings > Pages use `main` and `/(root)`.

## Test journey
1. Splash (version v22.3.1)
2. Create club
3. Choose badge and colours
4. Create kit
5. Add at least 7 players, choosing a human portrait avatar for each
6. Finish setup and reach Home
7. Create Match
8. Select squad
9. Select starting lineup; non-starters become substitutes
10. Start match
11. Record Goal > scorer > assist
12. See goal animation and milestone Moment
13. Record substitutions/opposition goals/undo
14. Full time
15. Explore Player Stats, Season Stats and Moments

All prototype data is saved in browser localStorage. Use Settings > Reset prototype / first use to test onboarding again.

## Visual direction
`assets/design-direction.png` is included as the target art direction reference. The working prototype uses local raster portrait assets rather than CSS/cartoon faces. Production should replace these prototype portraits with a commissioned/licensed consistent avatar library.


## v22.3.1 hotfix
- Static splash renders before JavaScript starts, preventing an unexplained black screen.
- Removed dependency on `structuredClone` for broader browser compatibility.
- Corrupt/old local storage now falls back safely to a fresh state.
- Relative asset/script paths are explicit for GitHub Pages project hosting.
