const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");

let students = JSON.parse(localStorage.getItem("students")) || [];

function displayStudents(filter = "") {
  studentList.innerHTML = "";

  const programs = ["BS Information Technology", "BS Computer Science", "BS Computer Engineering"];
  programs.forEach(program => {
    const group = students.filter(s => s.program === program && s.name.toLowerCase().includes(filter.toLowerCase()));
    if (group.length > 0) {
      const section = document.createElement("div");
      section.classList.add("program-group");
      section.innerHTML = `<h2>${program}</h2>`;

      group.forEach(s => {
        const card = document.createElement("div");
        card.classList.add("student-card");
        card.innerHTML = `
          <img src="${s.photoData}" alt="${s.name}'s photo">
          <p><strong>Name:</strong> ${s.name}</p>
          <p><strong>Year:</strong> ${s.year}</p>
          <p><strong>Age:</strong> ${s.age}</p>
          <p><strong>Date:</strong> ${s.date}</p>
        `;
        section.appendChild(card);
      });

      studentList.appendChild(section);
    }
  });
}

searchInput.addEventListener("input", (e) => displayStudents(e.target.value));
displayStudents();
