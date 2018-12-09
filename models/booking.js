const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    person: { type: Number, required: true },
    address: { type: String, required: true },
    date: { type: String, required: true }
  },
  { collection: "bookings" }
);

module.exports = mongoose.model("Bookings", bookingSchema);
