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

  const animatedBlocks = [];
  if (window.AOS) {
    const sections = [...main.querySelectorAll(':scope > section')].filter(section =>
      section !== hero && !section.matches('#quiz-widget-section, #quiz-results, [data-skip-reveal]') && !section.querySelector('article'));
    const cards = [...main.querySelectorAll('article')].filter(card =>
      !card.closest('#film-carousel, #quick-mood-result, #quiz-widget-section, #quiz-results, [data-skip-reveal]'));
    [...sections, ...cards].forEach((element, index) => {
      element.setAttribute('data-aos', 'fade-up');
      element.setAttribute('data-aos-delay', String(index % 3 * 50));
      animatedBlocks.push(element);
    });
    document.addEventListener('aos:in', event => {
      const element = event.detail;
      if (!animatedBlocks.includes(element)) return;
      setTimeout(() => {
        element.removeAttribute('data-aos');
        element.removeAttribute('data-aos-delay');
        element.classList.remove('aos-init', 'aos-animate');
      }, 750);
    });
    window.AOS.init({ duration: 600, easing: 'ease-out-cubic', offset: 40, once: true });
  }

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    animatedBlocks.forEach(element => { element.removeAttribute('data-aos'); });
    running.forEach(animation => animation.cancel());
  });
})();
