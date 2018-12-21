const express = require("express"),
  homeRoute = express.Router(),
  client = require("../models/clients"),
  variables = require("../variables");
const Packages = require("../models/packages");

homeRoute.get("/", (req, res) => {
  var offers;
  Packages.find((err, result) => {
    if (err) {
      req.flash("message", err);
    }
    if (result) {
      offers = result.slice(0, 4);
    }
  });
  client.find((err, result) => {
    if (err) {
      req.flash("message", err);
    }
    if (result) {
      res.render("index", {
        intro: variables.intro,
        cta: variables.cta,
        offers: offers,
        testimonials: result,
        message: req.flash("info")
      });
    }
  });
});

module.exports = homeRoute;
