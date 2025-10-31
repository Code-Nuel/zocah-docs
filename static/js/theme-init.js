// static/js/theme-init.js
// Runs before the SPA boots to apply the stored theme immediately
(function () {
  try {
    // Docusaurus uses 'docusaurus.colorMode' (object) or 'theme' (string) in localStorage depending on versions/plugins.
    // We check both.
    const docusaurusColorMode = localStorage.getItem('docusaurus.colorMode');
    let theme = null;

    if (docusaurusColorMode) {
      // older/newer versions store a JSON; try parse safely
      try {
        const parsed = JSON.parse(docusaurusColorMode);
        if (parsed && parsed.colorMode) {
          theme = parsed.colorMode;
        }
      } catch (e) {
        // if not JSON, fallback to string
        theme = docusaurusColorMode;
      }
    }

    // also check a simple 'theme' key many projects use
    if (!theme) {
      const simple = localStorage.getItem('theme');
      if (simple) theme = simple;
    }

    if (theme) {
      // set both attribute and class so CSS selectors cover both approaches
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('theme-dark');
      } else {
        document.documentElement.classList.remove('theme-dark');
      }
    }
  } catch (e) {
    // fail silently — do not break the page if localStorage access is blocked
  }
})();
