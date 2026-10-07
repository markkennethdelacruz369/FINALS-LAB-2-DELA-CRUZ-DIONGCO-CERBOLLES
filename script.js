// CLASS RECORD MANAGER - CCS114 Finals Laboratory 2

// 1. Array of 5 students (array literal)
const students = ["Ana Reyes", "Ben Santos", "Carla Lopez", "Daniel Cruz", "Elaine Garcia"];

// Get the HTML elements by id
const list = document.getElementById("list");
const lengthEl = document.getElementById("length");

// Show a message in a <p class="msg"> (green = success, red = error)
function showMessage(id, text, isError) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = "msg " + (isError ? "error" : "success");
}

// Show the list and its length on the page
function renderList() {
  list.innerHTML = "";
  for (let i = 0; i < students.length; i++) {
    list.innerHTML += `<li class="badge"><i>${i}</i>${students[i]}</li>`;
  }
  lengthEl.textContent = students.length;   // length
}

// 2. Add: takes a name, adds it with push()
function addStudent(name) {
  if (name.trim() === "") return false;     // empty input is not allowed
  students.push(name.trim());               // push()
  return true;
}

// 3. Remove last: removes and returns the last name with pop()
function removeLastStudent() {
  return students.pop();                    // pop()
}

// 4. Find: takes an index, returns the name with at()
function findStudent(index) {
  return students.at(index);                // at()
}

// 5. Join: takes a separator, returns all names as one string
function joinStudents(separator) {
  return students.join(separator);          // join()
}

// 6. Convert: returns all names as a comma-separated string
function convertToString() {
  return students.toString();               // toString()
}

// ---- Buttons ----

// Add button
document.getElementById("add-btn").addEventListener("click", function () {
  const input = document.getElementById("add-in");
  if (addStudent(input.value)) {
    showMessage("add-msg", "Student added!", false);
    input.value = "";
    renderList();
  } else {
    showMessage("add-msg", "Please type a name first.", true);
  }
});

// Remove last button
document.getElementById("pop-btn").addEventListener("click", function () {
  const removed = removeLastStudent();
  if (removed === undefined) {
    showMessage("pop-msg", "The list is already empty.", true);
  } else {
    showMessage("pop-msg", removed + " was removed.", false);
    renderList();
  }
});

// Find button
document.getElementById("find-btn").addEventListener("click", function () {
  const text = document.getElementById("find-in").value.trim();

  // Validation: must be a whole number
  if (text === "" || isNaN(text) || !Number.isInteger(Number(text))) {
    showMessage("find-msg", "Invalid index. Enter a whole number.", true);
    return;
  }

  const found = findStudent(Number(text));
  if (found === undefined) {
    showMessage("find-msg", "Index out of range.", true);   // no item at that index
  } else {
    showMessage("find-msg", "Index " + text + ": " + found, false);
  }
});

// Join button
document.getElementById("join-btn").addEventListener("click", function () {
  const separator = document.getElementById("join-in").value;
  document.getElementById("join-out").textContent = joinStudents(separator);
  showMessage("join-msg", "Joined using join().", false);
});

// Convert button
document.getElementById("str-btn").addEventListener("click", function () {
  document.getElementById("str-out").textContent = convertToString();
  showMessage("str-msg", "Converted using toString().", false);
});

// Show the list when the page loads
renderList();