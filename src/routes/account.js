const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/Accountcontroller");

router.post("/register", accountController.createAccount);
router.post("/login", accountController.loginAccount);

router.put("/:id/edit", accountController.update);
router.get("/login", accountController.login);
router.get("/logout", accountController.logoutAccount);
router.get("/register", accountController.register);

// Sau khi đăng nhập thành công và trả về dữ liệu
router.get("/:id/me-account", accountController.account);

module.exports = router;
