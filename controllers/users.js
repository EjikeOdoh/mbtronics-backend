const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      msg: "Get all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.json({ msg: "Created new user", data: newUser });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.json({ msg: `${userId} not found` });
    }
    return res.json({ data: user });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const query = { _id: userId };
    const user = await User.findOneAndUpdate(query, req.body, { new: true });
    if (!user) {
      return res.json({ msg: `${userId} not found` });
    }
    return res.json({
      msg: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      return res.json({ msg: `${userId} not found` });
    }
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.send("Server error");
  }
};

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
