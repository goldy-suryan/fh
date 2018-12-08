const express = require("express"),
  galleryRoute = express.Router(),
  variables = require("../variables");

galleryRoute.get("/", (req, res) => {
  res.render("gallery", {
    gallery: variables.gallery
  });
});

module.exports = galleryRoute;
