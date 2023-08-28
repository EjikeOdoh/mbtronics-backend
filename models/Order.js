//import mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema, model, Types } = mongoose;

//create user schema
const OrderSchema = new Schema(
  {
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
    status: {
      type: String,
      enum: ["approved", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

//export model
module.exports = model("Order", OrderSchema);
