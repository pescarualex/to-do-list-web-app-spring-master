window.onload = function () {
  let url = window.location.href;
  let hashIndex = url.indexOf("#");
  if (hashIndex !== -1) {
    let tabId = url.substring(hashIndex + 1);
    let tabElement = document.getElementById(tabId);
    if (tabElement) {
      // Sterge clasa "active" de la toate tab-urile
      let links = document.querySelectorAll(".nav-link");
      links.forEach(function (link) {
        link.classList.remove("active");
      });

      // Adaugă clasa "active" tab-ului corespunzător
      tabElement.classList.add("active");
    }
  }
};

function addClassActive(link) {
  // sterge clasa "active" de pe toate link-urile din lista
  let links = document.querySelectorAll(".nav-link");
  links.forEach(function (link) {
    link.classList.remove("active");
  });

  // adauga clasa "active" la link-ul selectat
  link.classList.add("active");

  // salveaza ID-ul link-ului activ in localStorage
  localStorage.setItem("activeLink", link.id);
  console.log("added 'active' to " + link);
}

// verifica daca exista un link activ in localStorage si adauga clasa "active" la acel link
if (localStorage.getItem("activeLink")) {
  let activeLink = document.querySelector(
    "#" + localStorage.getItem("activeLink"),
  );
  activeLink.classList.add("active");
}

document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("class")) {
    document.querySelectorAll(".class").forEach(function (button) {
      button.removeAttribute("class");
      // button.removeAttribute("class");
    });
    console.log(
      event.target.parentElement.querySelector("#pagination-marks a"),
    );
    event.target.setAttribute("class", "selected");
    console.log("work");
    console.log(event.target);
  }
});
