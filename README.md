# Zenzia TV menu

Standalone 13-page menu built from the current Zenzia menu artwork. All page
images and application files are local. There is no control bar or third-party
runtime.

Open `index.html` directly, or run `python3 -m http.server 8080` and open
http://localhost:8080. Upload this whole folder to use any static web host.

## TV playback

The menu loops with slide 1 displayed for 3 seconds, slide 2 for 5 seconds, and
slides 3–13 for 11 seconds each. A 700 ms slide-and-fade transition connects
pages. The menu fills the browser viewport, including 1080p and 4K TVs.

Press F to enter fullscreen, or use the browser's fullscreen or kiosk mode to
hide browser chrome. Browser security requires a user gesture to enter
fullscreen.

Edit **config.js** and reload to change playback:

- `slideDurationMs`: default time per page in milliseconds (11000 = 11 seconds).
- `slideDurationsMs`: individual page times, for example `{ 1: 8000, 4: 20000 }`.
- `autoplay`, `loop`, `startSlide`: playback behavior and first page.
- `transition`: `slide`, `fade`, or `none`; `transitionDurationMs`: animation time.
- `fit`: `cover` fills the display and crops when its aspect ratio differs from
  16:9. Use `contain` to show the entire page with margins instead. Standard 16:9
  TVs display the entire design with either setting.
- `pauseOnHover`, `pauseWhenHidden`: optional automatic pausing.
- `hideCursorAfterMs`: hide the cursor after inactivity; 0 disables this.
- `keyboardNavigation`, `clickNavigation`, `swipeNavigation`: manual controls.

Manual navigation restarts the current page's timer. Space pauses or resumes.
Left/Right and Page Up/Down change pages. Home/End jump to the first or last
page. F toggles fullscreen. Click or tap the right half to advance and the left
half to go back. Swipe horizontally on touchscreens. Reduced-motion preferences
skip animations. With `loop: false`, playback stops on the last page.

A URL such as `index.html#pagina-4` overrides `startSlide`. Remove the URL
fragment to use the configured start page again. Times are measured from the
start of the page transition. The minimum page time is 1 second and at least
250 ms longer than the configured transition.

## Files

- `index.html`: 13 menu slides with accessible labels.
- `assets/menu-01.webp` through `assets/menu-13.webp`: current menu artwork.
- `config.js`: editable slideshow settings, loaded before `script.js`.
- `script.js`: autoplay, transitions, screen fitting, and optional navigation.
- `styles.css`: TV viewer and slide layout.

All imports are relative. The artwork uses a 1920 × 1080 coordinate system.
