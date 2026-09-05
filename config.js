/* Edit these settings, then reload index.html. Times are in milliseconds. */
window.ZENZIA_CONFIG = {
  autoplay: true,
  slideDurationMs: 11000,          // 11 seconds for slides without an override.
  slideDurationsMs: {
    1: 3000,                     // Slide 1: 3 seconds.
    2: 5000,                     // Slide 2: 5 seconds.
    3: 5000,                     // Slide 3: 5 seconds.
  },
  loop: true,                     // Restart at page 1 after the last page.
  startSlide: 1,                  // A #pagina-N URL takes priority.

  transition: 'slide',            // 'slide' (slide + fade), 'fade', or 'none'.
  transitionDurationMs: 700,
  fit: 'cover',                   // 'cover' fills the screen; 'contain' shows the whole page.

  pauseOnHover: false,            // Leave false for unattended TVs.
  pauseWhenHidden: true,          // Pause while another browser tab is active.
  hideCursorAfterMs: 2500,        // 0 keeps the mouse cursor visible.
  keyboardNavigation: true,      // Arrows, Home/End, Space to pause/resume, F for fullscreen.
  clickNavigation: true,         // Click/tap right half to advance, left half to go back.
  swipeNavigation: true,
};
