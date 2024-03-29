function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day = days[date.getDay()];
return day
}

function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forcastHTML = `<div class = "row">`;
    forecast.forEach(function (forecastDay, index) {
      if(index < 6){
        forcastHTML = forcastHTML + 
        `
        <div class="col-2">
        <div class="forecast-date">
          ${formatDay(forecastDay.time)}</div>
          <img src=${forecastDay.condition.icon_url}
           class="img-fluid">
        
          
          <div class="forecast-temperature">
            <span class="max-temperature">
              ${Math.round(forecastDay.temperature.maximum)}°
            </span>
            <span class="min-temperature">
            ${Math.round(forecastDay.temperature.minimum)}°
            </span>
          </div>
        </div>
        `;
       } }
  );

    forcastHTML = forcastHTML + `</div>`;
    forecastElement.innerHTML = forcastHTML;

}

function getForecast(coordinates){
  let apiKey = "ce39c90db330162oat1e9c16aa4594f9";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response){
 let temperatureElement = document.querySelector("#temperature");
 temperature = response.data.temperature.current;
 temperatureElement.innerHTML = Math.round(temperature);
 let cityElement = document.querySelector("#city");
 cityElement.innerHTML =response.data.city;
 let descriptionElement = document.querySelector("#description");
 let description = response.data.condition.description;
 descriptionElement.innerHTML = description;
 let humidity = document.querySelector("#humidity");
 humidity.innerHTML = response.data.temperature.humidity;
 let windElement = document.querySelector("#wind");
 windElement.innerHTML = Math.round(response.data.wind.speed);
 let dateElement = document.querySelector("#date");
 dateElement.innerHTML = formatDate(response.data.time * 1000);
 let iconElement = document.querySelector("#icon");
 iconElement.setAttribute("src", response.data.condition.icon_url);
 iconElement.setAttribute("alt", description)
 getForecast(response.data.coordinates);
}

function search(city){
    let apiKey = "ce39c90db330162oat1e9c16aa4594f9";
    
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
    axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function storePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ce39c90db330162oat1e9c16aa4594f9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(storePosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit )

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);





search("London");
