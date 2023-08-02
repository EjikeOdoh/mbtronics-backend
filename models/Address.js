//import mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema, model } = mongoose;

//create user schema
const AddressSchema = new Schema({
  street: String,
  town: String,
  state: String,
  email: String,
});

//export model
module.exports = model("Address", AddressSchema);
