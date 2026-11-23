(() => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('main > section');
  const page = document.scrollingElement;
  const menu = header?.querySelector('#burger-toggle');
  if (!header || !page) return;
  const hiddenClass = 'site-header--hidden';
  const scrollThreshold = 6;

  function getScrollPosition() {
    const maxScroll = page.scrollHeight - page.clientHeight;
    return Math.max(0, Math.min(window.scrollY, maxScroll));
  }

  let lastPosition = getScrollPosition();
  menu?.addEventListener('change', () => {
    if (menu.checked) header.classList.remove(hiddenClass);
    lastPosition = getScrollPosition();
  });

  function closeMenu() {
    if (!menu?.checked) return;
    menu.checked = false;
    lastPosition = getScrollPosition();
    header.classList.add(hiddenClass);
  }

  let gestureStartY = null;
  document.addEventListener('touchstart', event => {
    gestureStartY = menu?.checked && event.touches.length === 1 ? event.touches[0].clientY : null;
  }, { passive: true, capture: true });
  document.addEventListener('touchmove', event => {
    if (gestureStartY === null || event.touches.length !== 1) return;
    if (gestureStartY - event.touches[0].clientY >= 12) {
      closeMenu();
      gestureStartY = null;
    }
  }, { passive: true, capture: true });
  document.addEventListener('touchend', () => { gestureStartY = null; }, { passive: true, capture: true });
  document.addEventListener('touchcancel', () => { gestureStartY = null; }, { passive: true, capture: true });
  document.addEventListener('wheel', event => {
    if (event.deltaY > 0 && !event.ctrlKey) closeMenu();
  }, { passive: true, capture: true });

  let menuScrollTop = 0;
  header.querySelector('.main-nav')?.addEventListener('scroll', event => {
    const top = event.currentTarget.scrollTop;
    if (top > menuScrollTop) closeMenu();
    menuScrollTop = top;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const position = getScrollPosition();
    const movement = position - lastPosition;
    if (menu?.checked && movement > scrollThreshold) {
      closeMenu();
      return;
    }

    const bounds = hero?.getBoundingClientRect();
    const beforeHeroMiddle = bounds && bounds.bottom - bounds.height / 2 > header.offsetHeight;
    if (menu?.checked || position <= scrollThreshold || beforeHeroMiddle) {
      header.classList.remove(hiddenClass);
    } else if (Math.abs(movement) >= scrollThreshold) {
      header.classList.toggle(hiddenClass, movement > 0);
    } else {
      return;
    }

    lastPosition = position;
  }, { passive: true });
})();
