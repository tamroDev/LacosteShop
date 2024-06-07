const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/Admincontroller");
const checkRole = require("../middlware/checkRole");
const upload = require("../middlware/multerConfig");

//product
router.post("/product/add", upload.array("images"), adminController.add);
router.delete("/product/:id/delete", adminController.destroy);
router.get("/product/add", adminController.productAdd);
router.get("/product/list", adminController.productList);
router.get("/product/trash", adminController.trashProduct);
router.get("/product/api", adminController.apiProduct);
router.get("/product/:id/edit", adminController.edit);
router.put("/product/:id/edit", upload.array("images"), adminController.update);
router.patch("/product/:id/restore", adminController.restore);
router.delete("/product/:id/hardDelete", adminController.hardDeleteProduct);

// category
router.get("/category/api", adminController.apiCategory);
router.get("/category/add", adminController.categoryAdd);
router.get("/category/list", adminController.readApiCategory);
router.get("/category/trash", adminController.categoryTrash);
router.post("/category/add", adminController.createCategory);
router.delete("/category/:id/delete", adminController.categoryDelete);
router.get("/category/:id/update", adminController.categoryUpdate);
router.put("/category/:id/edit", adminController.categoryEdit);
router.patch("/category/:id/restore", adminController.restoreCategory);
router.delete("/category/:id/hardDelete", adminController.hardDeleteCategory);

// Account
router.get("/account/list", adminController.readApiAccount);
router.get("/account/api", adminController.apiAccount);
router.patch("/account/:id/updateRole", adminController.updateRole);
router.patch("/account/:id/updateStatus", adminController.updateStatus);

module.exports = router;
