var ObjectId = require("mongodb").ObjectId; //ObjectId initialization
const Order = require("../models/Order");

//Get all orders for db
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      msg: "Get all users",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//create new entry in db
const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    return res.json({ msg: "Created new order", data: newOrder });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//get specific order from db
const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  try {
    const order = await User.findOne({ _id: orderId });
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    return res.json({ data: order });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//update an order in db
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;

  try {
    const query = { _id: new ObjectId(orderId) };
    const order = await Order.findOneAndUpdate(query, req.body, { new: true });
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    return res.json({
      msg: "Success",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//delete an order from db
const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  try {
    const order = await Order.findOneAndDelete({ _id: new ObjectId(orderId) });
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    return res.json({
      order,
    });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
