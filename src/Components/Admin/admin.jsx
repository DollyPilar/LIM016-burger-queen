import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "./admin.css";
import logoAdmin from "../../assets/dogLogIn.png";
import { auth, db } from "../../firebase/firebase-config.jsx";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";

function Admin() {
  const [errorMsg, setErrorMsg] = useState("");
  const initialState = {
    Fullname: "",
    Rol: "",
    Email: "",
    Password: "",
  };
  const [state, setState] = useState(initialState);

  const { Fullname, Rol, Email, Password } = state;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const createUserColl = async (idUser, name, rol, email) => {
    try {
      await setDoc(doc(db, "users", idUser), {
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
    if (
      Fullname.trim() === "" ||
      Email.trim() === "" ||
      Password.trim() === "" ||
      !Rol
    ) {
      setErrorMsg("No puedes dejar el formulario vacio");
    }
    try {
      const client = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      await sendEmailVerification(auth.currentUser);
      alert("se envió el correo de verificación");
      //navigate('/')
      try {
        await createUserColl(client.user.uid, Fullname, Rol, Email);
      } catch (e) {
        console.log(e);
      }
      //console.log(client.user.email)
    } catch (error) {
      const errMsg = error.code;
      if (errMsg === "auth/email-already-in-use") {
        setErrorMsg("email en uso");
      } else if (errMsg === "auth/weak-password") {
        setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      }
    }
  };

  let navigate = useNavigate();

  const goToProducts = () => {
    navigate("/AddProducts");
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="adminContainer">
        <div className="adminSection">
          <div className="adminWelcome">
            <h2> ¡BIENVENIDOS A HAPPY PAWS!</h2> <br></br>
            <button className="btnAddProductsAdmin" onClick={goToProducts}>
              Añadir productos
            </button>
            <img src={logoAdmin} alt="logo" className="logoAdmin" />
          </div>
        </div>

        <div className="adminFormSection">
          <form className="adminForm" onSubmit={handleRegister}>
            <input
              className="inputAdmin"
              type="text"
              placeholder="Nombre completo"
              name="FullName"
              onChange={handleInput}
            />

            <select
              className="inputAdmin adminFontSize"
              onChange={handleInput}
              name="Rol"
            >
              <option>Escoge el rol</option>
              <option>store</option>
              <option>delivery</option>
            </select>

            <input
              className="inputAdmin"
              type="text"
              placeholder="Correo"
              name="Email"
              onChange={handleInput}
            />
            <input
              className="inputAdmin"
              type="password"
              placeholder="Contraseña"
              name="Password"
              onChange={handleInput}
            />
            {errorMsg && (
              <>
                <div className="errorMsg">{errorMsg}</div>
              </>
            )}
            <button className="btnAdmin" type="submit">
              REGISTRAR
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Admin;
