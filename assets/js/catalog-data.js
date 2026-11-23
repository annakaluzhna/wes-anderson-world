(async () => {
  const cards = [...document.querySelectorAll('[data-catalog-grid] > article[data-title]')];
  if (!cards.length || window.location.protocol === 'file:') return;
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Catalog unavailable');
    const data = await response.json();
    if (!Array.isArray(data.films)) return;
    for (const card of cards) {
      const href = card.querySelector('a[href$=".html"]')?.getAttribute('href');
      const film = data.films.find(item => item && item.id + '.html' === href);
      if (!film || typeof film.title !== 'string' || typeof film.description !== 'string') continue;
      const title = card.querySelector('h3');
      const description = card.querySelector('p');
      if (title) title.textContent = film.title;
      if (description) description.textContent = film.description;
    }
  } catch {
    // Static HTML remains available when the JSON cannot be loaded.
  }
})();
