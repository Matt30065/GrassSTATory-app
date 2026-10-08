# GrassStatory Premium Prototype — v22.2.0

Git-ready, local-first mobile web prototype for the premium grassroots football match experience.

## Run

No build step is required. Either open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Included journeys

- Versioned premium splash
- First-use club identity, badge and shirt setup
- Humanised illustrated player avatar system with varied appearance and consistent club kit
- Player setup and squad tiles
- Minimal home: Create Match, Upcoming Moments, last result
- Player Stats, Season Stats and Moments destinations
- Match/opponent setup
- Squad and starting-lineup selection
- Live score and rapid event capture
- Immediate event acknowledgement / screen blip
- Goal celebration
- Milestone / Moment reveal
- Full-time and share-card states
- Browser localStorage; no account or backend required

## Avatar direction

v22.2 replaces the earlier geometric CSS placeholders with a deliberately consistent human portrait system. Faces use restrained expressions, believable proportions and varied skin/hair combinations while retaining the generated club kit from the shoulders down. This is intended to feel like designed product illustration rather than generative imagery.

For production, replace these procedural portraits with a commissioned/licensed deterministic avatar asset library (SVG/WebP) using the same framing and IDs. Avoid runtime AI-generated faces: a fixed art system will be more consistent, brandable and less likely to look AI-created.

## GitHub

Unzip, then from inside the folder:

```bash
git init
git add .
git commit -m "GrassStatory premium prototype v22.2.0"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## GitHub clean-repository upload (v22.2.0)
Upload **all files and folders in this directory**, not the ZIP itself.

Expected repository root:
- `.gitignore`
- `README.md`
- `index.html`
- `style.css`
- `app.js`
- `manifest.json`
- `design-reference.png`
- `assets/`

The `assets/` directory is intentionally populated so GitHub will display it. The current interactive prototype uses the included brand SVGs plus CSS-rendered prototype player artwork; the subfolders are reserved for production avatar, background, badge, icon and shirt artwork.
