import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NavBar } from "../../HomePage/NavBar/NavBar";
import "./addProducts.css";

export const AddProducts = () => {
  const [productPhoto, setProductPhoto] = useState("");
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
        });
        alert("Tu producto se subio exitosamente");
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <React.Fragment>
      <NavBar />
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
            type="text"
            placeholder="Precio"
            name="Price"
            onChange={handleInputAddProductsChange}
          />
          <select
            className="inputAddProducts"
            name="Option"
            onChange={handleInputAddProductsChange}
          >
            <option>Escoge una opción</option>
            <option>Sección Perros</option>
            <option>Sección Gatos</option>
          </select>
          <input
            className="inputAddProducts"
            type="file"
            placeholder="Imagen"
            name="Img"
            onChange={(e) => {
              subirFile(e.target);
            }}
          />
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
