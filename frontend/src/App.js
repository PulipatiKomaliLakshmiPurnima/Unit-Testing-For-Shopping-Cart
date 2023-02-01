import React from "react";
import Home from "./screens/HomeScreen";
import Cart from "./screens/CartScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route } from "react-router-dom";
import Productdetail from "./screens/Productdetail";
import Loginscreen from "./screens/LoginScreen";
import Favourite from "./screens/FavouriteScreen";
import Registerscreen from "./screens/RegisterScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<Productdetail />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/:category/:subcat" element={<Home />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </div>
  );
}

export default App;
