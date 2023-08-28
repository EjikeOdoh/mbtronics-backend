const Order = require("../models/Order");

//Get all orders for db
const getAllOrders = async (req, res) => {
  const { userId } = req.user;
  try {
    const orders = await Order.find({ createdBy: userId }).sort("createdAt");
    res.status(200).json({
      orders,
      count: orders.length,
    });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//create new entry in db
const createOrder = async (req, res) => {
  req.body.createdBy = req.user.userId;
  try {
    const order = await Order.create(req.body);
    return res.status(201).json({ order });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//get specific order from db
const getOrder = async (req, res) => {
  // const { id: orderId } = req.params;
  const {
    user: { userId },
    params: { id: orderId },
  } = req;

  try {
    const order = await User.findOne({ _id: orderId, createdBy: userId });
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//update an order in db
const updateOrder = async (req, res) => {
  // const { id: orderId } = req.params;

  const {
    body: { status },
    user: { userId },
    params: { id: orderId },
  } = req;

  try {
    const query = { _id: orderId, createdBy: userId };
    const order = await Order.findByIdAndUpdate(query, req.body, { new: true });
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

//delete an order from db
const deleteOrder = async (req, res) => {
  const {
    user: { userId },
    params: { id: orderId },
  } = req;
  try {
    const query = { _id: orderId, createdBy: userId };
    const order = await Order.findByIdAndRemove(query);
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    return res.status(200).send();
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
