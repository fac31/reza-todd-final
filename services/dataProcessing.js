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
  const images = searchImgs.map((img) => {
    // Process each image object here
    const { urls, alt_description: alt } = img;
    const { name: user, username: userName } = img.user;

    return {
      url: urls.regular,
      user,
      userName,
      alt,
    };
  });

  return images;
}
module.exports = {
  extractLocationData,
  formatWeatherData,
  extractImageData,
};
