// Dummy Staff Data
const staff = [
  { id: 1, name: "Mr. Kumar" },
  { id: 2, name: "Ms. Priya" },
  { id: 3, name: "Dr. Anitha" }
];

// Timetable storage (staff-wise)
let timetables = {};

// Populate staff dropdown
window.onload = function () {
  const dropdown = document.getElementById("staffDropdown");
  staff.forEach(member => {
    let option = document.createElement("option");
    option.value = member.id;
    option.textContent = member.name;
    dropdown.appendChild(option);
  });
};

// Load timetable for selected staff
function loadTimetable() {
  const staffId = document.getElementById("staffDropdown").value;
  if (!staffId) return;

  if (!timetables[staffId]) {
    // Create empty timetable (5 days, 6 periods each)
    timetables[staffId] = Array(5).fill().map(() => Array(6).fill(""));
  }

  renderTimetable(staffId);
}

// Render timetable in table
function renderTimetable(staffId) {
  const tbody = document.getElementById("timetable-body");
  tbody.innerHTML = "";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  timetables[staffId].forEach((row, rowIndex) => {
    let tr = document.createElement("tr");
    let dayCell = document.createElement("td");
    dayCell.textContent = days[rowIndex];
    tr.appendChild(dayCell);

    row.forEach((subject, colIndex) => {
      let td = document.createElement("td");
      td.textContent = subject || "-";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

// Assign class to timetable
function assignClass() {
  const staffId = document.getElementById("staffDropdown").value;
  const day = document.getElementById("day").selectedIndex;
  const hour = document.getElementById("hour").value;
  const subject = document.getElementById("subject").value;

  if (!staffId || subject.trim() === "") {
    alert("Select a staff and enter subject!");
    return;
  }

  timetables[staffId][day][hour] = subject;
  renderTimetable(staffId);

  document.getElementById("subject").value = "";
}
