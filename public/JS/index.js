// index.js
const form = document.getElementById("destination");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const searchTerm = document.getElementById("search").value;

  try {
    const response = await fetchData(searchTerm); 
    
    if (response.ok) {
      // Redirect to the server-side route for rendering city.html
      window.location.href = "/city";
      
    } else {
      console.error("Error fetching data");
    }// Fetch data from the server

    // Handle successful data retrieval
    console.log("Data fetched successfully:", data);

    // (Optional) Update the UI with fetched data or redirect to a results page
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors gracefully (e.g., display an error message to the user)
  }
});
// try {
//   const data = await fetchData(searchterm);
//   const { geoData, weatherData, searchImgs } = data;
//   const cityData = data
//   console.log({data: cityData});
//   let locationData, forecasts, photos;

//   if (geoData) {
//     locationData = processGeoData(geoData);
//     console.log(locationData);
//   } else {
//     console.error("Missing location data in response");
//   }

//   if (weatherData) {
//     forecasts = processWeatherData(weatherData);
//     console.log(forecasts);
//   } else {
//     console.error("Missing weather data in response");
//   }
//   if (searchImgs) {
//     photos = processPhotos(searchImgs);
//     console.log(photos);
//   } else {
//     console.error("Missing photos data in response");
//   }

//   if (locationData && forecasts && photos) {
//     renderResults(locationData, forecasts, photos);
//   }
// } catch (error) {
//   console.log(error.message);
// }
// }

async function fetchData(searchTerm) {
  const response = await fetch(`/search?destination=${searchTerm}`);
  const data = await response.json();
  return data;
}

// function processGeoData(geoData) {
//   const { features:[locationInfo] } = geoData;
//   const {
//     city,
//     country,
//     country_code: countryCode,
//     formatted,
//     lon,
//     lat,
//     place_id: placeId,
//   } = locationInfo.properties;

//   return {
//     city,
//     country,
//     countryCode,
//     formatted,
//     lon,
//     lat,
//     placeId,
//   };
// }

// function processWeatherData(weatherData) {
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
// }

// function processPhotos(searchImgs) {
//   return searchImgs.results.map((img) => ({
//     url: img.urls.regular,
//     user: img.user.name,
//     userName: img.user.username,
//     alt: img.alt_description,
//   }));
// }

// function renderResults(locationData, weatherData, photos) {
//   const { city, country, countryCode, formatted, lon, lat, placeId } =
//     locationData;
//   const { cityName, timezone, sunrise, sunset, forecasts } = weatherData;

//   let forecastHTML = "";
//   forecasts.forEach((forecast) => {
//     forecastHTML += `
//       <div class="forecast">
//         <h3>${new Date(forecast.dateTime * 1000).toLocaleDateString()}</h3>
//         <img src="http://openweathermap.org/img/wn/${forecast.weatherIcon}.png" alt="${forecast.weather}">
//         <p>Weather: ${forecast.weather}</p>
//         <p>High: ${forecast.tempMax}° Low: ${forecast.tempMin}°</p>
//         <p>Feels Like: ${forecast.feelsLike}°</p>
//         <p>Humidity: ${forecast.humidity}%</p>
//         <p>Pressure: ${forecast.pressure} hPa</p>
//         <p>Cloud Cover: ${forecast.cloudCover}%</p>
//         <p>Chance of Rain: ${forecast.chanceOfRain}%</p>
//         <p>Rain Amount: ${forecast.rainAmount ? forecast.rainAmount : 0} mm</p>
//         <p>Wind Speed: ${forecast.windSpeed} m/s</p>
//         <p>Wind Direction: ${forecast.windDirection}°</p>

//       </div>
//     `;
//   });

//   let photoHTML = "";
//   photos.forEach((photo) => {
//     photoHTML += `
//       <sl-carousel-item>
//         <img src=${photo.url} alt="${photo.alt}" />
//       </sl-carousel-item>

//     `;
//     // photoHTML += `
//     //   <div class="photo">
//     //   <img class="img" src=${photo.url} />
//     //   <a
//     //     class="credit"
//     //     target="_blank"
//     //     href={https://unsplash.com/@${photo.userName}}
//     //   >
//     //     <span>${photo.user}</span>
//     //   </a>
//     //   </div>
//     // `;
//   });

//   document.getElementById("result").innerHTML = `
//     <h2>City: ${cityName}</h2>
//     <h2>Country: ${country}</h2>
//     <h2>Country Code: ${countryCode}</h2>
//     <h2>Formatted: ${formatted}</h2>
//     <h2>Longitude: ${lon}</h2>
//     <h2>Latitude: ${lat}</h2>
//     <h2>Place ID: ${placeId}</h2>
//     <h2>City Name: ${cityName}</h2>
//     <h2>Timezone: ${timezone}</h2>
//     <h2>Sunrise: ${sunrise}</h2>
//     <h2>Sunset: ${sunset}</h2>
//     <h2>Forecasts:</h2>
//     <div class="forecast-container">${forecastHTML}</div>
//     <div class="photo-container"><sl-carousel autoplay loop pagination>${photoHTML}</sl-carousel></div>
//   `;
//
// }
