import React, { useState } from 'react';
import logo from '../../img/logo.png';
// import { useNavigate } from "react-router-dom";
import {doc, setDoc
} from 'firebase/firestore';
import {createUserWithEmailAndPassword, sendEmailVerification
 } from 'firebase/auth';
 import { auth, db } from '../../firebase/firebase-config.jsx'; 

function Admin () { 
  const [registerPaswword, setRegisterPaswword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerRol, setRegisterRol] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')


  // let navigate = useNavigate();
   const createUserColl = async (idUser, name, rol, email) => {
    await setDoc( doc(db, 'users', idUser), {
      name,
      rol,
      email,
    });
  };
  

   const register = async () => {
    try {
     const client = await createUserWithEmailAndPassword(auth, registerEmail, registerPaswword);
    await sendEmailVerification(auth.currentUser)
     alert("se envió el correo de verificación")
    //navigate("/")
     await createUserColl(client.user.uid, registerName, registerRol, registerEmail)
     //console.log(client.user.email)
  }
  catch(error){
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
            <input type="text" placeholder='Nombre completo'

            onChange={(e) => {
                setRegisterName(e.target.value);
             }}/><br/>
             <input type="text" placeholder='rol'

            onChange={(e) => {
           setRegisterRol(e.target.value);
           }}/><br/>

            <input type="text" placeholder='Correo' name="name" 
                    onChange={(e) => {
                       setRegisterEmail(e.target.value);
                    }}
                 /> 
                 <br/>
                 <input type="password" placeholder='Contraseña' name="name" 
                    onChange={(e) => {
                       setRegisterPaswword(e.target.value);
                    }}
                 />
                 <button onClick={register}>REGISTRAR</button>
         </div>
         </div>
  </React.Fragment>
      );

    }
export default Admin