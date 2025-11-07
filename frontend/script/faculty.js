// script/faculty.js
const API = "/fms/backend/faculty.php";
let editingId = null;

document.addEventListener("DOMContentLoaded", loadFaculty);

function log(...args) { console.log("[faculty.js]", ...args); }

function openForm() {
    document.getElementById("facultyForm").style.display = "flex";
    editingId = null;
    document.querySelector("#facultyForm h3").innerText = "Add Faculty";
    document.getElementById("facultyId").value = "";
    document.getElementById("facultyName").value = "";
    document.getElementById("facultyDept").value = "";
    document.getElementById("facultyEmail").value = "";
    let p = document.getElementById("facultyPhone"); if (p) p.value = "";
}

function closeForm() {
    document.getElementById("facultyForm").style.display = "none";
}

function loadFaculty() {
    log("Loading faculty from", `${API}?action=fetch`);
    fetch(`${API}?action=fetch`)
        .then(res => {
            log("Fetch status", res.status, res.headers.get('content-type'));
            if (!res.ok) return res.text().then(t => { throw new Error("HTTP " + res.status + ": " + t); });
            return res.json();
        })
        .then(data => {
            if (!Array.isArray(data)) { console.error("Expected array, got:", data); return; }
            let tbody = document.querySelector("#facultyTable tbody");
            tbody.innerHTML = "";
            data.forEach(f => {
                let row = `
                <tr>
                    <td>${f.id}</td>
                    <td>${escapeHtml(f.name)}</td>
                    <td>${escapeHtml(f.department)}</td>
                    <td>${escapeHtml(f.email)}</td>
                    <td style="text-align:center;">
                        <button class="btn-sm" onclick="startEdit(${f.id}, ${JSON.stringify(f.faculty_id||'')}, ${JSON.stringify(f.name)}, ${JSON.stringify(f.department)}, ${JSON.stringify(f.email)}, ${JSON.stringify(f.phone||'')})">Edit</button>
                        <button class="btn-sm danger" onclick="confirmDelete(${f.id})">Delete</button>
                    </td>
                </tr>`;
                tbody.innerHTML += row;
            });
        })
        .catch(err => console.error("Error fetching faculty:", err));
}

function saveFaculty() {
    if (editingId) updateFaculty(editingId); else addFaculty();
}

function addFaculty() {
    let formData = collectFormData();
    formData.append("action", "add");
    log("Adding faculty...");
    fetch(API, { method: "POST", body: formData })
        .then(res => res.json())
        .then(resp => {
            if (resp.status === "success") {
                alert("Faculty Added!");
                closeForm();
                loadFaculty();
            } else {
                alert("Error: " + resp.message);
                console.error("Add response:", resp);
            }
        })
        .catch(err => console.error("Add error:", err));
}

function confirmDelete(id) {
    if (confirm("Delete this faculty?")) deleteFaculty(id);
}

function deleteFaculty(id) {
    let fd = new FormData();
    fd.append("id", id);
    fd.append("action", "delete");
    fetch(API, { method: "POST", body: fd })
        .then(res => res.json())
        .then(resp => {
            if (resp.status === "success") {
                alert("Faculty Deleted!");
                loadFaculty();
            } else {
                alert("Error: " + resp.message);
                console.error("Delete response:", resp);
            }
        })
        .catch(err => console.error("Delete error:", err));
}

function startEdit(id, faculty_id, name, department, email, phone) {
    editingId = id;
    document.querySelector("#facultyForm h3").innerText = "Edit Faculty";
    document.getElementById("facultyId").value = faculty_id || "";
    document.getElementById("facultyName").value = name || "";
    document.getElementById("facultyDept").value = department || "";
    document.getElementById("facultyEmail").value = email || "";
    let p = document.getElementById("facultyPhone"); if (p) p.value = phone || "";
    document.getElementById("facultyForm").style.display = "flex";
}

function updateFaculty(id) {
    let fd = collectFormData();
    fd.append("id", id);
    fd.append("action", "edit");
    fetch(API, { method: "POST", body: fd })
        .then(res => res.json())
        .then(resp => {
            if (resp.status === "success") {
                alert("Faculty Updated!");
                closeForm();
                loadFaculty();
            } else {
                alert("Error: " + resp.message);
                console.error("Update response:", resp);
            }
        })
        .catch(err => console.error("Update error:", err));
}

function collectFormData() {
    let fd = new FormData();
    fd.append("faculty_id", document.getElementById("facultyId").value.trim());
    fd.append("name", document.getElementById("facultyName").value.trim());
    fd.append("department", document.getElementById("facultyDept").value.trim());
    fd.append("email", document.getElementById("facultyEmail").value.trim());
    let p = document.getElementById("facultyPhone");
    if (p) fd.append("phone", p.value.trim());
    return fd;
}

// small helper to avoid HTML injection in table
function escapeHtml(s) { if (!s && s !== 0) return ""; return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }
