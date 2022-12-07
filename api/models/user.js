const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  aboutMe: String,
  fullname: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
