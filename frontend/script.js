// DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

// Hide sections on load
weatherDiv.style.display = "none";
errorDiv.style.display = "none";

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(`/weather?city=${city}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText =
            Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerText =
            data.main.humidity + "%";
        document.querySelector(".wind").innerText =
            data.wind.speed + " km/h";

        const condition = data.weather[0].main;

        switch (condition) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
                weatherIcon.src = "images/haze.png";
                break;
            default:
                weatherIcon.src = "images/partly-cloudy.png";
        }

        errorDiv.style.display = "none";
        weatherDiv.style.display = "block";

    } catch (err) {
        console.error(err);
        weatherDiv.style.display = "none";
        errorDiv.style.display = "block";
    }
}

// Button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Enter key
searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
