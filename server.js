const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const axios = require("axios");
const cors = require("cors");
// const session = require('express-session')
const ejs = require("ejs");
const {
  fetchGeoapifyData,
  fetchWeatherData,
  fetchUnsplashPhotos,
} = require("./services/apiHelpers");
const {
  extractLocationData,
  formatWeatherData,
  extractImageData,
} = require("./services/dataProcessing");
const PORT = process.env.PORT || 3000;
const session = require("./middlewares/session");
const connect = require('connect');

app.disable("x-powered-by");
app.enable("trust proxy");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use(cors());
app.use(session);

// app.get("/", logger, async (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
//   // res.status(200).send("Hello World");
// });
app.get("/:searchTerm", logger, async (req, res) => {
  console.log("=============Search Term=================");
  const searchTerm = req.query.destination;
  console.log(searchTerm);
  console.log("=============Search Term=================");
  try {
    // Fetch data from Geoapify
    const geoData = await fetchGeoapifyData(searchTerm);
    // Extract location data
    const locationData = extractLocationData(geoData);
    const lat = locationData.lat;
    const lon = locationData.lon;

    // Extract latitude and longitude from the Geoapify response
    const weatherData = await fetchWeatherData(lat, lon);
    const searchImgs = await fetchUnsplashPhotos(searchTerm);
    // Extract weather data
    const formattedWeatherData = formatWeatherData(weatherData);
    // Extract image data
    const imageData = extractImageData(searchImgs);

    req.session.locationData = locationData;
    req.session.formattedWeatherData = formattedWeatherData;
    req.session.imageData = imageData;
    res.redirect("/city");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/city", (req, res) => {
  try {
    // Retrieve data from session
    const locationData = req.session.locationData;
    const formattedWeatherData = req.session.formattedWeatherData;
    const imageData = req.session.imageData;

    res.render("city", { locationData, formattedWeatherData, imageData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
