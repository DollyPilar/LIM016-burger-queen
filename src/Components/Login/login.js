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
         <div className='form'>
<label>
   <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
    <input type="text" placeholder='Correo' name="name" /> <br/>
    <input type="text" placeholder='Contraseña' name="name" />
    <p>¿Olvidaste tu contraseña?</p>
    <button>INICIAR SESIÓN</button>
    <p>¿No tienes una cuenta?</p>
    <p>Regístrate</p>
  </label>
  </div>
         
        
         
        </div>
    );
  }
  
  export default Log;