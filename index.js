function numberToDay(number) {
    switch(number) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

async function fetchLocation(location) {
    const response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json" +
        "?key=e71c133aa6f547b5816151624233110&q=" + location
        + "&days=7");
    const weatherData = await response.json();
    
    document.querySelector(".day-name-1").textContent = numberToDay(new Date(weatherData.forecast.forecastday[0].date).getUTCDay());
    document.querySelector(".temperaturehigh1").textContent = weatherData.forecast.forecastday[0].day.maxtemp_c
                                + " °C / " + weatherData.forecast.forecastday[0].day.maxtemp_f
                                + " °F";
    document.querySelector(".temperaturelow1").textContent = weatherData.forecast.forecastday[0].day.mintemp_c
                                + " °C / " + weatherData.forecast.forecastday[0].day.mintemp_f
                                + " °F";
    document.querySelector(".condition1").textContent = weatherData.forecast.forecastday[0].day.condition.text;

    for (let i = 1; i < 7; i++) {
        let daySelector = ".day-name-" + (i + 1);
        const dateObject = new Date(weatherData.forecast.forecastday[i].date);
        const day = document.querySelector(daySelector);
        day.textContent = numberToDay(dateObject.getUTCDay());

        const temperatureHigh = document.querySelector(".temperaturehigh" + (i + 1));
        temperatureHigh.textContent = weatherData.forecast.forecastday[i].day.maxtemp_c
                                  + " °C / " + weatherData.forecast.forecastday[i].day.maxtemp_f
                                  + " °F";
        const temperatureLow = document.querySelector(".temperaturelow" + (i + 1));
        temperatureLow.textContent = weatherData.forecast.forecastday[i].day.mintemp_c
                                  + " °C / " + weatherData.forecast.forecastday[i].day.mintemp_f
                                  + " °F";

        const condition = document.querySelector(".condition" + (i + 1));
        condition.textContent = weatherData.forecast.forecastday[i].day.condition.text;
    }

    const city = document.querySelector(".city");
    city.textContent = weatherData.location.name;

    const condition = document.querySelector(".condition");
    condition.textContent = weatherData.current.condition.text;

    const dateObject = new Date(weatherData.location.localtime);
    const date = document.querySelector(".date");
    date.textContent = numberToDay(dateObject.getUTCDay());

    const temperature = document.querySelector(".temperature");
    temperature.textContent = weatherData.current.temp_c + " °C / " + weatherData.current.temp_f + " °F";

    const humidity = document.querySelector(".humidity");
    humidity.textContent = "Humidity: " + weatherData.current.humidity + " %";

    const wind = document.querySelector(".wind");
    wind.textContent = "Wind Speed: " + weatherData.current.wind_kph + " kph / " + weatherData.current.wind_mph + " mph";
}

document.querySelector(".search-input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        fetchLocation(document.querySelector(".search-input").value);
    }
});

document.querySelector(".search").addEventListener("click", () => {
    fetchLocation(document.querySelector(".search-input").value);
});