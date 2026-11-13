// ==========================================
// Exercise 1: Centralized State Pattern
// ==========================================
const state = {
    todos: [],
    filter: "all",
    theme: "light",
};

function saveState() {
    localStorage.setItem("task13_4_appState", JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem("task13_4_appState");
    if (saved) {
        try {
            Object.assign(state, JSON.parse(saved));
        } catch {
            // Ignore invalid JSON
        }
    }
}

function renderTheme() {
    const themeLabel = document.getElementById("theme-label");
    themeLabel.textContent = state.theme;
    document.body.classList.toggle("dark", state.theme === "dark");
}

function setState(updates) {
    Object.assign(state, updates);
    saveState();
    renderTheme();
}

loadState();
renderTheme();

document.getElementById("toggle-theme-btn").addEventListener("click", () => {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    setState({ theme: nextTheme });
});

// ==========================================
// Exercise 2: Observer Pattern (createStore)
// ==========================================
const createStore = (initialState) => {
    let currentState = initialState;
    const listeners = [];

    return {
        getState: () => currentState,

        setState: (updates) => {
            currentState = { ...currentState, ...updates };
            listeners.forEach((listener) => listener(currentState));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        },
    };
};

const countDisplay = document.getElementById("count-display");
const store = createStore({ count: 0 });

function renderUI(storeState) {
    countDisplay.textContent = storeState.count;
}

const unsubscribe = store.subscribe((updatedState) => {
    console.log("State changed:", updatedState);
    renderUI(updatedState);
});

document.getElementById("increment-btn").addEventListener("click", () => {
    store.setState({ count: store.getState().count + 1 });
});

document.getElementById("decrement-btn").addEventListener("click", () => {
    store.setState({ count: store.getState().count - 1 });
});

document.getElementById("unsubscribe-btn").addEventListener("click", () => {
    unsubscribe();
    console.log("Unsubscribed UI listener from store.");
});
