const axios = require("axios");
const { createApi } = require("unsplash-js");
require("dotenv").config();

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
// console.log(GEOAPIFY_API_KEY);
const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
// console.log(WEATHER_API_KEY);

const UNSPLASH_ACC_KEY = process.env.UNSPLASH_ACC_KEY;
// console.log(UNSPLASH_ACC_KEY);

const fetchGeoapifyData = async (searchTerm) => {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchTerm)}&apiKey=${GEOAPIFY_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Geoapify API error: ${error.message}`);
  }
};

const fetchWeatherData = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`OpenWeatherMap API error: ${error.message}`);
  }
};

const fetchUnsplashPhotos = async (searchTerm) => {
  const baseUrl = "https://api.unsplash.com/search/photos";
  const params = {
    query: searchTerm,
    page: 1,
    per_page: 6,
    orientation: "landscape",
    client_id: UNSPLASH_ACC_KEY, // Replace with your access key
  };

  try {
    const response = await axios.get(baseUrl, { params });

    if (response.data.errors) {
      console.error("Unsplash API error:", response.data.errors[0]);
      // Handle specific errors (e.g., invalid access key)
      return; // or throw an error for further handling
    }

    if (!response.data.results || response.data.results.length === 0) {
      console.log("No results found for search term:", searchTerm);
    } else {
    //   console.log("Successfully retrieved Unsplash photos");
      // Use the results (stored in response.data.results)
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
  }
};

//   const url = "https://api.unsplash.com/search/photos";
//   const params = {
//     query: searchTerm,
//     orientation: "landscape",
//     client_id: UNSPLASH_ACC_KEY,
//   };

//   try {
//     const response = await axios.get(url, { params });
//     if (!response.ok) {
//       throw new Error(error.message);
//     }
//     return response.data.results;
//   } catch (error) {
//     throw new Error(`Unsplash API error: ${error.message}`);
//   }
// };

// Export the functions to be used in other modules
module.exports = {
  fetchGeoapifyData,
  fetchWeatherData,
  fetchUnsplashPhotos,
};
