import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { Products } from "./Products/Products.jsx";
// import { Cart } from "./Cart/Cart.jsx";
import { IndividualFilteredProduct } from "./Products/IndividualFilteredProduct.jsx";
import { NavBar } from "../HomePage/NavBar/NavBar";
import "./home.css";
import Swal from 'sweetalert2';
import cat from "../../assets/cat.png";

export function Home() {
  // función que trae el uid del usuario logueado
  const GetUserUID = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  };
  //tenemos el uid de manera global
  const uid = GetUserUID();
  const navigate = useNavigate();

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
        // console.log(data);
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

  let Product;

  // función que añade los productos al carrito
  const addToCart = async (product) => {
    Product = product;
    Product["quantity"] = 1;
    Product["TotalProductPrice"] = Product.quantity * Product.Precio;
    if (!uid) {
      Swal.fire({
        position: 'center',
        icon: "info",
        // imageUrl: 'https://64.media.tumblr.com/2e24218417ff12ba84798af64a07e1d8/7f8631b4c44a8a26-e0/s500x750/4d3bcbd8a64730fc0db0c57872820507510128f9.png',
        // imageWidth: 250,
        // imageHeight: 282,
        // imageAlt: 'Custom image',
        title: 'Debes iniciar sesión para realizar una compra',
        showConfirmButton: false,
        // timer: 2500
      })
      //navigate("/LogIn");
    } else {
      try {
        await setDoc(doc(db, "cart" + uid, product.ID), {
          Product,
        });
        //alert("agregaste un pedido al carrito");
        // console.log(product);
        Swal.fire({
          position: 'center',
          icon: "success",
          title: 'Agregaste un producto al carrito',
          showConfirmButton: false,
          //timer: 2500
        })
      } catch (e) {
        console.log(e);
      }
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
  const [category, setCategory] = useState("");

  // manejando el evento de los cambios
  const handleChange = (indivSpan) => {
    setActive(indivSpan.id);
    setCategory(indivSpan.text);
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
    setCategory("");
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
