const express = require("express"),
  loginRoute = express.Router(),
  jwt = require("jsonwebtoken"),
  Bookings = require("../models/booking"),
  Enquiry = require("../models/enquiry"),
  Users = require("../models/users"),
  verify = require("../auth/verify");

loginRoute.get("/", (req, res) => {
  res.render("login");
});

loginRoute.post("/", (req, res) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (user) {
      if (user.password === req.body.password) {
        var token = jwt.sign({ user }, "secret", {
          expiresIn: "1h"
        });
        res.cookie("auth", token);
        res.redirect("/login/dashboard");
      } else {
        res.status(401).json({
          message: req.flash("error", "Unathorized, password doesn't match")
        });
      }
    } else {
      res.redirect(401, "back");
    }
  });
});

// verify

loginRoute.get("/dashboard", verify, (req, res) => {
  Bookings.find((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.render("dashboard", { result });
    }
  });
});

loginRoute.get("/dashboard/:id", verify, (req, res) => {
  Bookings.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (result) {
      res.redirect("/login/dashboard");
    }
  });
});

loginRoute.get("/enquiry", verify, (req, res) => {
  Enquiry.find((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.render("dashboard-enquiry", { result });
    }
  });
});

loginRoute.get("/enquiry/:id", verify, (req, res) => {
  Enquiry.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (result) {
      res.redirect("/login/enquiry");
    }
  });
});

// TODO: make these routes
loginRoute.get("/packages", verify, (req, res) => {
  Bookings.find((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.render("dashboard", { result });
    }
  });
});

module.exports = loginRoute;
