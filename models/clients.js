const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const clientSchema = Schema(
  {
    name: { type: String },
    title: { type: String },
    image: { type: String }
  },
  { collection: "client" }
);

module.exports = mongoose.model("Clients", clientSchema);
