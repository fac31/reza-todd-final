const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const session = require("./middlewares/session");

const {
  fetchGeoapifyData,
  fetchWeatherData,
  fetchUnsplashPhotos,
  fetchCurrentWeatherData
} = require("./services/apiHelpers");

const {
  extractLocationData,
  formatWeatherData,
  extractImageData,
} = require("./services/dataProcessing");

const PORT = process.env.PORT || 3000;

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
    const {lat,lon,placeId} = locationData;
    const weatherData = await fetchWeatherData(lat, lon);
    const currentWeatherData = await fetchCurrentWeatherData(lat, lon);
    const searchImgs = await fetchUnsplashPhotos(searchTerm);
    const formattedWeatherData = formatWeatherData(weatherData,currentWeatherData);
    const imageData = extractImageData(searchImgs);

    const cityData = { locationData, formattedWeatherData, imageData };
    req.session.cityData = cityData;
    res.redirect(`/city/${placeId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/city/:placeId", logger, (req, res) => {
  try {
    const placeId = req.params.placeId;
    const cityData = req.session.cityData;
    if (!cityData) {
      throw new Error("missing data from the query session");
    }
    const { locationData, formattedWeatherData, imageData } = cityData;
   

    res.render("pages/city", { placeId,locationData, formattedWeatherData, imageData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
