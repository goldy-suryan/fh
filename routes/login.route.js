const express = require("express"),
  loginRoute = express.Router(),
  jwt = require("jsonwebtoken"),
  Bookings = require("../models/booking"),
  Enquiry = require("../models/enquiry"),
  Users = require("../models/users"),
  Packages = require("../models/packages"),
  Gallery = require("../models/gallery"),
  Client = require("../models/clients"),
  verify = require("../auth/verify");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.fieldname == "galleryImage") {
      cb(null, "public/images/gallery/");
    } else if (file.fieldname == "clientImage") {
      cb(null, "public/images/clients");
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
      res.redirect(req.header.referer);
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
      res.redirect(req.headers.referer);
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
      res.redirect(req.headers.referer);
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
      res.redirect(req.headers.referer);
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

// ================LOGIN/CLIENTS=====================//

loginRoute.get("/clients", verify, (req, res) => {
  Client.find((err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect(req.headers.referer);
    }
    if (result) {
      res.render("dashboard-clients", {
        message: req.flash("message"),
        result: result
      });
    }
  });
});

loginRoute.post(
  "/clients",
  verify,
  upload.single("clientImage"),
  (req, res) => {
    const client = new Client({
      name: req.body.name,
      title: req.body.title
    });
    if (req.file && req.file.path) {
      client.image = req.file.originalname;
    }

    client.save((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/clients");
      }
      if (result) {
        req.flash("message", "Saved successfully");
        res.redirect("/login/clients");
      }
    });
  }
);

loginRoute.delete("/clients/:id", verify, (req, res) => {
  Client.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      req.flash("message", err);
      res.redirect("/login/clients");
    }
    if (!result) {
      req.flash("message", "No data with requested id");
      res.redirect("/login/clients");
    }
    if (result) {
      req.flash("message", "Data deleted successfully");
      fs.unlink(
        path.join(
          __dirname,
          "..",
          "public",
          "images",
          "clients",
          `${result.image}`
        ),
        err => {
          if (err) {
            res.redirect("/login/clients");
          } else {
            res.redirect("/login/clients");
          }
        }
      );
    }
  });
});

module.exports = loginRoute;
