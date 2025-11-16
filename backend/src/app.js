const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userAuthRoutes = require("./routes/auth/user.routes");
const foodPartnerAuthRoutes = require("./routes/auth/foodPartner.routes");
const foodPartnerRoutes = require("./routes/foodPartner.routes");
const foodRoutes = require("./routes/food.routes");
const cors = require("cors");

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/foodPartner", foodPartnerAuthRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/foodPartner", foodPartnerRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
module.exports = app;
