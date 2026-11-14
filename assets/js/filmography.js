(() => {
  const form = document.querySelector('[data-catalog-filters]');
  const grid = document.querySelector('[data-catalog-grid]');
  const empty = grid?.querySelector('[data-catalog-empty]');
  const intro = document.querySelector('[data-gallery-intro]');
  const all = form?.querySelector('[data-all-colors]');
  const sort = form?.querySelector('[data-sort]');
  const buttons = [...(form?.querySelectorAll('[data-color]') ?? [])];
  const cards = [...(grid?.querySelectorAll('article[data-colors]') ?? [])];
  if (!all || !sort || !buttons.length || !cards.length) return;

  const selected = new Set();
  const collator = new Intl.Collator('uk', { ignorePunctuation: true });
  let order = 0;

  function renderSelection() {
    const showAll = selected.size === 0;
    all.setAttribute('aria-pressed', String(showAll));
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(selected.has(button.dataset.color)));
    });
  }

  function filterCards() {
    const colors = [...selected];
    cards.forEach(card => {
      const palette = card.dataset.colors.split(',');
      card.hidden = !colors.every(color => palette.includes(color));
    });
    const hasMatches = cards.some(card => !card.hidden);
    if (empty) empty.hidden = hasMatches;
    if (intro) intro.hidden = !hasMatches;
  }

  function renderOrder() {
    const ordered = [...cards];
    if (order === 1) ordered.sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year));
    if (order === 2) ordered.sort((a, b) => collator.compare(a.dataset.title, b.dataset.title));
    grid.append(...ordered);
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    const color = button.dataset.color;
    if (selected.has(color)) selected.delete(color);
    else selected.add(color);
    if (selected.size === buttons.length) {
      clearFilters();
      return;
    }
    renderSelection();
  }));

  function clearFilters() {
    selected.clear();
    renderSelection();
    filterCards();
  }

  all.addEventListener('click', clearFilters);

  sort.addEventListener('click', () => {
    filterCards();
    order = (order + 1) % 3;
    renderOrder();
  });

  form.addEventListener('reset', () => {
    selected.clear();
    order = 0;
    renderSelection();
    filterCards();
    renderOrder();
  });
})();
