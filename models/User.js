//import mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema, model } = mongoose;

//create user schema
const UserSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  phone: String,
  address: Map,
  car: Map,
});

//export model
module.exports = model("User", UserSchema);
