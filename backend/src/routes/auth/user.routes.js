const express = require("express");
const router = express.Router();
const userController = require("../../controllers/auth/user.controllers");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logOutUser);

module.exports = router;
