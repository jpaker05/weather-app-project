function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let cityName = `${searchInput.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getTemperature);
}

function getTemperature(response) {
  let locationTemperature = document.querySelector("#temp");
  locationTemperature.innerHTML = `${response.data.main.temp}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showCurrentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getCurrentTemperature);
}

function navigatorOn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let now = new Date();
let h3 = document.querySelector("h3");

let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day}, ${month} ${date}, ${year} 
<br/> ${hours}: ${minutes}`;

function convert(event) {
  event.preventDefault();
  let link = document.querySelector("#celcius");
  link.innerHTML = 17;
}

let convertLink = document.querySelector("#celcius");
convertLink.addEventListener("click", convert);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", navigatorOn);

function getCurrentTemperature(response) {
  let temperatureOutput = document.querySelector("#temp");
  temperatureOutput.innerHTML = `${response.data.main.temp}`;
  let location = document.querySelector("h4 .temps-links .temp");
  location.innerHTML = `${response.data.name}`;
}
