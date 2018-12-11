const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const gallerySchema = Schema(
  {
    name: { type: String },
    image: { type: String }
  },
  { collection: "gallery" }
);

module.exports = mongoose.model("Gallery", gallerySchema);
