function citySearch(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input").value;
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  document.querySelector("#city-name").innerHTML = `${city.value}`;

  axios.get(apiUrl).then(showSearch);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#present-temp");

  celsiusLink.classlist.remove("active");
  fahrenheitLink.classlist.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#present-temp");

  celsiusLink.classList.add("active");
  fahrenheitLink.classlist.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch); 

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function showSearch(response) {
     let temperatureElement = document.querySelector("#present-temp");
  let city = document.querySelector("#city-name");
  let weather-description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;
  weather-description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showSearch);
}

  
let geoButton = document.querySelector("#geolocation-button");
geoButton.addEventListener("click", retrievePosition);

let now = new Date();
let h2 = document.querySelector("h2");
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
let hours = now.getHours();
if(hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if(minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;
