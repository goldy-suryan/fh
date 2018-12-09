const express = require("express"),
  bookingRoute = express.Router(),
  Bookings = require("../models/booking");

bookingRoute.post("/", (req, res) => {
  const booking = new Bookings({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    person: req.body.person,
    date: req.body.date
  });
  if (req.body.name && req.body.address && req.body.phone && req.body.person) {
    booking.save((err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        // res.status(201).json({
        //   message: "booking placed successfully",
        //   data: result
        // });
        req.flash(
          "booking",
          "Booked successfully, we'll soon get in touch with you"
        );
        res.redirect(req.headers.referer);
      }
    });
  } else {
    res.json({ message: "please fill all the fields" });
  }
});

module.exports = bookingRoute;
