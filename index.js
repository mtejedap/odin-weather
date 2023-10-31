async function fetchLocation(location) {
    const response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json" +
        "?key=e71c133aa6f547b5816151624233110&q=" + location
        + "&days=7");
    const weatherData = await response.json();

    document.querySelector(".day-name-1").textContent = weatherData.forecast.forecastday[0].date;
    document.querySelector(".temperature1").textContent = weatherData.forecast.forecastday[0].day.avgtemp_c
                                + " °C / " + weatherData.forecast.forecastday[0].day.avgtemp_f
                                + " °F";
    document.querySelector(".condition1").textContent = weatherData.forecast.forecastday[0].day.condition.text;

    for (let i = 1; i < 7; i++) {
        let daySelector = ".day-name-" + (i + 1);
        const day = document.querySelector(daySelector);
        day.textContent = weatherData.forecast.forecastday[i].date;

        const temperature = document.querySelector(".temperature" + (i + 1));
        temperature.textContent = weatherData.forecast.forecastday[i].day.avgtemp_c
                                  + " °C / " + weatherData.forecast.forecastday[i].day.avgtemp_f
                                  + " °F";

        const condition = document.querySelector(".condition" + (i + 1));
        condition.textContent = weatherData.forecast.forecastday[i].day.condition.text;
    }

    const city = document.querySelector(".city");
    city.textContent = weatherData.location.name;

    const condition = document.querySelector(".condition");
    condition.textContent = weatherData.current.condition.text;

    const date = document.querySelector(".date");
    date.textContent = weatherData.location.localtime;

    const temperature = document.querySelector(".temperature");
    temperature.textContent = weatherData.current.temp_c + " °C / " + weatherData.current.temp_f + " °F";

    const humidity = document.querySelector(".humidity");
    humidity.textContent = weatherData.current.humidity + " %";

    const wind = document.querySelector(".wind");
    wind.textContent = weatherData.current.wind_kph + " kph / " + weatherData.current.wind_mph + " mph";
}

document.querySelector(".search-input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        fetchLocation(document.querySelector(".search-input").value);
    }
});

document.querySelector(".search").addEventListener("click", () => {
    fetchLocation(document.querySelector(".search-input").value);
});