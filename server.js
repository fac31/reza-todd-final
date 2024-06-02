const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const cors = require("cors");
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
const connect = require("connect");

app.disable("x-powered-by");
app.enable("trust proxy");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(cors());
app.use(session);

app.get("/destination/:searchTerm", logger, async (req, res) => {
  console.log("=============Search Term=================");
  const searchTerm = req.params.searchTerm;
  console.log(searchTerm);
  console.log("=============Search Term=================");
  try {
    const geoData = await fetchGeoapifyData(searchTerm);
    const locationData = extractLocationData(geoData);
    const lat = locationData.lat;
    const lon = locationData.lon;
    const weatherData = await fetchWeatherData(lat, lon);
    const searchImgs = await fetchUnsplashPhotos(searchTerm);
    const formattedWeatherData = formatWeatherData(weatherData);
    const imageData = extractImageData(searchImgs);
    // store data in session
    req.session.locationData = locationData;
    req.session.formattedWeatherData = formattedWeatherData;
    req.session.imageData = imageData;
    await req.session.save();
    console.log("Data stored in session, redirecting to /city");

    res.redirect("/city");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/city", logger, (req, res) => {
  try {
    // Retrieve data from session
    const locationData = req.session.locationData;
    const formattedWeatherData = req.session.formattedWeatherData;
    const imageData = req.session.imageData;
    console.log({
      citySession: { locationData, formattedWeatherData, imageData },
    });
    if (!locationData || !formattedWeatherData || !imageData) {
      throw new Error("Session data missing");
    }
    console.log(
      `data from session \nLocation Data: ${locationData} \n Weather Data: ${formattedWeatherData} \n Image Data: ${imageData}`
    );
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
