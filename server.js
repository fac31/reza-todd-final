const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const axios = require("axios");
const cors = require("cors");
const e = require("express");
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.enable("trust proxy");

// Middleware

app.use(express.json());
app.use(logger);
app.use(cors());

app.get("/", logger, async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
  // res.status(200).send("Hello World");
});
// get teh searched item from the user and fetch data from the api

app.get("/:searchTerm", logger, async (req, res) => {
  console.log("=========================================");
  const searchTerm = req.query.destination;
  console.log(searchTerm);
  
  console.log("=========================================");
  const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
  const GEOAPIFY_URL = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchTerm)}&apiKey=${GEOAPIFY_API_KEY}`;

  // where axios fetches data from the api based on user input and return json data
  try {
    const response = await axios.get(GEOAPIFY_URL);
    const data = response.data;
    const {
      city,
      country,
      country_code: countryCode,
      formatted,
      lon,
      lat,
      place_id: placeId
  } = data.features[0].properties;
  console.log(city, country, countryCode, formatted, lon, lat, placeId);
  // axios fetch data with lon and lat from the above api and use that in openweather api to get the weather data
  const weatherAPI = process.env.WEATHER_API;
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherAPI}`;
  const weatherResponse = await axios.get(weatherURL);
  const weatherData = weatherResponse.data;
  //axios detch data with city name from the above api and use that in unsplash api to get the images 
  const unsplashAPI = process.env.UNSPLASH_API;
  const unsplashURL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashAPI}`;
  const unsplashResponse = await axios.get(unsplashURL);
  //axios fetch data with country name from currency exchange api to get the currency exchange rate
  const currencyAPI = process.env.CURRENCY_API;
  const currencyURL = `https://v6.exchangerate-api.com/v6/${currencyAPI}/latest/${country_code}`;
  const currencyResponse = await axios.get(currencyURL);

  //axios fetch data with country name and city name from the above api to get news data
  const newsAPI = process.env.NEWS_API;
  const newsURL = `https://newsapi.org/v2/everything?q=${city}&apiKey=${newsAPI}`;
  const newsResponse = await axios.get(newsURL);
  const newsData = newsResponse.data;


    res.status(200).json(data.features[0].properties);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
