window.addEventListener("load", function () {
  console.log("LOADER.JS: Page load!  .");
  const loader = document.querySelector("#loader__loader");
  console.log("LOADER.JS: Attempting to hide loader...");
  loader.className += " loader__hide";
  console.log("LOADER.JS: Loader successfully hidden.");
});
