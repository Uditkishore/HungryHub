const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  const { name, category, price, rating, quantity, image, description } = req.body;
  try {
    const product = new Product({
      name,
      category,
      price,
      rating,
      quantity,
      image,
      description,
    });
    await product.save();
    return res.status(201).send({ success: true, data: product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.getProducts = async (req, res) => {
  console.log("products")
  try {
    const products = await Product.find().lean().exec();
    return res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).lean().exec();
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, category, price, rating, quantity, image, description } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, category, price, rating, quantity, image, description },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: deletedProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};