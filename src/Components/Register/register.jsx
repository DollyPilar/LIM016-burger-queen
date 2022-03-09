import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "./register.css";
import { auth, db } from "../../firebase/firebase-config.jsx";
import logoRegister from "../../assets/cat.png";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";
import Swal from 'sweetalert2';

function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const initialState = {
    Fullname: "",
    Email: "",
    Password: "",
  };
  const [state, setState] = useState(initialState);

  const { Fullname, Email, Password } = state;

  const handleInputRegisterChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let navigate = useNavigate();
  const createUserColl = async (idUser, name, email) => {
    await setDoc(doc(db, "users", idUser), {
      name,
      rol: "client",
      email,
      idUser,
    });
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (
      Fullname.trim() === "" ||
      Email.trim() === "" ||
      Password.trim() === ""
    ) {
      setErrorMsg("No puedes dejar campos vacíos");
    } else {
      try {
        const client = await createUserWithEmailAndPassword(
          auth,
          Email,
          Password
        );
        await sendEmailVerification(auth.currentUser);
        // alert("se envió el correo de verificación, revisa tu correo");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se envió el correo de verificación, por favor, revisa tu correo',
          showConfirmButton: false,
          timer: 2500
        })
        navigate("/LogIn");
        await createUserColl(client.user.uid, Fullname, Email);
      } catch (error) {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          setErrorMsg("El correo ya está en uso");
        } else if (error.code === "auth/weak-password") {
          setErrorMsg("Tu contraseña de be tener al menos 6 caracteres");
        }
      }
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="registerContainer">
        <div className="formSection">
          <form className="registerForm" onSubmit={handleRegisterUser}>
            <h4>Crea tu cuenta para conocernos</h4>
            <input
              className="inputRegister"
              type="text"
              placeholder="Nombre completo"
              name="Fullname"
              id="Fullname"
              onChange={handleInputRegisterChange}
            />
            <input
              className="inputRegister"
              type="text"
              placeholder="Correo"
              name="Email"
              id="Email"
              onChange={handleInputRegisterChange}
            />
            <input
              className="inputRegister"
              type="password"
              placeholder="Contraseña"
              name="Password"
              id="Password"
              onChange={handleInputRegisterChange}
            />
            {errorMsg && (
              <>
                <div className="errorAlert">{errorMsg}</div>
              </>
            )}
            <button type="submit" className="btnRegister">
              REGISTRAR
            </button>
            <div className="containerGoToLogIN">
              <p className="infoRegister">¿Ya tienes una cuenta?</p>
              <Link to="/LogIn" className="goToLogIn">
                Inicia Sesión
              </Link>
            </div>
          </form>
        </div>
        <div className="logoSection">
          <div className="welcomeSection">
            <h2> Right Meow</h2>
            <img src={logoRegister} alt="logo" className="logoRegister" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
