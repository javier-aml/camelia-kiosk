# Zenzia TV menu

Ten-page menu for the Zenzia kiosk TV, built as a static HTML slideshow on a
1920 × 1080 stage that scales to any screen. No build step and no runtime
dependencies besides the Google Fonts stylesheet (Fraunces and Manrope);
without internet the page falls back to system serif/sans fonts.

Open `index.html` directly, or run `python3 -m http.server 8080` and visit
http://localhost:8080. Upload the whole folder to any static web host.

## Pages

1. Cover
2. Bebidas / Drinks (16 oz prices)
3. Té Blanco
4. Té Verde
5. Té Negro
6. Té Rojo (Pu-erh)
7. Tisana Herbal
8. Tisana Frutal 1 / 2
9. Tisana Frutal 2 / 2
10. Add-ons & Snacks

Menu copy lives in `index.html`: each blend is a `<li class="card">` with a
photo, a name and an ingredient line. Blends without a photo use a leaf
placeholder (`card__photo--empty`); drop a 600 × 600 transparent WebP into
`assets/tea/` and reference it to replace the placeholder.

## Playback

Edit **config.js** and reload to change playback:

- `slideDurationMs`: default time per page; `slideDurationsMs` overrides pages
  individually, e.g. `{ 1: 5000, 2: 10000 }`.
- `autoplay`, `loop`, `startSlide`: playback behavior and first page.
- `transition`: `fade`, `slide`, or `none`; `transitionDurationMs`: animation time.
- `fit`: `cover` fills the display; `contain` shows the whole page with margins.
- `pauseOnHover`, `pauseWhenHidden`, `hideCursorAfterMs`.
- `keyboardNavigation`, `clickNavigation`, `swipeNavigation`: manual controls.

Space pauses/resumes, Left/Right change pages, Home/End jump to the first/last
page, and F toggles fullscreen. A URL such as `index.html#pagina-4` opens on
that page. Use the browser's fullscreen or kiosk mode to hide its chrome.

## Files

- `index.html`: the ten menu pages.
- `styles.css`: design tokens, layout and per-category accent colors.
- `config.js`: slideshow settings, loaded before `script.js`.
- `script.js`: autoplay, transitions, screen fitting and navigation.
- `assets/logo-*.png`: brand lockup split into mark, wordmark and tagline.
- `assets/tea/*.webp`: circular blend photos.
