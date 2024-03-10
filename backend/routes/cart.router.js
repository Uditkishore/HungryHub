// routes/cart.routes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { authenticateUser } = require("../middlewares/authenticate");

router.get("/cartItem", authenticateUser, cartController.getCart);
router.post("/cartItem/add", authenticateUser, cartController.addToCart);
router.put("/cartItem/update", authenticateUser, cartController.updateCartItem);
router.delete("/cartItem/remove/:id", authenticateUser, cartController.removeFromCart);

module.exports = router;
