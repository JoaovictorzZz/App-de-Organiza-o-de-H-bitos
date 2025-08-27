// 🧠 Carregar hábitos do localStorage
let habits = JSON.parse(localStorage.getItem("habitos")) || [];

// ✅ Renderizar hábitos na tela
function renderizarHabitos() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  habits.forEach((habito, index) => {
    const bloco = document.createElement("div");
    bloco.classList.add("habitoFinal");

    bloco.innerHTML = `
      <div class="info-habito">
      <strong>Hábito:</strong> <span>${habito.name}</span><br />
      <br/>
      <strong>Categoria:</strong> <span>${habito.categoria}</span>
      <button class="btn-excluir">✖</button>
      <div/>
    `;

    bloco.querySelector(".btn-excluir").addEventListener("click", () => {
      habits.splice(index, 1);
      localStorage.setItem("habitos", JSON.stringify(habits));
      renderizarHabitos();
    });

    resultadoDiv.appendChild(bloco);
  });
}

// ✅ Ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarHabitos);
// resetar pagina 
function resetarInterface(){
   const input = document.getElementById("ihabitInput");
   const bnt = document.getElementById("btnAdicionarHabito");

   input.value = "";
   input.disable = false;
   input.style.display = "block";
}
// ✅ Remover todos os hábitos
document.getElementById("btnRemoverTodos").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja remover todos os hábitos?")) {
    habits = [];
    localStorage.removeItem("habitos");
    renderizarHabitos();
    resetarInterface();
  }
});

// ✅ Ativar pelo Enter
document.getElementById("habitInput").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    prepararCategoria();
  }
});

// ✅ Ativar ao sair do campo
document.getElementById("habitInput").addEventListener("blur", () => {
  const nome = document.getElementById("habitInput").value.trim();
  if (nome) prepararCategoria();
});

// ✅ Ativar pelo botão
document.getElementById("btnAdicionarHabito").addEventListener("click", prepararCategoria);

// ✅ Iniciar seleção de categoria
function prepararCategoria() {
  const nome = document.getElementById("habitInput").value.trim();
  if (!nome) return;

  window.habitTemp = { name: nome, categoria: null, diasFeitos: [] };

  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Escolha sua categoria";
  void btn.offsetWidth;
  btn.classList.add("mudou");

  const categoriaDiv = document.getElementById("categoriaSelector");
  categoriaDiv.innerHTML = `
    <br><br>
    <button class="botao-categoria" onclick="categorizarHabito('Saúde')">❤️ Saúde</button>
    <button class="botao-categoria" onclick="categorizarHabito('Estudo')">📚 Estudo</button>
    <button class="botao-categoria" onclick="categorizarHabito('Produtividade')">📋 Utilidade</button>
    <button class="botao-categoria" onclick="categorizarHabito('Lazer')">🎮 Lazer</button>
    <button class="botao-categoria" onclick="categorizarHabito('Outro')">✨ Outro</button>
  `;
  categoriaDiv.classList.remove("hidden");
}

// ✅ Finalizar hábito e salvar
function categorizarHabito(categoria) {
  const habitName = window.habitTemp?.name || "";
  if (!habitName) {
    alert("Hábito não definido. Digite um hábito antes de escolher a categoria.");
    document.getElementById("habitInput").value = "";
    document.getElementById("habitInput").focus();
    resetarInterface();
    return;
  }

  const novoHabito = {
    name: habitName,
    categoria: categoria,
    diasFeitos: []
  };

  habits.push(novoHabito);
  localStorage.setItem("habitos", JSON.stringify(habits));
  renderizarHabitos();
  resetarInterface();
}

// ✅ Resetar interface após adicionar
function resetarInterface() {
  document.getElementById("habitInput").value = "";

  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Adicionar";
  btn.classList.remove("mudou");

  const categoriaDiv = document.getElementById("categoriaSelector");
  categoriaDiv.classList.add("escondendo");

  setTimeout(() => {
    categoriaDiv.classList.add("hidden");
    categoriaDiv.classList.remove("escondendo");
    categoriaDiv.innerHTML = "";

    const titulo = document.querySelector("h2.sub");
    if (titulo) {
      titulo.classList.remove("h2-animado");
      void titulo.offsetWidth;
      titulo.classList.add("h2-animado");
    }
  }, 600);

  window.habitTemp = null;
}
