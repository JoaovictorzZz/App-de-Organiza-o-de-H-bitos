//local storage teste
let habits = JSON.parse(localStorage.getItem("habits")) || [];

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
    <span>${habit.name}</span>
    <button onclick="toggleHabit(${index})">
    ${habit.done ? "Desfazer" : "Feito"}
    </button>
    <button onclick="deleteHabit(${index})">🗑</button>
`;

    list.appendChild(li);
  });
}

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

// Renderiza ao carregar a página
renderHabits();