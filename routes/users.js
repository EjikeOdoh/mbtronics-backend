const express = require("express");

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers); //Get all users
router.post("/", createUser); //create a new user
router.get("/:id", getUser); //get a specific user
router.patch("/:id", updateUser); //update a user's info
router.delete("/:id", deleteUser); //delete user

module.exports = router;
