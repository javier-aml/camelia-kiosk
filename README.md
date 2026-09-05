# Zenzia TV menu

Standalone recreation of the eight-page menu at https://zenzia.my.canva.site/.
All text, images, and fonts are local. There is no control bar or third-party runtime.

Open `index.html` directly, or run `python3 -m http.server 8080` and open
http://localhost:8080. Upload this whole folder to use any static web host.

## TV playback

The menu loops with slide 1 displayed for 3 seconds, slides 2–3 for 5 seconds
each, and slides 4–8 for 11 seconds each, with a 700 ms slide and fade transition. It fills the browser viewport, including 1080p and 4K TVs.
Press F to enter fullscreen, or use your browser's fullscreen/kiosk mode to hide
browser chrome. Browser security requires a user gesture to enter fullscreen.

Edit **config.js** and reload to change playback:

- `slideDurationMs`: default time per page in milliseconds (11000 = 11 seconds).
- `slideDurationsMs`: individual page times, e.g. `{ 1: 8000, 4: 20000 }`.
- `autoplay`, `loop`, `startSlide`: playback behavior and first page.
- `transition`: `slide`, `fade`, or `none`; `transitionDurationMs`: animation time.
- `fit`: `cover` fills the display and crops when its aspect ratio differs from
  16:9. Use `contain` to show the entire page with margins instead. Standard 16:9
  TVs display the entire design with either setting.
- `pauseOnHover`, `pauseWhenHidden`: optional automatic pausing.
- `hideCursorAfterMs`: hide the cursor after inactivity; 0 disables this.
- `keyboardNavigation`, `clickNavigation`, `swipeNavigation`: manual controls.

Manual navigation restarts the current page's timer. Space pauses/resumes,
Left/Right and Page Up/Down change pages, Home/End jump to the first/last page,
and F toggles fullscreen. Click/tap the right half to advance or the left half
to go back. Swipe horizontally on touchscreens. Reduced-motion preferences
skip animations. With `loop: false`, playback stops on the last page.

A URL such as `index.html#pagina-4` overrides `startSlide`. Remove the URL fragment
to use the configured start page again. Times are measured from the start of the
page transition; the minimum page time is 1 second and at least 250 ms longer
than the configured transition.

## Files

- `index.html`: eight pages of selectable menu HTML.
- `config.js`: editable slideshow settings, loaded before `script.js`.
- `script.js`: autoplay, transitions, screen fitting, and optional navigation.
- `styles.css`: TV viewer layout.
- `artwork.css`: original menu coordinates, typography, and local font faces.
- `assets/`: menu images and fonts.

All imports are relative. Menu copy can be edited in the labeled sections of
`index.html`; the artwork uses its original 1920 × 1080 coordinate system.
