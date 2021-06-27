const addNewNote = (str) => {
  const parent = document.getElementById("note-grid");
  const newNote = document.createElement("div");
  newNote.innerText = str;
  parent.appendChild(newNote);
};

// Click handler for the add note button
const addButton = document.getElementById("add-note-button");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const textarea = document.getElementById("note-text");
  const newNoteStr = textarea.value;
  textarea.value = "";
  addNewNote(newNoteStr);
});
