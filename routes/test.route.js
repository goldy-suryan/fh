const Bookings = require("../models/client");

const bookingCtrl = {
  addBooking: (req, res) => {
    const booking = new Bookings();
    if (req.body.name && req.body.address && req.body.phone) {
      booking.name = req.body.name;
      booking.address = req.body.address;
      booking.phone = req.body.phone;

      booking.save((err, result) => {
        if (err) {
          res.status(500).json({
            error: err
          });
        } else {
          res.status(201).json({
            message: "booking placed successfully",
            data: result
          });
        }
      });
    } else {
      res.status(401).json({
        message: "please fill all the feilds"
      });
    }
  }
};

module.exports = bookingCtrl;
