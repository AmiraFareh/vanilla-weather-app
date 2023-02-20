function dispayTemperature(response){
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(response.data.temperature.current);
 let cityElement = document.querySelector("#city");
 cityElement.innerHTML =response.data.city;
 let descriptionElement = document.querySelector("#description");
 let description = response.data.condition.description;
 descriptionElement.innerHTML = description;
 let humidity = document.querySelector("#humidity");
 humidity.innerHTML = response.data.temperature.humidity;
 let windElement = document.querySelector("#wind");
 windElement.innerHTML = Math.round(response.data.wind.speed);
 


 
}

let apiKey = "ce39c90db330162oat1e9c16aa4594f9";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Auckland&key=${apiKey}`
console.log(apiUrl);

axios.get(apiUrl).then(dispayTemperature);