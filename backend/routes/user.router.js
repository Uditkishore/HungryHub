const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/user.controller");
const { storage, fileFilter, limits } = require("../utils/multer-config");
const {
  authenticateUser,
  checkExistingUser,
} = require("../middlewares/authenticate");

const upload = multer({ storage, fileFilter, limits });

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ error: err.message });
};

router.post(
  "/signup",
  upload.single("file"),
  userController.signup
);
router.post("/login", checkExistingUser, userController.login);
router.get("/getAll", authenticateUser, userController.getAllUser);
router.get("/getUser", authenticateUser, userController.getUser);

router.use(errorHandler);

module.exports = router;
