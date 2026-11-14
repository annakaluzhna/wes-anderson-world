(() => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('main > section');
  const page = document.scrollingElement;
  const hiddenClass = 'site-header--hidden';
  const scrollThreshold = 6;

  function getScrollPosition() {
    const maxScroll = page.scrollHeight - page.clientHeight;
    return Math.max(0, Math.min(window.scrollY, maxScroll));
  }

  let lastPosition = getScrollPosition();

  window.addEventListener('scroll', () => {
    const position = getScrollPosition();
    const movement = position - lastPosition;

    if (position <= scrollThreshold || hero?.getBoundingClientRect().bottom > 0) {
      header.classList.remove(hiddenClass);
    } else if (Math.abs(movement) >= scrollThreshold) {
      header.classList.toggle(hiddenClass, movement > 0);
    } else {
      return;
    }

    lastPosition = position;
  }, { passive: true });
})();
