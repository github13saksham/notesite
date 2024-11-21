const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to display notes from localStorage
function showNotes() {
	const savedNotes = localStorage.getItem("notes");
	if (savedNotes) {
		notesContainer.innerHTML = savedNotes;
	}
}

showNotes();

// Function to update notes in localStorage
function updateStorage() {
	localStorage.setItem("notes", notesContainer.innerHTML);
}

// Add a new note
createBtn.addEventListener("click", () => {
	const inputBox = document.createElement("p");
	const img = document.createElement("img");

	inputBox.className = "input-box";
	inputBox.setAttribute("contenteditable", "true");
	img.src = "images/delete.png";

	// Append the new note and delete button
	notesContainer.appendChild(inputBox).appendChild(img);
	updateStorage();
});

// Event delegation for clicks inside the notes container
notesContainer.addEventListener("click", function (e) {
	if (e.target.tagName === "IMG") {
		// Delete note
		e.target.parentElement.remove();
		updateStorage();
	}
});

// Event delegation for keyup events inside editable notes
notesContainer.addEventListener("keyup", function (e) {
	if (e.target.classList.contains("input-box")) {
		updateStorage();
	}
});

// Handle Enter key to prevent default behavior (new <p>)
document.addEventListener("keydown", (event) => {
	if (
		event.key === "Enter" &&
		document.activeElement.classList.contains("input-box")
	) {
		event.preventDefault();
		// Insert a line break using plain text instead
		document.execCommand("insertHTML", false, "<br><br>");
	}
});
