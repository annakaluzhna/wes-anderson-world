(() => {
  const select = document.getElementById('quick-mood-select');
  const form = select?.form;
  const error = document.getElementById('quick-mood-error');
  const result = document.getElementById('quick-mood-result');
  const carousel = result?.querySelector('.swiper');
  const slides = carousel?.querySelector('.swiper-wrapper');
  const previous = carousel?.querySelector('[data-prev]');
  const next = carousel?.querySelector('[data-next]');
  const pagination = carousel?.querySelector('.swiper-pagination');
  const template = result?.querySelector('template')?.content;
  if (!form || !error || !slides || !previous || !next || !pagination ||
      !template?.querySelector('h3') || !template.querySelector('[data-year]') ||
      !template.querySelector('[data-description]') || !template.querySelector('a')) return;

  const recommendations = {
    "adventure": [
      {
        "slug": "grand-budapest",
        "title": "Готель «Гранд Будапешт»",
        "description": "Історія консьєржа та його юного протеже. Симетрія у кожному кадрі, пастель як характер.",
        "year": "2014"
      },
      {
        "slug": "mister-fox",
        "title": "Фантастичний містер Лис",
        "description": "Лис, родина й зухвалий план. Тепла осіння казка про свободу та відповідальність.",
        "year": "2009"
      },
      {
        "slug": "bottle-rocket",
        "title": "Пляшкова ракета",
        "description": "Друзі планують пограбування й шукають власне місце у світі.",
        "year": "1996"
      }
    ],
    "road": [
      {
        "slug": "darjeeling-limited",
        "title": "Поїзд до Дарджилінга",
        "description": "Три брати вирушають у подорож Індією, щоб знову почути одне одного.",
        "year": "2007"
      },
      {
        "slug": "life-aquatic",
        "title": "Водне життя Стіва Зіссу",
        "description": "Капітан Стів Зіссу збирає команду для останньої великої експедиції.",
        "year": "2004"
      },
      {
        "slug": "isle-of-dogs",
        "title": "Острів собак",
        "description": "Хлопчик шукає пса. Японія у відтінках іржі та туману.",
        "year": "2018"
      }
    ],
    "irony": [
      {
        "slug": "french-dispatch",
        "title": "Французький вісник",
        "description": "Журнал прощається з редактором. Кожна стаття — окрема палітра.",
        "year": "2021"
      },
      {
        "slug": "asteroid-city",
        "title": "Місто астероїдів",
        "description": "Зустріч у пустелі змінює звичний порядок. Родина, наука й незвідане.",
        "year": "2023"
      },
      {
        "slug": "phoenician-scheme",
        "title": "Фінікійська схема",
        "description": "Ексцентричний підприємець залучає доньку до заплутаного сімейного плану.",
        "year": "2025"
      }
    ],
    "nostalgia": [
      {
        "slug": "moonrise-kingdom",
        "title": "Королівство повного місяця",
        "description": "Втеча двох підлітків на острів. Колір тут працює як компас.",
        "year": "2012"
      },
      {
        "slug": "royal-tenenbaums",
        "title": "Сімейка Тененбаумів",
        "description": "Троє колишніх вундеркіндів повертаються додому. Родинний портрет із тріщинами.",
        "year": "2001"
      },
      {
        "slug": "rushmore",
        "title": "Академія Рашмор",
        "description": "Амбітний школяр, театр і дружба, що раптом стає суперництвом.",
        "year": "1998"
      }
    ]
  };
  let slider;
  let currentMood;

  function setError(invalid) {
    select.setAttribute('aria-invalid', String(invalid));
    select.classList.toggle('border-red-700', invalid);
    select.classList.toggle('border-[#32331E]', !invalid);
    error.hidden = !invalid;
    error.textContent = invalid ? 'Будь ласка, оберіть ваш настрій зі списку' : '';
  }

  select.addEventListener('change', () => {
    setError(false);
    result.hidden = select.value !== currentMood;
    if (result.hidden) slider?.autoplay.stop();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const mood = select.value;
    if (!Object.hasOwn(recommendations, mood)) {
      setError(true);
      select.focus();
      return;
    }

    setError(false);
    result.hidden = false;
    if (mood === currentMood && slider) {
      slider.update();
      slider.slideNext();
      if (slider.params.autoplay.enabled && !slider.autoplay.running) slider.autoplay.start();
      return;
    }

    slider?.destroy();
    slides.replaceChildren(...recommendations[mood].map(film => {
      const slide = template.cloneNode(true);
      slide.querySelector('h3').textContent = film.title;
      slide.querySelector('[data-year]').textContent = film.year;
      slide.querySelector('[data-description]').textContent = film.description;
      slide.querySelector('a').href = film.slug + '.html';
      return slide;
    }));

    if (typeof window.Swiper === 'function') {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      slider = new window.Swiper(carousel, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 12,
        speed: reducedMotion ? 0 : 300,
        autoplay: reducedMotion ? false : {
          delay: 3500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        },
        navigation: { prevEl: previous, nextEl: next, addIcons: false },
        pagination: { el: pagination, clickable: true },
        a11y: {
          prevSlideMessage: 'Попередній фільм',
          nextSlideMessage: 'Наступний фільм',
          paginationBulletMessage: 'Перейти до фільму {{index}}'
        }
      });
    }
    currentMood = mood;
  });
})();
