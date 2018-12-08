const express = require("express"),
  offerRoute = express.Router(),
  variables = require("../variables");

offerRoute.get("/", (req, res) => {
  res.render("offers", {
    offers: variables.offers
  });
});

module.exports = offerRoute;
