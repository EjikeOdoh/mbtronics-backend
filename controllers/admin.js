const User = require("../models/User");
const Order = require("../models/Order");
const {
  confirmedOrderMailer,
  declinedOrderMailer,
} = require("../utils/mailer");

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (error) {
    console.log(error);
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort("createdAt").populate("createdBy");
    return res.json({ orders });
  } catch (error) {
    console.log(error);
  }
};

//update an order in db
const updateOrder = async (req, res) => {
  const {
    body: { status },
    params: { id: orderId },
  } = req;

  try {
    const query = { _id: orderId };
    const order = await Order.findByIdAndUpdate(query, req.body, {
      new: true,
    }).populate("createdBy");
    if (!order) {
      return res.json({ msg: `${orderId} not found` });
    }
    const { product, date, time, price, status, createdBy } = order;
    const { email, firstName } = createdBy;
    if (status === "approved") {
      await confirmedOrderMailer(email, firstName, product, date, time, price);
    }

    if (status === "declined") {
      await declinedOrderMailer(email, firstName, product, date, time, price);
    }
    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

module.exports = { fetchAllUsers, fetchAllOrders, updateOrder };
