(() => {
  const main = document.querySelector('main');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const video = main?.querySelector('[data-hero-video]');
  if (video && !preference.matches) {
    video.addEventListener('playing', () => {
      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(() => video.classList.add('is-playing'));
      } else {
        video.classList.add('is-playing');
      }
    }, { once: true });
    video.play().catch(() => {});
    preference.addEventListener('change', event => {
      if (event.matches) video.pause();
      else video.play().catch(() => {});
    });
  }
  if (!main || preference.matches || !Element.prototype.animate) return;

  const running = new Set();
  function reveal(element, delay = 0, opacity = 0) {
    if (!element || preference.matches) return;
    const animation = element.animate([
      { opacity, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 380, delay, easing: 'ease-out', fill: 'backwards' });
    running.add(animation);
    animation.onfinish = animation.oncancel = () => running.delete(animation);
  }

  const hero = main.querySelector(':scope > section');
  const heading = hero?.querySelector('h1');
  const description = heading?.parentElement.querySelector('p');
  const actions = [...(hero?.querySelectorAll('a, button') ?? [])];
  reveal(heading, 0, 0.85);
  reveal(description, 120, 0.85);
  actions.forEach(action => reveal(action, 240, 0.85));

  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      let index = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        reveal(entry.target, Math.min(index++, 3) * 65, 0.82);
      }
    }, { threshold: 0.12 });

    const sections = [...main.querySelectorAll(':scope > section')].filter(section =>
      section !== hero && !section.matches('#quiz-widget-section, #quiz-results, [data-skip-reveal]') && !section.querySelector('article'));
    const cards = [...main.querySelectorAll('article')].filter(card =>
      !card.closest('#film-carousel, #quick-mood-result, #quiz-widget-section, #quiz-results, [data-skip-reveal]'));
    [...sections, ...cards].forEach(element => observer.observe(element));
  }

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer?.disconnect();
    running.forEach(animation => animation.cancel());
  });
})();
