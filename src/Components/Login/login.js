import React, { useState } from 'react';
import {createUserWithEmailAndPassword
   // ,onAuthStateChanged, signOut, signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../firebase-config'; 

// import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../img/logo.png';
function Log() {
   const [registerPaswword, setRegisterPaswword] = useState('')
   const [registerEmail, setRegisterEmail] = useState('')
   // const [logInPaswword, setLogInPaswword] = useState('')
   // const [logInEmail, setLogInEmail] = useState('')

   const register = async () => {
      try {
       const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPaswword);
       console.log(user)
    }
    catch(error){
       console.log(error.message);
    }
 
    }
   return (
      <div className="Log">
         <div className = 'Logo'>
            <img src={logo} alt="logo" className="logo"/>
         </div>
         <div className='form'>
         <React.Fragment className="form">
         <label>
            <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
               <input type="text" placeholder='Correo' name="name" 
                  onChange={(e) => {
                     setRegisterEmail(e.target.value);
                  }}
               /> 
               <br/>
               <input type="text" placeholder='Contraseña' name="name" 
                  onChange={(e) => {
                     setRegisterPaswword(e.target.value);
                  }}
               />
               <p>¿Olvidaste tu contraseña?</p>
               <button onClick={register}>REGISTRAR</button>
               <p>¿No tienes una cuenta?</p>
               <p>Regístrate</p>
         </label>
         </React.Fragment>
  </div>
  
         
        
         
        </div>
    );
  }
  
  export default Log;