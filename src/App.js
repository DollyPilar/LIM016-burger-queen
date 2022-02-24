/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Log from './Components/Login/login.jsx'
import Register from './Components/Register/register.jsx';
import Product from './Components/View-clients/products.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Product" element={<Product/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
