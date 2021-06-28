const addNewNote = (str) => {
  const parent = document.getElementById("note-grid");
  const newNote = document.createElement("div");
  const noteText = document.createElement("textarea");
  noteText.setAttribute("readOnly", "true");
  noteText.innerHTML = str;
  const editButton = document.createElement("button");
  editButton.className = "edit-note";
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-note";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  newNote.appendChild(noteText);
  newNote.appendChild(editButton);
  newNote.appendChild(deleteButton);

  parent.appendChild(newNote);
};

const editNote = (node) => {
  node.removeAttribute("readonly");
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

// Click handler to edit the clicked note
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-note")) {
    const editArea = e.target.previousElementSibling;
    console.log("edit: ", editArea);
    editNote(editArea);
  }
});

// Click handler to delete the clicked note
