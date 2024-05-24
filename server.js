const express = require("express");
const path = require("path");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.enable("trust proxy");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(logger);

app.get("/", logger, async (req, res) => {
  // res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
  res.status(200).send("Hello World");
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
