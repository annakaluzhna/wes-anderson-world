(() => {
  const form = document.getElementById('mood-quiz-form');
  const results = document.getElementById('quiz-results');
  const restart = document.querySelector('a[href="#quiz-widget-section"]');
  const widget = form?.closest("#quiz-widget-section");
  const actions = restart?.closest("section");
  if (!widget || !results || !actions) return;

  const question = form.querySelector('legend');
  const fieldset = form.querySelector('fieldset');
  const stepLabel = form.querySelector('[data-quiz-step]');
  const count = form.querySelector('[data-quiz-count]');
  const progress = form.querySelector('[role="progressbar"]');
  const bar = progress?.firstElementChild;
  const previous = form.querySelector('.btn-prev');
  const next = form.querySelector('.btn-next');
  const error = form.querySelector('#quiz-error');
  const choices = Array.from(form.querySelectorAll('.quiz-option-label'), label => ({
    label,
    radio: label.querySelector('input[type="radio"]'),
    text: label.querySelector('span')
  }));
  const resultTitle = results.querySelector('h2');
  const cards = Array.from(results.querySelectorAll('article'), card => ({
    poster: card.querySelector('img'),
    swatches: card.querySelectorAll('[data-swatch]'),
    title: card.querySelector('h3'),
    description: card.querySelector('p'),
    link: card.querySelector('a')
  }));
  if ([question, fieldset, stepLabel, count, progress, bar, previous, next, error, resultTitle].some(element => !element) ||
      choices.length !== 3 || choices.some(choice => !choice.radio || !choice.text) ||
      cards.length !== 2 || cards.some(card => Object.values(card).some(element => !element))) return;

  const films = {
    "bottle-rocket": {
      "palette": ["#F2C849","#9C1E14","#DEE0DB","#91A1A8","#457C6B"],
      "title": "Пляшкова ракета",
      "description": "Друзі планують пограбування й шукають власне місце у світі.",
      "poster": "assets/images/bottle-rocket.jpg"
    },
    "rushmore": {
      "palette": ["#C49A6C","#5D6B7B","#D9A01F","#1A2633","#F3EBDD"],
      "title": "Академія Рашмор",
      "description": "Амбітний школяр, театр і дружба, що раптом стає суперництвом.",
      "poster": "assets/images/rushmore.jpg"
    },
    "royal-tenenbaums": {
      "palette": ["#C51A1A","#E7C7C1","#B3C9E0","#A36A2F","#2C3A52"],
      "title": "Сімейка Тененбаумів",
      "description": "Троє колишніх вундеркіндів повертаються додому. Родинний портрет із тріщинами.",
      "poster": "assets/images/royal-tenenbaums.jpg"
    },
    "life-aquatic": {
      "palette": ["#F2DB40","#D31915","#A5D3E3","#1675AC","#DFB78E"],
      "title": "Водне життя",
      "description": "Капітан Стів Зіссу збирає команду для останньої великої експедиції.",
      "poster": "assets/images/life-aquatic.jpg"
    },
    "darjeeling-limited": {
      "palette": ["#BFCFC4","#112836","#BABFB8","#454547","#8B3E16"],
      "title": "Поїзд до Дарджилінга",
      "description": "Три брати вирушають у подорож Індією, щоб знову почути одне одного.",
      "poster": "assets/images/darjeeling-limited.jpg"
    },
    "mister-fox": {
      "palette": ["#D2691E","#D9A441","#A34727","#F4E3C1","#7B4F32"],
      "title": "Фантастичний містер Лис",
      "description": "Лис, родина й зухвалий план. Тепла осіння казка про свободу та відповідальність.",
      "poster": "assets/images/mister-fox.jpg"
    },
    "moonrise-kingdom": {
      "palette": ["#2F3C7E","#8EB38B","#F3C1B3","#A9A94C","#76681A"],
      "title": "Королівство повного місяця",
      "description": "Втеча двох підлітків на острів. Колір тут працює як компас.",
      "poster": "assets/images/moonrise-kingdom.jpg"
    },
    "grand-budapest": {
      "palette": ["#E47991","#596AAC","#C6CDF6","#7295CC","#CE2854"],
      "title": "Готель «Гранд Будапешт»",
      "description": "Історія консьєржа та його юного протеже. Симетрія у кожному кадрі, пастель як характер.",
      "poster": "assets/images/grand-budapest.jpg"
    },
    "isle-of-dogs": {
      "palette": ["#C0C0C0","#B25D35","#E8D7BD","#44413D","#A23C32"],
      "title": "Острів собак",
      "description": "Хлопчик шукає пса. Японія у відтінках іржі та туману.",
      "poster": "assets/images/isle-of-dogs.jpg"
    },
    "french-dispatch": {
      "palette": ["#892118","#EC9760","#4FBBBB","#351527","#88988B"],
      "title": "Французький вісник",
      "description": "Журнал прощається з редактором. Кожна стаття — окрема палітра.",
      "poster": "assets/images/french-dispatch.jpg"
    },
    "asteroid-city": {
      "palette": ["#55D1BF","#FAAB22","#7B1200","#D4A27F","#C9A96C"],
      "title": "Місто астероїдів",
      "description": "Зустріч у пустелі змінює звичний порядок. Родина, наука й незвідане.",
      "poster": "assets/images/asteroid-city.jpg"
    },
    "phoenician-scheme": {
      "palette": ["#DDE9D6","#7339C1","#664432","#EE2813","#497572"],
      "title": "Фінікійська схема",
      "description": "Ексцентричний підприємець залучає доньку до заплутаного сімейного плану.",
      "poster": "assets/images/phoenician-scheme.jpg"
    }
  };
  const questions = [
    {
      title: 'З якої сцени починається твій фільм?',
      options: [
        ["Відчайдушний герой збирає команду для зухвалого пограбування.", "bottle-rocket", "mister-fox"],
        ["Втеча дитини змушує дорослих організувати пошуки.", "moonrise-kingdom", "isle-of-dogs"],
        ["Юні герої опиняються в центрі подій, коли влада втручається в життя віддаленої спільноти.", "grand-budapest", "asteroid-city"]
      ]
    },
    {
      title: 'Що ти покладеш у вінтажний саквояж?',
      options: [
        ["Карту маршруту й компас для подорожі з командою.", "darjeeling-limited", "life-aquatic"],
        ["Блокнот із начерками сцен і список людей, у яких є що розповісти.", "rushmore", "french-dispatch"],
        ["Родинне фото й конверт із документами про спадщину.", "royal-tenenbaums", "phoenician-scheme"]
      ]
    },
    {
      title: 'Куди б ти телепортувався на один день?',
      options: [
        ["До непримітного сховку команди, яка задумала ризиковану операцію.", "bottle-rocket", "isle-of-dogs"],
        ["У віддалений табір, де збираються допитливі діти й нічне небо видно до самого обрію.", "moonrise-kingdom", "asteroid-city"],
        ["У схованку з припасами, де можна перечекати погоню й продумати наступний хід.", "grand-budapest", "mister-fox"]
      ]
    },
    {
      title: 'Що звучатиме у твоєму вечірньому саундтреку?',
      options: [
        ["Дорожня пісня з гітарою для сімейної зустрічі після довгої розлуки.", "darjeeling-limited", "royal-tenenbaums"],
        ["Вінтажна пісня з гітарою для героя, який режисує навіть власні невдачі.", "rushmore", "life-aquatic"],
        ["Камерні струнні для дотепної розмови, в якій кожна репліка має другий зміст.", "french-dispatch", "phoenician-scheme"]
      ]
    },
    {
      title: 'Хто стане головним героєм твоєї історії?',
      options: [
        ["Самовпевнений автор плану пограбування, якому доведеться імпровізувати.", "bottle-rocket", "mister-fox"],
        ["Дитина, яка порушує правила й вирушає в дорогу заради того, кого любить.", "moonrise-kingdom", "isle-of-dogs"],
        ["Мовчазний юнак, який намагається розібратися в дивних подіях серед дорослих.", "grand-budapest", "asteroid-city"]
      ]
    },
    {
      title: 'Якою палітрою ти розфарбуєш фінальний кадр?',
      options: [
        ["Бірюзовий, червоний і теплий пісочний, як на старій карті подорожей.", "darjeeling-limited", "life-aquatic"],
        ["Чорнильний, кремовий і бордовий, як на сторінках шкільного журналу.", "rushmore", "french-dispatch"],
        ["Тепле дерево, слонова кістка й приглушений зелений старих родинних інтер’єрів.", "royal-tenenbaums", "phoenician-scheme"]
      ]
    }
  ];

  const answers = Array(questions.length).fill(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let step = 0;
  let complete = false;
  let lastNavigation = -Infinity;
  let reveal;

  function showError(message = '') {
    error.hidden = !message;
    error.textContent = message;
    fieldset.classList.toggle('outline', Boolean(message));
    fieldset.classList.toggle('outline-2', Boolean(message));
    fieldset.classList.toggle('outline-red-800', Boolean(message));
    fieldset.classList.toggle('outline-offset-4', Boolean(message));
  }

  function renderQuestion() {
    const current = questions[step];
    question.textContent = current.title;
    stepLabel.textContent = `КРОК ${step + 1} ІЗ ${questions.length} • ОБЕРІТЬ ОДИН ВАРІАНТ`;
    count.textContent = `${step + 1} / ${questions.length}`;
    progress.setAttribute('aria-valuenow', String(step + 1));
    bar.style.width = `${(step + 1) / questions.length * 100}%`;
    choices.forEach(({ radio, text }, index) => {
      radio.checked = answers[step] === index;
      text.textContent = current.options[index][0];
    });
    previous.disabled = step === 0;
    next.textContent = step === questions.length - 1 ? 'Дізнатися результат' : 'Далі';
    showError();
  }

  function moveTo(element) {
    element.focus({ preventScroll: true });
    element.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
  }

  function renderResults() {
    const scores = new Map(Object.keys(films).map(slug => [slug, 0]));
    answers.forEach((answer, index) => {
      const [, ...matches] = questions[index].options[answer];
      matches.forEach(slug => scores.set(slug, scores.get(slug) + 1));
    });
    const rankings = Array.from(scores, ([slug, points]) => ({ slug, points, tieBreak: Math.random() }));
    rankings.sort((a, b) => b.points - a.points || a.tieBreak - b.tieBreak);

    cards.forEach((card, index) => {
      const { slug } = rankings[index];
      const film = films[slug];
      card.poster.src = film.poster;
      card.swatches.forEach((swatch, index) => {
        const hex = film.palette[index];
        swatch.style.backgroundColor = hex;
        swatch.dataset.copyHex = hex;
        swatch.title = 'Скопіювати ' + hex;
        swatch.setAttribute('aria-label', 'Скопіювати колір ' + hex);
      });
      card.poster.alt = `Постер фільму «${film.title.replace(/^«|»$/g, '')}»`;
      card.title.textContent = film.title;
      card.description.textContent = film.description;
      card.link.href = `${slug}.html`;
    });
    widget.hidden = true;
    results.hidden = false;
    actions.hidden = false;
    if (!reducedMotion.matches) {
      reveal = results.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: 'ease-out' });
    }
    resultTitle.focus({ preventScroll: true });
    results.scrollIntoView({ behavior: "instant", block: "start" });
  }

  function navigationReady() {
    return !complete && performance.now() - lastNavigation >= 300;
  }

  form.addEventListener('change', event => {
    const choice = choices.findIndex(({ radio }) => event.target === radio && radio.checked);
    if (complete || choice < 0) return;
    answers[step] = choice;
    showError();
  });

  previous.addEventListener('click', () => {
    if (complete) return;
    if (step === 0 || !navigationReady()) return;
    lastNavigation = performance.now();
    step -= 1;
    renderQuestion();
    question.focus({ preventScroll: true });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!navigationReady()) return;
    if (answers[step] === null) {
      showError('Обери один варіант відповіді, щоб продовжити.');
      choices[0].radio.focus();
      return;
    }
    lastNavigation = performance.now();
    if (step < questions.length - 1) {
      step += 1;
      renderQuestion();
      question.focus({ preventScroll: true });
      return;
    }
    if (answers.includes(null)) return;
    complete = true;
    fieldset.disabled = true;
    previous.disabled = true;
    next.disabled = true;
    renderResults();
  });

  restart.addEventListener('click', event => {
    event.preventDefault();
    reveal?.cancel();
    results.hidden = true;
    actions.hidden = true;
    widget.hidden = false;
    answers.fill(null);
    step = 0;
    complete = false;
    lastNavigation = -Infinity;
    fieldset.disabled = false;
    next.disabled = false;
    renderQuestion();
    moveTo(question);
  });

  renderQuestion();
})();
