// Define variables.

// Configures countdown timer using machine's local time (e.g. EST).
// I use this to double-check that dates configured using local time & UTC return identical results.
// let marathonStart = new Date("Dec 24, 2022 17:00:00");
// let marathonEnd = new Date("Dec 25, 2022 18:00:00");
// let marathonRefresh = new Date("Dec 25 2022 18:15:00");

// Configures countdown timer using UTC.  
// This ensures that countdown is the same for _all_ site visitors, regardless of where they are in the world.
let marathonStart = new Date(Date.UTC(2022,11,24,22));
let marathonEnd = new Date(Date.UTC(2022,11,25,23));
let marathonRefresh = new Date(Date.UTC(2022,11,25,23,15));

let tableStart = document.getElementById("start_date");
let tableEnd = document.getElementById("end_date");

// Define functions.

function addOneYear(date) {
  date.setFullYear(date.getFullYear() + 1);
  return date;
}

// Configure WPRBXmas countdown timer to update every 1 seconds. 
let countdownTimer = setInterval(function () {
  let now = new Date().getTime();
  let marathonStartMilliseconds = marathonStart.getTime();
  let marathonEndMilliseconds = marathonEnd.getTime();
  let marathonRefreshMilliseconds = marathonRefresh.getTime();
  // Caulculate the time remaining now and when WPRBXmas starts. 
  let countdown = marathonStartMilliseconds - now;
  // Perform calculations for remaining days, hours, minutes & seconds.
  let goodbye = marathonEndMilliseconds - now; 
  let refresh = marathonRefreshMilliseconds - now;
  let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  let hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((countdown % (1000 * 60)) / 1000);
  // Insert remaining days, hours, minutes, & seconds into Countdown Astro component's #interval spans.
  if (countdown > 0 ) {
  document.getElementById("countdown_message").innerHTML = "Countdown to WPRBXmas!"
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  console.log("It's not WPRBXmas.  Updating timer!")
  }
  // If it's WPRBXmas, celebrate! 
  if (countdown <= 0 && goodbye > 0 ) {
    document.getElementById("countdown_message").innerHTML =
      "Rejoice, it's finally WPRBXmas!";
  // document.getElementById("days").innerHTML = 0;
  // document.getElementById("hours").innerHTML = 0;
  // document.getElementById("minutes").innerHTML = 0;
  // document.getElementById("seconds").innerHTML = 0;
  let countdown = marathonEndMilliseconds - now;
  let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  let hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((countdown % (1000 * 60)) / 1000);
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
 
      console.log("It's WPRBXmas!");
  }
  if ( goodbye <= 0 && refresh > 0){
    document.getElementById("countdown_message").innerHTML =
      "Alas, WPRBXmas has come to an end!";
   document.getElementById("days").innerHTML = 0;
   document.getElementById("hours").innerHTML = 0;
   document.getElementById("minutes").innerHTML = 0;
   document.getElementById("seconds").innerHTML = 0;
    console.log("WPRBXmas is over.");
  }
  if ( goodbye <= 0 && refresh <= 0) {
    marathonStart = addOneYear(marathonStart);
    marathonEnd = addOneYear(marathonEnd);
    marathonRefresh = addOneYear(marathonRefresh);
    tableStart.innerHTML = "12/24/23";
    tableEnd.innerHTML = "12/25/23"
    console.log(marathonStart);
    console.log(marathonEnd);
    console.log(marathonRefresh);
    console.log("It's been 15+ minutes since WPRBXmas ended.  Refreshing timer for next year!");
  }
}, 1000);