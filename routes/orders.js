const express = require("express");

const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");

const router = express.Router();

router.get("/", getAllOrders); //Get all orders
router.post("/", createOrder); //create a new order
router.get("/:id", getOrder); //get a specific order
router.patch("/:id", updateOrder); //update an order
router.delete("/:id", deleteOrder); //delete order

module.exports = router;
