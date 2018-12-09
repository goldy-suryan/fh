const express = require("express"),
  contactRoute = express.Router();

contactRoute.get("/", (req, res) => {
  res.render("contact", {
    message: req.flash("info")
  });
});

module.exports = contactRoute;
