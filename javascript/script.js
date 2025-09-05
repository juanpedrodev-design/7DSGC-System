// ===== Persistência de tema (usa <button id="theme">) =====
(function () {
  const STORAGE_KEY = "theme"; // valores: "light" | "dark"

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("light", !isDark);
    // ARIA opcional
    const btn = document.getElementById("theme");
    if (btn) {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
      );
    }
  }

  function init() {
    // 1) Se houver tema salvo, aplica. Se não houver, não mexe no body.
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    }

    // 2) Liga o botão #theme para alternar e salvar
    const btn = document.getElementById("theme");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isDarkNow = document.body.classList.contains("dark");
      const next = isDarkNow ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // garante que o DOM esteja pronto (funciona com ou sem 'defer')
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
