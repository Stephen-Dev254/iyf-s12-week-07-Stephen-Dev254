export function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
}

export function getFromStorage(key, defaultValue = null) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return defaultValue;
        }
        return JSON.parse(raw);
    } catch {
        return defaultValue;
    }
}
