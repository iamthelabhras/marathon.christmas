const timelineObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    let cardWidth = Math.floor(entry.contentRect.width);
    console.log(cardWidth)
    console.log("Sized feeds.")
    solomonTimeline.dataset.width = cardWidth;
    console.log(solomonTimeline.dataset.width);
    solomonTimeline.setAttribute("width", cardWidth);
    console.log(solomonTimeline.getAttribute("width"));
    solobotTimeline.dataset.width = cardWidth;
    solobotTimeline.setAttribute("width", cardWidth);
    twitterIframe.setAttribute("width", cardValue);
    console.log(twitterIframe.getAttribute("width"));
    twitterIframe.style.width = cardWidth; 
    solomonDiv.setAttribute ("width", cardWidth);
    console.log(solomonDiv.getAttribute("width"));
  })
});

const solotweetsCard = document.querySelector("section#solomon");
console.log(solotweetsCard);
const solomonTimeline = document.querySelector("#solotweets__solomon_timeline");
console.log(solomonTimeline)
const solobotTimeline = document.querySelector("#solotweets__solobot_timeline");
const solomonDiv = document.querySelector(".solotweets__solomon.timeline");
console.log(solobotTimeline);
const twitterIframe = document.querySelector("iframe#twitter-widget-0");

timelineObserver.observe(solotweetsCard);