const Bookings = require("../models/booking");

const bookingCtrl = {
  getBooking: (req, res) => {
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
  },

  deleteBooking: (req, res) => {
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
  }
};

module.exports = bookingCtrl;
