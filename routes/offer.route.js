const express = require("express"),
  offerRoute = express.Router(),
  variables = require("../variables");

offerRoute.get("/", (req, res) => {
  res.render("offers", {
    offers: variables.offers,
    message: req.flash("booking")
  });
});

module.exports = offerRoute;
