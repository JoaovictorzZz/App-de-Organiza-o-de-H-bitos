//local storage 
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// renderizando os novos habitos
function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit"; // classe base com transição

    if (habit.done) {
      li.classList.add("habit-done"); // aplica fundo e animação se feito
    }

    li.innerHTML = `
    <button class="editHabito"  onclick="editHabit(${index})">✏️</button>
    <span>${habit.name}</span>
    <button class="addHabito" onclick="toggleHabit(${index})">
    ${habit.done ? "X" : "&#10004"}
    </button>
    <button onclick="deleteHabit(${index})">🗑</button>
`;
   
    list.appendChild(li);
  });
}

//Le o input , se nao estiver nada retorna false ,atualiza o local storage e altualiza assim a interface
function addHabit() {
  const input = document.getElementById("habitInput");
  if (input.value.trim() === "") return;

  habits.push({ name: input.value, done: false });
  localStorage.setItem("habits", JSON.stringify(habits));
  input.value = "";
  renderHabits();
}

function toggleHabit(index) {
  habits[index].done = !habits[index].done;
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}
//

// Renderiza ao carregar a página
renderHabits();