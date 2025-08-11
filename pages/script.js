// Carregar hábitos do localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Exibir hábitos ao carregar a página
function renderizarHabitos() {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "";

  habits.forEach((h, index) => {
    const bloco = document.createElement("div");
    bloco.classList.add("habitoFinal");

    // ✅ Conteúdo do hábito + botão de remover
    bloco.innerHTML = `
      <div class="conteudo-habito">
        <strong>Hábito:</strong> ${h.name}<br />
        <strong>Categoria:</strong> ${h.categoria}
      </div>
      <button class="remover-individual" onclick="removerHabito(${index})">❌</button>
    `;

    resultadoDiv.appendChild(bloco);
  });
}
document.addEventListener("DOMContentLoaded", renderizarHabitos);
//remover habitos
function removerHabito(index) {
  habits.splice(index, 1); // Remove do array
  localStorage.setItem("habits", JSON.stringify(habits)); // Atualiza localStorage
  renderizarHabitos(); // Re-renderiza a lista
}
//remover TODOS habitos
document.getElementById("btnRemoverTodos").addEventListener("click", function() {
  if (confirm("Tem certeza que deseja remover todos os hábitos?")) {
    habits = [];
    localStorage.removeItem("habits");
    renderizarHabitos();
  }
});
// Ativar pelo Enter
document.getElementById("habitInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    prepararCategoria();
  }
});

// Ativar quando sair do campo
document.getElementById("habitInput").addEventListener("blur", function() {
  const nome = this.value.trim();
  if (nome) {
    prepararCategoria();
  }
});

// Ativar pelo botão "Adicionar"
document.getElementById("btnAdicionarHabito").addEventListener("click", prepararCategoria);

// Função para iniciar categoria
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
    <button class="botao-categoria" onclick="categorizarHabito('Saude')">❤️ Saúde</button>
    <button class="botao-categoria" onclick="categorizarHabito('Estudo')">📚 Estudo</button>
    <button class="botao-categoria" onclick="categorizarHabito('Produtividade')">📋 Utilidade</button>
    <button class="botao-categoria" onclick="categorizarHabito('Lazer')">🎮 Lazer</button>
    <button class="botao-categoria" onclick="categorizarHabito('Outro')">✨ Outro</button>
  `;
  categoriaDiv.classList.remove("hidden");
}

// Categorizar hábito e salvar
function categorizarHabito(categoria) {
  const habitName = window.habitTemp?.name || "";
  if (!habitName) {
    alert("Hábito não definido. Digite um hábito antes de escolher a categoria.");

    document.getElementById("habitInput").value = "";
    document.getElementById("habitInput").focus();

    const btn = document.getElementById("btnAdicionarHabito");
    btn.innerText = "Adicionar";
    btn.classList.remove("mudou");

    const categoriaDiv = document.getElementById("categoriaSelector");
    categoriaDiv.classList.add("hidden");
    categoriaDiv.innerHTML = "";
    window.habitTemp = null;
    return;
  }

  const novoHabito = {
    name: habitName,
    categoria: categoria,
    diasFeitos: []
  };

  // ✅ Adiciona ao array global
  habits.push(novoHabito);

  // ✅ Salva no localStorage corretamente
  localStorage.setItem("habits", JSON.stringify(habits));

  // ✅ Exibe na tela
  const resultadoDiv = document.getElementById("resultado");
  const bloco = document.createElement("div");
  bloco.classList.add("habitoFinal");
  bloco.innerHTML = `
    <strong>Hábito:</strong> ${novoHabito.name}<br />
    <strong>Categoria:</strong> ${novoHabito.categoria}
  `;
  resultadoDiv.appendChild(bloco);

  // Resetar input
  document.getElementById("habitInput").value = "";

  // Resetar botão
  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Adicionar";
  btn.classList.remove("mudou");

  // Animação de sumir os botões
  const categoriaDiv = document.getElementById("categoriaSelector");
  categoriaDiv.classList.add("escondendo");

  setTimeout(() => {
    categoriaDiv.classList.add("hidden");
    categoriaDiv.classList.remove("escondendo");
    categoriaDiv.innerHTML = "";

    // Animação no h2
    const titulo = document.querySelector("h2.sub");
    if (titulo) {
      titulo.classList.remove("h2-animado");
      void titulo.offsetWidth;
      titulo.classList.add("h2-animado");
    }
  }, 600);

  window.habitTemp = null;
}