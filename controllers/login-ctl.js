const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const loginCtrl = {
  verifyUser: (req, res) => {
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
  }
};

module.exports = loginCtrl;
