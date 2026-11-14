(() => {
  const dialog = document.getElementById('legal-dialog');
  if (!dialog) return;
  document.querySelectorAll('[data-legal-section]').forEach(button => {
    button.addEventListener('click', () => {
      const section = document.getElementById(button.dataset.legalSection);
      if (!section || !dialog.contains(section)) return;
      dialog.querySelectorAll('[data-legal-panel]').forEach(panel => {
        panel.hidden = panel !== section;
      });
      dialog.showModal();
    });
  });
})();
