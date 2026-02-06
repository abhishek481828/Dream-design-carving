const express = require("express");
const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, upload.single('image'), createProduct);
router.put("/:id", protect, admin, upload.single('image'), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.get("/:id", getProductById);

module.exports = router;
