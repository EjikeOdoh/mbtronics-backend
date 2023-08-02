//import mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema, model } = mongoose;

//create user schema
const CarSchema = new Schema({
  _id: String,
  brand: String,
  model: String,
  vin: String,
});

//export model
module.exports = model("Car", CarSchema);
