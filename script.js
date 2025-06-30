"use strict";

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  const filtered = todos.filter((todo) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className =
      "bg-gray-700 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm transform transition hover:scale-[1.02] hover:shadow-md opacity-0 animate-fadeIn";

    const label = document.createElement("label");
    label.className = "flex items-center gap-3 cursor-pointer";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "accent-indigo-500 w-5 h-5";
    checkbox.addEventListener("change", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.className = "transition";
    if (todo.completed) {
      text.classList.add("line-through", "text-gray-500");
    }

    label.appendChild(checkbox);
    label.appendChild(text);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "text-red-400 hover:text-red-600 transition";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(label);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") return;

  todos.push({ text: value, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) =>
      b.classList.remove("bg-indigo-500", "text-white")
    );
    btn.classList.add("bg-indigo-500", "text-white");
    renderTodos();
  });
});

filterBtns[0].classList.add("bg-indigo-500", "text-white");
renderTodos();
