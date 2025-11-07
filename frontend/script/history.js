// Dummy staff list (should match attendance.js)
const staff = [
  { id: 1, name: "Dr. Priya Sharma" },
  { id: 2, name: "Prof. Ramesh Kumar" },
  { id: 3, name: "Dr. Anjali Menon" },
  { id: 4, name: "Mr. Karthik Nair" },
  { id: 5, name: "Mrs. Sneha Kapoor" }
];

// Load attendance history from localStorage
function loadHistory(id) {
  return JSON.parse(localStorage.getItem("attendance_" + id)) || [];
}

// Combine all histories into one list
function getAllHistory() {
  let all = [];
  staff.forEach(member => {
    const records = loadHistory(member.id);
    records.forEach(r => {
      all.push({
        staff_id: member.id,
        name: member.name,
        date: r.date,
        status: r.present ? "Present" : "Absent"
      });
    });
  });
  return all;
}

// Render Table
function renderTable(data) {
  const tbody = document.getElementById("historyTableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No records found</td></tr>`;
    return;
  }

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.staff_id}</td>
      <td>${row.name}</td>
      <td>${row.date}</td>
      <td>${row.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Filters
function applyFilters() {
  const id = document.getElementById("filterId").value.toLowerCase();
  const name = document.getElementById("filterName").value.toLowerCase();
  const date = document.getElementById("filterDate").value;

  const filtered = window.fullHistory.filter(r => {
    return (
      (id === "" || r.staff_id.toString().includes(id)) &&
      (name === "" || r.name.toLowerCase().includes(name)) &&
      (date === "" || r.date === date)
    );
  });

  renderTable(filtered);
}

function resetFilters() {
  document.getElementById("filterId").value = "";
  document.getElementById("filterName").value = "";
  document.getElementById("filterDate").value = "";
  renderTable(window.fullHistory);
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const staffId = params.get("staffId");

  let data = getAllHistory();
  window.fullHistory = data; // keep original data for filtering

  // If redirected with specific staffId → filter only that staff
  if (staffId) {
    data = data.filter(r => r.staff_id.toString() === staffId);
  }

  renderTable(data);
});
function goHome() {
  window.location.href = "../html/index.html"; // Redirect to your home page
}