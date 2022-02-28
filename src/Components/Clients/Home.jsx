import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Products } from './Products/Products.jsx';
import { Cart } from './Cart/Cart.jsx';
import { IndividualFilteredProduct } from './Products/IndividualFilteredProduct.jsx';
import './home.css';

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

  // estado de los productos
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, 'Products');
    try{
        const allColl = await getDocs(collRef);
        const productsArray = [];
        allColl.forEach((doc) => {
          let data = doc.data();
          data.ID = doc.id;
          data.TotalQtyNav = 0;
          productsArray.push({ ...data });
        });
        setProducts(productsArray);
      }catch(e){
        console.log(e)
    }
    } 

  useEffect(() => {
    getProducts();
  }, []);

  let Product;

  // función que añade los productos al carrito
  const addToCart = async (product) => {
    // console.log(product);
    Product = product;
    Product['quantity'] = 1;
    Product['TotalProductPrice'] = Product.quantity * Product.Precio;
    try {
      await setDoc(doc(db, 'Cart' + uid, product.ID), {
        Product,
      });
      console.log('agregaste un pedido al carrito');
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(uid)

  // se muestran los tipos en la tah span
  const [spans] = useState([
    { id: 'DogProducts', text: 'Dog Products' },
    { id: 'CatProducts', text: 'Cat Products' },
  ]);

  // el estado de la clase o hover a decidir
  const [active, setActive] = useState('');

  // el estado de las categorías
  const [category, setCategory] = useState('');

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
    setActive('');
    setCategory('');
    setfilteredProducts([]);
  };

  return (
    <React.Fragment>
      <div>Home</div>
      <div>----------</div>
      {spans.map((individualSpan, index) => (
        <span
          key={index}
          id={individualSpan.id}
          onClick={() => handleChange(individualSpan)}
          className={individualSpan.id === active ? active : 'deactive'}
        >
          {individualSpan.text}
        </span>
      ))}
      <button onClick={showAllProducts}>Mira todos los productos</button>

      {filteredProducts.length > 0 && (
        // <IndividualFilteredProduct/>
        <div className='my-products'>
          <h1 className='text-center'>{category}</h1>
          <div className='products-box'>
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
            <div className='my-products'>
              <h1 className='text-center'>Nuestros productos</h1>
              <div className='products-box'>
                <Products products={products} addToCart={addToCart} />
              </div>
            </div>
          )}
          {products.length < 1 && (
            <div className='my-products please-wait'>Por favor espera</div>
          )}
        </>
      )}
      <div>
        <Cart />
      </div>
    </React.Fragment>
  );
}
export default Home;
