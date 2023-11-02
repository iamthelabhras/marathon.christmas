const requestsObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    let formWidth = entry.contentRect.width;
    form.setAttribute("width", formWidth);
    console.log("Sized form.")
  })
});

const form = document.querySelector("iframe#requests__form");
const formContainer = document.querySelector("summary#requests__summary");

requestsObserver.observe(formContainer);