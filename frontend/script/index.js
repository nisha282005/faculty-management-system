// Load header & footer
fetch("header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header").innerHTML = data);

fetch("footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

// Load dynamic homepage content
fetch("../backend/index.php")
  .then(res => res.json())
  .then(data => {
    // Banner
    if (data.banner && data.banner.image_url) {
      document.querySelector(".banner").style.backgroundImage = `url('${data.banner.image_url}')`;
    }

    // About section
    if (data.about) {
      document.querySelector(".about h2").textContent = data.about.title || "About Us";
      document.querySelector(".about p").textContent = data.about.content || "";
    }
  })
  .catch(err => console.error("Failed to load content", err));
