// extractLocationData(geoData)
function extractLocationData(geoData) {
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

  return {
    city,
    country,
    countryCode,
    formatted,
    lon,
    lat,
    placeId,
  };
}


// formatWeatherData(weatherData)
function formatWeatherData(weatherData) {
  //   const { list, city } = weatherData;
  //   const cityName = city.name;
  //   const timezone = city.timezone;
  //   const sunrise = city.sunrise;
  //   const sunset = city.sunset;

  //   const forecasts = list.map((item) => {
  //     const {
  //       dt,
  //       main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
  //       weather: [{ main: weatherDescription, icon }],
  //       clouds: { all },
  //       pop,
  //       rain,
  //       wind: { speed, deg },
  //     } = item;

  //     return {
  //       dateTime: dt,
  //       temperature: temp,
  //       feelsLike: feels_like,
  //       tempMin: temp_min,
  //       tempMax: temp_max,
  //       pressure,
  //       humidity,
  //       weather: weatherDescription,
  //       weatherIcon: icon,
  //       cloudCover: all,
  //       chanceOfRain: pop,
  //       rainAmount: rain,
  //       windSpeed: speed,
  //       windDirection: deg,
  //     };
  //   });

  //   return { cityName, timezone, sunrise, sunset, forecasts };
  const { list, city } = weatherData;
  const cityName = city.name;
  const timezone = city.timezone;
  const sunrise = city.sunrise;
  const sunset = city.sunset;

  const forecasts = list.map((forecast) => {
    const { dt_txt: date, main, weather } = forecast;
    const { temp, temp_min: minTemp, temp_max: maxTemp, humidity } = main;
    const { description, icon } = weather[0];

    return {
      date,
      temp,
      minTemp,
      maxTemp,
      humidity,
      description,
      icon,
    };
  });

  return { cityName, timezone, sunrise, sunset, forecasts };
}

// extractImageData(searchImgs)
function extractImageData(searchImgs) {
  const { results } = searchImgs;
  const images = results.map((image) => {
    const { urls, alt_description: altDescription, user, userName } = image;

    return {
      src: urls.regular,
      alt: altDescription,
      user: user,
      userName: userName,
    };
  });

  return images;
}
console.log(extractLocationData);
console.log(formatWeatherData);
console.log(extractImageData);

module.exports = {
  extractLocationData,
  formatWeatherData,
  extractImageData,
};
