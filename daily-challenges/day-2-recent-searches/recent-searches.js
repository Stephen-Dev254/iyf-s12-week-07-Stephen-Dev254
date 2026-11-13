const HISTORY_KEY = "recent_searches_history";
const MAX_RECENT_ITEMS = 5;

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const dropdown = document.getElementById("history-dropdown");
const resultDisplay = document.getElementById("search-result");

function loadHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

let recentSearches = loadHistory();

function saveSearch(query) {
    const cleaned = query.trim();
    if (cleaned === "") {
        return;
    }
    const withoutDuplicate = recentSearches.filter(
        (item) => item.toLowerCase() !== cleaned.toLowerCase()
    );
    recentSearches = [cleaned, ...withoutDuplicate].slice(0, MAX_RECENT_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(recentSearches));
}

function renderDropdown() {
    if (recentSearches.length === 0) {
        dropdown.classList.add("hidden");
        dropdown.innerHTML = "";
        return;
    }

    dropdown.innerHTML = recentSearches
        .map((term) => `<li data-query="${term}">${term}</li>`)
        .join("");
    dropdown.classList.remove("hidden");
}

function executeSearch(query) {
    const cleaned = query.trim();
    if (cleaned === "") {
        return;
    }
    input.value = cleaned;
    saveSearch(cleaned);
    resultDisplay.textContent = `Showing results for: "${cleaned}"`;
    dropdown.classList.add("hidden");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    executeSearch(input.value);
});

input.addEventListener("focus", renderDropdown);

dropdown.addEventListener("click", (event) => {
    const item = event.target.closest("li");
    if (!item) {
        return;
    }
    executeSearch(item.dataset.query);
});
