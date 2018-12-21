const express = require("express"),
  homeRoute = express.Router(),
  client = require("../models/clients"),
  variables = require("../variables");
const Packages = require("../models/packages");

homeRoute.get("/", (req, res) => {
  client.find((err, result) => {
    if (err) {
      req.flash("message", err);
    }
    if (result) {
      Packages.find((err, response) => {
        if (err) {
          req.flash("message", err);
        } else {
          res.render("index", {
            intro: variables.intro,
            cta: variables.cta,
            offers: response.slice(0, 4),
            testimonials: result,
            message: req.flash("info")
          });
        }
      });
    }
  });
});

module.exports = homeRoute;
