//import mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//import Schema
const { Schema, model } = mongoose;

//create user schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: String,
  lastName: String,
  phone: String,
  address: Map,
  car: Map,
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_LIFESPAN,
    }
  );
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//export model
module.exports = model("User", UserSchema);
