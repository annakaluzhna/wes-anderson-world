(() => {
  const catalog = {
    "bottle-rocket": {
      "id": "bottle-rocket",
      "href": "bottle-rocket.html",
      "title": "Пляшкова ракета",
      "poster": "assets/images/bottle-rocket.jpg",
      "year": "1996",
      "duration": "91",
      "genre": "КРИМІНАЛ / КОМЕДІЯ",
      "description": "Друзі планують пограбування й шукають власне місце у світі.",
      "palette": [
        "#F2C849",
        "#9C1E14",
        "#DEE0DB",
        "#91A1A8",
        "#457C6B"
      ],
      "position": "center 30%"
    },
    "rushmore": {
      "id": "rushmore",
      "href": "rushmore.html",
      "title": "Академія Рашмор",
      "poster": "assets/images/rushmore.jpg",
      "year": "1998",
      "duration": "93",
      "genre": "КОМЕДІЯ / ДРАМА",
      "description": "Амбітний школяр, театр і дружба, що раптом стає суперництвом.",
      "palette": [
        "#C49A6C",
        "#5D6B7B",
        "#D9A01F",
        "#1A2633",
        "#F3EBDD"
      ],
      "position": "center 10%"
    },
    "royal-tenenbaums": {
      "id": "royal-tenenbaums",
      "href": "royal-tenenbaums.html",
      "title": "Сімейка Тененбаумів",
      "poster": "assets/images/royal-tenenbaums.jpg",
      "year": "2001",
      "duration": "110",
      "genre": "ДРАМА / КОМЕДІЯ",
      "description": "Троє колишніх вундеркіндів повертаються додому. Родинний портрет із тріщинами.",
      "palette": [
        "#C51A1A",
        "#E7C7C1",
        "#B3C9E0",
        "#A36A2F",
        "#2C3A52"
      ],
      "position": "center 25%"
    },
    "life-aquatic": {
      "id": "life-aquatic",
      "href": "life-aquatic.html",
      "title": "Водне життя",
      "poster": "assets/images/life-aquatic.jpg",
      "year": "2004",
      "duration": "119",
      "genre": "ПРИГОДИ / КОМЕДІЯ",
      "description": "Капітан Стів Зіссу збирає команду для останньої великої експедиції.",
      "palette": [
        "#F2DB40",
        "#D31915",
        "#A5D3E3",
        "#1675AC",
        "#DFB78E"
      ],
      "position": "center 4%"
    },
    "darjeeling-limited": {
      "id": "darjeeling-limited",
      "href": "darjeeling-limited.html",
      "title": "Поїзд до Дарджилінга",
      "poster": "assets/images/darjeeling-limited.jpg",
      "year": "2007",
      "duration": "91",
      "genre": "ПРИГОДИ / ДРАМА",
      "description": "Три брати вирушають у подорож Індією, щоб знову почути одне одного.",
      "palette": [
        "#BFCFC4",
        "#112836",
        "#BABFB8",
        "#454547",
        "#8B3E16"
      ],
      "position": "center 100%"
    },
    "mister-fox": {
      "id": "mister-fox",
      "href": "mister-fox.html",
      "title": "Фантастичний містер Лис",
      "poster": "assets/images/mister-fox.jpg",
      "year": "2009",
      "duration": "87",
      "genre": "АНІМАЦІЯ / КОМЕДІЯ",
      "description": "Лис, родина й зухвалий план. Тепла осіння казка про свободу та відповідальність.",
      "palette": [
        "#D2691E",
        "#D9A441",
        "#A34727",
        "#F4E3C1",
        "#7B4F32"
      ],
      "position": "center 37%"
    },
    "moonrise-kingdom": {
      "id": "moonrise-kingdom",
      "href": "moonrise-kingdom.html",
      "title": "Королівство повного місяця",
      "poster": "assets/images/moonrise-kingdom.jpg",
      "year": "2012",
      "duration": "94",
      "genre": "МЕЛОДРАМА / ПРИГОДИ",
      "description": "Втеча двох підлітків на острів. Колір тут працює як компас.",
      "palette": [
        "#2F3C7E",
        "#8EB38B",
        "#F3C1B3",
        "#A9A94C",
        "#76681A"
      ],
      "position": "center 50%"
    },
    "grand-budapest": {
      "id": "grand-budapest",
      "href": "grand-budapest.html",
      "title": "Готель «Гранд Будапешт»",
      "poster": "assets/images/grand-budapest.jpg",
      "year": "2014",
      "duration": "99",
      "genre": "КОМЕДІЯ / ДРАМА",
      "description": "Історія консьєржа та його юного протеже. Симетрія у кожному кадрі, пастель як характер.",
      "palette": [
        "#E47991",
        "#596AAC",
        "#C6CDF6",
        "#7295CC",
        "#CE2854"
      ],
      "position": "center 10%"
    },
    "isle-of-dogs": {
      "id": "isle-of-dogs",
      "href": "isle-of-dogs.html",
      "title": "Острів собак",
      "poster": "assets/images/isle-of-dogs.jpg",
      "year": "2018",
      "duration": "101",
      "genre": "АНІМАЦІЯ / ПРИГОДИ",
      "description": "Хлопчик шукає пса. Японія у відтінках іржі та туману.",
      "palette": [
        "#C0C0C0",
        "#B25D35",
        "#E8D7BD",
        "#44413D",
        "#A23C32"
      ],
      "position": "center 15%"
    },
    "french-dispatch": {
      "id": "french-dispatch",
      "href": "french-dispatch.html",
      "title": "Французький вісник",
      "poster": "assets/images/french-dispatch.jpg",
      "year": "2021",
      "duration": "107",
      "genre": "КОМЕДІЯ / ДРАМА",
      "description": "Журнал прощається з редактором. Кожна стаття — окрема палітра.",
      "palette": [
        "#892118",
        "#EC9760",
        "#4FBBBB",
        "#351527",
        "#88988B"
      ],
      "position": "center 10%"
    },
    "asteroid-city": {
      "id": "asteroid-city",
      "href": "asteroid-city.html",
      "title": "Місто астероїдів",
      "poster": "assets/images/asteroid-city.jpg",
      "year": "2023",
      "duration": "105",
      "genre": "КОМЕДІЯ / ФАНТАСТИКА",
      "description": "Зустріч у пустелі змінює звичний порядок. Родина, наука й незвідане.",
      "palette": [
        "#55D1BF",
        "#FAAB22",
        "#7B1200",
        "#D4A27F",
        "#C9A96C"
      ],
      "position": "center 15%"
    },
    "phoenician-scheme": {
      "id": "phoenician-scheme",
      "href": "phoenician-scheme.html",
      "title": "Фінікійська схема",
      "poster": "assets/images/phoenician-scheme.jpg",
      "year": "2025",
      "duration": "101",
      "genre": "КОМЕДІЯ",
      "description": "Ексцентричний підприємець залучає доньку до заплутаного сімейного плану.",
      "palette": [
        "#DDE9D6",
        "#7339C1",
        "#664432",
        "#EE2813",
        "#497572"
      ],
      "position": "center 57%"
    }
  };
  const savedKey = 'wes_watchlist';
  const watchedKey = 'wes_watched';
  const grid = document.getElementById('watchlist-grid');
  const template = document.getElementById('watchlist-card');
  const count = document.getElementById('saved-count');
  const watchedCount = document.getElementById('watched-count');
  const empty = document.getElementById('watchlist-empty');
  const filters = document.getElementById('watchlist-filters');
  let filter = 'all';
  let toast;
  let toastTimer;

  function read(key) {
    try {
      let raw = localStorage.getItem(key);
      if (raw === null) {
        const legacy = JSON.parse(localStorage.getItem('wes-anderson-watchlist') ?? '[]');
        const ids = Array.isArray(legacy)
          ? legacy.filter(item => item && (key === savedKey || item.watched === true)).map(item => item.id)
          : [];
        raw = JSON.stringify(ids);
        try { localStorage.setItem(key, raw); } catch { /* Use legacy data when writes are unavailable. */ }
      }
      const ids = JSON.parse(raw);
      return new Set(Array.isArray(ids) ? ids.filter(id => typeof id === 'string' && Object.hasOwn(catalog, id)) : []);
    } catch {
      return new Set();
    }
  }

  function notify(message) {
    if (!toast) {
      toast = document.createElement('div');
      toast.setAttribute('role', 'status');
      toast.className = 'fixed bottom-4 right-4 max-w-[calc(100%-2rem)] sm:max-w-sm z-[70] bg-[#C0DFDB] text-[#32331E] border-2 border-[#32331E] rounded-md shadow-retro p-3 text-sm font-bold pointer-events-none';

    }
    const container = document.querySelector('#legal-dialog[open]') ?? document.body;
    if (toast.parentElement !== container) container.append(toast);
    clearTimeout(toastTimer);
    toast.hidden = false;
    toast.textContent = message;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
  }

  function save(key, ids) {
    try {
      localStorage.setItem(key, JSON.stringify([...ids]));
      return true;
    } catch {
      notify('Не вдалося зберегти зміни. Перевірте доступ до сховища браузера.');
      return false;
    }
  }

  function updateButtons(films) {
    document.querySelectorAll('button[data-watchlist-id]').forEach(button => {
      const id = button.dataset.watchlistId;
      const label = button.querySelector('[data-watchlist-label]');
      if (!label || !Object.hasOwn(catalog, id)) return;
      const active = films.has(id);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', (active ? 'Видалити з Watchlist: ' : 'Додати до Watchlist: ') + catalog[id].title);
      label.textContent = active ? (label.dataset.watchlistRemoveLabel ?? 'У Watchlist') : label.dataset.watchlistLabel;
    });
  }

  const badge = document.querySelector('[data-watchlist-badge]');
  let previousCount;
  let badgeAnimation;

  function updateBadge(size) {
    if (!badge || size === previousCount) return;
    badge.textContent = String(size);
    badge.hidden = size === 0;
    badge.closest('a')?.setAttribute('aria-label', 'Watchlist, збережених фільмів: ' + size);
    badgeAnimation?.cancel();
    if (size && previousCount !== undefined && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      badgeAnimation = badge.animate?.([{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }],
        { duration: 260, easing: 'ease-out' });
    }
    previousCount = size;
  }

  function render() {
    const saved = read(savedKey);
    const watched = read(watchedKey);
    const films = new Set([...saved, ...watched]);
    updateButtons(saved);
    document.querySelectorAll('button[data-watched]').forEach(button => {
      const id = button.dataset.watched;
      if (Object.hasOwn(catalog, id)) button.setAttribute('aria-pressed', String(watched.has(id)));
    });
    updateBadge(saved.size);
    if (!grid || !template?.content || !count || !empty) return;
    count.textContent = String(saved.size);
    const counts = count.closest('[data-watchlist-counts]');
    if (counts) counts.hidden = films.size === 0;
    if (filters) filters.hidden = films.size === 0;
    if (!films.size) filter = 'all';
    filters?.querySelectorAll('[data-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });
    if (watchedCount) watchedCount.textContent = String(watched.size);
    const visible = filter === 'watched' ? watched : filter === 'saved' ? new Set([...saved].filter(id => !watched.has(id))) : films;
    empty.hidden = visible.size > 0;
    empty.textContent = films.size ? 'У цій вкладці поки немає фільмів.' : 'Твій Watchlist поки порожній. Обери фільм у каталозі та додай його до списку.';
    grid.hidden = !visible.size;
    const cards = [...visible].map(id => {
      const film = catalog[id];
      const card = template.content.firstElementChild.cloneNode(true);
      const poster = card.querySelector('img');
      poster.src = film.poster;
      poster.alt = 'Постер фільму ' + film.title;
      poster.style.objectPosition = film.position;
      card.querySelector('h3').textContent = film.title;
      card.querySelector('p').textContent = film.description;
      card.querySelector('[data-genre]').textContent = film.genre;
      card.querySelector('[data-meta]').textContent = film.year + ' • ' + film.duration + ' хв';
      card.querySelector('a').href = film.href;
      card.querySelectorAll('[data-swatch]').forEach((swatch, index) => {
        const hex = film.palette[index];
        swatch.style.backgroundColor = hex;
        swatch.dataset.copyHex = hex;
        swatch.title = 'Скопіювати ' + hex;
        swatch.setAttribute('aria-label', 'Скопіювати колір ' + hex);
      });
      card.querySelector('[data-watched]').setAttribute('aria-pressed', String(watched.has(id)));
      const star = card.querySelector('[data-remove]');
      star.setAttribute('aria-pressed', String(saved.has(id)));
      star.querySelector('span').textContent = saved.has(id) ? 'Видалити' : 'До Watchlist';
      card.dataset.savedFilm = id;
      return card;
    });
    grid.replaceChildren(...cards);
  }

  document.addEventListener('click', event => {
    const button = event.target.closest?.('button[data-watchlist-id], button[data-watched], button[data-remove]');
    if (!button) return;
    const card = button.closest('[data-saved-film]');
    const id = button.dataset.watchlistId ?? (button.dataset.watched || card?.dataset.savedFilm);
    if (!Object.hasOwn(catalog, id)) return;
    const isWatchedButton = button.hasAttribute('data-watched');
    const key = isWatchedButton ? watchedKey : savedKey;
    const ids = read(key);
    const removing = ids.has(id);
    if (removing) ids.delete(id);
    else ids.add(id);
    if (!save(key, ids)) return;
    render();
    const message = isWatchedButton
      ? (removing ? 'Знято позначку «Переглянуто»: ' : 'Позначено як переглянутий: ')
      : (removing ? 'Видалено з Watchlist: ' : 'Додано до Watchlist: ');
    notify(message + catalog[id].title);
    if (card) {
      const replacement = [...grid.children].find(item => item.dataset.savedFilm === id) ?? grid.firstElementChild;
      (replacement?.querySelector(button.hasAttribute('data-watched') ? '[data-watched]' : '[data-remove]') ??
        empty)?.focus();
    }
  });

  filters?.addEventListener('click', event => {
    const button = event.target.closest?.('[data-filter]');
    if (!button) return;
    filter = button.dataset.filter;
    render();
  });

  document.querySelector('[data-clear-watchlist]')?.addEventListener('click', () => {
    if (!window.confirm('Очистити списки збережених і переглянутих фільмів?')) return;
    try {
      localStorage.removeItem('wes-anderson-watchlist');
      localStorage.removeItem(savedKey);
      localStorage.removeItem(watchedKey);
      render();
      notify('Збережені дані очищено.');
    } catch {
      notify('Не вдалося очистити збережені дані.');
    }
  });

  document.addEventListener('watchlist:refresh', render);
  window.addEventListener('storage', event => {
    if (event.key === savedKey || event.key === watchedKey || event.key === null) render();
  });
  render();
})();
