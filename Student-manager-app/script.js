
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");
const sortAgeBtn = document.getElementById("sortAge");
const sortScoreBtn = document.getElementById("sortScore");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");

let students = [];
let editIndex = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const batch = document.getElementById("batch").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const score = parseInt(document.getElementById("score").value);

  if (!name || !batch || isNaN(age) || isNaN(score) || score < 0 || score > 100) {
    alert("Please enter valid details.");
    return;
  }

  const student = { name, batch, age, score };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  form.reset();
  renderTable(students);
});

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((student, index) => {
    const row = document.createElement("tr");
    if (student.score > 80) row.classList.add("highlight");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.batch}</td>
      <td>${student.age}</td>
      <td>${student.score}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updateSummary();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("batch").value = student.batch;
  document.getElementById("age").value = student.age;
  document.getElementById("score").value = student.score;
  editIndex = index;
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable(students);
}

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm)
  );
  renderTable(filtered);
});

sortAgeBtn.addEventListener("click", function () {
  students.sort((a, b) => a.age - b.age);
  renderTable(students);
});

sortScoreBtn.addEventListener("click", function () {
  students.sort((a, b) => b.score - a.score);
  renderTable(students);
});

function updateSummary() {
  totalStudents.textContent = `Total Students: ${students.length}`;
  const totalScore = students.reduce((sum, student) => sum + student.score, 0);
  const avg = students.length ? (totalScore / students.length).toFixed(2) : 0;
  averageScore.textContent = `Average Score: ${avg}`;
}
