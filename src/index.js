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

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

function showCurrentWeather(response) {
  let dateAndTime = document.querySelector("h5");
  dateAndTime.innerHTML = formatDate(response.data.dt * 1000);
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;

  getForecast(response.data.coord);

  celsiusTemperature = response.data.main.temp;
  celsiusFeelingTemperature = response.data.main.feels_like;
  celsiusMaxTemperature = response.data.main.temp_max;
  celsiusMinTemperature = response.data.main.temp_min;

  let iconCode = response.data.weather[0].icon;
  let currentDescription = response.data.weather[0].description;
  let currentTemperature = Math.round(celsiusTemperature);
  let maxToday = Math.round(celsiusMaxTemperature);
  let minToday = Math.round(celsiusMinTemperature);
  let humidity = response.data.main.humidity;
  let feelingTemp = Math.round(celsiusFeelingTemperature);
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let bodyElement = document.querySelector("body");

  if (response.data.rain === undefined) {
    precipitationElement.innerHTML = "";
  } else {
    precipitationElement.innerHTML = `Precipitation: ${response.data.rain["1h"]} mm`;
  }

  if (iconCode[2] === "d") {
    bodyElement.classList.add("day");
    bodyElement.classList.remove("night");
  } else {
    bodyElement.classList.add("night");
    bodyElement.classList.remove("day");
  }

  currentIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  currentDescriptionElement.innerHTML = currentDescription;
  currentTemperatureElement.innerHTML = currentTemperature;
  maxTodayElement.innerHTML = maxToday;
  minTodayElement.innerHTML = minToday;
  humidityElement.innerHTML = humidity;
  feelingTempElement.innerHTML = feelingTemp;
  windSpeedElement.innerHTML = windSpeed;
}

function getForecast(coordinates) {
  let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let tomorrowIconElement = document.querySelector(".tomorrow-icon");
  let tomorrowMaxElement = document.querySelector(".tomorrow-max");
  let tomorrowMinElement = document.querySelector(".tomorrow-min");

  tomorrowIconElement.src = `http://openweathermap.org/img/wn/${forecast[1].weather[0].icon}@2x.png`;
  tomorrowMaxElement.innerHTML = `${Math.round(forecast[1].temp.max)}°`;
  tomorrowMinElement.innerHTML = `${Math.round(forecast[1].temp.min)}°`;

  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 1 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                <div class="forecast-date"><h4>${formatDay(
                  forecastDay.dt * 1000
                )}</h4></div>
                <div class="forecast-icon-max">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="in-${index}-days-weather-icon"
                    class="forecast-icon"
                    width="90"
                  />
                  <span class="forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                </div>
                <div class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°</div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
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

  axios
    .get(apiUrl)
    .then(showCurrentWeather)
    .catch(function (error) {
      alert(
        "Please, try typing it correctly or use another place in the area 📍 👍"
      );
    });

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

function fahrenheitConversion(temperature) {
  return (temperature * 9) / 5 + 32;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let fahrenheitTemperature = fahrenheitConversion(celsiusTemperature);
  let fahrenheitFeelingTemperature = fahrenheitConversion(
    celsiusFeelingTemperature
  );
  let fahrenheitMaxTemperature = fahrenheitConversion(celsiusMaxTemperature);
  let fahrenheitMinTemperature = fahrenheitConversion(celsiusMinTemperature);

  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  feelingTempElement.innerHTML = Math.round(fahrenheitFeelingTemperature);
  maxTodayElement.innerHTML = Math.round(fahrenheitMaxTemperature);
  minTodayElement.innerHTML = Math.round(fahrenheitMinTemperature);

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelingTempElement.innerHTML = Math.round(celsiusFeelingTemperature);
  maxTodayElement.innerHTML = Math.round(celsiusMaxTemperature);
  minTodayElement.innerHTML = Math.round(celsiusMinTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let currentIconElement = document.querySelector(".current-icon img");
let currentDescriptionElement = document.querySelector(".description");
let currentTemperatureElement = document.querySelector(".current-temperature");
let maxTodayElement = document.querySelector("#max_today");
let minTodayElement = document.querySelector("#min_today");
let humidityElement = document.querySelector("#humidity");
let feelingTempElement = document.querySelector("#feeling_temp");
let windSpeedElement = document.querySelector("#wind_speed");
let precipitationElement = document.querySelector("#precipitation");

let celsiusTemperature = null;
let celsiusFeelingTemperature = null;
let celsiusMaxTemperature = null;
let celsiusMinTemperature = null;

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", showCityWeather);

let currentLocationForm = document.querySelector("#current_location_form");
currentLocationForm.addEventListener("submit", updateCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit_link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius_link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

showIndexWeather();
