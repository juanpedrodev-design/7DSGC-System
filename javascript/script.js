// 1) Aplica tema inicial (localStorage > prefers-color-scheme > default 'light')
(function applyInitialTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  document.body.classList.toggle("dark", initial === "dark");
  document.body.classList.toggle("light", initial !== "dark");
  updateToggleA11y(initial === "dark");
})();

function updateToggleA11y(isDark) {
  const btn = document.getElementById("toggle-theme");
  btn.setAttribute("aria-pressed", String(isDark));
  btn.setAttribute(
    "aria-label",
    isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
  );
}

// 2) Alterna tema ao clicar
document.getElementById("toggle-theme").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  document.body.classList.toggle("light", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateToggleA11y(isDark);
});
