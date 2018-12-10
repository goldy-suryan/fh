const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const packageSchema = Schema(
  {
    price: { type: String },
    title: { type: String },
    person: { type: String },
    rating: { type: String },
    list: { type: Array, default: [] },
    image: { type: String }
  },
  { collection: "packages" }
);

module.exports = mongoose.model("Packages", packageSchema);
