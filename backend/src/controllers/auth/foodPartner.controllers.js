const foodPartnerModel = require("../../models/auth/foodPartner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerFoodPartner = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res
        .status(400)
        .json({ message: "Food Partner account Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    return res.status(201).json({
      message: "Food Partner Account Registeres Successfully",
      foodPartner: {
        fullName,
        email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not exists" });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      foodPartner.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Email or password is invalid" });
    }
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.status(200).json({
      message: "Food Partner Logged In Successfully",
      foodPartner: {
        fullName : foodPartner.fullName,
        email : foodPartner.email,
      },
    }); 
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server error",err });
  }
};

const logOutFoodPartner = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Food Partner logged out successfully" });
};

module.exports = { registerFoodPartner, loginFoodPartner, logOutFoodPartner };