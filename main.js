const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const addBtn = document.getElementById('addNote');
const notesContainer = document.getElementById('notes-сontainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

const renderNotes = () => {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.className = 'note';

        const titleEl = document.createElement('h3');
        titleEl.textContent = note.title;

        const textEl = document.createElement('p');
        textEl.textContent = note.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            notes = notes.filter((_, i) => i !== index);
            saveNotes();
            renderNotes();
        };

        noteEl.appendChild(titleEl);
        noteEl.appendChild(textEl);
        noteEl.appendChild(deleteBtn);

        notesContainer.appendChild(noteEl);
    });
};

addBtn.onclick = () => {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    notes.push({ title, text });
    saveNotes();
    renderNotes();

    titleInput.value = '';
    textInput.value = '';
};

renderNotes();