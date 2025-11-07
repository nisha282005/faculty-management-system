
    function openModal(code, title) {
      document.getElementById("courseModal").style.display = "flex";
      document.getElementById("courseTitle").innerText = title;
      document.getElementById("courseCode").innerText = code;
    }

    function closeModal() {
      document.getElementById("courseModal").style.display = "none";
    }

    window.onclick = function(event) {
      let modal = document.getElementById("courseModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  fetch("header.html")
      .then(res => res.text())
      .then(data => document.getElementById("header").innerHTML = data);

    // Load footer
    fetch("footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer").innerHTML = data);