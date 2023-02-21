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

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");
    let forcastHTML = `<div class = "row">`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
    days.forEach(function (day) {
        forcastHTML = forcastHTML + 
        `
        <div class="col-2">
        <div class="forecast-date">
          ${day}</div>
          <img src="images/2682849_cloud_cloudy_day_forecast_sun_icon.png" 
          alt="clear-sky-day" width="70">
        
          
          <div class="forecast-temperature">
            <span class="max-temperature">
              23°
            </span>
            <span class="min-temperature">
              15°
            </span>
          </div>
        </div>
        `;
    });

    forcastHTML = forcastHTML + `</div>`;
    forecastElement.innerHTML = forcastHTML;

}

function dispayTemperature(response){
 let temperatureElement = document.querySelector("#temperature");
 celsiusTemperature = response.data.temperature.current;
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
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
}



function displayFahrenheitTemperature(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event){
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}




function search(city){
    let apiKey = "ce39c90db330162oat1e9c16aa4594f9";
    
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(dispayTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    console.log(cityInputElement.value);
    search(cityInputElement.value);
}


let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit )



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("London");
displayForecast();