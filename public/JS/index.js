document.getElementById("destination").addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchterm = document.getElementById("search").value;
  console.log(searchterm);

  try {
    const response = await fetch(`/search?destination=${searchterm}`);
    const data = await response.json();
    const { geoData, weatherData } = data;
    console.log(data);

    if (geoData) {
      const { features } = geoData;
      const {
        city,
        country,
        country_code: countryCode,
        formatted,
        lon,
        lat,
        place_id: placeId,
      } = features[0].properties;

      // ...

    } else {
      console.error("Missing location data in response");
    }

    if (weatherData) {
      const { list, city } = weatherData;

      const cityName = city.name;
      const timezone = city.timezone;
      const sunrise = city.sunrise;
      const sunset = city.sunset;

      // Forecast details
      const forecasts = [];
      for (const item of list) {
        const {
          dt,
          main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
          weather: [{ main: weatherDescription, icon }],
          clouds: { all },
          pop,
          rain,
          wind: { speed, deg },
        } = item;

        forecasts.push({
          dateTime: dt,
          temperature: temp,
          feelsLike: feels_like,
          tempMin: temp_min,
          tempMax: temp_max,
          pressure,
          humidity,
          weather: weatherDescription,
          weatherIcon: icon,
          cloudCover: all,
          chanceOfRain: pop,
          rainAmount: rain,
          windSpeed: speed,
          windDirection: deg,
        });
      }

      // Update results tag using processed data
      let forecastHTML = "";
      for (const forecast of forecasts) {
        forecastHTML += `
          <div class="forecast">
            <h3>${new Date(forecast.dateTime * 1000).toLocaleDateString()}</h3>
            <p>Weather: ${forecast.weather}</p>
            <p>High: ${forecast.tempMax}° Low: ${forecast.tempMin}°</p>
            <p>Feels Like: ${forecast.feelsLike}°</p>
            <p>Humidity: ${forecast.humidity}%</p>
          </div>
        `;
      }

      document.getElementById('result').innerHTML = `
        <h2>City: ${cityName}</h2>
        <h2>City Name: ${cityName}</h2>
        <h2>Timezone: ${timezone}</h2>
        <h2>Sunrise: ${sunrise}</h2>
        <h2>Sunset: ${sunset}</h2>
        <h2>Forecasts:</h2>
        <div class="forecast-container">${forecastHTML}</div>
      `;
    } else {
      console.error("Missing weather data in response");
    }
  } catch (error) {
    console.log(error.message);
  }
});
