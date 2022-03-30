import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { IndividualProduct } from "../Products/IndividualProduct.jsx";
import { IndividualFilteredProduct } from "../Products/IndividualFilteredProduct.jsx";
import "./Shop.css";
import Swal from "sweetalert2";

export const Shop = () => {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    let isMounted = true;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (isMounted) {
          setUid(user.uid);
        }
      }
    });
    return () => {
      isMounted = false;
    };
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
      console.log(e.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // let Product;

  // función que añade los productos al carrito
  const addToCart = async (product) => {
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
      console.log(e.message);
    }
  };

  // se muestran los tipos en la tah span
  const [spans] = useState([
    { id: "productoperro", text: "Sección Perros" },
    { id: "productogato", text: "Sección Gatos" },
  ]);

  //el estado de los productos filtrados
  const [filteredProducts, setfilteredProducts] = useState([]);

  const filterFunction = (text) => {
    const filter = products.filter((product) => product.Tipo === text);
    setfilteredProducts(filter);
  };
  // el estado de la clase o hover a decidir
  const [active, setActive] = useState("");

  // manejando el evento de los cambios
  const handleChange = (indivSpan) => {
    setActive(indivSpan.id);
    // setCategory(indivSpan.text);
    filterFunction(indivSpan.text);
  };

  const showAllProducts = () => {
    setActive("");
    // setCategory("");
    setfilteredProducts([]);
  };

  return (
    <React.Fragment>
      <div className="storeContainer">
        <div className="categoriesContainer">
          <button className="btnProduct" onClick={showAllProducts}>
            Todos
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

        {filteredProducts.length > 0 && (
          <div className="myProducts">
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
                  {products.map((individualProduct) => (
                    <IndividualProduct
                      key={individualProduct.ID}
                      individualProduct={individualProduct}
                      addToCart={addToCart}
                    />
                  ))}
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
    </React.Fragment>
  );
};
