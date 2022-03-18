import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./AddStaff.css";
import { AddStaffMap } from "./AddStaffMap.jsx";
import
{ LowNavBar } from "../../HomePage/NavBar/NavBarEmployees/LowNavBar.jsx";
import { collection, query, where, onSnapshot, doc, getDoc, setDoc} from "firebase/firestore";
import { NavBarEmployee } from "../../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { db, auth } from "../../../firebase/firebase-config";
import {onAuthStateChanged, createUserWithEmailAndPassword,
    sendEmailVerification} from "firebase/auth";


export const AddStaff = () =>{
    const [user, setUser] = useState(null);
    useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = getDoc(docRef);
          docSnap.then((doc) => setUser(doc.data().name));
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
  };
  const [state, setState] = useState(initialState);

  const { NameAdmin, EmailAdmin, Password, Rol } = state;

  const handleInputAdmin = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const createUserColl = async (idUser, name, rol, email) => {
    try {
      await setDoc(doc(db, "users", idUser), {
        name,
        rol,
        email,
        Tienda: "Happy Paws",
        idUser,
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
      !Rol
    ) {
      setErrorMsg("No puedes dejar el formulario vacio");
      // console.log("rol:", Rol, NameAdmin, EmailAdmin, Password)
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
          await createUserColl(client.user.uid, NameAdmin, Rol, EmailAdmin);
        } catch (e) {
          console.log(e);
        }
        setErrorMsg("");
      } catch (error) {
        const errMsg = error.code;
        if (errMsg === "auth/email-already-in-use") {
          setErrorMsg("email en uso");
        } else if (errMsg === "auth/weak-password") {
          setErrorMsg("La contraseña debe tener al menos 6 caracteres");
        }
      }
    }
  };
  const [staff, setStaff] = useState([]);
  //console.log(staff)
  const getStaff = async () => {
    const collRef = collection(db, "users");
    const delivArray = [];
    try {
      const order = query(collRef, where("Tienda", "==", "Happy Paws"));
      // const productsArray = [];
      onSnapshot(order, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.ID = doc.id;
          delivArray.push(data);
        });
        //setStaff(delivArray);
      });
  } catch(e){
    console.log(e)
  }
  return delivArray;
}

useEffect(() => {
  getStaff().then((employee)=>{
      setStaff(employee)
  })
}, []); 

    return(
        <React.Fragment>
        <NavBarEmployee text="Administrador" name={user} />
      <LowNavBar/>
      <div className="staffContainer">
      <div className="firstRowStaff">
        <h3 className="cardStaffName">Nombre</h3>
        <h3 className="cardStaffEmail">Email</h3>
        <h3 className="cardStaffRol">Rol</h3>
      </div>
        <AddStaffMap staff={staff} />
        
      </div>
      
        <div className="adminFormSection">
          <form className="adminForm" onSubmit={handleRegisterAdmin}>
            <select
              className="inputAdmin adminFontSize"
              onChange={handleInputAdmin}
              name="Rol"
            >
              <option>Escoge el rol</option>
              <option>store</option>
              <option>delivery</option>
            </select>
            <input
              className="inputAdmin"
              type="text"
              placeholder="Nombre completo"
              name="NameAdmin"
              onChange={handleInputAdmin}
            />

            <input
              className="inputAdmin"
              type="text"
              placeholder="Correo"
              name="EmailAdmin"
              onChange={handleInputAdmin}
            />
            <input
              className="inputAdmin"
              type="password"
              placeholder="Contraseña"
              name="Password"
              onChange={handleInputAdmin}
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
        </React.Fragment>
    )
};
