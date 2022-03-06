import React, { useState } from 'react';
import { addDoc, collection} from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebase-config';
import { ref, uploadBytes, getDownloadURL} from  'firebase/storage';
import './addProducts.css';


export const AddProducts =()=>{

    const [productPhoto, setProductPhoto] = useState("")
    const [productName, setProductName]=useState("")
    const [productPrice, setProductPrice]=useState("")
    const [productType, setProductType]=useState("")


    const subirFile =async(e)=>{
        const file=e.files[0];
        const name=file.name
        const fotoRef = ref(storage, name)

        try{
        await uploadBytes(fotoRef, file)
        }

        catch(e){
        console.log(e)
        }
        getDownloadURL(fotoRef).then((URL)=>{
            setProductPhoto(URL)
        }).catch((e)=>console.log(e))
    }
    const addProducts = async (e)=>{
        e.preventDefault()
        const colRef = collection(db, 'products');
      await addDoc(colRef, {
    Nombre: productName,
    Precio: productPrice,
    Tipo: productType,
    Img: productPhoto,
  });
  
  setProductPhoto("")
  setProductName("")
  setProductPrice("")
  setProductType("")

    }

    return(
        <React.Fragment>
            <div className='addProductsSection'>
            <form className='addProductsForm' onSubmit={addProducts}>
                    <input 
                    className='inputAddProducts'
                    type="text"
                    placeholder="Name"
                    name='name'
                    onChange={(e) => {
                        setProductName(e.target.value);
                    }}
                    />
                    <input 
                    className='inputAddProducts'
                    type="text"
                    placeholder="Precio"
                    name='precio'
                    onChange={(e) => {
                        setProductPrice(e.target.value);
                      }}
                      />
                    <input 
                    className='inputAddProducts'
                    type="text"
                    placeholder="Tipo"
                    name='tipo'
                    onChange={(e) => {
                        setProductType(e.target.value);
                      }}
                      />
                    <input 
                    className='inputAddProducts'
                    type="file"
                    placeholder="Imagen"
                    name='imagen'
                    onChange={(e) => {
                        subirFile(e.target);
                      }}
                      />
                    <button className='btnAddProducts' type='submit'>Enviar </button>
            </form>
            </div>
        </React.Fragment>
    )
}

export default AddProducts;