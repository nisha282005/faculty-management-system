// Dummy staff list
const staff = [
  { id: 1, name: "Dr. Priya Sharma" },
  { id: 2, name: "Prof. Ramesh Kumar" },
  { id: 3, name: "Dr. Anjali Menon" },
  { id: 4, name: "Mr. Karthik Nair" },
  { id: 5, name: "Mrs. Sneha Kapoor" },
  { id: 6, name: "Mrs. Kavita Singh" },
];

const staffList = document.getElementById("staffList");

// Load stored attendance from localStorage
function loadHistory(id) {
  return JSON.parse(localStorage.getItem("attendance_" + id)) || [];
}

// Save history
function saveHistory(id, record) {
  let history = loadHistory(id);
  history.push(record);
  localStorage.setItem("attendance_" + id, JSON.stringify(history));
}
// Render staff checkboxes only
staff.forEach(member => {
  const card = document.createElement("div");
  card.classList.add("staff-card");
  card.innerHTML = `
    <span>${member.name}</span>
    <div>
      <input type="checkbox" id="staff-${member.id}" checked>
    </div>
  `;
  staffList.appendChild(card);
});


// Mark all
function markAll(present) {
  staff.forEach(member => {
    document.getElementById(`staff-${member.id}`).checked = present;
  });
}

// Submit Attendance
function submitAttendance() {
  const date = document.getElementById("date").value;
  if (!date) {
    alert("Please select a date!");
    return;
  }

  staff.forEach(member => {
    const isPresent = document.getElementById(`staff-${member.id}`).checked;
    const record = { date, present: isPresent };
    saveHistory(member.id, record);
  });

  alert("Attendance recorded successfully for " + date);
}

function viewHistory() {
  // Redirect to history page
  window.location.href = "../html/history.html"; // Replace with your actual history page path
}
function goHome() {
  window.location.href = "../html/index.html"; // Redirect to your home page
}