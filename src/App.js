/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./Components/Login/login.jsx";
import Register from "./Components/Register/register.jsx";
import Admin from "./Components/Admin/admin.jsx";
import Delivery from "./Components/Delivery/Delivery.jsx";
import Dolly from "./Components/Store/Store.jsx";
import Home from "./Components/Clients/Home.jsx";
import { HomePage } from "./Components/HomePage/HomePage.jsx";
import { Cart } from "./Components/Clients/Cart/Cart.jsx";
import { AddProducts } from "./Components/Admin/AddProducts/AddProducts.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/product" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/Store" element={<Dolly />} />
        <Route path="/AddProducts" element={<AddProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
