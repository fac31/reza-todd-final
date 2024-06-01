const express = require("express");
const connect = require('connect');


const session = require("express-session");

const sessionMiddleware = express.session({
  secret: "r4D4R",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

module.exports = sessionMiddleware;
