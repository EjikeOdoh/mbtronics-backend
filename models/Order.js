//import mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema, model } = mongoose;

//create user schema
const OrderSchema = new Schema({
  product: {
    type: String,
    required: [true, "must provide product"],
  },
  date: {
    type: String,
    required: [true, "must provide date"],
  },
  time: {
    type: String,
    required: [true, "must provide time"],
  },
  price: {
    type: String,
    required: [true, "must provide price"],
  },
  email: {
    type: String,
    required: [true, "must provide email"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

//export model
module.exports = model("Order", OrderSchema);
