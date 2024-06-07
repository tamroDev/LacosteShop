const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/Productcontroller");

router.get("/new", productController.new);
router.get("/men", productController.men);
router.get("/women", productController.women);
router.get("/kid", productController.kid);
router.get("/:id/detail", productController.detail);
router.get("/cart", productController.cart);
router.get("/cart/api", productController.cartApi);
router.get("/cart/:id", productController.cartId);
router.post("/add", productController.add);
router.delete("/cart/:id/delete", productController.removeCart);

router.get("/search", productController.search);

module.exports = router;
