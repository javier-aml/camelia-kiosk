# Zenzia fullscreen video

This static page plays `zenzia-menu-video.mp4` across the entire browser
viewport. The video autoplays muted, loops continuously, and does not display
playback controls.

Open `index.html` directly, or run `python3 -m http.server 8080` and visit
http://localhost:8080. Upload the whole folder to use it on any static web host.

Use the browser's fullscreen or kiosk mode to hide its address bar and other
browser chrome. Browsers require a user gesture before a web page can enter
native fullscreen mode, so the page itself fills the viewport without trying to
open native fullscreen automatically.

The video uses `object-fit: cover`, which fills displays of every aspect ratio
and may crop the edges when the screen is not 16:9.
