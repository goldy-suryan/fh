const Gallery = require("../models/gallery");
const fs = require("fs");
const path = require("path");

const galleryCtrl = {
  getGalleryImages: (req, res) => {
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
  },

  postGalleryImages: (req, res) => {
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
  },

  delteGalleryImages: (req, res) => {
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
  }
};

module.exports = galleryCtrl;
