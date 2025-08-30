// filtro de busca
const searchInput = document.getElementById("search");
const personagens = document.querySelectorAll(".personagem");

searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  personagens.forEach((p) => {
    const nome = p.dataset.nome.toLowerCase();
    p.style.display = nome.includes(termo) ? "block" : "none";
  });
});

const selectCor = document.getElementById("filtro-cor");
const cards = document.querySelectorAll(".personagem");

function filtrarPorCor() {
  const corSelecionada = selectCor.value.toLowerCase();
  cards.forEach((card) => {
    const cardCor = (card.dataset.cor || "").toLowerCase();
    if (!corSelecionada || cardCor === corSelecionada) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

selectCor.addEventListener("change", filtrarPorCor);

// aplica filtro inicial (se quiser que já rode no carregamento)
window.addEventListener("DOMContentLoaded", filtrarPorCor);
