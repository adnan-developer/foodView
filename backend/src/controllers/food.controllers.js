const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  const { name, description } = req.body;
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  const foodItem = await foodModel.create({
    name,
    description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "Food Created Successfully",
    food: {
      name: foodItem.name,
      description: foodItem.description,
      video: foodItem.video,
      foodPartner: foodItem.foodPartner,
    },
  });
};
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find();
    res
      .status(200)
      .json({ message: "Food Items fetched Successfully", foodItems });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { createFood, getFoodItems };
