const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth/auth.routes");
const foodPartnerRoutes = require("./routes/auth/foodPartner.routes");
const foodRoutes = require("./routes/food.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user", authRoutes);
app.use("/api/auth/foodPartner", foodPartnerRoutes);
app.use("/api/food", foodRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
module.exports = app;
