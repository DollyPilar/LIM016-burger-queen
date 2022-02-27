import React, {useState, useEffect} from 'react';
import {auth, db} from '../../firebase/firebase-config.jsx'
import {onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc, setDoc, collection, getDocs, query, where} from 'firebase/firestore';
import { Products } from './productss'
import {Cart} from './Cart.jsx'


export function Home() {


// función que trae el uid del usuario logueado
    const GetUserUID = () =>{
        const [uid, setUid] = useState(null);
        useEffect(()=>{
            onAuthStateChanged(auth, (user) => {
                if(user){
            setUid(user.uid)
            
                }
            })
        },[])
        return uid;
    }
    //tenemos el uid de manera global
    const uid = GetUserUID();



        // estado de los productos
        const [products, setProducts]=useState([]);
        
        // función que trae los productos
        const getProducts = async () => {
            const collRef = query(collection(db, 'Products'), where('Tipo', '==', 'Perro'));
            const allColl = await getDocs(collRef);
            const productsArray = [];
            allColl.forEach((doc) => {
               let data = doc.data();
               data.ID = doc.id
                //console.log(doc.id)
                productsArray.push(data)
              
              });
                    setProducts(productsArray);
        }
        useEffect(()=>{
            getProducts();
        },[])

        let Product;

        // función que añade los productos al carrito
        const addToCart = async (product)=>{
              // console.log(product);
            Product= product
            Product['quantity']=1;
            Product['TotalProductPrice']=Product.quantity*Product.price;
            try{

                await setDoc( doc(db,'Cart' + uid, product.ID), {
                   Product
                  });
                  console.log('agregaste un pedido al carrito')
            } catch(e){
                    console.log(e)
            }
        }
    // console.log(uid)

    return (
        <React.Fragment>
            <div>Home</div>
            
            {products.length > 0 && (
                <div>
                    <h1 >Products</h1>
                    <div >
                        <Products products={products} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div >Please wait....</div>
            )}
            <br/>
            <div><Cart/></div>
        </React.Fragment>
    )
}
export default Home