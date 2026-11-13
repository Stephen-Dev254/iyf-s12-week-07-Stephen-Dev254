import { describe, it, expect } from "vitest";
import {
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    editTodoItem,
    clearCompletedItems,
    getFilteredTodos,
    getIncompleteCount,
} from "../js/todo-logic.js";

describe("todo-logic pure functions", () => {
    it("adds a trimmed todo item and does not mutate the original array", () => {
        const originalTodos = [{ id: "1", text: "Existing task", completed: false }];
        const updatedTodos = addTodoItem(originalTodos, "  Learn Vitest  ", "2");

        expect(originalTodos).toHaveLength(1);
        expect(originalTodos).toEqual([{ id: "1", text: "Existing task", completed: false }]);
        expect(updatedTodos).toEqual([
            { id: "1", text: "Existing task", completed: false },
            { id: "2", text: "Learn Vitest", completed: false },
        ]);
    });

    it("ignores empty or whitespace-only text (edge case)", () => {
        const todos = [{ id: "1", text: "Existing", completed: false }];
        expect(addTodoItem(todos, "   ")).toEqual(todos);
        expect(addTodoItem(todos, "")).toEqual(todos);
    });

    it("toggles a todo completed status by id without mutating input", () => {
        const todos = [
            { id: "1", text: "Task A", completed: false },
            { id: "2", text: "Task B", completed: true },
        ];
        const toggled = toggleTodoItem(todos, "1");

        expect(todos[0].completed).toBe(false);
        expect(toggled[0].completed).toBe(true);
        expect(toggled[1].completed).toBe(true);
    });

    it("leaves the list unchanged when toggling an id that does not exist (edge case)", () => {
        const todos = [{ id: "1", text: "Task A", completed: false }];
        expect(toggleTodoItem(todos, "non-existent-id")).toEqual(todos);
    });

    it("deletes a todo by id without mutating the original array", () => {
        const todos = [
            { id: "1", text: "Task A", completed: false },
            { id: "2", text: "Task B", completed: false },
        ];
        const remaining = deleteTodoItem(todos, "1");

        expect(todos).toHaveLength(2);
        expect(remaining).toEqual([{ id: "2", text: "Task B", completed: false }]);
    });

    it("handles deleting from an empty list safely (edge case)", () => {
        expect(deleteTodoItem([], "1")).toEqual([]);
    });

    it("edits a todo text cleanly and ignores blank edits", () => {
        const todos = [{ id: "1", text: "Old text", completed: false }];
        expect(editTodoItem(todos, "1", "  Updated text  ")).toEqual([
            { id: "1", text: "Updated text", completed: false },
        ]);
        expect(editTodoItem(todos, "1", "   ")).toEqual(todos);
    });

    it("clears only completed todos", () => {
        const todos = [
            { id: "1", text: "Keep active", completed: false },
            { id: "2", text: "Remove done", completed: true },
        ];
        expect(clearCompletedItems(todos)).toEqual([
            { id: "1", text: "Keep active", completed: false },
        ]);
    });

    it("filters todos by all, active, and completed", () => {
        const todos = [
            { id: "1", text: "Active task", completed: false },
            { id: "2", text: "Done task", completed: true },
        ];

        expect(getFilteredTodos(todos, "all")).toHaveLength(2);
        expect(getFilteredTodos(todos, "active")).toEqual([todos[0]]);
        expect(getFilteredTodos(todos, "completed")).toEqual([todos[1]]);
    });

    it("counts incomplete items accurately including on an empty list", () => {
        expect(getIncompleteCount([])).toBe(0);

        const todos = [
            { id: "1", text: "One", completed: false },
            { id: "2", text: "Two", completed: true },
            { id: "3", text: "Three", completed: false },
        ];
        expect(getIncompleteCount(todos)).toBe(2);
    });
});
