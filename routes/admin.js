const express = require("express");
const {
  fetchAllOrders,
  fetchAllUsers,
  updateOrder,
} = require("../controllers/admin");

const router = express.Router();

router.route("/orders").get(fetchAllOrders);
router.route("/users").get(fetchAllUsers);
router.route("/order/:id").patch(updateOrder);

module.exports = router;
