/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Log from './Components/Login/login.jsx'
import Register from './Components/Register/register.jsx';
import Product from './Components/View-clients/products.jsx';
import Admin from './Components/Admin/admin.jsx';
import Delivery from './Components/Delivery/delivery.jsx';
import Store from './Components/Store/store.jsx';
import Home from './Components/homeProducts/home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/product" element={<Home/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/Delivery" element={<Delivery/>} />
        <Route path="/Store" element={<Store/>} />
        
    </Routes>
  </BrowserRouter>
  );
}

export default App;
