import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { Products } from "./Products/Products.jsx";
import { IndividualFilteredProduct } from "./Products/IndividualFilteredProduct.jsx";
import { NavBar } from "../HomePage/NavBar/NavBar";
import "./home.css";
import Swal from "sweetalert2";

export function Home() {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    // const GetUserUID = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    //   return uid;
    // };
  }, []);

  // estado de los productos
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, "products");
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
  //console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  // let Product;

  // función que añade los productos al carrito
  const addToCart = async (product) => {
    console.log("diste click");
    const quantity = 1;
    const Precio = product.Precio;
    const TotalProductPrice = quantity * Precio;
    const ID = product.ID;
    const Img = product.Img;
    const Nombre = product.Nombre;

    const Tipo = product.Tipo;
    try {
      await setDoc(doc(db, "cart" + uid, ID), {
        quantity,
        TotalProductPrice,
        ID,
        Img,
        Nombre,
        Precio,
        Tipo,
      });
      Swal.fire({
        position: "top",
        icon: "success",
        iconColor: "#ce73ff",
        toast: true,
        title: "Producto agregado",
        width: "23rem",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(uid)

  // se muestran los tipos en la tah span
  const [spans] = useState([
    { id: "productoperro", text: "Sección Perros" },
    { id: "productogato", text: "Sección Gatos" },
  ]);

  // el estado de la clase o hover a decidir
  const [active, setActive] = useState("");

  // el estado de las categorías
  // const [category, setCategory] = useState("");

  // manejando el evento de los cambios
  const handleChange = (indivSpan) => {
    setActive(indivSpan.id);
    // setCategory(indivSpan.text);
    filterFunction(indivSpan.text);
  };

  //el estado de los productos filtrados
  const [filteredProducts, setfilteredProducts] = useState([]);

  const filterFunction = (text) => {
    const filter = products.filter((product) => product.Tipo === text);
    setfilteredProducts(filter);
  };

  const showAllProducts = () => {
    setActive("");
    // setCategory("");
    setfilteredProducts([]);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="storeContainer">
        <div className="categoriesContainer">
          <button className="btnProduct" onClick={showAllProducts}>
            Mira todos los productos
          </button>
          {spans.map((individualSpan, index) => (
            <button
              key={index}
              id={individualSpan.id}
              onClick={() => handleChange(individualSpan)}
              className={individualSpan.id === active ? active : "deactive"}
            >
              {individualSpan.text}
            </button>
          ))}
        </div>
        <div className="allMyProducts">
          {filteredProducts.length > 0 && (
            // <IndividualFilteredProduct/>
            <div className="myProducts">
              {/* <h1 className="textCenter">{category}</h1> */}
              <div className="productsBox">
                {filteredProducts.map((individualFilteredProduct) => (
                  <IndividualFilteredProduct
                    key={individualFilteredProduct.ID}
                    individualFilteredProduct={individualFilteredProduct}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          )}
          {filteredProducts.length < 1 && (
            <>
              {products.length > 0 && (
                <div className="myProducts">
                  {/* <h1 className="textCenter">Nuestros productos</h1> */}
                  <div className="productsBox">
                    <Products products={products} addToCart={addToCart} />
                  </div>
                </div>
              )}
              {products.length < 1 && (
                <div className="pleaseWait">
                  <p>Por favor espera...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* <div>
        <Cart />
      </div> */}
    </React.Fragment>
  );
}
export default Home;
