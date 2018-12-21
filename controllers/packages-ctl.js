const Packages = require("../models/packages");
const fs = require("fs");
const path = require("path");

const packagesCtrl = {
  getPackages: (req, res) => {
    Packages.find((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect(req.headers.referer);
      }
      if (result) {
        res.render("packages", {
          message: req.flash("message"),
          result: result
        });
      }
    });
  },

  postPackages: (req, res) => {
    const package = new Packages({
      price: req.body.price,
      title: req.body.title,
      person: req.body.person,
      rating: req.body.rating,
      list: req.body.list
    });
    if (req.file && req.file.path) {
      package.image = req.file.originalname;
    }
    package.save((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/packages");
      }
      if (result) {
        req.flash("message", "Data saved successfully");
        res.redirect("/login/packages");
      }
    });
  },

  deletePackages: (req, res) => {
    Packages.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/packages");
      }
      if (!result) {
        req.flash("message", "No package with this id");
        res.redirect("/login/packages");
      }
      if (result) {
        req.flash("message", "Deleted successfully");
        fs.unlink(
          path.join(__dirname, "..", "public", "images", `${result.image}`),
          err => {
            if (err) {
              res.redirect("/login/packages");
            } else {
              res.redirect("/login/packages");
            }
          }
        );
      }
    });
  }
};

module.exports = packagesCtrl;
