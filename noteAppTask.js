let noteInput = document.querySelector("#noteInput");
let addBtn = document.querySelector("#addBtn");
let listContainer = document.querySelector("#noteList");

let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
    listContainer.innerHTML = "";

    savedNotes.forEach((note, index) => {
        let li = document.createElement("li");
        li.textContent = note;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            deleteNote(index);
        });

        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}

function addNote() {
    try {
        let noteText = noteInput.value.trim();

        if (noteText === "") {
            throw Error(alert("Note cannot be empty"));
        }

        savedNotes.push(noteText);

        localStorage.setItem(
            "notes",
            JSON.stringify(savedNotes)
        );

        noteInput.value = "";
        displayNotes();

    } catch (error) {
        console.log(error.message);
    }
}

function deleteNote(index) {
    savedNotes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
    displayNotes();
}

addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addNote();
    }
});

displayNotes(); 