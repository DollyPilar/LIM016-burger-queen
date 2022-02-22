/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// // import logo from './logo.svg';
// import { faSignOut, faHome, faShop } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import logoDos from './img/logo.png';
import oh from './img/oh.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex">
          <img src={logoDos} alt="hulu" className="hul" />
          <img src={oh} alt="hulu" className="order" />
          {/* <FontAwesomeIcon icon={faSignOut} className="signOut" />
          <FontAwesomeIcon icon={faShop} className="home" />
          <FontAwesomeIcon icon={faHome} className="home" style={{ cursor: 'pointer' }} /> */}
        </div>
      </header>
      <div className="body">
        <p>
          soy el cuerpo
        </p>
      </div>
    </div>
  );
}

export default App;
