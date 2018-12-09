const express = require("express"),
  loginRoute = express.Router(),
  jwt = require("jsonwebtoken"),
  Bookings = require("../models/booking"),
  Enquiry = require("../models/enquiry"),
  Users = require("../models/users"),
  verify = require("../auth/verify");

loginRoute.get("/", (req, res) => {
  res.render("login", {
    message: req.flash("message")
  });
});

loginRoute.post("/", (req, res) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      req.flash("message", `error: ${err}`);
      res.render("login", {
        message: req.flash("message")
      });
    }
    if (user) {
      if (user.password === req.body.password) {
        var token = jwt.sign({ user }, "secret", {
          expiresIn: "1h"
        });
        res.cookie("auth", token);
        req.flash("message", "Login successful");
        res.redirect("/login/dashboard");
      } else {
        req.flash("message", "Unathorized, Password doesn't match");
        res.render("login", {
          message: req.flash("message")
        });
      }
    } else {
      req.flash("message", "Unathorized, Username or password doesn't match");
      res.render("login", {
        message: req.flash("message")
      });
    }
  });
});

// verify

loginRoute.get("/dashboard", verify, (req, res) => {
  Bookings.find((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.render("dashboard", {
        result: result,
        message: req.flash("message")
      });
    }
  });
});

loginRoute.get("/dashboard/:id", verify, (req, res) => {
  Bookings.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (result) {
      req.flash("message", "Deleted successfully");
      res.redirect("/login/dashboard");
    }
  });
});

loginRoute.get("/enquiry", verify, (req, res) => {
  Enquiry.find((err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.render("dashboard-enquiry", {
        result: result,
        message: req.flash("message")
      });
    }
  });
});

loginRoute.get("/enquiry/:id", verify, (req, res) => {
  Enquiry.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (result) {
      req.flash("message", "Deleted successfully");
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
