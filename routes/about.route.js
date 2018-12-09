const express = require("express"),
  aboutRoute = express.Router();

aboutRoute.get("/", (req, res) => {
  res.render("about");
});

module.exports = aboutRoute;
