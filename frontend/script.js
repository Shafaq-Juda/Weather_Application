// // Select DOM elements
// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const weatherIcon = document.querySelector(".weather-icon");

// // Replace this with your deployed backend URL from Render
// const BACKEND_URL = "";

// // Function to fetch weather data and update the UI
// async function checkWeather(city) {
//     try {
//         const response = await fetch(`/weather?city=${city}`);

//         if (response.status === 404) {
//             document.querySelector(".error").style.display = "block";
//             document.querySelector(".weather").style.display = "none";
//             return;
//         }

//         const data = await response.json();

//         document.querySelector(".city").innerHTML = data.name;
//         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//         document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//         document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

//         const condition = data.weather[0].main;

//         if (condition === "Clouds") weatherIcon.src = "images/clouds.png";
//         else if (["Haze", "Smoke", "Mist"].includes(condition)) weatherIcon.src = "images/haze.png";
//         else if (condition === "Clear") weatherIcon.src = "images/clear.png";
//         else if (condition === "Drizzle") weatherIcon.src = "images/drizzle.png";
//         else if (condition === "Snow") weatherIcon.src = "images/snow.png";
//         else if (condition === "Rain") weatherIcon.src = "images/rain.png";
//         else weatherIcon.src = "images/partly-cloudy.png"; // fallback

//         document.querySelector(".weather").style.display = "block";
//         document.querySelector(".error").style.display = "none";

//     } catch (err) {
//         console.error(err);
//         document.querySelector(".error").style.display = "block";
//         document.querySelector(".weather").style.display = "none";
//     }
// }

// // Event listener for search button
// searchBtn.addEventListener("click", () => {
//     const city = searchBox.value.trim();
//     if (city) checkWeather(city);
// });


// // Press Enter in input
// searchBox.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         const city = searchBox.value.trim();
//         checkWeather(city);
//     }
// });









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
