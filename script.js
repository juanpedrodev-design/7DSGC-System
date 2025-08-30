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

const imagens = document.querySelectorAll(".filtro-imagens img");
const select = document.getElementById("filtro-cor");

imagens.forEach((img) => {
  img.addEventListener("click", () => {
    // Se já estava selecionado → desmarca
    if (img.classList.contains("selected")) {
      img.classList.remove("selected");
      select.value = ""; // volta para "todas"
      select.dispatchEvent(new Event("change"));
      return;
    }

    // Marca a nova cor e desmarca as outras
    imagens.forEach((i) => i.classList.remove("selected"));
    img.classList.add("selected");

    select.value = img.dataset.value;
    select.dispatchEvent(new Event("change"));
  });
});

document.querySelectorAll(".personagem").forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.dataset.link;
    if (link) window.location.href = link;
  });
});
