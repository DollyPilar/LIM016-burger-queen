import React, { useState, useEffect } from "react";
import { ButtonAccept } from "../../../Globals/Buttons/ButtonAccept/ButtonAccept.jsx";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Input } from "../../../Globals/Input/Input.jsx";
import { db, auth } from "../../../firebase/firebase-config.jsx";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Swal from "sweetalert2";
import "./AddStaffForm.css";

export const AddStaffForm = () => {
  const [user, setUser] = useState(null);
  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          try {
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data().name);
          } catch (e) {
            console.log(e);
          }
        } else {
          setUser("Empleado");
          console.log("no estás logueada");
        }
      }),
    []
  );
  const [errorMsg, setErrorMsg] = useState("");
  const initialState = {
    NameAdmin: "",
    EmailAdmin: "",
    Password: "",
    Rol: "",
    DNI: "",
    Address: "",
    StarDate: "",
    Cellphone: "",
  };
  const [state, setState] = useState(initialState);

  const {
    NameAdmin,
    EmailAdmin,
    Password,
    Rol,
    DNI,
    Address,
    StarDate,
    Cellphone,
  } = state;

  const handleInputAdmin = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const createUserColl = async (
    idUser,
    name,
    rol,
    email,
    id,
    address,
    startdate,
    cellphone
  ) => {
    try {
      await setDoc(doc(db, "users", idUser), {
        name,
        rol,
        email,
        Tienda: "Happy Paws",
        idUser,
        id,
        address,
        startdate,
        cellphone,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    if (
      NameAdmin.trim() === "" ||
      EmailAdmin.trim() === "" ||
      Password.trim() === "" ||
      DNI.trim() === "" ||
      Address.trim() === "" ||
      StarDate.trim() === "" ||
      Cellphone.trim() === "" ||
      !Rol
    ) {
      setErrorMsg("No puedes dejar el formulario vacío");
    } else {
      try {
        const client = await createUserWithEmailAndPassword(
          auth,
          EmailAdmin,
          Password
        );
        await sendEmailVerification(auth.currentUser);
        Swal.fire({
          position: "top",
          icon: "success",
          iconColor: "#ce73ff",
          toast: true,
          title: "Verificar el correo antes de entregárselo al empleado",
          width: "47rem",
          showConfirmButton: false,
          timer: 3700,
        });
        try {
          await createUserColl(
            client.user.uid,
            NameAdmin,
            Rol,
            EmailAdmin,
            DNI,
            Address,
            StarDate,
            Cellphone
          );
        } catch (e) {
          console.log(e);
        }

        setErrorMsg("");
        setState("");
        e.target.reset();
      } catch (error) {
        const errMsg = error.code;
        if (errMsg === "auth/email-already-in-use") {
          setErrorMsg("El email se encuentra en uso");
        } else if (errMsg === "auth/weak-password") {
          setErrorMsg("La contraseña debe tener al menos 6 caracteres");
        }
      }
    }
  };

  const hideForm = () => {
    console.log("click, hide form");
  };
  return (
    <React.Fragment>
      <div className="adminFormSection">
        <form className="adminForm" onSubmit={handleRegisterAdmin}>
          <div className="FirstColumForm">
            <div className="rowForm">
              <select
                className="inputAdmin"
                onChange={handleInputAdmin}
                name="Rol"
                value={Rol}
              >
                <option>Escoge el rol</option>
                <option>store</option>
                <option>delivery</option>
              </select>
              <Input
                type="text"
                placeholder="Nombre completo"
                name="NameAdmin"
                onChange={handleInputAdmin}
                value={NameAdmin}
              />

              <Input
                type="text"
                placeholder="Correo"
                name="EmailAdmin"
                onChange={handleInputAdmin}
                value={EmailAdmin}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                name="Password"
                onChange={handleInputAdmin}
                value={Password}
              />
            </div>
            <div className="rowForm">
              <Input
                type="text"
                placeholder="DNI"
                name="DNI"
                onChange={handleInputAdmin}
                value={DNI}
              />
              <Input
                type="text"
                placeholder="Dirección"
                name="Address"
                onChange={handleInputAdmin}
                value={Address}
              />
              <Input
                type="text"
                placeholder="Fecha de Ingreso"
                name="StarDate"
                value={StarDate}
                onChange={handleInputAdmin}
              />
              <Input
                type="number"
                placeholder="Celular"
                name="Cellphone"
                value={Cellphone}
                onChange={handleInputAdmin}
              />
            </div>
          </div>
          <div className="columnForm">
            {errorMsg && (
              <>
                <div className="errorMsg">{errorMsg}</div>
              </>
            )}
            <ButtonAccept name="Registrar" type="submit" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
