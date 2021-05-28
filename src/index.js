function updateTime(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = now.getDay();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]} ${hours}:${minutes}`;
}

let dateAndTime = document.querySelector("h5");
dateAndTime.innerHTML = updateTime(new Date());

//show current temperature

let currentEmojiElement = document.querySelector(".current-emoji img");
let currentDescriptionElement = document.querySelector(
  ".current-state .description"
);
let currentTemperatureElement = document.querySelector(".current-temperature");
let maxTodayElement = document.querySelector("#max_today");
let minTodayElement = document.querySelector("#min_today");
let humidityElement = document.querySelector("#humidity");
let feelingTempElement = document.querySelector("#feeling_temp");
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

function showCurrentWeather(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;

  let iconCode = response.data.weather[0].icon;
  let currentDescription = response.data.weather[0].description;
  let currentTemperature = Math.round(response.data.main.temp);
  let maxToday = Math.round(response.data.main.temp_max);
  let minToday = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let feelingTemp = Math.round(response.data.main.feels_like);

  currentEmojiElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  currentDescriptionElement.innerHTML = currentDescription;
  currentTemperatureElement.innerHTML = currentTemperature;
  maxTodayElement.innerHTML = maxToday;
  minTodayElement.innerHTML = minToday;
  humidityElement.innerHTML = humidity;
  feelingTempElement.innerHTML = feelingTemp;
}

function showIndexWeather() {
  let city = "Brussels";
  let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
}
showIndexWeather();

function showCityWeather(event) {
  event.preventDefault();
  dateAndTime.innerHTML = updateTime(new Date());

  let city = searchInput.value;
  let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCurrentWeather);
  searchInput.value = "";
}

let searchForm = document.querySelector("#search_form");
let searchInput = document.querySelector("#type_city");

searchForm.addEventListener("submit", showCityWeather);

//bonus point: show current location (and its weather)

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
  dateAndTime.innerHTML = updateTime(new Date());

  navigator.geolocation.getCurrentPosition(determinePosition);
}

let currentLocationForm = document.querySelector("#current_location_form");
currentLocationForm.addEventListener("submit", updateCurrentLocation);

//bonus feature: fake fahrenheit

// function convertCelsius(event) {
//   event.preventDefault();

//   maxTomorrowElement.innerHTML = "14";
//   minTomorrowElement.innerHTML = "4";
//   maxInTwoDaysElement.innerHTML = "14";
//   minInTwoDaysElement.innerHTML = "5";
//   maxInThreeDaysElement.innerHTML = "19";
//   minInThreeDaysElement.innerHTML = "5";
//   maxInFourDaysElement.innerHTML = "16";
//   minInFourDaysElement.innerHTML = "5";
//   maxInFiveDaysElement.innerHTML = "12";
//   minInFiveDaysElement.innerHTML = "2";
//   maxInSixDaysElement.innerHTML = "5";
//   minInSixDaysElement.innerHTML = "-1";
// }
// let celsiusLink = document.querySelector(".celsius");
// celsiusLink.addEventListener("click", convertCelsius);

// function convertFahrenheit(event) {
//   event.preventDefault();
//   //something about changing the units in the api-url to imperial
//   maxTomorrowElement.innerHTML = "57";
//   minTomorrowElement.innerHTML = "39";
//   maxInTwoDaysElement.innerHTML = "57";
//   minInTwoDaysElement.innerHTML = "41";
//   maxInThreeDaysElement.innerHTML = "66";
//   minInThreeDaysElement.innerHTML = "41";
//   maxInFourDaysElement.innerHTML = "61";
//   minInFourDaysElement.innerHTML = "41";
//   maxInFiveDaysElement.innerHTML = "54";
//   minInFiveDaysElement.innerHTML = "36";
//   maxInSixDaysElement.innerHTML = "41";
//   minInSixDaysElement.innerHTML = "30";
// }
// let fahrenheitLink = document.querySelector(".fahrenheit");
// fahrenheitLink.addEventListener("click", convertFahrenheit);
