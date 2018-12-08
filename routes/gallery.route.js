const express = require("express"),
  galleryRoute = express.Router(),
  variables = require("../variables");

  galleryRoute.get("/", (req, res) => {
  res.render("gallery", {
    intro: variables.intro
  });
});

module.exports = galleryRoute;
