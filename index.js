function WeatherDay(condition, localTime, tempC, tempF, icon) {
    this.condition = condition;
    this.localTime = localTime;
    this.tempC = tempC;
    this.tempF = tempF;
    this.icon = icon;
}

async function fetchLocation(location) {
    const response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json" +
        "?key=e71c133aa6f547b5816151624233110&q=" + location
        + "&days=7");
    const weatherData = await response.json();
    const name = weatherData.location.name;
    const condition = weatherData.current.condition.text;
    const localTime = weatherData.location.localtime;
    const tempC = weatherData.current.temp_c;
    const tempF = weatherData.current.temp_f;
    const humidity = weatherData.current.humidity;
    const windKph = weatherData.current.wind_kph;
    const windMph = weatherData.current.wind_mph;
    const icon = weatherData.current.condition.icon;

    const weatherDays = new Array(6);

    for (let i = 1; i < 7; i++) {
        weatherDays[i - 1] = new WeatherDay(
            weatherData.forecast.forecastday[i].day.condition.text,
            weatherData.forecast.forecastday[i].astro.date,
            weatherData.forecast.forecastday[i].day.avtemp_c,
            weatherData.forecast.forecastday[i].day.avtemp_f,
            weatherData.forecast.forecastday[i].day.condition.icon
        );
    }

    return { name, condition, localTime, tempC, tempF, humidity,
             windKph, windMph, icon, weatherDays };
}