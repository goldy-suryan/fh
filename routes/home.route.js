const express = require("express"),
  homeRoute = express.Router(),
  variables = require("../variables");

homeRoute.get("/", (req, res) => {
  res.render("index", {
    intro: variables.intro,
    cta: variables.cta,
    offers: variables.indexOffers,
    testimonials: variables.testimonials,
    message: req.flash("info")
  });
});

module.exports = homeRoute;
