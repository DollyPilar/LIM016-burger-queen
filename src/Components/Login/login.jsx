import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config.jsx'; 
// import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../img/logo.png';

function Log() {
const [errorMsg, setErrorMsg]=useState('');
let navigate = useNavigate();
const initialState ={
   email: '',
   password: '',
}
const [state, setState] = useState(initialState);

const {email, password} = state;

const handleInputChange = (e) =>{
const {name, value} = e.target;
setState({...state, [name]: value})
}
const handleLogin = async (e) => {
   e.preventDefault();
   if(email.trim()=== '' || password.trim()=== ''){
      setErrorMsg('No puedes dejar campos vacíos') 
   } else {
   try {
   const client = await signInWithEmailAndPassword(auth, email, password);
   if (client.user.emailVerified){
      const docRef = doc(db, 'users', client.user.uid);
      const docSnap = await getDoc(docRef);
      //console.log (docSnap.doc.data())
      const userRol = docSnap.data().rol;
      if (userRol==='client'){
         navigate('/product')
      }
      else if (userRol==='admin'){
         navigate('/Admin')
      } else if (userRol==='store'){
         navigate('/Store')
      }
      else if (userRol==='delivery'){
         navigate('/Delivery')
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

//    const handleLogin = async (e) => {
//       e.preventDefault(e);
//       const data = new FormData(e.target)
//       const fields = Object.fromEntries(data.entries())
//       if(fields.email.length === 0 || fields.password.length === 0){
//          setErrorMsg('No puedes dejar el formulario vacio')
//       } else {

// }
// }
   return (
      <React.Fragment>
      <div className='logInContainer'>
         <div className = 'logoContainer'>
            <img src={logo} alt='logo' className='logo'/>
         </div>
         <div className='formContainer'>
            <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2>
            <form onSubmit = {handleLogin}> 
               <input type='text' placeholder='Correo' name='email' id ='email'
                  onChange={handleInputChange}
                  value={email}
               /> 
               <br/>
               <input type='password' placeholder='Contraseña' name='password' id ='password'
                  onChange={handleInputChange}
                  value={password}
               />
                {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div></>}
               <p>¿Olvidaste tu contraseña?</p>
               <button type='submit'>INICIAR SESIÓN</button>
               <p>¿No tienes una cuenta?</p>
               <Link to='/Register'>Regístrate</Link>

            </form>
        </div>
      </div>

        </React.Fragment>
    );
  }
  
  export default Log;