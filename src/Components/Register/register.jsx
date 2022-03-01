import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase-config.jsx';
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
  return (
    <React.Fragment>
      <div className='logInContainer'>
        <div className='logoContainer'>
          <img src={logo} alt='logo' className='logo' />
        </div>

        <div className='formContainer'>
          <div className= "form">
          <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
          <form>
          <div className='input'>
          <input
            className='input'
            type='text'
            placeholder='Nombre completo'
            onChange={(e) => {
              setRegisterName(e.target.value);
            }}
          /> </div>
          <br/>
          <div className='input'>
          <input
            className='input'
            type='text'
            placeholder='Correo'
            name='name'
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          /> </div>
          <br/>
          <div className='input'>
          <input
            className='input'
            type='password'
            placeholder='Contraseña'
            name='name'
            onChange={(e) => {
              setRegisterPaswword(e.target.value);
            }}
          /> </div> <br/>
          <div className='input'>
          <button onClick={register} className="input" id="btn">REGISTRAR</button>
          </div>
          </form>
        </div>
        </div>
        </div>
    </React.Fragment>
  );
}
export default Register;
