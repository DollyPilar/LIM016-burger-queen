import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config.jsx";
import "./Login.css";
import { Input } from "../../Globals/Input/Input.jsx";
import { ButtonAccept } from "../../Globals/Buttons/ButtonAccept/ButtonAccept.jsx";
import logo from "../../assets/peoplewithdogjpg.jpg";

function Log() {
  const isMounted = useRef(true);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(initialState);

  const { email, password } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isMounted.current) {
      if (email.trim() === "" || password.trim() === "") {
        setErrorMsg("No puedes dejar campos vacíos");
      } else {
        try {
          const client = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (client.user.emailVerified) {
            const docRef = doc(db, "users", client.user.uid);
            const docSnap = await getDoc(docRef);
            const userRol = docSnap.data().rol;

            if (userRol === "client") {
              navigate("/product");
            } else if (userRol === "admin") {
              navigate("/admin");
            } else if (userRol === "store") {
              navigate("/store");
            } else if (userRol === "delivery") {
              navigate("/delivery");
            }
          } else {
            setErrorMsg("Por favor, verifica tu correo");
          }
          setErrorMsg("");
          setState("");
          e.target.reset();
        } catch (error) {
          const errMsg = error.code;
          if (errMsg === "auth/user-not-found") {
          }
          if (errMsg === "auth/wrong-password") {
            setErrorMsg("contraseña o usuario incorrectos");
          }
        }
      }
    }
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      <div className="logInContainer">
        <div className="welcomeContainer">
          <img src={logo} alt="logo" className="logoLogIn" />
        </div>

        <form className="form" onSubmit={handleLogin}>
          <h2>Inicia sesión</h2>
          <Input
            type="text"
            placeholder="Correo"
            name="email"
            id="email"
            onChange={handleInputChange}
            value={email}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={password}
          />
          {errorMsg && (
            <>
              <div className="errLogIn">{errorMsg}</div>
            </>
          )}

          <ButtonAccept type="submit" name="INICIAR SESIÓN" />
          <div className="goToRegister">
            <p className="infoLogin">¿No tienes una cuenta?</p>

            <Link to="/register" className="infoUnderline">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Log;
