const express = require("express"),
  galleryRoute = express.Router(),
  gallery = require("../models/gallery");

galleryRoute.get("/", (req, res) => {
  gallery.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/gallery");
    }
    if (result) {
      res.render("gallery", {
        message: req.flash("message"),
        gallery: result
      });
    }
  });
});

module.exports = galleryRoute;
