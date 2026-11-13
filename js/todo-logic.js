export function addTodoItem(todos, text, id = Date.now().toString()) {
  const sanitizedText = text.trim();
  if (sanitizedText === '') return todos;

  const newTodo = {
    id,
    text: sanitizedText,
    completed: false,
  };
  return [...todos, newTodo];
}

export function toggleTodoItem(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function deleteTodoItem(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function editTodoItem(todos, id, newText) {
  const sanitizedText = newText.trim();
  if (sanitizedText === '') return todos;

  return todos.map((todo) =>
    todo.id === id ? { ...todo, text: sanitizedText } : todo
  );
}

export function clearCompletedItems(todos) {
  return todos.filter((todo) => !todo.completed);
}

export function getFilteredTodos(todos, filter) {
  if (filter === 'active') return todos.filter((todo) => !todo.completed);
  if (filter === 'completed') return todos.filter((todo) => todo.completed);
  return todos;
}

export function getIncompleteCount(todos) {
  return todos.filter((todo) => !todo.completed).length;
}
