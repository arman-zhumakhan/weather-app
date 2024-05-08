const baseUrl = "http://api.weatherapi.com/v1";

async function getWeather(city) {
    console.log("Getting weather data for " + city);
    const key = "776d934fc4dd4c6e9fd13929240705";
    const response = await fetch(`${baseUrl}/current.json?key=${key}&q=${city}`);
    const data = await response.json();
    const processedData = processData(data);
    console.log(processedData);
    return processedData;
}

async function setWeather(city) {

    const weatherData = await getWeather(city);
    console.log(weatherData);
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const feelsLike = document.getElementById("feelsLike");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    temperature.textContent = String(weatherData.temp_c) + " °C";
    cityName.textContent = weatherData.city + ", " + weatherData.country;
    feelsLike.textContent = String(weatherData.feelsLike) + " °C";
    humidity.textContent = String(weatherData.humidity) + " %";
    wind.textContent = String(weatherData.wind) + " km/h";
}

function processData(data) {
    const processedData = {};
    processedData.country = data.location.country;
    processedData.city = data.location.name;
    processedData.temp_c = data.current.temp_c;
    processedData.feelsLike = data.current.feelslike_c;
    processedData.humidity = data.current.humidity;
    processedData.wind = data.current.wind_kph;

    return processedData;
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    setWeather(city);
});