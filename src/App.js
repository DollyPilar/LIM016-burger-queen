/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import { IndexDelivery } from "./Components/Delivery/IndexDelivery.jsx";
import ToBeDelivered from "./Components/Delivery/ProductsToBeDelivered/ProductToBeDelivered.jsx";
import Delivered from "./Components/Delivery/ProductsToBeDelivered/ProductToBeDelivered.jsx";
import { StoreIndex } from "./Components/Store/StoreIndex.jsx";
import OrderToSent from "./Components/Store/OrdersToSent/OrderToSent.jsx";
import OrderSent from "./Components/Store/OrderSent/OrderSent.jsx";
import { HomePage } from "./Components/HomePage/HomePage.jsx";
import { Cart } from "./Components/Clients/Cart/Cart.jsx";
import { AddProducts } from "./Components/Admin/AddProducts/AddProducts.jsx";
import Admin from "./Components/Admin/AdminIndex.jsx";
import AdminHome from "./Components/Admin/AdminHome/AdminHome.jsx";
import { StaffList } from "./Components/Admin/StaffList/StaffList.jsx";
import { AddStaffForm } from "./Components/Admin/AddStaffForm/AddStaffForm.jsx";
import { ProductList } from "./Components/Admin/ProductsList/ProductsList.jsx";
import { AddProducts } from "./Components/Admin/AddProducts/AddProducts.jsx";
import { OrderHistory } from "./Components/Admin/OrdersHistory/OrderHistory.jsx";
import { IndexClient } from "./Components/Clients/IndexClient.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/product" element={<IndexClient />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route index element={<AdminHome />} />
          <Route path="stafflist" element={<StaffList />} />
          <Route path="addStaff" element={<AddStaffForm />} />
          <Route path="productslist" element={<ProductList />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="orderhistory" element={<OrderHistory />} />
        </Route>
        <Route path="/delivery/*" element={<IndexDelivery />}>
          <Route index element={<ToBeDelivered />} />
          <Route path="deliveredproducts" element={<Delivered />} />
        </Route>
        <Route path="/store/*" element={<StoreIndex />}>
          <Route index element={<OrderToSent />} />
          <Route path="ordersent" element={<OrderSent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
