(() => {
  const target = document.getElementById('bio-typed');
  if (!target || typeof window.Typed !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const firstPhrase = target.textContent;
  target.textContent = '';

  new window.Typed(target, {
    strings: [
      firstPhrase,
      'Досліджуйте ідеальну симетрію, пастельні палітри та любов до деталей.',
      'Відкрийте всесвіт, де кожна сцена нагадує ретро-листівку.'
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 2000,
    loop: true
  });
})();
