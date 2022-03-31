import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "./Register.css";
import { auth, db } from "../../firebase/firebase-config.jsx";
import logoRegister from "../../assets/peoplewithdogjpg.jpg";
import Swal from "sweetalert2";
import { Input } from "../../Globals/Input/Input.jsx";
import { ButtonAccept } from "../../Globals/Buttons/ButtonAccept/ButtonAccept.jsx";

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
          position: "top",
          icon: "success",
          title:
            "Se envió el correo de verificación, por favor, revisa tu correo",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/LogIn");
        await createUserColl(client.user.uid, Fullname, Email);
        setErrorMsg("");
        setState("");
        e.target.reset();
      } catch (error) {
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
      {/* <NavBar /> */}
      <div className="registerContainer">
        <form className="registerForm" onSubmit={handleRegisterUser}>
          <h4>Crea una cuenta para conocernos</h4>
          <Input
            className="inputRegister"
            type="text"
            placeholder="Nombre completo"
            name="Fullname"
            id="Fullname"
            onChange={handleInputRegisterChange}
          />
          <Input
            className="inputRegister"
            type="text"
            placeholder="Correo"
            name="Email"
            id="Email"
            onChange={handleInputRegisterChange}
          />
          <Input
            className="inputRegister"
            type="password"
            placeholder="Contraseña"
            name="Password"
            id="Password"
            onChange={handleInputRegisterChange}
          />
          {errorMsg && (
            <>
              <div className="errorRegister">{errorMsg}</div>
            </>
          )}
          <ButtonAccept type="submit" name="REGISTRAR" />
          <div className="goToLogIN">
            <p className="infoRegister">¿Ya tienes una cuenta?</p>
            <Link to="/login" className="goToLogIn">
              Inicia Sesión
            </Link>
          </div>
        </form>

        <div className="welcomeSection">
          <img src={logoRegister} alt="logo" className="logoRegister" />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
