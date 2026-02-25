const express = require("express");
const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/auth");
const { uploadProduct } = require("../middleware/uploadMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, uploadProduct.single('image'), createProduct);
router.put("/:id", protect, admin, uploadProduct.single('image'), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/:id", getProductById);

module.exports = router;
