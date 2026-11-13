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
const VALID_FILTERS = ["all", "active", "completed"];

const savedTodos = getFromStorage(TODOS_KEY, []);
const savedFilter = getFromStorage(FILTER_KEY, "all");

const state = {
    todos: Array.isArray(savedTodos) ? savedTodos : [],
    currentFilter: VALID_FILTERS.includes(savedFilter) ? savedFilter : "all",
};

let onChangeCallback = null;

export function subscribe(callback) {
    onChangeCallback = callback;
}

function commit() {
    saveToStorage(TODOS_KEY, state.todos);
    saveToStorage(FILTER_KEY, state.currentFilter);
    if (onChangeCallback) {
        onChangeCallback(getState());
    }
}

export function getState() {
    return {
        todos: state.todos.map((todo) => ({ ...todo })),
        currentFilter: state.currentFilter,
    };
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
    if (!VALID_FILTERS.includes(filterType)) {
        return;
    }
    state.currentFilter = filterType;
    commit();
}
