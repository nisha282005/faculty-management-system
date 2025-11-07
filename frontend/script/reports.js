// Sample Attendance Data
const staffReports = [
  { name: "John Smith", totalDays: 30, present: 28, absent: 2 },
  { name: "Mary Johnson", totalDays: 30, present: 27, absent: 3 },
  { name: "David Lee", totalDays: 30, present: 26, absent: 4 }
];

// Function to load reports
function loadReports() {
  const tbody = document.getElementById("reportBody");
  tbody.innerHTML = "";

  staffReports.forEach(staff => {
    const attendancePercent = ((staff.present / staff.totalDays) * 100).toFixed(1);
    const row = `
      <tr>
        <td>${staff.name}</td>
        <td>${staff.totalDays}</td>
        <td>${staff.present}</td>
        <td>${staff.absent}</td>
        <td>${attendancePercent}%</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  updateSummary();
}

// Update summary cards
function updateSummary() {
  document.getElementById("totalStaff").innerText = staffReports.length;

  const totalAttendance = staffReports.reduce((sum, s) => sum + s.present, 0);
  const totalDays = staffReports.reduce((sum, s) => sum + s.totalDays, 0);
  const avgAttendance = ((totalAttendance / totalDays) * 100).toFixed(1);

  document.getElementById("avgAttendance").innerText = avgAttendance + "%";

  const totalAbsentees = staffReports.reduce((sum, s) => sum + s.absent, 0);
  document.getElementById("totalAbsentees").innerText = totalAbsentees;
}

// Filter reports (basic demo)
function filterReports() {
  const staffSelect = document.getElementById("staffSelect").value;
  const tbody = document.getElementById("reportBody");
  tbody.innerHTML = "";

  staffReports.forEach(staff => {
    if (staffSelect === "all" || staff.name.toLowerCase().includes(staffSelect)) {
      const attendancePercent = ((staff.present / staff.totalDays) * 100).toFixed(1);
      const row = `
        <tr>
          <td>${staff.name}</td>
          <td>${staff.totalDays}</td>
          <td>${staff.present}</td>
          <td>${staff.absent}</td>
          <td>${attendancePercent}%</td>
        </tr>
      `;
      tbody.innerHTML += row;
    }
  });
}

// Initialize
window.onload = loadReports;
