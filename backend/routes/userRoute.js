const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/getallusers").get(isAuthenticatedUser, getUserDetails);


module.exports = router;
