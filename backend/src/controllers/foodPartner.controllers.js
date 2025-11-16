const foodPartnerModel = require("../models/auth/foodPartner.model");
const foodModel = require("../models/food.model");

const getFoodPartnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodPartner = await foodPartnerModel.findById(id);
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: id });
    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }
    return res.status(200).json({
      message: "Food Partner Fetched Successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Food Partner Fetching failed" });
  }
};

module.exports = { getFoodPartnerById };
