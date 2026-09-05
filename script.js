/* Standalone TV slideshow. Settings are loaded from ./config.js. */
(() => {
  'use strict';

  const config = {
    autoplay: true, slideDurationMs: 15000, slideDurationsMs: {}, loop: true,
    startSlide: 1, transition: 'slide', transitionDurationMs: 700, fit: 'cover',
    pauseOnHover: false, pauseWhenHidden: true, hideCursorAfterMs: 2500,
    keyboardNavigation: true, clickNavigation: true, swipeNavigation: true,
    ...window.ZENZIA_CONFIG,
  };
  const viewer = document.querySelector('#viewer');
  const viewport = document.querySelector('#viewport');
  const frame = document.querySelector('#slide-frame');
  const artwork = document.querySelector('#artwork');
  const slides = [...document.querySelectorAll('.menu-slide')];
  const status = document.querySelector('#status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const number = (value, fallback, min = 0, max = 86400000) =>
    typeof value === 'number' && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
  const transitionDuration = number(config.transitionDurationMs, 700, 0, 10000);
  let current = 0;
  let paused = !config.autoplay;
  let hovered = false;
  let timer;
  let cursorTimer;
  let animations = [];
  let transitionId = 0;
  let touchStart = null;
  let lastSwipeAt = 0;

  function fit() {
    const ratioX = viewport.clientWidth / 1920;
    const ratioY = viewport.clientHeight / 1080;
    const scale = config.fit === 'contain' ? Math.min(ratioX, ratioY) : Math.max(ratioX, ratioY);
    frame.style.width = `${1920 * scale}px`;
    frame.style.height = `${1080 * scale}px`;
    artwork.style.transform = `scale(${scale})`;
  }

  function readHash() {
    const match = location.hash.match(/^#pagina-(\d+)$/);
    const requested = match ? Number(match[1]) : number(config.startSlide, 1, 1, slides.length);
    return Math.max(0, Math.min(slides.length - 1, Math.floor(requested) - 1));
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || (hovered && config.pauseOnHover) ||
        (document.hidden && config.pauseWhenHidden) || (!config.loop && current === slides.length - 1)) return;
    const override = config.slideDurationsMs?.[current + 1];
    const duration = number(override, number(config.slideDurationMs, 15000, 1000), 1000);
    timer = setTimeout(() => showPage(current + 1, 1), Math.max(duration, transitionDuration + 250));
  }

  function transitionPage(from, to, direction) {
    const id = ++transitionId;
    animations.forEach(animation => animation.cancel());
    animations = [];
    slides.forEach((slide, i) => {
      slide.hidden = i !== to;
      slide.inert = i !== to;
      slide.setAttribute('aria-hidden', String(i !== to));
      slide.style.zIndex = i === to ? '2' : '1';
    });
    if (from === to || reducedMotion.matches || config.transition === 'none' || !transitionDuration) return;

    const outgoing = slides[from];
    const incoming = slides[to];
    const distance = config.transition === 'fade' ? 0 : 60 * direction;
    const options = { duration: transitionDuration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' };
    outgoing.hidden = false;
    animations = [
      outgoing.animate([
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: `translateX(${-distance}px)` },
      ], options),
      incoming.animate([
        { opacity: 0, transform: `translateX(${distance}px)` },
        { opacity: 1, transform: 'translateX(0)' },
      ], options),
    ];
    Promise.all(animations.map(animation => animation.finished)).then(() => {
      if (id !== transitionId) return;
      outgoing.hidden = true;
      animations.forEach(animation => animation.cancel());
      animations = [];
    }).catch(() => { /* Rapid navigation replaced this transition. */ });
  }

  function showPage(index, direction = Math.sign(index - current), updateHash = true) {
    const previous = current;
    current = config.loop ? (index % slides.length + slides.length) % slides.length
      : Math.max(0, Math.min(slides.length - 1, index));
    transitionPage(previous, current, direction);
    status.textContent = `Página ${current + 1} de ${slides.length}: ${slides[current].dataset.title}`;
    if (updateHash) {
      try { history.replaceState(null, '', `#pagina-${current + 1}`); }
      catch { location.hash = `pagina-${current + 1}`; }
    }
    schedule();
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (viewer.requestFullscreen) await viewer.requestFullscreen();
    } catch {
      status.textContent = 'Usa la opción de pantalla completa de tu navegador.';
    }
  }

  if (config.keyboardNavigation) document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey ||
        /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    switch (event.key) {
      case 'ArrowRight': case 'PageDown': event.preventDefault(); showPage(current + 1); break;
      case 'ArrowLeft': case 'PageUp': event.preventDefault(); showPage(current - 1); break;
      case 'Home': event.preventDefault(); showPage(0); break;
      case 'End': event.preventDefault(); showPage(slides.length - 1); break;
      case ' ': event.preventDefault(); paused = !paused; schedule();
        status.textContent = paused ? 'Presentación en pausa.' : 'Presentación en reproducción.'; break;
      case 'f': case 'F': toggleFullscreen(); break;
    }
  });

  if (config.clickNavigation) viewport.addEventListener('click', event => {
    if (Date.now() - lastSwipeAt < 500 || window.getSelection()?.toString()) return;
    const bounds = viewport.getBoundingClientRect();
    showPage(current + (event.clientX - bounds.left < bounds.width / 2 ? -1 : 1));
  });

  if (config.swipeNavigation) {
    viewport.addEventListener('touchstart', event => {
      touchStart = event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true });
    viewport.addEventListener('touchend', event => {
      if (!touchStart) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        lastSwipeAt = Date.now();
        showPage(current + (dx < 0 ? 1 : -1));
      }
      touchStart = null;
    }, { passive: true });
    viewport.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  }

  if (config.pauseOnHover) {
    viewport.addEventListener('mouseenter', () => { hovered = true; schedule(); });
    viewport.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  }
  const cursorDelay = number(config.hideCursorAfterMs, 2500);
  function revealCursor() {
    clearTimeout(cursorTimer);
    viewer.classList.remove('hide-cursor');
    if (cursorDelay) cursorTimer = setTimeout(() => viewer.classList.add('hide-cursor'), cursorDelay);
  }
  viewer.addEventListener('pointermove', revealCursor);
  viewer.addEventListener('pointerdown', revealCursor);
  if (config.pauseWhenHidden) document.addEventListener('visibilitychange', schedule);
  document.addEventListener('fullscreenchange', fit);
  window.addEventListener('hashchange', () => showPage(readHash(), undefined, false));
  window.addEventListener('resize', fit);
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(viewport);
  showPage(readHash(), undefined, false);
  fit();
  revealCursor();
  // Give the first page its full display time after its assets have loaded.
  window.addEventListener('load', schedule, { once: true });
})();
