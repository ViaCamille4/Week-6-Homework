function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
}
const minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

const weekDay = days[date.getDay()];
const currentMonth = months[date.getMonth()];
const currentDay = date.getDate();
return `${weekDay}, ${currentMonth} ${currentDay} - ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");


   let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${
            Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${
            Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
          }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}



function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}



function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} k/h`;;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);
}

  
let geoButton = document.querySelector("#geolocation-button");
geoButton.addEventListener("click", retrievePosition);


searchCity("Denver");

