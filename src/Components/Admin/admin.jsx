import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaDollarSign,
  FaDollyFlatbed,
  // FaRegIdCard,
  // FaRegChartBar,
  // FaStore,
  // FaPaw,
} from "react-icons/fa";
import { LowNavBar } from "../HomePage/NavBar/NavBarEmployees/LowNavBar.jsx";

import {
  // doc, setDoc, getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   onAuthStateChanged,
// } from "firebase/auth";
import "./admin.css";
//import logoAdmin from "../../assets/dogLogIn.png";
import { db } from "../../firebase/firebase-config.jsx";
//import { useNavigate } from "react-router-dom";
import { NavBarEmployee } from "../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";
//import Swal from "sweetalert2";

function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser("natAdmin");
  }, []);
  // estado de los productos
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, "compras");
    try {
      const allColl = await getDocs(collRef);
      const productsArray = [];

      allColl.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        productsArray.push(data);
      });
      setProducts(productsArray);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  //const [finalPrice, setFinalPrice] = useState("");
  let totalPrice;
  let totalClients;
  let orders;
  if (products.length > 0) {
    orders = products.length;
    // console.log("número total de compras",products.length);
    // finalProducts.buyerName // eliminar los repetidos // total de clientes
    //finalProducts.finalPrice // ventas tottales
    const prices = products.map((pro) => pro.finalProducts.finalPrice);
    totalPrice = prices.reduce((acc, cur) => acc + cur, 0);
    const clients = products.map((pro) => pro.finalProducts.buyerName);
    totalClients = [...new Set(clients)].length;
    //console.log(uniqueArr, uniqueArr.length);
  }
  // console.log(products);
  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         //console.log(user.uid);
  //         const docRef = doc(db, "users", user.uid);
  //         const docSnap = getDoc(docRef);
  //         docSnap.then((doc) => setUser(doc.data().name));
  //       } else {
  //         setUser("Empleado");
  //         console.log("no estás logueada");
  //       }
  //     }),
  //   []
  // );
  // const [errorMsg, setErrorMsg] = useState("");
  // const initialState = {
  //   NameAdmin: "",
  //   EmailAdmin: "",
  //   Password: "",
  //   Rol: "",
  // };
  // const [state, setState] = useState(initialState);

  // const { NameAdmin, EmailAdmin, Password, Rol } = state;

  // const handleInputAdmin = (e) => {
  //   const { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };

  // const createUserColl = async (idUser, name, rol, email) => {
  //   try {
  //     await setDoc(doc(db, "users", idUser), {
  //       name,
  //       rol,
  //       email,
  //       idUser,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleRegisterAdmin = async (e) => {
  //   e.preventDefault();
  //   if (
  //     NameAdmin.trim() === "" ||
  //     EmailAdmin.trim() === "" ||
  //     Password.trim() === "" ||
  //     !Rol
  //   ) {
  //     setErrorMsg("No puedes dejar el formulario vacio");
  //     // console.log("rol:", Rol, NameAdmin, EmailAdmin, Password)
  //   } else {
  //     try {
  //       const client = await createUserWithEmailAndPassword(
  //         auth,
  //         EmailAdmin,
  //         Password
  //       );
  //       await sendEmailVerification(auth.currentUser);
  //       Swal.fire({
  //         position: "top",
  //         icon: "success",
  //         iconColor: "#ce73ff",
  //         toast: true,
  //         title: "Verificar el correo antes de entregárselo al empleado",
  //         width: "47rem",
  //         showConfirmButton: false,
  //         timer: 3700,
  //       });
  //       try {
  //         await createUserColl(client.user.uid, NameAdmin, Rol, EmailAdmin);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       setErrorMsg("");
  //     } catch (error) {
  //       const errMsg = error.code;
  //       if (errMsg === "auth/email-already-in-use") {
  //         setErrorMsg("email en uso");
  //       } else if (errMsg === "auth/weak-password") {
  //         setErrorMsg("La contraseña debe tener al menos 6 caracteres");
  //       }
  //     }
  //   }
  // };

  // let navigate = useNavigate();

  // const goToProducts = () => {
  //   navigate("/AddProducts");
  // };

  return (
    <React.Fragment>
      <NavBarEmployee text="Administrador" name={user} />
      <LowNavBar/>
      <div className="statisticsContainer">
        <div className="statisticCard">
          <p className="statisticInfo">Total de clientes</p>
          <div className="secondRow">
            <FaUserFriends className="adminIcon" />
            <p className="statisticInfo">{totalClients}</p>
          </div>
        </div>
        <div className="statisticCard">
          <p className="statisticInfo">Ventas totales</p>
          <div className="secondRow">
            <FaDollarSign className="adminIcon" />
            <p className="statisticInfo">{totalPrice}</p>
          </div>
        </div>
        <div className="statisticCard">
          <p className="statisticInfo">Pedidos totales</p>
          <div className="secondRow">
            <FaDollyFlatbed className="adminIcon" />
            <p className="statisticInfo">{orders}</p>
          </div>
        </div>
      </div>
      {/* <div className="adminContainer">
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
      </div> */}
    </React.Fragment>
  );
}
export default Admin;
