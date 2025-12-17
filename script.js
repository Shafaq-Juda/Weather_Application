const apiKey = "431f02da1215df93302da9ea83725a29";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appID=${apiKey}`);

    if(response.status === 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main === "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }else if(data.weather[0].main === "Haze" || data.weather[0].main === "Smoke" || data.weather[0].main === "Mist"){
        weatherIcon.src = "images/haze.png"
    }else if(data.weather[0].main === "Clear" || data.weather[0].main === "Sunny"){
        weatherIcon.src = "images/clear.png"
    }else if(data.weather[0].main === "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    }else if(data.weather[0].main === "Partly-cloudy"){
        weatherIcon.src = "images/partly-cloudy.png"
    }else if(data.weather[0].main === "Snow"){
        weatherIcon.src = "images/snow.png"
    }else if(data.weather[0].main === "Rain"){
        weatherIcon.src = "images/rain.png"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})