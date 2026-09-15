# BITE — branded product film

Run `node serve.cjs` in this folder and open http://127.0.0.1:4174.

## Project structure

```text
BITE/
├── index.html
├── style.css
├── app.js
├── assets/
├── product-film.css
├── product-film.js
├── section-motion.css
├── section-motion.js
├── experience.css
├── experience.js
└── serve.cjs
```

This is a plain static website, so Vercel can deploy it directly from the repository root. Use the default Vercel settings and leave the build command empty.

The hero is a scroll-controlled product animation: three branded wrappers open, the bars and ingredients float apart, then the wrappers return. All four flavor cards use BITE-branded packaging. The remaining ingredient and lifestyle photography is preserved.

Edit product-film.js for the hero motion and product-film.css for its visual design. Page copy is in index.html; other interactions are in app.js. Generated master images and exact prompts are in Brand-assets. Read Brand-update.md for this update and Stock-media-notes.md for the remaining stock-photo sources.

BITE is a concept store. These are generated packaging concepts, not manufactured product photography. The bag supports selections but takes no payments or orders.
