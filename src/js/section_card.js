// A NodeList of all detail elements on main page with a class of section-card__details.
const details = document.querySelectorAll('section.card:not(#countdown) details.section_card__details');
const breakpoint = 650;
const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
console.log(details);

function loadDetails() {
  let viewport = window.innerWidth;
  if (viewport > breakpoint)
  [...details].forEach(function(detail) {
    detail.open=true;
  })
  else {
    [...details].forEach(function(detail) {
      detail.open=false;
    })
  }
};

function setDetails(e) {
  if (e.matches) {
    console.log("Opening details...");
    [...details].forEach(function(detail){
      detail.open=false;
    });
  }
  else {
    console.log("Closing details...");
    [...details].forEach(function(detail){
      detail.open=true;
    });
  } 
}

window.addEventListener('load', loadDetails);
mql.addEventListener('change', setDetails);
