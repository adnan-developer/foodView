import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodPartnerLogin from "../pages/auth/foodPartner/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/auth/foodPartner/FoodPartnerRegister";
import UserLogin from "../pages/auth/user/UserLogin";
import UserRegister from "../pages/auth/user/UserRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/foodPartner/CreateFood";
import Profile from "../pages/foodPartner/Profile";
import BottomNav from "../Components/BottomNav";
import Saved from "../pages/general/Saved";

const AuthRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodPartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
        <Route
          path="/"
          element={
            <>
              <Home />
              <BottomNav />
            </>
          }
        />
        <Route
          path="/saved"
          element={
            <>
              <Saved />
              <BottomNav />
            </>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/createFood" element={<CreateFood />} />
        <Route path="/foodPartner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AuthRoutes;
