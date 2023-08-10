const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createToken();
  res.json({
    user: {
      email: user.email,
      name: user.firstName,
      token,
    },
  });
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
    return res.send("Invalid credentials");
  }

  //if found, checking for password
  const isPasswordCorrect = await user.comparePassword(password);

  //if not correct
  if (!isPasswordCorrect) {
    return res.send("Invalid credentials");
  }

  //if correct, create new token
  const token = user.createToken();

  //finally, send user details
  return res.json({
    user: user,
    token,
  });
};

module.exports = { register, login };
