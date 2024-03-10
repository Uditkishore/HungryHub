// controllers/cart.controller.js

const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user
    console.log("userId", userId)
    const cart = await Cart.findOne({ user: userId }).populate("items.productId").lean().exec();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user
    console.log("userId", userId)
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user
    console.log("userId", userId)
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    const cartItem = cart.items.find((item) => item.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ success: false, error: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user
    console.log("userId", userId)
    const productId = req.params.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
