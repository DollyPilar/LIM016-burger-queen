import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import './admin.css';
import logoAdmin from '../../assets/dogLogIn.png';
import logoRegister from '../../assets/dogLogIn.png';
import { auth, db } from '../../firebase/firebase-config.jsx';
import { useNavigate } from 'react-router-dom';
import {NavBar} from "../HomePage/NavBar/NavBar.jsx";

function Admin() {
  const [registerPaswword, setRegisterPaswword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerRol, setRegisterRol] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const createUserColl = async (idUser, name, rol, email) => {
    try {
      await setDoc(doc(db, 'users', idUser), {
        name,
        rol,
        email,
        idUser,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const fields = Object.fromEntries(data.entries());
    if (
      fields.name.length === 0 ||
      fields.email.length === 0 ||
      fields.password.length === 0 ||
      fields.rol.length === 0
    ) {
      setErrorMsg('No puedes dejar el formulario vacio');
    }
    try {
      const client = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPaswword
      );
      await sendEmailVerification(auth.currentUser);
      alert('se envió el correo de verificación');
      //navigate('/')
      try {
        await createUserColl(
          client.user.uid,
          registerName,
          registerRol,
          registerEmail
        );
      } catch (e) {
        console.log(e);
      }
      //console.log(client.user.email)
    } catch (error) {
      const errMsg = error.code;
      if (errMsg === 'auth/email-already-in-use') {
        setErrorMsg('email en uso');
      } else {
        setErrorMsg('La contraseña debe tener al menos 6 caracteres');
      }
    }
  };

let navigate=useNavigate()

const goToProducts = ()=>{
  navigate("/AddProducts")
}

  return (
    <React.Fragment>
      <NavBar/>
      <div className='adminContainer'>
        <div className='adminSection'>
          <div className='adminWelcome'>
          <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2> <br></br>
          <button className='btnAddProducts' onClick={goToProducts}>Añadir productos</button>
          <img src={logoAdmin} alt='logo' className='logoAdmin'/>
        </div>
        </div>
        
        <div className='adminFormSection'>
          <form className='adminForm' onSubmit={handleRegister}>
            <input
              className='inputAdmin'
              type='text'
              placeholder='Nombre completo'
              name='name'
              onChange={(e) => {
                setRegisterName(e.target.value);
              }}
            />
            <input
              className='inputAdmin'
              type='text'
              placeholder='Rol'
              name='rol'
              onChange={(e) => {
                setRegisterRol(e.target.value);
              }}
            />
            <input
              className='inputAdmin'
              type='text'
              placeholder='Correo'
              name='email'
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
            />
            <input
              className='inputAdmin'
              type='password'
              placeholder='Contraseña'
              name='password'
              onChange={(e) => {
                setRegisterPaswword(e.target.value);
              }}
            />
            {errorMsg && (
              <>
                <div className='error-msg'>{errorMsg}</div>
              </>
            )}
            <button className='btnAdmin' type='submit'>REGISTRAR</button>
            </form>
            </div>
        </div>
    </React.Fragment>
  );
}
export default Admin;
