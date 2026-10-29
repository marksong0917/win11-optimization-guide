# Windows 11 Optimization Guide — Min-Max Edition

A one-page, step-by-step Windows 11 optimization guide: minimal bloat, maximum performance, clean system.
This is the rewritten, public edition of Ze (Mark) Song's Windows 11 Optimization Guide.

Sections: safety first → clean install (LTSC, local account) → debloat & privacy (winutil + ShutUp10++, recommended presets only) → performance (power plan, XMP/EXPO, DNS, startup) → browser flags → optional/advanced (Memory Integrity trade-off, CompactOS) → what NOT to do → final checklist → resources.

## Run locally

```bash
cd win11-guide
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a public repo named `win11-optimization-guide` under github.com/marksong0917.
2. Push these files (`index.html`, `styles.css`, `script.js`, `.nojekyll`, `README.md`) to the `main` branch.
3. Repo Settings → Pages → Deploy from branch `main` / root.
4. Live at https://marksong0917.github.io/win11-optimization-guide/

No build step. Plain HTML/CSS/JS.

## Notes

- Balanced corrections vs the original guide: Ultimate Performance is desktops only (laptops stay on Balanced); Memory Integrity is optional/advanced with the trade-off explained, not a default step; Windows Update, Bluetooth, and network services are never removed.
- Activation: use a Windows licence you own. Activation methods linked in Resources are the reader's own responsibility.
