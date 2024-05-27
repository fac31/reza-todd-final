const axios = require('axios');
const { error } = require('console');
const { createApi } = require('unsplash-js');
require('dotenv').config();


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
  const url = "https://api.unsplash.com/search/photos";
  const params = {
    query: searchTerm,
    orientation: "landscape",
    client_id: UNSPLASH_ACC_KEY,
  };
  
  try {
    const response = await axios.get(url, { params });
    if (!response.ok) {
      throw new Error(error.message);
    }
    return response.data.results;
  } catch (error) {
    throw new Error(`Unsplash API error: ${error.message}`);
  }
};

// Export the functions to be used in other modules
module.exports = {
  fetchGeoapifyData,
  fetchWeatherData,
  fetchUnsplashPhotos
};
