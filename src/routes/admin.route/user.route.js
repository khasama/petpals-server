const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers/admin.controller");

// router.delete("/sd/:id", ProductController.softDeleteProduct);
// router.put("/image/:id", ProductController.deleteProductImage);
// router.put("/:id", ProductController.updateProduct);
// router.post("/", ProductController.addProduct);
// router.get("/:id", PetController.getPet);
router.get("/", UserController.userPage);

module.exports = router;