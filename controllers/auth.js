const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    return res.json({ status: "Success" });
  } catch (error) {
    return res.json({ status: "Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //check if user enter email and password
  if (!email || !password) {
    return res.send("Please provide email and password");
  }
  //search user email on db
  const user = await User.findOne({ email });
  //if not found
  if (!user) {
    res.clearCookie("token", { maxAge: 600000, httpOnly: true });
    return res.json({ status: "Error", message: "User not found" });
  }
  //if found, checking for password
  const isPasswordCorrect = await user.comparePassword(password);
  //if not correct
  if (!isPasswordCorrect) {
    res.clearCookie("token", { maxAge: 600000, httpOnly: true });
    return res.json({ status: "Error", message: "Password is not correct!" });
  }
  //if correct, create new token
  const token = user.createToken();
  //finally, send user details
  res.cookie("token", token, { maxAge: 600000, httpOnly: true });
  return res.json({
    userId: user?._id,
    email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    address: user?.address,
    car: user?.car,
  });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const query = { _id: userId };
    const user = await User.findOneAndUpdate(query, req.body, { new: true });
    if (!user) {
      return res.json({ status: "Error", message: "User not found" });
    }
    return res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Error", message: "Server Error" });
  }
};

module.exports = { register, login, updateUser };
