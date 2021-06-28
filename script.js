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

const cancelEdit = (node, str) => {
  console.log("string in cancel helper: ", str);
  node.value = str;
  node.setAttribute("readonly", "true");
  const wrapper = node.parentElement;
  wrapper.removeChild(wrapper.lastElementChild);
  wrapper.removeChild(wrapper.lastElementChild);
};

const saveEdit = (node) => {
  node.setAttribute("readonly", true);
  const wrapper = node.parentElement;
  wrapper.removeChild(wrapper.lastElementChild);
  wrapper.removeChild(wrapper.lastElementChild);
};

const editNote = (node, str) => {
  node.removeAttribute("readonly");
  const wrapper = node.parentElement;

  //save button
  const saveButton = document.createElement("button");
  saveButton.className = "save-changes";
  saveButton.innerText = "Save Changes";
  saveButton.addEventListener("click", () => {
    saveEdit(node);
  });
  wrapper.appendChild(saveButton);

  // cancel button
  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-changes";
  cancelButton.addEventListener("click", () => {
    cancelEdit(node, str);
  });
  cancelButton.innerText = "Cancel Changes";
  wrapper.appendChild(cancelButton);
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
    const originalNote = editArea.innerHTML;
    console.log("original text: ", originalNote);
    editNote(editArea, originalNote);
  }
});

// Click handler to delete the clicked note
