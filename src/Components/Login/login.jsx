import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import {signInWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config.jsx'; 
// import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../img/logo.png';

function Log() {
const [logInEmail, setLogInEmail] = useState('')
const [logInPaswword, setLogInPaswword] = useState('')
const [errorMsg, setErrorMsg]=useState('');
let navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault(e);
      const data = new FormData(e.target)
      const fields = Object.fromEntries(data.entries())
      if(fields.email.length === 0 || fields.password.length === 0){
         setErrorMsg('No puedes dejar el formulario vacio')
      } else {
         try {
         const client = await signInWithEmailAndPassword(auth, logInEmail, logInPaswword);
         if (client.user.emailVerified){
            const docRef = doc(db, "users", client.user.uid);
            const docSnap = await getDoc(docRef);
            //console.log (docSnap.doc.data())
            const userRol = docSnap.data().rol;
            if (userRol==="client"){
               navigate("/product")
            }
            else if (userRol==="admin"){
               navigate("/Admin")
            } else if (userRol==="store"){
               navigate("/Store")
            }
            else if (userRol==="delivery"){
               navigate("/Delivery")
            }
               }  else{
                  setErrorMsg('Por favor, verifica tu correo')
               }
    }  catch(error){
       const errMsg = error.code;
       if(errMsg === 'auth/user-not-found'){

          setErrorMsg('usuario no encontrado')
       }
       if(errMsg ==='auth/wrong-password'){
         setErrorMsg('contraseña no coincide con el ussuario')
       }
   }
}
}
   return (
      <React.Fragment>
      <div className="logInContainer">
         <div className = 'logoContainer'>
            <img src={logo} alt="logo" className="logo"/>
         </div>
         <div className='formContainer'>
            <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
            <form onSubmit = {handleLogin}> 
               <input type="text" placeholder='Correo' name="email" 
                  onChange={(e) => {
                     setLogInEmail(e.target.value);
                  }}
               /> 
               <br/>
               <input type="password" placeholder='Contraseña' name="password" 
                  onChange={(e) => {
                     setLogInPaswword(e.target.value);
                  }}
               />
                {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div></>}
               <p>¿Olvidaste tu contraseña?</p>
               <button type="submit">INICIAR SESIÓN</button>
               <p>¿No tienes una cuenta?</p>
               <Link to="/Register">Regístrate</Link>

            </form>
        </div>
      </div>

        </React.Fragment>
    );
  }
  
  export default Log;