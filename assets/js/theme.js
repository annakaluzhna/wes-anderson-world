(() => {
  const root = document.documentElement;
  const key = 'wes_theme';
  function apply(value) {
    root.dataset.theme = value === 'dark' ? 'dark' : 'light';
  }
  try { apply(localStorage.getItem(key)); } catch { apply('light'); }
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    function sync() {
      const dark = root.dataset.theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', dark ? 'Увімкнути світлу тему' : 'Нічний сеанс');
      button.title = dark ? 'Світлий сеанс' : 'Нічний сеанс';
    }
    sync();
    button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      sync();
      try { localStorage.setItem(key, theme); } catch {}
    });
    window.addEventListener('storage', event => {
      if (event.key !== key && event.key !== null) return;
      apply(event.newValue);
      sync();
    });
  });
})();
