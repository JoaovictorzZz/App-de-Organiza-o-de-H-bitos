// Carregar hábitos do localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];
//ativar button
document.getElementById("habitInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // evita envio de formulário ou comportamento padrão
    prepararCategoria(); // aciona a função do botão "Adicionar"
  }
});
// Função para iniciar categoria
function prepararCategoria() {
  const nome = document.getElementById("habitInput").value.trim();
  if (!nome) return;

  window.habitTemp = { name: nome, categoria: null, diasFeitos: [] };
//mudança de texto
  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Escolha sua categoria";
  void btn.offsetWidth; // reinicia o ciclo da animação
  btn.classList.add("mudou");

  document.getElementById("categoriaSelector").innerHTML = `
    <br>
    <br>
    <button class="botao-categoria" onclick="categorizarHabito('Saude')">❤️ Saúde</button>
    <button class="botao-categoria" onclick="categorizarHabito('Estudo')">📚 Estudo</button>
    <button class="botao-categoria" onclick="categorizarHabito('Produtividade')">📋 Utilidade</button>
    <button class="botao-categoria" onclick="categorizarHabito('Lazer')">🎮 Lazer</button>
    <button class="botao-categoria" onclick="categorizarHabito('Outro')">✨ Outro</button>
  `;
  document.getElementById("categoriaSelector").classList.remove("hidden");
}

// Categorizar hábito e salvar
function categorizarHabito(categoria) {
  const habitName = window.habitTemp?.name || "";
  if (!habitName) {
    alert("Hábito não definido. Digite um hábito antes de escolher a categoria.");

    // 🔧 Reset visual após alerta
    document.getElementById("habitInput").value = "";
    document.getElementById("habitInput").focus();

    const btn = document.getElementById("btnAdicionarHabito");
    btn.innerText = "Adicionar";
    btn.classList.remove("mudou");

    document.getElementById("categoriaSelector").classList.add("hidden");
    window.habitTemp = null;
    return;
  }

  // ✅ Cria objeto do novo hábito
  const novoHabito = {
    name: habitName,
    categoria: categoria,
    diasFeitos: []
  };

  // ✅ Adiciona ao array e salva no localStorage
  habits.push(novoHabito);
  localStorage.setItem("habits", JSON.stringify(habits));

  // ✅ Exibe na tela sem apagar os anteriores
  const resultadoDiv = document.getElementById("resultado");

  const bloco = document.createElement("div");
  bloco.classList.add("habitoFinal");
  bloco.innerHTML = `
    <strong>Hábito:</strong> ${novoHabito.name}<br />
    <strong>Categoria:</strong> ${novoHabito.categoria}
  `;
  resultadoDiv.appendChild(bloco);

  // 🔄 Reset visual após salvar
  document.getElementById("habitInput").value = "";
  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Adicionar";
  btn.classList.remove("mudou");

  const categoriaDiv = document.getElementById("categoriaSelector");
  categoriaDiv.classList.add("efeito-contracao");
  categoriaDiv.classList.add("escondendo"); // ✨ animação saindo

  setTimeout(() => {
    categoriaDiv.classList.add("hidden");
    categoriaDiv.classList.remove("escondendo" , "efeito-contracao");
    categoriaDiv.innerHTML = ""; // limpa após animação
  }, 400);


  window.habitTemp = null;
}
    renderHabits();


 

