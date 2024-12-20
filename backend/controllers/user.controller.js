const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.login = async (req, res) => {
  try {
    const user = req.authUser;

    // Generate a token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    if (!token) return res.status(401).json({ success: false, message: "Token Expired." });

    return res.status(201).json({
      success: true,
      token,
      user: user.roles
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).send("Something went wrong");
  }
};

exports.signup = async (req, res) => {
  const saltRounds = 10;
  const { username, password, email, mobileNumber, roles } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      mobileNumber,
      roles,
      profileImage: req.file ? req.file.filename : "",
    });

    return res.status(201).send(user);
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).send("Something went wrong.");
  }
};

exports.getUser = async (req, res) => {
  let { userId, iat } = req.userDetails
  try {
    const userDetail = await User.findOne(
      { _id: userId },
      {
        username: 1,
        email: 1,
        roles: 1,
        mobileNumber: 1,
        profileImage: 1,
      }
    );

    console.log("userDEt", userDetail)

    res.status(200).json({ status: true, data: userDetail })
    return;
  } catch (error) {
    console.log("error", error);
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
