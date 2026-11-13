const THEME_STORAGE_KEY = "daily_challenge_theme";
const toggleBtn = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("current-theme");

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    themeLabel.textContent = isDark ? "dark" : "light";
    toggleBtn.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
applyTheme(savedTheme);

toggleBtn.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
});
