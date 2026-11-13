import {
  getState,
  subscribe,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  setFilter,
} from './state.js';
import { renderApp, startInlineEdit } from './ui.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');
const clearCompletedBtn = document.getElementById('clear-completed');

subscribe(renderApp);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(input.value);
  input.value = '';
});

todoList.addEventListener('click', (event) => {
  const targetLi = event.target.closest('li');
  if (!targetLi) return;

  const id = targetLi.getAttribute('data-id');

  if (event.target.classList.contains('delete-btn')) {
    event.stopPropagation();
    deleteTodo(id);
  } else if (!targetLi.querySelector('.todo-edit-input')) {
    toggleTodo(id);
  }
});

todoList.addEventListener('dblclick', (event) => {
  const targetLi = event.target.closest('li');
  if (!targetLi) return;

  const id = targetLi.getAttribute('data-id');
  const todo = getState().todos.find((t) => t.id === id);

  startInlineEdit(
    targetLi,
    todo,
    (updatedText) => editTodo(id, updatedText),
    () => renderApp(getState())
  );
});

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filterType = button.getAttribute('data-filter');
    setFilter(filterType);
  });
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompleted();
});

renderApp(getState());
