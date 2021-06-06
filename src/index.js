function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]} ${hours}:${minutes}`;
}

function showCurrentWeather(response) {
  // console.log(response.data);
  let dateAndTime = document.querySelector("h5");
  dateAndTime.innerHTML = formatDate(response.data.dt * 1000);
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;

  let iconCode = response.data.weather[0].icon;
  let currentDescription = response.data.weather[0].description;
  let currentTemperature = Math.round(response.data.main.temp);
  let maxToday = Math.round(response.data.main.temp_max);
  let minToday = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let feelingTemp = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);

  if (response.data.rain === undefined) {
    precipitationElement.innerHTML = "";
  } else {
    precipitationElement.innerHTML = `Precipitation: ${response.data.rain["1h"]}mm`;
  }

  let bodyElement = document.querySelector("body");
  if (iconCode[2] === "d") {
    bodyElement.classList.add("day");
    bodyElement.classList.remove("night");
  } else {
    bodyElement.classList.add("night");
    bodyElement.classList.remove("day");
  }

  currentEmojiElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  currentDescriptionElement.innerHTML = currentDescription;
  currentTemperatureElement.innerHTML = currentTemperature;
  maxTodayElement.innerHTML = maxToday;
  minTodayElement.innerHTML = minToday;
  humidityElement.innerHTML = humidity;
  feelingTempElement.innerHTML = feelingTemp;
  windSpeedElement.innerHTML = windSpeed;
}

function showIndexWeather() {
  let city = "Brussels";
  let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function showCityWeather(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#type_city");
  let city = searchInput.value;
  let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
  searchInput.value = "";
}

function determinePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function updateCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determinePosition);
}

let currentEmojiElement = document.querySelector(".current-emoji img");
let currentDescriptionElement = document.querySelector(
  ".current-state .description"
);
let currentTemperatureElement = document.querySelector(".current-temperature");
let maxTodayElement = document.querySelector("#max_today");
let minTodayElement = document.querySelector("#min_today");
let humidityElement = document.querySelector("#humidity");
let feelingTempElement = document.querySelector("#feeling_temp");
let windSpeedElement = document.querySelector("#wind_speed");
let precipitationElement = document.querySelector("#precipitation");
let maxTomorrowElement = document.querySelector("#max_tomorrow");
let minTomorrowElement = document.querySelector("#min_tomorrow");
let maxInTwoDaysElement = document.querySelector("#max_in_two_days");
let minInTwoDaysElement = document.querySelector("#min_in_two_days");
let maxInThreeDaysElement = document.querySelector("#max_in_three_days");
let minInThreeDaysElement = document.querySelector("#min_in_three_days");
let maxInFourDaysElement = document.querySelector("#max_in_four_days");
let minInFourDaysElement = document.querySelector("#min_in_four_days");
let maxInFiveDaysElement = document.querySelector("#max_in_five_days");
let minInFiveDaysElement = document.querySelector("#min_in_five_days");
let maxInSixDaysElement = document.querySelector("#max_in_six_days");
let minInSixDaysElement = document.querySelector("#min_in_six_days");

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", showCityWeather);

let currentLocationForm = document.querySelector("#current_location_form");
currentLocationForm.addEventListener("submit", updateCurrentLocation);

showIndexWeather();

//bonus feature: fake fahrenheit

// function convertCelsius(event) {
//   event.preventDefault();
// }
// let celsiusLink = document.querySelector(".celsius");
// celsiusLink.addEventListener("click", convertCelsius);

// function convertFahrenheit(event) {
//   event.preventDefault();
// }
// let fahrenheitLink = document.querySelector(".fahrenheit");
// fahrenheitLink.addEventListener("click", convertFahrenheit);
