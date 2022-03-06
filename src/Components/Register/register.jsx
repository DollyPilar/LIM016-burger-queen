import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import './register.css';
import { auth, db } from '../../firebase/firebase-config.jsx';
import logoRegister from '../../assets/dogLogIn.png';
import {NavBar} from "../HomePage/NavBar/NavBar.jsx"

function Register() {
  const [registerPaswword, setRegisterPaswword] = useState('');

  const [registerName, setRegisterName] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');

  let navigate = useNavigate();
  const createUserColl = async (idUser, name, email) => {
    await setDoc(doc(db, 'users', idUser), {
      name,
      rol: 'client',
      email,
      idUser,
    });
  };

  const register = async () => {
    try {
      const client = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPaswword
      );
      await sendEmailVerification(auth.currentUser);
      alert('se envió el correo de verificación');
      navigate('/');
      await createUserColl(client.user.uid, registerName, registerEmail);
      //console.log(client.user.email)
    } catch (error) {
      console.log(error.message);
    }
  };

  return(
    <React.Fragment>
      <NavBar/>
      <div className='registerContainer'>
        <div className='logoSection'>
        <div className='welcomeSection'>
        <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
          <img src={logoRegister} alt='logo' className='logoRegister' />
        </div>
        </div>

        <div className='formSection'>
    
          <form className= "registerForm">

          <input
            className='inputRegister'
            type='text'
            placeholder='Nombre completo'
            onChange={(e) => {
              setRegisterName(e.target.value);
            }}
          /> 
          <input
            className='inputRegister'
            type='text'
            placeholder='Correo'
            name='name'
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          /> 
          <input
            className='inputRegister'
            type='password'
            placeholder='Contraseña'
            name='name'
            onChange={(e) => {
              setRegisterPaswword(e.target.value);
            }}
          /> 
          {/* {errorAlert && (
              <>
                <div className='errorAlert'>{errorAlert}</div>
              </>
            )} */}
          <button onClick={register} className="btnRegister" type='submit'>REGISTRAR</button>
          </form>
        </div>
        </div>
    </React.Fragment>
  );
}
export default Register;
