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

//  Renderizar box com categoria + hábito + dias da semana
 function renderHabits() {
      const list = document.getElementById("habitList");
      list.innerHTML = "";

      const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

      habits.forEach((habit, index) => {
        const box = document.createElement("div");

        const diasHTML = diasSemana.map(dia => {
          const ativo = habit.diasFeitos.includes(dia) ? "ativo" : "";
          return `<button onclick="marcarDia(${index}, '${dia}')">${dia}</button>`;
        }).join(" ");

        box.innerHTML = `
          <div>
            <strong>${habit.categoria} = ${habit.name}</strong>
          </div>
          <div>${diasHTML}</div>
          <div>${gerarFeedback(habit)}</div>
          <hr />
        `;

        list.appendChild(box);
      });
    }

    function marcarDia(index, dia) {
      const habit = habits[index];
      if (!habit.diasFeitos.includes(dia)) {
        habit.diasFeitos.push(dia);
      } else {
        habit.diasFeitos = habit.diasFeitos.filter(d => d !== dia);
      }

      localStorage.setItem("habits", JSON.stringify(habits));
      renderHabits();
    }

    function gerarFeedback(habit) {
      const qtd = habit.diasFeitos.length;
      if (qtd >= 5) return `🔥 Você mandou muito bem com ${habit.name}! Feito em ${qtd} dias!`;
      if (qtd >= 3) return `👏 ${habit.name} foi feito em ${qtd} dias. Está indo bem!`;
      if (qtd >= 1) return `🌱 Você marcou ${qtd} dia${qtd > 1 ? "s" : ""} de ${habit.name}. Continue firme!`;
      return `🚧 Ainda não marcou nenhum dia para ${habit.name}. Vamos começar!`;
    }

    renderHabits();


 

