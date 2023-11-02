function addClassActive(link) {
    // sterge clasa "active" de pe toate link-urile din lista
    let links = document.querySelectorAll('.nav-link');
    links.forEach(function(link) {
      link.classList.remove('active');
    });
  
    // adauga clasa "active" la link-ul selectat
    link.classList.add('active');
  
    // salveaza ID-ul link-ului activ in localStorage
    localStorage.setItem('activeLink', link.id);
  }
  
  // verifica daca exista un link activ in localStorage si adauga clasa "active" la acel link
  if(localStorage.getItem('activeLink')) {
    let activeLink = document.querySelector('#' + localStorage.getItem('activeLink'));
    activeLink.classList.add('active');
  }



  function addClassSelected(id) {


    console.log("clicked", id);
  };






  










