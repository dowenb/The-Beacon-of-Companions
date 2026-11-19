# The Beacon of Companions

A small browser adventure game about collaboration. You are the last wayfinder of Lowfall, and the beacon tower has gone dark. Over ten rounds you face two choices at each step: reach out to others, or go it alone. Your choices decide who walks beside you — and which of three endings you reach.

## Play

Open `index.html` in any modern browser. No build step, server, or internet connection is required.

If your browser restricts local files, serve the folder instead:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How it works

- **Bonds** increase by 1 for each collaborative choice (0–10).
- **Companions** join at 3, 6, and 9 bonds: Pip the fox scout, Gorin the blacksmith, and Sable the owl sage. Each adds assisting lines to later rounds.
- **Difficulty framing** shifts with your bonds. Collaborative players see "supported" story text with allies helping; independent players see "strained" text with harder, lonelier challenges.
- **Endings:** 8–10 bonds → *The Circle of Friends*; 4–7 → *A Road Half-Shared*; 0–3 → *The Long Road Alone*.
- **Party-aware art:** Illustrations show only the companions who have actually joined. The base SVG is the fullest party state; `-none`, `-pip`, and `-pip-gorin` variants remove the others. Alternative text changes with the variant.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and the four screens (title, round, result, ending) |
| `styles.css` | Storybook theme, layout, transitions, responsive rules |
| `story.js` | All rounds, choices, allies, and endings |
| `game.js` | State machine and rendering |
| `assets/*.svg` | Base illustrations plus party-state variants |
| `tools/build-art-variants.py` | Rebuilds the variants from the tagged base SVGs (dev only) |
| `netlify.toml` | Staging command, publish directory, security headers and asset cache policy |
| `favicon.svg` | Browser tab icon |
| `dist/` | Generated deploy staging folder (ignored by Git, recreated by Netlify) |
| `.gitignore` | Keeps `dist/` and other local-only files out of the repository |

## Deploying

The game is a plain static site with no dependencies or server-side code. On Netlify, connect the repository and accept the defaults. `netlify.toml` runs a one-line copy that stages only the six runtime files/folders into `dist/`, publishes that folder, and adds security headers (CSP, `nosniff`, frame blocking) plus a one-hour cache on `assets/`. `README.md`, `netlify.toml`, `tools/`, and any future `tests/` are not deployed.

You do not need to create `dist/` yourself — Netlify recreates it on every build, and it is git-ignored. Playing locally from the repository root is unchanged. If you want to preview the exact deploy output locally, run the staging command from `netlify.toml` and serve `dist/` instead.

The CSP is strict (`self` only) because everything is local. If you later add external fonts, analytics, or images, add their origins to `Content-Security-Policy` in `netlify.toml`.

## Customizing

Edit `story.js` to change the narrative, thresholds, ally names, or ending text. The illustrations in `assets/` are intentionally simple SVG files — replace any of them with your own image (keeping the filename) to change the art. The image filenames and per-variant alt text are defined in `story.js`.

If you edit a **base** illustration (`round-0X.svg` or `ending-friends.svg`), rerun `python3 tools/build-art-variants.py` to regenerate its party-state variants. The script only needs Python 3 and is not used when playing the game.
