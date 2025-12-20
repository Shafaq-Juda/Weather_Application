// Select DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Replace this with your deployed backend URL from Render
const BACKEND_URL = "http://localhost:3000";

// Function to fetch weather data and update the UI
async function checkWeather(city) {
    try {
        const response = await fetch(`${BACKEND_URL}/weather?city=${city}`);

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const condition = data.weather[0].main;

        if (condition === "Clouds") weatherIcon.src = "images/clouds.png";
        else if (["Haze", "Smoke", "Mist"].includes(condition)) weatherIcon.src = "images/haze.png";
        else if (condition === "Clear") weatherIcon.src = "images/clear.png";
        else if (condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
        else if (condition === "Snow") weatherIcon.src = "images/snow.png";
        else if (condition === "Rain") weatherIcon.src = "images/rain.png";
        else weatherIcon.src = "images/partly-cloudy.png"; // fallback

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (err) {
        console.error(err);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
});


// Press Enter in input
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        checkWeather(city);
    }
});