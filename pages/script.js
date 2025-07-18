// Carregar hábitos do localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Função para iniciar categoria
function prepararCategoria() {
  const nome = document.getElementById("habitInput").value.trim();
  if (!nome) return;

  window.habitTemp = { name: nome, categoria: null, diasFeitos: [] };

  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Escolha sua categoria";
  btn.classList.add("mudou");

  document.getElementById("categoriaSelector").innerHTML = `
    <p>Escolha a categoria:</p>
    <button onclick="categorizarHabito('Saude')">❤️ Saúde</button>
    <button onclick="categorizarHabito('Estudo')">📚 Estudo</button>
    <button onclick="categorizarHabito('Produtividade')">📋 Produtividade</button>
    <button onclick="categorizarHabito('Lazer')">🎮 Lazer</button>
    <button onclick="categorizarHabito('Outro')">✨ Outro</button>
  `;
  document.getElementById("categoriaSelector").classList.remove("hidden");
}

// Categorizar hábito e salvar
function categorizarHabito(categoria) {
  const novoHabito = { ...window.habitTemp, categoria, diasFeitos: [] };
  habits.push(novoHabito);
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();

  const btn = document.getElementById("btnAdicionarHabito");
  btn.innerText = "Adicionar";
  btn.classList.remove("mudou");

  document.getElementById("categoriaSelector").classList.add("hidden");
  document.getElementById("habitInput").value = "";
}

// Renderiza hábitos no DOM
function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const box = document.createElement("div");
    box.className = `box box-${habit.categoria.toLowerCase()}`;

    const diasSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
    const diasHTML = diasSemana.map(dia => {
      const ativo = habit.diasFeitos.includes(dia) ? "ativo" : "";
      return `<button class="${ativo}" onclick="marcarDia(${index}, '${dia}')">${dia}</button>`;
    }).join("");

    box.innerHTML = `
      <div><strong>${habit.name}</strong> (${habit.categoria})</div>
      <div class="dias">${diasHTML}</div>
      <div class="feedback">${gerarFeedback(habit)}</div>
    `;

    list.appendChild(box);
  });
}

// Marcar dias da semana como concluído
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

// Gerar frase de feedback
function gerarFeedback(habit) {
  const qtd = habit.diasFeitos.length;
  if (qtd === 0) return "Vamos começar!";
  if (qtd >= 5) return `🔥 Você está arrasando com ${habit.name}: ${qtd} dias!`;
  if (qtd >= 3) return `👏 Você fez ${habit.name} por ${qtd} dias. Mandou bem!`;
  return `🌱 Começo promissor com ${qtd} dia${qtd > 1 ? "s" : ""}. Continue!`;
}

// Inicializar
renderHabits();