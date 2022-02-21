import React from 'react';
// import logo from './logo.svg';
// import { fah } from "@fortawesome/free-regular-svg-icons";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';
import hulu from './hulu.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <div className='flex'>
      <img src={hulu} alt ="hulu" className='hul'/>
      < FontAwesomeIcon icon={faHome} className= 'home' style={{cursor:"pointer"}}/>
      </div>
      </header>
      <div className='body'>
      <p>
          soy el cuerpo
        </p>
      </div>
    </div>
  );
}

export default App;
