import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import {signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../firebase-config'; 

// import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../img/logo.png';
function Log() {
const [logInPaswword, setLogInPaswword] = useState('')
const [logInEmail, setLogInEmail] = useState('')
let navigate = useNavigate();


   const login = async () => {
      try {
       const client = await signInWithEmailAndPassword(auth, logInEmail, logInPaswword);
       if (client.user.emailVerified){
         navigate("/product");
       }
       else{
          alert("Por favor, verifica tu correo")
       }
    }
    catch(error){
       console.log(error.message);
    }
 
    }
   return (
      <React.Fragment>
      <div className="Log">
         <div className = 'Logo'>
            <img src={logo} alt="logo" className="logo"/>
         </div>
         <div className='form'>
         <label>
            <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
               <input type="text" placeholder='Correo' name="name" 
                  onChange={(e) => {
                     setLogInEmail(e.target.value);
                  }}
               /> 
               <br/>
               <input type="text" placeholder='Contraseña' name="name" 
                  onChange={(e) => {
                     setLogInPaswword(e.target.value);
                  }}
               />
               <p>¿Olvidaste tu contraseña?</p>
               <button onClick={login}>INICIAR SESIÓN</button>
               <p>¿No tienes una cuenta?</p>
               <Link to="/Register">Regístrate</Link>
         </label>
  </div>
        </div>

        </React.Fragment>
    );
  }
  
  export default Log;