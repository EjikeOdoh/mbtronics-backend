const User = require("../models/User");
const Token = require("../models/Token");
const {
  newUserMailer,
  resetPasswordRequestMailer,
} = require("../utils/mailer");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    await newUserMailer(user.email, user.firstName);
    return res.json({ status: "Success" });
  } catch (error) {
    console.log(error);
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
    status: "Success",
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

const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "Error", msg: "Email not found!" });
    }

    let token = await Token.findOne({});
    if (token) {
      await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString("hex");

    await Token.create({
      userId: user._id,
      token: resetToken,
    });

    const url = `google.com`;

    resetPasswordRequestMailer(user.email, user.firstName, url);

    return res.json({
      status: "Success",
      data: {
        id: user._id,
        token: resetToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Error", message: "Server Error" });
  }
};

const resetPassword = async (req, res) => {};

module.exports = {
  register,
  login,
  updateUser,
  resetPasswordRequest,
  resetPassword,
};
