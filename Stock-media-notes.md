# BITE stock-media edition

The user approved stock photography and video in place of Higgsfield generation. These are illustrative images, not photos of a manufactured BITE product. The hero uses scroll-scrubbed chocolate footage. The ingredient story uses six photographic reveals and an assembled photo collage; it does not depict an actual branded wrapper unwrapping.

## Sources

- Hero video and poster: Ruben Velasco / Mixkit, https://mixkit.co/free-stock-video/liquid-chocolate-flowing-into-a-chocolate-fountain-41112/ — Mixkit Stock Video Free License, commercial and personal use. 14.43 seconds, 720p, 5.32 MB. https://mixkit.co/license/#videoFree
- Protein powder: Alex Saks / Unsplash, https://unsplash.com/photos/pile-of-protein-powder-with-a-scoop-qFoDYE2LcnE — Unsplash License.
- Almonds: Juan José Valencia Antía / Unsplash, https://unsplash.com/photos/shallow-focus-photography-of-almonds-in-white-ceramic-bowl-TTrJMhrkoeY — Unsplash License.
- Peanut butter: Towfiqu barbhuiya / Unsplash, https://unsplash.com/photos/brown-powder-in-brown-round-container-q-RyWM8uYwY — Unsplash License.
- Dates: hello aesthe / Pexels, https://www.pexels.com/photo/a-bowl-with-dried-dates-15707374/ — Pexels License.
- Nut bars: Towfiqu barbhuiya / Pexels, https://www.pexels.com/photo/homemade-protein-bars-on-a-cutting-board-14513406/ — Pexels License.
- Granola bars: Ella Olsson / Pexels, https://www.pexels.com/photo/top-view-photo-of-granola-bars-3026806/ — Pexels License.
- Salt: Tara Winstead / Pexels, https://www.pexels.com/photo/a-wooden-bowl-with-rock-salt-with-wooden-spoon-6690894/ — Pexels License.
- Gym: https://www.pexels.com/photo/row-of-dumbbells-in-gym-20418612/ — Pexels License.
- Office: https://www.pexels.com/photo/coffee-and-laptop-on-desk-14016261/ — Pexels License.
- Travel: https://www.pexels.com/photo/scenic-mountain-view-from-train-window-in-colorado-30150755/ — Pexels License.
- Outdoors: https://www.pexels.com/photo/a-man-walking-on-the-mountain-9629644/ — Pexels License.

All media is stored locally in dist/assets. No stock image is represented as a genuine BITE packaging photograph. Flavor cards use ingredient imagery. The 20g claim and brand name are supplied concept copy; no checkout or payments are enabled.

## Editing and running

Run `node serve.cjs` inside the BITE folder. The default URL is http://127.0.0.1:4174. Set PORT to select another port. The server supports byte-range requests for smooth media seeking.

Edit dist/index.html for copy and image references, dist/style.css for visual styling, dist/app.js for ingredient and flavor behavior, and dist/media-story.js for video scrubbing. The hero spans 2.6 viewport heights (1.6 active scroll travel). The ingredient section spans 6.1 (5.1 active). Motion can be paused and reduced-motion preferences are respected. Ingredient navigation also offers Previous and Next controls.
