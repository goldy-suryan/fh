const express = require("express"),
  loginRoute = express.Router(),
  jwt = require("jsonwebtoken"),
  Bookings = require("../models/booking"),
  Enquiry = require("../models/enquiry"),
  Users = require("../models/users"),
  Packages = require("../models/packages"),
  Gallery = require("../models/gallery"),
  verify = require("../auth/verify");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname == "galleryImage") {
      cb(null, "public/images/gallery/");
    } else {
      cb(null, "public/images/");
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Can only upload jpg or jpeg files"), false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // stores upto 2Mb
  },
  fileFilter
});

// ================LOGIN=====================//
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
// ================LOGIN/DASHBOARD=====================//

loginRoute.get("/dashboard", verify, (req, res) => {
  Bookings.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/dashboard");
    } else {
      res.render("dashboard", {
        result: result,
        message: req.flash("message")
      });
    }
  });
});

loginRoute.delete("/dashboard/:id", verify, (req, res) => {
  Bookings.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/dashboard");
    }
    if (result) {
      req.flash("message", "Deleted successfully");
      res.redirect("/login/dashboard");
    }
  });
});

// ================LOGIN/ENQUIRY=====================//

loginRoute.get("/enquiry", verify, (req, res) => {
  Enquiry.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/enquiry");
    } else {
      res.render("dashboard-enquiry", {
        result: result,
        message: req.flash("message")
      });
    }
  });
});

loginRoute.delete("/enquiry/:id", verify, (req, res) => {
  Enquiry.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/enquiry");
    }
    if (result) {
      req.flash("message", "Deleted successfully");
      res.redirect("/login/enquiry");
    }
  });
});

// ================LOGIN/PACKAGES=====================//

loginRoute.get("/packages", verify, (req, res) => {
  Packages.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/packages");
    }
    if (result) {
      res.render("packages", {
        message: req.flash("message"),
        result: result
      });
    }
  });
});

loginRoute.post("/packages", verify, upload.single("image"), (req, res) => {
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
});

loginRoute.delete("/packages/:id", verify, (req, res) => {
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
});

// ================LOGIN/GALLERY=====================//
loginRoute.get("/gallery", verify, (req, res) => {
  Gallery.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/gallery");
    }
    if (result) {
      res.render("dashboard-gallery", {
        message: req.flash("message"),
        result: result
      });
    }
  });
});

loginRoute.post(
  "/gallery",
  verify,
  upload.single("galleryImage"),
  (req, res) => {
    const gallery = new Gallery({
      name: req.body.name
    });
    if (req.file && req.file.path) {
      gallery.image = req.file.originalname;
    }

    gallery.save((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/gallery");
      }
      if (result) {
        req.flash("message", "Saved successfully");
        res.redirect("/login/gallery");
      }
    });
  }
);

loginRoute.delete("/gallery/:id", verify, (req, res) => {
  Gallery.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/gallery");
    }
    if (!result) {
      req.flash("message", "No image with requested id");
      res.redirect("/login/gallery");
    }
    if (result) {
      req.flash("message", "Data deleted successfully");
      fs.unlink(
        path.join(
          __dirname,
          "..",
          "public",
          "images",
          "gallery",
          `${result.image}`
        ),
        err => {
          if (err) {
            res.redirect("/login/gallery");
          } else {
            res.redirect("/login/gallery");
          }
        }
      );
    }
  });
});

module.exports = loginRoute;
