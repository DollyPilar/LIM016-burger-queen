import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../img/logo.png';
function Log() {
    return (
      <div className="Log">
         <div className = 'Logo'>
          <img src={logo} alt="logo" className="logo"/>
         </div>
         
         <div className='Buttons'>
            <button className='styleBtn'><Link to="/cliente">CLIENTE</Link></button>
            <button className='styleBtn'><Link to="/">PERSONAL</Link></button>

         </div>
        
         
        </div>
    );
  }
  
  export default Log;