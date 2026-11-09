(() => {
  const STORAGE_KEY = "nehuen-portfolio-language";
  const SUPPORTED_LANGUAGES = ["es", "en", "pt"];
  const CV_FILES = {
    es: "Assets/pdf/PeyranoNehuen_CV_ES.pdf.pdf",
    en: "Assets/pdf/PeyranoNehuen_CV_EN.pdf.pdf",
    pt: "Assets/pdf/PeyranoNehuen_CV_PT.pdf.pdf",
  };
  const state = { language: "es", dictionaries: {} };

  async function loadDictionary(language) {
    if (state.dictionaries[language]) return state.dictionaries[language];
    const response = await fetch(`Assets/locales/${language}.json`);
    if (!response.ok)
      throw new Error(`Could not load ${language} translations`);
    state.dictionaries[language] = await response.json();
    return state.dictionaries[language];
  }

  function translate(key) {
    return (
      state.dictionaries[state.language]?.[key] ??
      state.dictionaries.es?.[key] ??
      key
    );
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      element.dataset.i18nAttr.split(",").forEach((entry) => {
        const [attribute, key] = entry.split(":");
        if (attribute && key) element.setAttribute(attribute, translate(key));
      });
    });
    document.querySelectorAll("[data-i18n-meta]").forEach((element) => {
      element.content = translate(element.dataset.i18nMeta);
    });
    const title = document.querySelector("[data-i18n-title]");
    if (title) document.title = translate(title.dataset.i18nTitle);
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-cv-link]").forEach((link) => {
      link.href = CV_FILES[state.language];
      link.download = `PeyranoNehuen_CV_${state.language.toUpperCase()}.pdf`;
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === state.language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  async function setLanguage(language) {
    const selected = SUPPORTED_LANGUAGES.includes(language) ? language : "es";
    try {
      await loadDictionary("es");
      await loadDictionary(selected);
      state.language = selected;
      applyTranslations();
      try {
        localStorage.setItem(STORAGE_KEY, selected);
      } catch (_) {}
    } catch (error) {
      console.error("Internationalization error:", error);
      if (selected !== "es") await setLanguage("es");
    }
  }

  function t(key) {
    return translate(key);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () =>
        setLanguage(button.dataset.language),
      );
    });
    let saved = "es";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "es";
    } catch (_) {}
    setLanguage(saved);
  });

  window.portfolioI18n = {
    setLanguage,
    t,
    get language() {
      return state.language;
    },
  };
})();
