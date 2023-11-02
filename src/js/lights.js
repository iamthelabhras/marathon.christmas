const strand = document.querySelector("div#lights .strand");

let viewportLights;

function createLights(iterator) {
  console.log(`Creating ${iterator} lights...`);
 for (let i = iterator; i > 0; i--) {
  let light = document.createElement("li");
  strand.appendChild(light);
 }
}
function loadLights() {
  console.log("Loading lights...")
let viewport = window.innerWidth;
viewportLights = Math.floor(viewport / 60);
createLights(viewportLights);
}

function resizeLights(){
  console.log("Resizing lights...")
  let viewport = window.innerWidth;
  viewportLights = Math.floor(viewport / 60);
  strand.textContent = '';
  createLights(viewportLights);
}

window.addEventListener("load", loadLights);
window.addEventListener("resize", resizeLights);
