const express = require("express");
const router = express.Router();
const { ItemController } = require("../../controllers/admin.controller");

router.delete("/sub/:id", ItemController.deleteSubitem);
router.post("/sub/:id", ItemController.addSubitem);
router.post("/", ItemController.addItem);
router.get("/", ItemController.itemPage);

module.exports = router;