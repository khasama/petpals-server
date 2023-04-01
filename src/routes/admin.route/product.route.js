const express = require("express");
const router = express.Router();
const { ProductController } = require("../../controllers/admin.controller");

router.delete("/sd/:id", ProductController.softDeleteProduct);
router.put("/image/:id", ProductController.deleteProductImage);
router.put("/:id", ProductController.updateProduct);
router.post("/", ProductController.addProduct);
router.get("/:id", ProductController.getProduct);
router.get("/", ProductController.productPage);

module.exports = router;