const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const loginSchema = Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }
  },
  { collection: "admin" }
);

module.exports = mongoose.model("Admin", loginSchema);
