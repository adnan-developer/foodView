const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch(() => {
      console.log("MongoDB Connection error");
    });
}

module.exports = connectToDB;
