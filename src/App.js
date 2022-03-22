/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { IndexDelivery } from "./Components/Delivery/IndexDelivery.jsx";
import ToBeDelivered from "./Components/Delivery/ProductsToBeDelivered/ProductToBeDelivered.jsx";
import Delivered from "./Components/Delivery/DeliveredProducts/DeliveredProducts.jsx";

import { StoreIndex } from "./Components/Store/StoreIndex.jsx";
import OrderToSent from "./Components/Store/OrdersToSent/OrderToSent.jsx";
import OrderSent from "./Components/Store/OrderSent/OrderSent.jsx";

import Admin from "./Components/Admin/AdminIndex.jsx";
import AdminHome from "./Components/Admin/AdminHome/AdminHome.jsx";
import { StaffList } from "./Components/Admin/StaffList/StaffList.jsx";
import { AddStaffForm } from "./Components/Admin/AddStaffForm/AddStaffForm.jsx";
import { ProductList } from "./Components/Admin/ProductsList/ProductsList.jsx";
import { AddProducts } from "./Components/Admin/AddProducts/AddProducts.jsx";
import { OrderHistory } from "./Components/Admin/OrdersHistory/OrderHistory.jsx";

import { NavBar } from "./Components/NavBar/NavBar.jsx";
import { HomePage } from "./Components/HomePage/HomePage.jsx";
import { Shop } from "./Components/Clients/Shop/Shop.jsx";
import LogIn from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import { Cart } from "./Components/Clients/Cart/Cart.jsx";
// import { ProtectedRoute } from "./Components/Route/ProtectedRoute.jsx";
import { AuthProvider } from "./Components/Route/AuthContext.jsx";
import { RolProvider } from "./Components/Route/RolContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RolProvider>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Shop />} />
              <Route path="login" element={<LogIn />} />
              <Route path="register" element={<Register />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
            <Route path="/admin/*" element={<Admin />}>
              <Route index element={<AdminHome />} />
              <Route path="stafflist" element={<StaffList />} />
              <Route path="addStaff" element={<AddStaffForm />} />
              <Route path="productslist" element={<ProductList />} />
              <Route path="addProducts" element={<AddProducts />} />
              <Route path="orderhistory" element={<OrderHistory />} />
            </Route>
            {/* </Route> */}
            {/* <Route element={<ProtectedRoute allowedRoles={["delivery"]} />}> */}
            <Route path="/delivery/*" element={<IndexDelivery />}>
              <Route index element={<ToBeDelivered />} />
              <Route path="deliveredproducts" element={<Delivered />} />
            </Route>
            {/* </Route>
            <Route element={<ProtectedRoute allowedRoles={["store"]} />}> */}
            <Route path="/store/*" element={<StoreIndex />}>
              <Route index element={<OrderToSent />} />
              <Route path="ordersent" element={<OrderSent />} />
            </Route>
            {/* </Route> */}
          </Routes>
        </RolProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
