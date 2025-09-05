(function () {
  const $ = (sel) => document.querySelector(sel);

  const stateKey = "a11y_prefs_v1";
  const prefs = {
    theme: null, // 'light' | 'dark' | null (segue SO)
    fontScale: 1, // 0.9 a 1.5
    highContrast: false,
    reduceMotion: false,
  };

  // Carrega preferências
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey));
    if (saved && typeof saved === "object") Object.assign(prefs, saved);
  } catch (e) {}

  const root = document.documentElement;
  const body = document.body;

  function applyTheme() {
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = prefs.theme ? prefs.theme === "dark" : prefersDark;
    body.classList.toggle("dark", isDark);
    body.classList.toggle("light", !isDark);
    // Atualiza estado do botão
    const btn = $("#a11y-theme");
    if (btn) btn.setAttribute("aria-pressed", String(isDark));
  }

  function applyFontScale() {
    const clamped = Math.min(1.5, Math.max(0.9, Number(prefs.fontScale) || 1));
    prefs.fontScale = clamped;
    root.style.setProperty("--font-scale", clamped);
  }

  function applyContrast() {
    body.classList.toggle("high-contrast", !!prefs.highContrast);
    const btn = $("#a11y-contrast");
    if (btn) btn.setAttribute("aria-pressed", String(!!prefs.highContrast));
  }

  function applyMotion() {
    body.classList.toggle("reduce-motion", !!prefs.reduceMotion);
    const btn = $("#a11y-motion");
    if (btn) btn.setAttribute("aria-pressed", String(!!prefs.reduceMotion));
  }

  function persist() {
    localStorage.setItem(stateKey, JSON.stringify(prefs));
  }

  // Aplica tudo ao iniciar
  applyTheme();
  applyFontScale();
  applyContrast();
  applyMotion();

  // Toggle do speed-dial
  const fab = $("#a11y-fab");
  const container = $("#a11y");
  const menu = $("#a11y-menu");

  function setOpen(open) {
    container.dataset.open = String(open);
    fab.setAttribute("aria-expanded", String(open));
  }

  fab.addEventListener("click", (e) => {
    const open = container.dataset.open !== "true";
    setOpen(open);
    // Gerencia foco: ao abrir, foca o primeiro botão; ao fechar, volta no FAB
    if (open) {
      // foca primeiro botão disponível
      const first = menu.querySelector(".a11y-btn");
      first && first.focus();
    } else {
      fab.focus();
    }
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target) && container.dataset.open === "true") {
      setOpen(false);
    }
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && container.dataset.open === "true") {
      setOpen(false);
      fab.focus();
    }
  });

  // Ações
  $("#a11y-theme").addEventListener("click", () => {
    // Alterna entre dark e light, ignorando preferência do SO
    const isDark = body.classList.contains("dark");
    prefs.theme = isDark ? "light" : "dark";
    applyTheme();
    persist();
  });

  $("#a11y-font-plus").addEventListener("click", () => {
    prefs.fontScale = (Number(prefs.fontScale) || 1) + 0.1;
    applyFontScale();
    persist();
  });

  $("#a11y-font-minus").addEventListener("click", () => {
    prefs.fontScale = (Number(prefs.fontScale) || 1) - 0.1;
    applyFontScale();
    persist();
  });

  $("#a11y-contrast").addEventListener("click", () => {
    prefs.highContrast = !prefs.highContrast;
    applyContrast();
    persist();
  });

  $("#a11y-motion").addEventListener("click", () => {
    prefs.reduceMotion = !prefs.reduceMotion;
    applyMotion();
    persist();
  });

  $("#a11y-top").addEventListener("click", () => {
    const smooth = !prefs.reduceMotion;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
  });

  $("#a11y-reset").addEventListener("click", () => {
    prefs.theme = null;
    prefs.fontScale = 1;
    prefs.highContrast = false;
    prefs.reduceMotion = false;
    applyTheme();
    applyFontScale();
    applyContrast();
    applyMotion();
    persist();
  });
})();
