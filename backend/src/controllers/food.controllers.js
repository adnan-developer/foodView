const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food Created Successfully",
    food: foodItem,
  });
};
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await foodModel.find();
    res
      .status(200)
      .json({ message: "Food Items fetched Successfully", foodItems });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching Food Items Error" });
  }
};
const getFoodItemsByPartner = async (req, res) => {
  const { id } = req.params;
  try {
    const foodItems = await foodModel.find({ foodPartner: id });
    return res
      .status(200)
      .json({ message: "Food Items Fetched Successfully", foodItems });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Getting Food Items By Partner error" });
  }
};
const likeFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({
        user: user._id,
        food: foodId,
      });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      return res.status(201).json({ message: "Video unliked successfully" });
    }
    const like = await likeModel.create({
      user: user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    return res.status(201).json({ message: "Video liked successfully", like });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Video like error", err });
  }
};
const saveFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const user = req.user;
    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });
    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
      });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: -1 } });

      return res.status(201).json({ message: "File unsaved successfully" });
    }
    const save = await saveModel.create({
      user: user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { saveCount: 1 } });

    return res.status(201).json({ message: "File saved successfully", save });
  } catch (err) {
    return res.status(500).json({ message: "File saving error", err });
  }
};
const getSaveFood = async (req, res) => {
  try {
    const user = req.user;
    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food");

    if (!savedFoods || savedFoods.length === 0) {
      return res.status(404).json({ message: "No saved foods found" });
    }
    res.status(200).json({
      message: "Saved foods retrived successfully",
      savedFoods,
    });
  } catch (err) {
    return res.status(500).json({ message: "Getting saved video error", err });
  }
};

module.exports = {
  createFood,
  getFoodItems,
  getFoodItemsByPartner,
  likeFood,
  saveFood,
  getSaveFood,
};
