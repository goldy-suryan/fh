const express = require("express"),
  homeRoute = express.Router(),
  variables = require("../variables");

homeRoute.get("/", (req, res) => {
  res.render("index", {
    intro: variables.intro,
    cta: variables.cta,
    offers: variables.offers,
    testimonials: variables.testimonials
  });
});

module.exports = homeRoute;
