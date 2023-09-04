const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // check header
  const { token } = req.cookies;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    
  } catch (error) {
    return res.send("Invalid authentication");
  }
};

module.exports = auth;
