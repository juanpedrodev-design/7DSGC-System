//Modo escuro e claro
const btn = document.getElementById("toggle-theme");
const body = document.body;

// Verifica se já existe preferência salva
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.add(savedTheme);
} else {
  // Se não tiver nada, define claro como padrão
  body.classList.add("light");
}

btn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark"); // salva no navegador
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    localStorage.setItem("theme", "light"); // salva no navegador
  }
});
