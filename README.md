# Zenzia TV menu

Fifteen-page bilingual menu for the Zenzia kiosk TV, built as a static HTML slideshow on a
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
5–6. Té Negro (1 / 2 and 2 / 2)
7. Té Rojo (Pu-erh)
8–9. Tisana Herbal (1 / 2 and 2 / 2)
10–14. Tisana Frutal (1 / 5 through 5 / 5)
15. Extras y antojos / Add-ons & Snacks

Menu copy lives in `index.html`: each blend is a `<li class="card">` with a
photo, a name and Spanish/English ingredient lines. Category pages show at most
three blends to keep both languages readable on TV. Commercial blend names are
preserved, with translations where useful. English text is marked `lang="en"`.
All 32 blends have a local photo in
`assets/tea/`, including the six recovered from the previous menu video.
Use a 600 × 600 transparent WebP when adding or replacing a blend photo.

Recovered photos come from `assets/zenzia-menu-video.mp4` in commit `b21e778`,
also served by https://icy-coast-0b4c32c0f.5.azurestaticapps.net/:
Earl Grey (00:27), Mango Tropical and Tentación Divina (00:32), Pu-erh Frutos
Rojos (00:42), Icebreaker (00:47), and Manzana Arándano (01:17).

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

The menu uses a fixed white background and `color-scheme: only light` to opt out
of browser auto-darkening. Product names use 58–66 px and ingredient descriptions
32–38 px on the 1080p stage, with darker text for easier reading at a distance.

## Files

- `index.html`: the fifteen bilingual menu pages.
- `styles.css`: design tokens, layout and per-category accent colors.
- `config.js`: slideshow settings, loaded before `script.js`.
- `script.js`: autoplay, transitions, screen fitting and navigation.
- `assets/logo-*.png`: brand lockup split into mark, wordmark and tagline.
- `assets/tea/*.webp`: circular blend photos.
