const express = require("express");
const {
  uploadProductImages,
  createProduct,
  fetchProducts,
  fetchProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
  fetchSimilarProducts,
  updateQuantity
} = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });

router.post(
  "/uploadProductImages",
  upload.array("images", 12),
  uploadProductImages
);
router.post("/createProduct", createProduct);
router.get("/fetchProducts", fetchProducts);
router.get("/fetchProduct/:productId", fetchProduct);
router.get("/fetchSimilarProducts/:productId", fetchSimilarProducts);
router.delete("/deleteProduct/:productId", deleteProduct);
router.put("/updateProduct/:productId", updateProduct);
router.get("/searchProducts", searchProducts);
router.put('/updateQuantity/:productId', updateQuantity)

module.exports = router;
