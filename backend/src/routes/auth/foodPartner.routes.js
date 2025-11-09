const express = require("express");
const router = express.Router();
const foodPartnerController = require("../../controllers/auth/foodPartner.controllers");

router.post("/register", foodPartnerController.registerFoodPartner);
router.post("/login", foodPartnerController.loginFoodPartner);
router.get("/logout", foodPartnerController.logOutFoodPartner);

module.exports = router;