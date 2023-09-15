const express = require("express");
const {
  register,
  login,
  updateUser,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update/:id", updateUser);
router.post("/resetpasswordrequest", resetPasswordRequest);
router.post("/resetpassword", resetPassword);

module.exports = router;
