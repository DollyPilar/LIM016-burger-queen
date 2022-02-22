/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Log from './Components/Login/login.js'
import Cliente from './Components/cliente/cliente.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log/>} />
        <Route path="/cliente" element={<Cliente/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
