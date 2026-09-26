/* Edit these settings, then reload index.html. Times are in milliseconds. */
window.ZENZIA_CONFIG = {
  autoplay: true,
  slideDurationMs: 12000,         // 12 seconds for pages without an override.
  slideDurationsMs: {
    1: 5000,                      // Cover: 5 seconds.
    2: 10000,                     // Bebidas: 10 seconds.
    10: 9000,                     // Add-ons & Snacks: 9 seconds.
  },
  loop: true,                     // Restart at page 1 after the last page.
  startSlide: 1,                  // A #pagina-N URL takes priority.

  transition: 'fade',             // 'slide' (slide + fade), 'fade', or 'none'.
  transitionDurationMs: 900,
  fit: 'cover',                   // 'cover' fills the screen; 'contain' shows the whole page.

  pauseOnHover: false,            // Leave false for unattended TVs.
  pauseWhenHidden: true,          // Pause while another browser tab is active.
  hideCursorAfterMs: 2500,        // 0 keeps the mouse cursor visible.
  keyboardNavigation: true,       // Arrows, Home/End, Space to pause/resume, F for fullscreen.
  clickNavigation: true,          // Click/tap right half to advance, left half to go back.
  swipeNavigation: true,
};
