import React, { useState, useEffect } from "react";
import { addDoc, collection, query, where, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../../../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {onAuthStateChanged} from "firebase/auth"
import "./addProducts.css";
import { FaPhotoVideo } from "react-icons/fa";
import Swal from "sweetalert2";
import
{ LowNavBar } from "../../HomePage/NavBar/NavBarEmployees/LowNavBar.jsx";
import { NavBarEmployee } from "../../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";
import {ProductsCard} from "./ProductsCard.jsx"

export const AddProducts = () => {
  const [user, setUser] = useState(null);
    useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //console.log(user.uid);
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
  const [productPhoto, setProductPhoto] = useState("");
  const [photoVisibility, setPhotoVisibility] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const initialState = {
    ProductName: "",
    Price: "",
    Option: "",
  };
  const [state, setState] = useState(initialState);

  const { ProductName, Price, Option } = state;

  const handleInputAddProductsChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const subirFile = async (e) => {
    const file = e.files[0];
    setPhotoVisibility(true);
    const name = file.name;
    const fotoRef = ref(storage, name);

    try {
      await uploadBytes(fotoRef, file);
    } catch (e) {
      console.log(e);
    }
    getDownloadURL(fotoRef)
      .then((URL) => {
        setProductPhoto(URL);
      })
      .catch((e) => console.log(e));
  };
  const addProducts = async (e) => {
    e.preventDefault();
    if (
      ProductName.trim() === "" ||
      Price.trim() === "" ||
      Option.trim() === ""
    ) {
      setErrMsg("No se puede dejar inputs vacíos");
    } else {
      const colRef = collection(db, "products");
      try {
        await addDoc(colRef, {
          Nombre: ProductName,
          Precio: Price,
          Tipo: Option,
          Img: productPhoto,
          Tienda: "Happy Paws"
        });
        Swal.fire({
          position: "top",
          icon: "success",
          iconColor: "#ce73ff",
          toast: true,
          title: "El producto fue subido exitosamente",
          width: "36rem",
          showConfirmButton: false,
          timer: 2900,
        });
        setErrMsg("");
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, "products");
    try {
      const order = query(collRef, where("Tienda", "==", "Happy Paws"));
      // const productsArray = [];

      onSnapshot(order, (querySnapshot) => {
        const delivArray = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.ID = doc.id;
          delivArray.push(data);
        });
        setProducts(delivArray);
      });
   
  } catch(e){
    console.log(e)
  }
}
  useEffect(() => {
    getProducts();
  }, []);
  const deleteProduct = async(product)=>{
    //console.log("funciona", product.ID)
    const prodRef = doc(db, "products", product.ID);
    try{
      await deleteDoc(prodRef);
    }catch(e){console.log(e)}
    
  }
  return (
    <React.Fragment>
       <NavBarEmployee text="Administrador" name={user} />
      <LowNavBar/>
    <div className="productsCardContainerAdmin">
      <div className="firstRowCard">
        <h3 className="cardName">Productos</h3>
        <h3 className="cardName">Precio</h3>
      </div>
     <ProductsCard products={products} deleteProduct={deleteProduct}/> </div>
      <div className="addProductsSection">
        <form className="addProductsForm" onSubmit={addProducts}>
          <input
            className="inputAddProducts"
            type="text"
            placeholder="Nombre del Producto"
            name="ProductName"
            onChange={handleInputAddProductsChange}
          />
          <input
            className="inputAddProducts"
            type="number"
            placeholder="Precio"
            name="Price"
            onChange={handleInputAddProductsChange}
          />
          <select
            className="inputAddProducts"
            name="Option"
            onChange={handleInputAddProductsChange}
          >
            <option className="inputAddProducts">Escoge una opción</option>
            <option className="inputAddProducts">Sección Perros</option>
            <option className="inputAddProducts">Sección Gatos</option>
          </select>
          <div>
            <input
              style={{ display: "none" }}
              id="photo"
              className="hidden"
              type="file"
              placeholder="Imagen"
              name="Img"
              onChange={(e) => {
                subirFile(e.target);
              }}
            />
            <label htmlFor="photo">
              <div className="fileChosen">
                <FaPhotoVideo className="iconPhoto" />
                {photoVisibility ? (
                  <p className="textSpan">Foto Elegida</p>
                ) : (
                  <p className="textSpan">No hay foto</p>
                )}
              </div>
            </label>
          </div>
          {errMsg && (
            <>
              <div className="errorAlert">{errMsg}</div>
            </>
          )}
          <button className="btnAddProducts" type="submit">
            SUBIR PRODUCTOS
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddProducts;
