# Gaia Labs

Website for Gaia Labs: automated growing machinery for Nigerian agribusiness.
Solar-powered, IoT-monitored aeroponic tower farms in Lagos.

## Structure

- `index.html` – the whole site (single page)
- `output.css` – compiled Tailwind CSS (this is what the page loads)
- `input.css` – source styles; edit this, then rebuild `output.css`
- `main.js` – menu, animations, carousels and counters
- `assets/` – images and scripts

## Editing styles

The site uses Tailwind CSS v3. After changing classes in `index.html` or styles in `input.css`, rebuild:

```bash
npm install
npm run build:css   # one-off minified build
npm run watch       # rebuild automatically while editing
```

Always commit the updated `output.css`.

## Deploying

Static site, no build step on the host: `output.css` is committed already.

- **Vercel:** Framework Preset *Other*; leave Build Command and Output Directory empty.
- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main` / root.
