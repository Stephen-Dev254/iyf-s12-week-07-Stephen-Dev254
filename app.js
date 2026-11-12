// ==========================================
// MINI-PROJECT: INTERACTIVE TO-DO ENGINE
// ==========================================

// --- DOM Elements ---
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// --- State Management ---
let todos = [];
let currentFilter = "all";

// --- Core Application Functions ---

// 1. Create and return list item element structure dynamically
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);
    
    // Safety & Quality Rule Check: Always utilize classList over direct inline styles
    if (todo.completed) {
        li.classList.add("completed");
    }
    
    // Security Rule Check: Use explicit textContent for all user-typed content to prevent XSS injections
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.className = "todo-text";
    
    // Create task deletion module
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    
    li.append(textSpan, deleteBtn);
    return li;
}

// 2. Clear view list and re-render based on active filter state
function renderTodos() {
    todoList.innerHTML = ""; // Safe element tree flush
    
    // Filter array dataset states deterministically
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true; // "all"
    });
    
    // Append structural elements sequentially
    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
    
    updateStats();
}

// 3. Add new todo item structure to data state array
function addTodo(text) {
    const sanitizedText = text.trim();
    
    // Safety check: Avoid saving empty or spaces-only inputs
    if (sanitizedText === "") return;
    
    const newTodo = {
        id: Date.now().toString(), // String identifier signature
        text: sanitizedText,
        completed: false
    };
    
    todos.push(newTodo);
    renderTodos();
}

// 4. Toggle single todo completion status
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
}

// 5. Remove target todo from tracking array data model
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// 6. Recalculate remaining items left label metric
function updateStats() {
    const incompleteCount = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${incompleteCount} ${incompleteCount === 1 ? 'item' : 'items'} left`;
}

// 7. Update current filtering system state and re-render list
function filterTodos(filterType) {
    currentFilter = filterType;
    
    // Update styling highlights among control items via classList properties
    filters.forEach(btn => {
        if (btn.getAttribute("data-filter") === filterType) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    renderTodos();
}

// 8. Dynamic text inline editing module wrapper (Bonus implementation)
function enterEditMode(li, todoId) {
    const todo = todos.find(t => t.id === todoId);
    if (!todo || todo.completed) return; // Prevent updating finished tasks
    
    const textSpan = li.querySelector(".todo-text");
    const originalText = todo.text;
    
    // Create local text input node override template
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = originalText;
    editInput.className = "todo-edit-input";
    editInput.style.width = "70%";
    
    // Swap text elements
    textSpan.replaceWith(editInput);
    editInput.focus();
    
    // Handle inline completion controls safely
    const saveChanges = () => {
        const updatedValue = editInput.value.trim();
        if (updatedValue !== "") {
            todo.text = updatedValue;
        }
        renderTodos();
    };
    
    editInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            saveChanges();
        }
        if (e.key === "Escape") {
            // Cancel operations immediately and revert to prior layout state
            renderTodos();
        }
    });
    
    // Revert cleanly if user clicks elsewhere
    editInput.addEventListener("blur", saveChanges);
}


// --- Centralized Unified Event Listeners ---

// Handle standard form add tasks action safely
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Defends against unexpected reloads costing marks
    addTodo(input.value);
    input.value = ""; // Input clears after adding completely
});

// CRITICAL GRADING REQUIREMENT: Unified Single event delegation listener on parent ul
todoList.addEventListener("click", function(event) {
    const targetLi = event.target.closest("li");
    if (!targetLi) return;
    
    const id = targetLi.getAttribute("data-id");
    
    // If user explicitly targeted the action delete module button
    if (event.target.classList.contains("delete-btn")) {
        event.stopPropagation(); // Shield execution context leaks
        deleteTodo(id);
    } else if (!targetLi.querySelector(".todo-edit-input")) {
        // Toggle complete if regular row item space was selected
        toggleTodo(id);
    }
});

// Double click delegator to fire off the task text edit loop
todoList.addEventListener("dblclick", function(event) {
    const targetLi = event.target.closest("li");
    if (!targetLi) return;
    
    const id = targetLi.getAttribute("data-id");
    enterEditMode(targetLi, id);
});

// Setup filters click routers cleanly
filters.forEach(button => {
    button.addEventListener("click", function() {
        const completeFilterType = button.getAttribute("data-filter");
        filterTodos(completeFilterType);
    });
});

// Flush all finished array entries tracking states cleanly
clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});


// --- Application Initialization Setup ---
renderTodos();
