import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config.jsx';
import {NavBar} from "../HomePage/NavBar/NavBar.jsx"
import './login.css';
import logo from '../../assets/PawLogo.png';

function Log() {
  const [errorMsg, setErrorMsg] = useState('');
  let navigate = useNavigate();
  const initialState = {
    email: '',
    password: '',
  };
  const [state, setState] = useState(initialState);

  const { email, password } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorMsg('No puedes dejar campos vacíos');
    } else {
      try {
        const client = await signInWithEmailAndPassword(auth, email, password);
        if (client.user.emailVerified) {
          const docRef = doc(db, 'users', client.user.uid);
          const docSnap = await getDoc(docRef);
          //console.log (docSnap.doc.data())
          const userRol = docSnap.data().rol;
          if (userRol === 'client') {
            navigate('/product');
          } else if (userRol === 'admin') {
            navigate('/Admin');
          } else if (userRol === 'store') {
            navigate('/Store');
          } else if (userRol === 'delivery') {
            navigate('/Delivery');
          }
        } else {
          setErrorMsg('Por favor, verifica tu correo');
        }
      } catch (error) {
        const errMsg = error.code;
        if (errMsg === 'auth/user-not-found') {
          setErrorMsg('usuario no encontrado');
        }
        if (errMsg === 'auth/wrong-password') {
          setErrorMsg('contraseña no coincide con el ussuario');
        }
      }
    }
  };
  return (
    <React.Fragment>
      <NavBar/>
      <div className='logInContainer'>
        <div className='logoContainer'>
          <img src={logo} alt='logo' className='logo' />
        </div>
        
        <div className='formContainer'>
        
          <form className= "form" onSubmit={handleLogin}>
          <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
        
            <input 
              className='input'
              type='text'
              placeholder='Correo'
              name='email'
              id='email'
              onChange={handleInputChange}
              value={email}
            />
            <input
              className='input'
              type='password'
              placeholder='Contraseña'
              name='password'
              id='password'
              onChange={handleInputChange}
              value={password}
            /> 
            {errorMsg && (
              <>
                <div className='errorMsg'>{errorMsg}</div>
              </>
            )}
            <p className='infoLogin infoUnderline'>¿Olvidaste tu contraseña?</p>
            <button className='btnLogin' id='btn' type='submit'>INICIAR SESIÓN</button>
            <p className='infoLogin'>¿No tienes una cuenta?</p>
            <Link to='/Register' className='infoLogin infoUnderline'>Regístrate</Link>
          </form>
        </div>
        </div>
    </React.Fragment>
  );
}

export default Log;
