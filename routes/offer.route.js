const express = require("express"),
  offerRoute = express.Router(),
  packages = require("../models/packages");

offerRoute.get("/", (req, res) => {
  packages.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/offers");
    }
    if (result) {
      res.render("offers", {
        offers: result,
        message: req.flash("booking")
      });
    }
  });
  // res.render("offers", {
  //   offers: variables.offers,
  //   message: req.flash("booking")
  // });
});

module.exports = offerRoute;
