const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enquirySchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { collection: "enquiry" }
);

module.exports = mongoose.model("Enquiries", enquirySchema);
