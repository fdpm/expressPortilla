const mongoose = require("mongoose")

const Schema = mongoose.Schema

let UserSchema = Schema({
  firstname: { type: String, required: true, max: 100 },
  lastname: { type: String, required: true, max: 100 },
  username: { type: String, required: true, min: 8 },
  identification: { type: Number, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  active: { type: Boolean, required: true },
  token: { type: String },
});

module.exports = mongoose.model("userModel", UserSchema);