const express = require("express"),
  homeRoute = express.Router(),
  client = require("../models/clients"),
  variables = require("../variables");

homeRoute.get("/", (req, res) => {
  client.find((err, result) => {
    if (err) {
      req.flash("message", err);
    }
    if (result) {
      console.log(result, "result index");
      res.render("index", {
        intro: variables.intro,
        cta: variables.cta,
        offers: variables.indexOffers,
        testimonials: result,
        message: req.flash("info")
      });
    }
  });
});

module.exports = homeRoute;
