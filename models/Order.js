//import mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema, model } = mongoose;

//create user schema
const OrderSchema = new Schema({
  product: String,
  date: String,
  time: String,
  price: String,
  email: String,
});

//export model
module.exports = model("Order", OrderSchema);
