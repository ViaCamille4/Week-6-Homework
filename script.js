function citySearch(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input").value;
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  document.querySelector("#city-name").innerHTML = `${city.value}`;

  axios.get(apiUrl).then(showSearch);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

function showSearch(response) {
    document.querySelector("#city-name").innerHTML = response.data.name;
    document.querySelector("#present-temp").innerHTML = `${Math.round(response.data.main.temp)}°`;
    document.querySelector("#humidity").innerHTML = `${response.data.main.humidity} %`;
    document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} m/h`;
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let apiKey = "91a6c6c7bba3340ed4c344d1e0ad5434";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
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
