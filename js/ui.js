import { getFilteredTodos, getIncompleteCount } from './todo-logic.js';

const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filters = document.querySelectorAll('.filter');

function createTodoElement(todo) {
  const li = document.createElement('li');
  li.setAttribute('data-id', todo.id);

  if (todo.completed) {
    li.classList.add('completed');
  }

  const textSpan = document.createElement('span');
  textSpan.textContent = todo.text;
  textSpan.className = 'todo-text';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.type = 'button';

  li.append(textSpan, deleteBtn);
  return li;
}

export function renderApp(state) {
  todoList.innerHTML = '';

  const filteredTodos = getFilteredTodos(state.todos, state.currentFilter);
  filteredTodos.forEach((todo) => {
    todoList.appendChild(createTodoElement(todo));
  });

  const incompleteCount = getIncompleteCount(state.todos);
  itemsLeft.textContent = `${incompleteCount} ${incompleteCount === 1 ? 'item' : 'items'} left`;

  filters.forEach((btn) => {
    if (btn.getAttribute('data-filter') === state.currentFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

export function startInlineEdit(li, todo, onSave, onCancel) {
  if (!todo || todo.completed) return;

  const textSpan = li.querySelector('.todo-text');
  if (!textSpan) return;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = todo.text;
  editInput.className = 'todo-edit-input';

  textSpan.replaceWith(editInput);
  editInput.focus();

  let finished = false;
  const finishEdit = (shouldSave) => {
    if (finished) return;
    finished = true;
    if (shouldSave) {
      onSave(editInput.value);
    } else {
      onCancel();
    }
  };

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finishEdit(true);
    if (e.key === 'Escape') finishEdit(false);
  });

  editInput.addEventListener('blur', () => finishEdit(true));
}
