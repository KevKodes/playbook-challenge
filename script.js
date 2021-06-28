const addNewNote = (str) => {
  const parent = document.getElementById("note-grid");
  const newNote = document.createElement("div");
  const noteText = document.createElement("textarea");
  noteText.setAttribute("readonly", "true");
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
  node.setAttribute("readonly", "false");
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
/*
THIS IS NOT RUNNING PROBS BECAUSE IT IS RUN BEFORE THE ELEMENTS EXIST
*/
const editbuttons = document.querySelectorAll(".edit-note");
for (let i = 0; i < editbuttons.length; i++) {
  editbuttons[i].addEventListener("click", (e) => {
    const editArea = e.target.previousElementSibling;
    console.log("edit: ", editArea);
    editNote(editArea);
  });
}

// Click handler to delete the clicked note
