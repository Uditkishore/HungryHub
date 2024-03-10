const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to handle authentication
exports.compairPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Incorrect email or password.");
    }

    req.authUser = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).send("Something went wrong");
  }
};

exports.authenticateUser = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authToken.split(" ")[1];

  jwt.verify(token, "your-secret-key", async (err, decoded_token) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }

    const user = await User.findOne({ _id: decoded_token.userId });

    if (user.roles === "admin") {
      return next();
    } else {
      return res.status(401).json({ error: "You are not authorized." });
    }
  });
};

// Middleware to check for duplicate user
exports.checkDuplicateUser = async (req, res, next) => {
  const { email, mobileNumber } = req.body;

  try {
    const userExist = await User.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });

    if (userExist) {
      return res
        .status(401)
        .send("User already exists with this email or mobile number.");
    }

    next();
  } catch (error) {
    console.error("Duplicate user check error:", error.message);
    return res.status(500).send("Something went wrong.");
  }
};
