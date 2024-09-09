const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to handle authentication
exports.authenticateUser = async (req, res, next) => {
  try {

    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwt.verify(token, "your-secret-key");

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).json({ status: false, msg: "Unauthorized" });
    }

    if (decoded) {
      req.user = decoded.userId,
      req.userDetails = decoded,
      req.token = token;
      return next();
    };

  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, msg: "Unauthorized" });
  }
}

// Check for duplicate user inside database
exports.checkExistingUser = async (req, res, next) => {
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
