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
  approved: {
    type: Boolean,
    default: false,
  },
});

//export model
module.exports = model("Order", OrderSchema);
