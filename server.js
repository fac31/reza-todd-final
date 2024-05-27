const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const axios = require("axios");
const cors = require("cors");
const {
  fetchGeoapifyData,
  fetchWeatherData,
  fetchUnsplashPhotos,
} = require("./services/apiHelpers");
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
  console.log("=============Search Term=================");
  const searchTerm = req.query.destination;
  console.log(searchTerm);
  console.log("=============Search Term=================");
  try {
    // Fetch data from Geoapify
    const geoData = await fetchGeoapifyData(searchTerm);
    // const photos = await fetchUnsplashPhotos(`${searchTerm}`);

    // Extract latitude and longitude from the Geoapify response
    if (geoData.features && geoData.features.length > 0) {
      const { lat, lon } = geoData.features[0].properties;

      // Fetch weather data using latitude and longitude
      const weatherData = await fetchWeatherData(lat, lon);

      // Fetch photos from Unsplash
      // const photos = await fetchUnsplashPhotos(searchTerm);

      // Send combined response
      res.json({
        geoData: geoData,
        weatherData: weatherData,
        // photos: photos,
      });
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
