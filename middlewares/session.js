// const express = require("express");
const session = require("express-session");

const sessionMiddleware = session({
  secret: "r4D4R",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

module.exports = sessionMiddleware;
