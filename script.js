const addNewNote = (str) => {
  const parent = document.getElementById("note-grid");
  const newNote = document.createElement("div");
  newNote.classList.add("grid-item");
  const noteText = document.createElement("textarea");
  noteText.setAttribute("readOnly", "true");
  noteText.innerHTML = str;
  const buttonDiv = document.createElement("div");
  const editButton = document.createElement("button");
  editButton.className = "edit-note";
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-note";
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  newNote.appendChild(noteText);
  buttonDiv.appendChild(editButton);
  buttonDiv.appendChild(deleteButton);
  newNote.appendChild(buttonDiv);
  parent.appendChild(newNote);
};

const cancelEdit = (node, str) => {
  node.value = str;
  node.setAttribute("readonly", "true");
  const wrapper = node.parentElement;
  wrapper.removeChild(wrapper.lastElementChild);
};

const saveEdit = (node) => {
  node.setAttribute("readonly", true);
  const wrapper = node.parentElement;
  wrapper.removeChild(wrapper.lastElementChild);
};

const editNote = (node, str) => {
  node.removeAttribute("readonly");
  const wrapper = node.parentElement;
  const buttonDiv = document.createElement("div");
  wrapper.appendChild(buttonDiv);

  //save button
  const saveButton = document.createElement("button");
  saveButton.className = "save-changes";
  saveButton.innerText = "Save Changes";
  saveButton.addEventListener("click", () => {
    saveEdit(node);
  });
  buttonDiv.appendChild(saveButton);

  // cancel button
  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-changes";
  cancelButton.addEventListener("click", () => {
    cancelEdit(node, str);
  });
  cancelButton.innerText = "Cancel Changes";
  buttonDiv.appendChild(cancelButton);
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

// Handler to select notes in the grid
document.getElementById("note-grid").addEventListener("click", (e) => {
  if (
    e.target.classList.contains("grid-item") &&
    e.target.tagName !== "BUTTON" &&
    e.target.tagName !== "TEXTAREA"
  ) {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
    } else {
      e.target.classList.add("selected");
    }
  }
});

// Click handler to edit or delete the clicked note
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-note")) {
    const editArea = e.target.parentElement.previousElementSibling;
    const originalNote = editArea.innerHTML;
    editNote(editArea, originalNote);
  }

  if (e.target.classList.contains("delete-note")) {
    const deleted = e.target.parentElement.parentElement;
    deleted.parentElement.removeChild(deleted);
  }
});

// Swap notes within the grid
const noteGrid = document.getElementById("note-grid");
noteGrid.addEventListener("click", (e) => {
  const swapList = noteGrid.querySelectorAll(".selected");

  // if the list is 2 long swap them and deselect
  if (swapList.length === 2) {
    const items = noteGrid.children;
    const newGrid = document.createDocumentFragment();
    const item1Idx = [].findIndex.call(items, (ele) => ele === swapList[0]);
    const item2Idx = [].findIndex.call(items, (ele) => ele === swapList[1]);

    for (let i = 0; i < items.length; i++) {
      if (i === item1Idx) {
        console.log("item 2: ", items[item2Idx]);
        newGrid.appendChild(items[item2Idx].cloneNode(true));
      } else if (i === item2Idx) {
        newGrid.appendChild(items[item1Idx].cloneNode(true));
      } else {
        newGrid.appendChild(items[i].cloneNode(true));
      }
    }
    noteGrid.innerHTML = null;
    noteGrid.appendChild(newGrid);
    const selectedList = noteGrid.querySelectorAll(".selected");
    for (let ele of selectedList) {
      ele.classList.remove("selected");
    }
  }
});
