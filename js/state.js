import { getFromStorage, saveToStorage } from "./storage.js";
import {
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    editTodoItem,
    clearCompletedItems,
} from "./todo-logic.js";

const TODOS_KEY = "todos";
const FILTER_KEY = "filter";

const savedTodos = getFromStorage(TODOS_KEY, []);
const savedFilter = getFromStorage(FILTER_KEY, "all");

const state = {
    todos: Array.isArray(savedTodos) ? savedTodos : [],
    currentFilter: ["all", "active", "completed"].includes(savedFilter) ? savedFilter : "all",
};

let onChangeCallback = null;

export function subscribe(callback) {
    onChangeCallback = callback;
}

function commit() {
    saveToStorage(TODOS_KEY, state.todos);
    saveToStorage(FILTER_KEY, state.currentFilter);
    if (onChangeCallback) {
        onChangeCallback(state);
    }
}

export function getState() {
    return state;
}

export function addTodo(text) {
    state.todos = addTodoItem(state.todos, text);
    commit();
}

export function toggleTodo(id) {
    state.todos = toggleTodoItem(state.todos, id);
    commit();
}

export function deleteTodo(id) {
    state.todos = deleteTodoItem(state.todos, id);
    commit();
}

export function editTodo(id, newText) {
    state.todos = editTodoItem(state.todos, id, newText);
    commit();
}

export function clearCompleted() {
    state.todos = clearCompletedItems(state.todos);
    commit();
}

export function setFilter(filterType) {
    state.currentFilter = filterType;
    commit();
}
