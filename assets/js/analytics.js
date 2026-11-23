(() => {
  const { hostname, protocol } = window.location;
  if (protocol !== 'https:' || !(hostname === 'wes-anderson-world.vercel.app' ||
      hostname.startsWith('wes-anderson-world-') && hostname.endsWith('.vercel.app'))) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.body.append(script);
})();
