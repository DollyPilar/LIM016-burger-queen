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

function Register() {
  const [registerPaswword, setRegisterPaswword] = useState("");

  const [registerName, setRegisterName] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");

  let navigate = useNavigate();
  const createUserColl = async (idUser, name, email) => {
    await setDoc(doc(db, "users", idUser), {
      name,
      rol: "client",
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
      alert("se envió el correo de verificación");
      navigate("/");
      await createUserColl(client.user.uid, registerName, registerEmail);
      //console.log(client.user.email)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="registerContainer">
        <div className="formSection">
          <form className="registerForm">
            <h4>Crea tu cuenta para conocernos</h4>
            <input
              className="inputRegister"
              type="text"
              placeholder="Nombre completo"
              onChange={(e) => {
                setRegisterName(e.target.value);
              }}
            />
            <input
              className="inputRegister"
              type="text"
              placeholder="Correo"
              name="name"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
            />
            <input
              className="inputRegister"
              type="password"
              placeholder="Contraseña"
              name="name"
              onChange={(e) => {
                setRegisterPaswword(e.target.value);
              }}
            />
            {/* {errorAlert && (
              <>
                <div className="errorAlert">{errorAlert}</div>
              </>
            )} */}
            <button onClick={register} className="btnRegister" type="submit">
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
