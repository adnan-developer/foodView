const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  meals: {
    type: Number,
    default: 0,
  },
});

const foodPartnerModel = mongoose.model("foodPartner", foodPartnerSchema);

module.exports = foodPartnerModel;
