import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import {signInWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import { auth, db } from '../../firebase-config'; 

// import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../img/logo.png';
function Log() {
const [logInPaswword, setLogInPaswword] = useState('')
const [logInEmail, setLogInEmail] = useState('')
let navigate = useNavigate();



// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

   const login = async () => {
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
      alert("Por favor, verifica tu correo")
   }
   
 
    }  catch(error){
      console.log(error.message);
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
               <input type="text" placeholder='Correo' name="name" 
                  onChange={(e) => {
                     setLogInEmail(e.target.value);
                  }}
               /> 
               <br/>
               <input type="password" placeholder='Contraseña' name="name" 
                  onChange={(e) => {
                     setLogInPaswword(e.target.value);
                  }}
               />
               <p>¿Olvidaste tu contraseña?</p>
               <button onClick={login}>INICIAR SESIÓN</button>
               <p>¿No tienes una cuenta?</p>
               <Link to="/Register">Regístrate</Link>
        </div>
      </div>

        </React.Fragment>
    );
  }
  
  export default Log;