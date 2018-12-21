const express = require("express"),
  loginRoute = express.Router(),
  bookings = require("../controllers/dashboard-ctl"),
  enquiry = require("../controllers/enquiry-ctl"),
  users = require("../controllers/login-ctl"),
  packages = require("../controllers/packages-ctl"),
  gallery = require("../controllers/gallery-ctl"),
  client = require("../controllers/clients-ctl"),
  verify = require("../auth/verify"),
  multer = require("multer"),
  storage = multer.diskStorage({
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
  }),
  fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Can only upload jpg or jpeg files"), false);
    }
  },
  upload = multer({
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

loginRoute.post("/", users.verifyUser);

// verify
// ================LOGIN/DASHBOARD=====================//

loginRoute.get("/dashboard", verify, bookings.getBooking);

loginRoute.delete("/dashboard/:id", verify, bookings.deleteBooking);

// ================LOGIN/ENQUIRY=====================//

loginRoute.get("/enquiry", verify, enquiry.getEnquiry);

loginRoute.delete("/enquiry/:id", verify, enquiry.deleteEnquiry);

// ================LOGIN/PACKAGES=====================//

loginRoute.get("/packages", verify, packages.getPackages);

loginRoute.post(
  "/packages",
  verify,
  upload.single("image"),
  packages.postPackages
);

loginRoute.delete("/packages/:id", verify, packages.deletePackages);

// ================LOGIN/GALLERY=====================//
loginRoute.get("/gallery", verify, gallery.getGalleryImages);

loginRoute.post(
  "/gallery",
  verify,
  upload.single("galleryImage"),
  gallery.postGalleryImages
);

loginRoute.delete("/gallery/:id", verify, gallery.delteGalleryImages);

// ================LOGIN/CLIENTS=====================//

loginRoute.get("/clients", verify, client.getClients);

loginRoute.post(
  "/clients",
  verify,
  upload.single("clientImage"),
  client.postClients
);

loginRoute.delete("/clients/:id", verify, client.deleteClient);

module.exports = loginRoute;
