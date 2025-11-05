// ---------- index.html (Form Page) ----------
const studentForm = document.getElementById('studentForm');

if (studentForm) {
  studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const program = document.getElementById('program').value;
    const year = document.getElementById('year').value;
    const age = document.getElementById('age').value;
    const photo = document.getElementById('photo').files[0];

    const reader = new FileReader();
    reader.onload = function () {
      const photoURL = reader.result;

      const studentData = {
        name,
        program,
        year,
        age,
        photo: photoURL,
      };

      // Get existing students or create empty array
      const students = JSON.parse(localStorage.getItem('students')) || [];
      students.push(studentData);
      localStorage.setItem('students', JSON.stringify(students));

      alert('Student information saved!');
      window.location.href = 'student.html'; // Redirect automatically
    };

    if (photo) {
      reader.readAsDataURL(photo);
    }
  });
}

// ---------- student.html (List Page) ----------
const studentList = document.getElementById('studentList');
const searchInput = document.getElementById('search');

if (studentList) {
  function displayStudents(filter = '') {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    studentList.innerHTML = '';

    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(student => {
      const card = document.createElement('div');
      card.classList.add('student-card');
      card.innerHTML = `
        <img src="${student.photo}" alt="ID Picture">
        <h3>${student.name}</h3>
        <p><strong>Program:</strong> ${student.program}</p>
        <p><strong>Year:</strong> ${student.year}</p>
        <p><strong>Age:</strong> ${student.age}</p>
      `;
      studentList.appendChild(card);
    });

    if (filtered.length === 0) {
      studentList.innerHTML = '<p>No students found.</p>';
    }
  }

  displayStudents();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      displayStudents(e.target.value);
    });
  }
}
