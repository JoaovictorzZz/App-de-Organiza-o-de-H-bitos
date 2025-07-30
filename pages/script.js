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
  const habit = window.habitTemp?.name || "";
  if (!habit) {
    alert("Hábito não definido. Digite um hábito antes de escolher a categoria.");
    return;
  }

  // Exibe na tela o hábito e a categoria
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `
    <div class="habitoFinal">
      <strong>Hábito:</strong> ${habit}<br />
      <strong>Categoria:</strong> ${categoria}
    </div>
  `;

  // Opcional: esconder o seletor de categorias
  document.getElementById("categoriaSelector").classList.add("hidden");

  // Resetar o input
  document.getElementById("habitInput").value = "";

  // Resetar botão
  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Adicionar";
  btn.classList.remove("mudou");

  // Limpa temporário
  window.habitTemp = null;
}


    renderHabits();


 

