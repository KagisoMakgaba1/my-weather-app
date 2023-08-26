let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = document.querySelector(".current-day-time");
time.innerHTML = `${day} ${hours}:${minutes}`;

// Search button

function enterCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#cityInput");
  let city = document.querySelector(".current-city");

  city.innerHTML = `${cityInput.value}`;

  let apiKey = "f606a147394d27601839ffd5343624ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
}
let form = document.querySelector("#cityForm");
form.addEventListener("submit", enterCity);

function currentTemperature(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector(".temp");
  tempElement.innerHTML = `${temperature}`;
}

// Bonus

let button = document.querySelector(".currentLocationBtn");
button.addEventListener("click", currentLocation);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let apiKey = "f606a147394d27601839ffd5343624ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temp");

  currentTemp.innerHTML = temp;

  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.name;
}
