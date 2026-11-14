(() => {
  const main = document.querySelector('main');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
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

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    running.forEach(animation => animation.cancel());
  });
})();
