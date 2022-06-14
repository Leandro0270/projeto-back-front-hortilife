const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");


router.post("/", controller.validarProduto, controller.post);

router.get("/", controller.get);


router.get("/:id", controller.validarId, controller.getById);

router.put("/:id", controller.validarId, controller.validarProduto, controller.put);


router.delete("/:id", controller.validarId, controller.delete);

module.exports = router;
