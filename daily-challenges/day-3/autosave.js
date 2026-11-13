const DRAFT_KEY = "form_autosave_draft";
const AUTO_SAVE_INTERVAL_MS = 5000;

const form = document.getElementById("autosave-form");
const indicator = document.getElementById("save-indicator");
const fields = form.querySelectorAll("input, textarea");

function restoreDraft() {
    try {
        const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
        if (!saved) {
            return;
        }
        fields.forEach((field) => {
            if (saved[field.name]) {
                field.value = saved[field.name];
            }
        });
    } catch {
        // Ignore corrupted draft
    }
}

function saveDraft() {
    const draft = {};
    fields.forEach((field) => {
        draft[field.name] = field.value;
    });
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    indicator.textContent = `Draft auto-saved at ${new Date().toLocaleTimeString()}`;
}

restoreDraft();
setInterval(saveDraft, AUTO_SAVE_INTERVAL_MS);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.removeItem(DRAFT_KEY);
    form.reset();
    indicator.textContent = "Submitted! Saved draft cleared.";
});
