(() => {
  let toast;
  let swatch;
  let message;
  let timer;
  let request = 0;

  function fallback(hex) {
    const field = document.createElement('textarea');
    field.value = hex;
    field.readOnly = true;
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    const previousFocus = document.activeElement;
    document.body.append(field);
    try {
      field.select();
      return document.execCommand('copy');
    } finally {
      field.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest?.('button[data-copy-hex]');
    const hex = button?.dataset.copyHex;
    if (!hex || !/^#[0-9A-F]{6}$/.test(hex)) return;

    const current = ++request;
    let copied = false;
    try {
      await navigator.clipboard.writeText(hex);
      copied = true;
    } catch {
      if (current !== request) return;
      try { copied = fallback(hex); } catch { /* Clipboard unavailable. */ }
    }
    if (current !== request) return;

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'palette-toast fixed bottom-4 right-4 z-[70] flex items-center gap-2 bg-[#FDFBF7] border-2 border-[#32331E] rounded-md shadow-retro p-3 text-sm font-bold text-[#32331E] pointer-events-none';
      toast.setAttribute('role', 'status');
      swatch = document.createElement('span');
      swatch.className = 'w-4 h-4 shrink-0 border border-[#32331E]';
      swatch.setAttribute('aria-hidden', 'true');
      message = document.createElement('span');
      toast.append(swatch, message);
      document.body.append(toast);
    }
    swatch.style.backgroundColor = hex;
    message.textContent = copied ? 'Колір ' + hex + ' скопійовано' : 'Не вдалося скопіювати колір ' + hex;
    toast.classList.add('palette-toast-visible');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('palette-toast-visible'), 2200);
  });
})();
