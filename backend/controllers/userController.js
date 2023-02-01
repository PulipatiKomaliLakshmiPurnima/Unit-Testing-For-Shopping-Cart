const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

// Register a User
exports.registerUser = async (req, res, next) => {
  const { name, email, password, mybalance } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists, Please Login" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    mybalance,
  });
  try {
    user.save();
  } catch (err) {
    return console.log(err);
  }
  sendToken(user, 200, res);
};

// Login User
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email }).select("+password");
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Couldnt Find User By This Email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  sendToken(user, 200, res, "Login Successfull");
};

// Logout User
exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

// Get User Detail
exports.getUserDetails = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};
