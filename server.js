const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.enable("trust proxy");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get('/', (req, res) => {
    // res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
    res.status(200).send("Hello World");
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);


/**
 * const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000');
  
  // Wait for the 'Hello World' message to be displayed
  await page.waitForSelector('body');
  const text = await page.$eval('body', (element) => element.textContent);

  // Assert the response
  if (text.includes('Hello World')) {
    console.log('Test Passed: "Hello World" message is displayed');
  } else {
    console.error('Test Failed: "Hello World" message is not displayed');
  }

  await browser.close();
})();
 */