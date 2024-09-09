const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/product.controller");
const { storage, fileFilter, limits } = require("../utils/multer-config");
const { authenticateUser } = require("../middlewares/authenticate");

const upload = multer({ storage, fileFilter, limits });

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ error: err.message });
};

// CRUD Routes
router.post("/create", authenticateUser, upload.single('file'), productController.createProduct);

router.get("/products", productController.getProducts);

router.get("/detail/:id", productController.getSingleProduct);

router.put("/product/:id", authenticateUser, upload.single('file'), productController.updateProduct);

router.delete("/product/:id", authenticateUser, productController.deleteProduct);

router.use(errorHandler);

module.exports = router;
