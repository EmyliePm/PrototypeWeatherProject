function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let weatherAppCityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  weatherAppCityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "94fea4075b9658cte3d8o7c065a17914";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "94fea4075b9658cte3d8o7c065a17914";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = ``;
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
  <div class="weather-forecast-day"> 
     <div  class="weather-forecast-date">Tues</div>
     <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
         <div class="weather-forecast-temperatures"> 
       <div class="weather-forecast-temperature-max">
            <strong>${Math.round(day.temperature.maximum)}º</strong></div>
             <div class="weather-forecast-temperature-min">${Math.round(
               day.temperature.minimum
             )}  </div>
             </div>
      </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast-container");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Leeds");
