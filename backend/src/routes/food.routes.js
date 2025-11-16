const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controllers");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});
/* Post /api/food/ [protected] */
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);
/* Get /api/food/ [protected] */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

/* Get /api/food/foodPartner/:id [protected] */
router.get(
  "/partner/:id",
  authMiddleware.authUserMiddleware,
  foodController.getFoodItemsByPartner
);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood
);
module.exports = router;
