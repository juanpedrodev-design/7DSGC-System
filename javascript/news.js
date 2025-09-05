// Botão “Ver mais” por seção — revela cards ocultos (.is-hidden)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".load-more");
  if (!btn) return;

  const grid = document.querySelector(btn.dataset.target);
  if (!grid) return;

  // revela até 6 por clique (ajuste à vontade)
  const hidden = grid.querySelectorAll(".is-hidden");
  hidden.forEach((el, i) => {
    if (i < 6) el.classList.remove("is-hidden");
  });

  // se não sobrou nenhum, remove o botão
  if (grid.querySelectorAll(".is-hidden").length === 0) btn.remove();
});

// melhora foco de navegação por teclado (estilo visível quando vem via TAB)
(function focusRing() {
  function add() {
    document.body.classList.add("using-keyboard");
  }
  function remove() {
    document.body.classList.remove("using-keyboard");
  }
  window.addEventListener("keydown", (e) => e.key === "Tab" && add());
  window.addEventListener("mousedown", remove);
})();
