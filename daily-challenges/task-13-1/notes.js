import { saveToStorage, getFromStorage, removeFromStorage } from "./exercises.js";

const NOTES_KEY = "saved_notes";
let notes = getFromStorage(NOTES_KEY, []);

const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const notesList = document.getElementById("notes-list");

function commit() {
    if (notes.length === 0) {
        removeFromStorage(NOTES_KEY);
    } else {
        saveToStorage(NOTES_KEY, notes);
    }
    renderNotes();
}

function addNote(title, body) {
    const newNote = {
        id: Date.now(),
        title,
        body,
        createdAt: new Date().toLocaleDateString(),
    };
    notes = [newNote, ...notes];
    commit();
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    commit();
}

function renderNotes() {
    if (notes.length === 0) {
        notesList.innerHTML = "<p>No notes yet. Add one above!</p>";
        return;
    }

    notesList.innerHTML = notes
        .map(
            (note) => `
      <div class="note-card" data-id="${note.id}">
        <div>
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <small>${note.createdAt}</small>
        </div>
        <button class="delete-btn" type="button">Delete</button>
      </div>
    `
        )
        .join("");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title || !body) {
        return;
    }

    addNote(title, body);
    form.reset();
});

notesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const card = e.target.closest(".note-card");
        const id = Number(card.dataset.id);
        deleteNote(id);
    }
});

renderNotes();
